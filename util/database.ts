import camelcaseKeys from 'camelcase-keys';
import postgres from 'postgres';

// Type needed for the connection function below
declare module globalThis {
  let postgresSqlClient: ReturnType<typeof postgres> | undefined;
}

// Connect only once to the database
// https://github.com/vercel/next.js/issues/7811#issuecomment-715259370
function connectOneTimeToDatabase() {
  let sql;

  if (process.env.NODE_ENV === 'production' && process.env.DATABASE_URL) {
    // Heroku needs SSL connections but
    // has an "unauthorized" certificate
    // https://devcenter.heroku.com/changelog-items/852
    sql = postgres({ ssl: { rejectUnauthorized: false } });
  } else {
    if (!globalThis.postgresSqlClient) {
      globalThis.postgresSqlClient = postgres();
    }
    sql = globalThis.postgresSqlClient;
  }

  return sql;
}

// Connect to PostgreSQL
const sql = connectOneTimeToDatabase();

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
};

// type for verifying email with hash
type EmailWithPasswordHash = User & { passwordHash: string };

// keep camelCase in the naming but change it to last_name when querying to database
export async function createUser(
  firstName: string,
  lastName: string,
  email: string,
  passwordHash: string,
) {
  const [user] = await sql<[User]>`
  INSERT INTO users
    (first_name, last_name, email, password_hash)
  VALUES
    (${firstName}, ${lastName}, ${email}, ${passwordHash})
  RETURNING
    id,
    first_name,
    last_name
  `;
  // we want to redirect with the id so then it will be possible to redirect with the user id and don't need to show email or password
  return camelcaseKeys(user);
}

// create function to get user to check if they already are registered

export async function getUserByNameAndEmail(
  firstName: string,
  lastName: string,
  email: string,
) {
  if (!firstName || !lastName || !email) return undefined;

  const [user] = await sql<[User | undefined]>`
    SELECT
      id,
      first_name,
      last_name,
      email
    FROM
      users
    WHERE
      first_name = ${firstName} AND
      last_name = ${lastName} AND
      email = ${email}

  `;
  return user && camelcaseKeys(user);
}

export async function getUserByPasswordHashByEmail(email: string) {
  if (!email) return undefined;

  const [user] = await sql<[EmailWithPasswordHash | undefined]>`
    SELECT
    *
    FROM
      users
    WHERE
      email = ${email}

  `;
  return user && camelcaseKeys(user);
}

export async function getUserById(userId: number) {
  if (!userId) return undefined;

  const [user] = await sql<[User | undefined]>`
    SELECT
      id,
      first_name,
      last_name
    FROM
      users
    WHERE
      id = ${userId}
  `;
  return user && camelcaseKeys(user);
}

// if using the username to to get the name from the url and save it to the database
// export async function getUserByName(firstName: string, lastName: string) {
//   if (!firstName || !lastName) return undefined;

//   const [user] = await sql<[User | undefined]>`
//     SELECT
//       id,
//       first_name
//       last_name
//     FROM
//       users
//     WHERE
//       first_name = ${firstName} AND
//       last_name = ${lastName}
//   `;
//   return user && camelcaseKeys(user);
// }

type Session = {
  id: number;
  token: string;
};

export async function createSession(
  token: string,
  userId: User['id'],
  csrfSecret: string,
) {
  const [session] = await sql<[Session]>`
  INSERT INTO sessions
    (token, user_id, csrf_secret)
  VALUES
    (${token}, ${userId} , ${csrfSecret})
  RETURNING
    id,
    token
  `;

  // await deleteExpiredSessions();

  return camelcaseKeys(session);
}

// returns one user of the current session
export async function getUserByValidSessionToken(token: string) {
  if (!token) return undefined;

  const [user] = await sql<[User | undefined]>`
  SELECT
    users.id,
    users.first_name,
    users.last_name,
    users.email
  FROM
    users,
    sessions
  WHERE
    sessions.token = ${token} AND
    sessions.user_id = users.id AND
    sessions.expiry_timestamp > now();
  `;

  return user && camelcaseKeys(user);
}

// only deletes the active device sessionToken
export async function deleteSessionByToken(token: string) {
  const [session] = await sql<[Session | undefined]>`
  DELETE FROM
    sessions
  WHERE
    sessions.token = ${token}
  RETURNING *
  `;

  return session && camelcaseKeys(session);
}

// multi session delete for all expired
export async function deleteExpiredSessions() {
  const sessions = await sql<[Session[]]>`
  DELETE FROM
    sessions
  WHERE
    expiry_timestamp < now()
  RETURNING *
  `;

  return sessions.map((session) => camelcaseKeys(session));
}

export type Video = {
  id: number;
  videoName: string;
  link: string;
  descriptionText: string;
};

export async function getAllVideos() {
  const videos = await sql<Video[]>`
    SELECT * FROM videos
  `;
  return videos.map((video) => camelcaseKeys(video));
}

export async function getVideo() {
  const [video] = await sql`
    SELECT * FROM videos

  `;
  return camelcaseKeys(video);
}

export async function getVideoById(id: number) {
  if (!id) return undefined;

  const [video] = await sql<[Video | undefined]>`
    SELECT id FROM videos
    WHERE id = ${id}

  `;
  return video && camelcaseKeys(video);
}

export async function getVideoByName(videoName: string) {
  if (!videoName) return undefined;

  const [video] = await sql<[Video | undefined]>`
    SELECT video_name, description_text, link FROM videos
    WHERE video_name = ${videoName}
  `;
  return video && camelcaseKeys(video);
}
