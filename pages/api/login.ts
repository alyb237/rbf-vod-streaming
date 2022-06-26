import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import { createSerializedRegisterSessionTokenCookie } from '../../util/cookies';
import {
  createSession,
  getUserByPasswordHashByEmail,
} from '../../util/database';

// response is an array of objects that contains the errors.
// response is an object with an errors property that contains an array of objects that contain a message
// user needs to be the object property that contains an array of object that contain an id
export type LoginResponseBody =
  | {
      errors: {
        message: string;
      }[];
    }
  | { user: { id: number } };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LoginResponseBody>,
) {
  // check input constraints **still needs to improve because only one message shows up per constraint **

  if (!req.body.email) {
    res.status(400).json({
      errors: [{ message: 'enter email' }],
    });
  } else if (!req.body.email && !req.body.password) {
    res.status(400).json({
      errors: [{ message: 'enter valid email & password' }],
    });
    return;
  }
  if (!req.body.password) {
    res.status(400).json({
      errors: [{ message: 'enter password' }],
    });
    return;
  }

  // **** need to add check for email but not sure if its a string always since there can be numbers ****
  // check the method to be post
  if (req.method === 'POST') {
    // check if email exist

    const userDoNotExposeHash = await getUserByPasswordHashByEmail(
      req.body.email,
    );

    if (!userDoNotExposeHash) {
      res
        .status(401)
        .json({ errors: [{ message: 'email or password does not match' }] });
      return;
    }
    // compare the passwords method from bcrypt
    const passwordMatches = await bcrypt.compare(
      req.body.password,
      userDoNotExposeHash.passwordHash,
    );
    // bcrpyt outputs true or false if it matches
    if (!passwordMatches) {
      res
        .status(401)
        .json({ errors: [{ message: 'email or password does not match' }] });
      return;
    }
    const userId = userDoNotExposeHash.id;
    // TODO create a session for the user
    // 1. get token
    const token = crypto.randomBytes(80).toString('base64');
    // 2. create a function to put token in database
    const session = await createSession(token, userId);
    // 3. get serialized cookie
    const serializedCookie = await createSerializedRegisterSessionTokenCookie(
      session.token,
    );

    // if you want to use username as identifier return the username too
    res
      .status(200)
      // Tells the browser to create the cookie for us
      .setHeader('set-Cookie', serializedCookie)
      .json({ user: { id: userId } });
  } else {
    res.status(405).json({ errors: [{ message: 'method not allowed' }] });
  }
}
