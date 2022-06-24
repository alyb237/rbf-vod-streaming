/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import Head from '../node_modules/next/head';

export default function Register() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function registerHandler() {
    const registeredResponse = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      // need to stringify the object
      body: JSON.stringify({
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
      }),
    });
    // save the response object into a variable
    const registerResponseBody = await registeredResponse.json();
    console.log('registerResponseBody', registerResponseBody);
    // checking the network dev tool in payload shows the created object
  }

  return (
    <div>
      <Head>
        <title>Register</title>
        <meta name="description" content="Register a new user" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Register</h1>

        <label>
          {' '}
          first name:
          <input
            value={firstname}
            onChange={(event) => setFirstname(event.currentTarget.value)}
          />
        </label>
        <label>
          {' '}
          last name:
          <input
            value={lastname}
            onChange={(event) => setLastname(event.currentTarget.value)}
          />
        </label>
        <label>
          {' '}
          email:
          <input
            value={email}
            onChange={(event) => setEmail(event.currentTarget.value)}
          />
        </label>
        <label>
          {' '}
          password:
          <input
            value={password}
            onChange={(event) => setPassword(event.currentTarget.value)}
          />
        </label>
        <button onClick={() => registerHandler()}>Register</button>
      </main>
    </div>
  );
}
