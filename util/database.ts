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
