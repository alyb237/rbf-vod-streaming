import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import { createUser, getUserByNameAndEmail } from '../../util/database';

// response is an array of objects that contains the errors.
// response is an object with an errors property that contains an array of objects that contain a message
// user needs to be the object property that contains an array of object that contain an id
export type RegisteredResponseBody =
  | {
      errors: {
        message: string;
      }[];
    }
  | { user: { id: number } };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RegisteredResponseBody>,
) {
  // check input constraints **still needs to improve because only one message shows up per constraint **
  if (
    typeof req.body.firstname !== 'string' ||
    typeof req.body.lastname !== 'string' ||
    !req.body.firstname ||
    !req.body.lastname
  ) {
    res.status(400).json({
      errors: [{ message: 'enter a valid alphabetic first and last name' }],
    });
    return;
  }
  if (!req.body.email) {
    res.status(400).json({
      errors: [{ message: 'enter email' }],
    });
  } else if (!req.body.email && !req.body.password) {
    res.status(400).json({
      errors: [{ message: 'enter valid email & password' }],
    });
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
    // check if user exist
    if (
      await getUserByNameAndEmail(
        req.body.firstname,
        req.body.lastname,
        req.body.email,
      )
    ) {
      res.status(401).json({ errors: [{ message: 'user already exist' }] });
      return;
    }
    // get the request body
    const user = req.body;
    // shows in the server terminal
    console.log(user);
    // get the name, email, password
    // user.firstname stays in lowercase
    const firstName = user.firstname;
    const lastName = user.lastname;
    const email = user.email;

    // hast the password //
    const hashPassword = await bcrypt.hash(req.body.password, 12);
    // console.log(hashPassword);

    // create the user and store in database
    // type is coming from User which was created in the database
    const newUser = await createUser(firstName, lastName, email, hashPassword);
    console.log('new user: ', newUser);

    // when we request we attach the body of data and get the data from there
    res.status(200).json({ user: { id: newUser.id } });
  } else {
    res.status(405).json({ errors: [{ message: 'method not allowed' }] });
  }
}
