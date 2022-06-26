/** @jsxImportSource @emotion/react */
import { useRouter } from 'next/router';
import { useState } from 'react';
import Head from '../node_modules/next/head';
import { RegisteredResponseBody } from './api/register';

export default function Register() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<
    {
      message: string;
    }[]
  >([]);

  const router = useRouter();
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
    const registeredResponseBody: RegisteredResponseBody =
      await registeredResponse.json();
    console.log('registerResponseBody', registeredResponseBody);
    // checking the network dev tool in payload shows the created object

    // if we have an error ( errors is an array of objects and sends a message, there can be multiple errors)
    if ('errors' in registeredResponseBody) {
      setErrors(registeredResponseBody.errors);
    } else {
      // redirect user to home if there is an error
      await router.push(`/users/${registeredResponseBody.user.id}`);
    }
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
        {errors.map((error) => (
          <div key={`error-${error.message}`}>{error.message}</div>
        ))}
      </main>
    </div>
  );
}
