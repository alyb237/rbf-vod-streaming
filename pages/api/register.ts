import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import { createUser } from '../../util/database';

// response is an array of objects that contains the errors.
// response is an object with an errors property that contains an array of objects that contain a message
// user needs to be the object property that contains an array of object that contain an id
type RegisteredResponseBody =
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
  // check the method to be post
  if (req.method === 'POST') {
    // get the request body
    const user = req.body;
    // shows in the server terminal
    console.log(user);
    // get the name, email, password
    const firstName = user.firstname;
    const lastName = user.lastname;
    const email = user.email;

    // hast the password //
    const hashPassword = await bcrypt.hash(req.body.password, 12);
    // console.log(hashPassword);

    // create the user and store in database
    const newUser = await createUser(firstName, lastName, email, hashPassword);
    console.log('new user: ', newUser);

    // when we request we attach the body of data and get the data from there
    res.status(200).json({ user: { id: 1 } });
  } else {
    res.status(405).json({ errors: [{ message: 'method not allowed' }] });
  }
}
