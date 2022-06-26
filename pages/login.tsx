import { useRouter } from 'next/router';
/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { isPropertySignature } from 'typescript';
import Head from '../node_modules/next/head';
import { LoginResponseBody } from './api/login';

type Props = {
  refreshUserProfile: () => Promise<void>;
};

export default function Login(props: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<
    {
      message: string;
    }[]
  >([]);

  const router = useRouter();
  async function loginHandler() {
    const registeredResponse = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      // need to stringify the object
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    // save the response object into a variable
    const loginResponseBody: LoginResponseBody =
      await registeredResponse.json();
    // console.log('registerResponseBody', loginResponseBody);

    if ('errors' in loginResponseBody) {
      setErrors(loginResponseBody.errors);
      return;
    }

    // return to last place when login was desired
    // if they clicked about but was not logged in it will go back to about when logged in
    const returnTo = router.query.returnTo;
    // checking regular expression - match strings
    if (
      returnTo &&
      !Array.isArray(returnTo) &&
      // Security: Validate returnTo parameter against valid path
      // (because this is untrusted user input)
      /^\/[a-zA-Z0-9-?=/]*$/.test(returnTo)
    ) {
      await props.refreshUserProfile();
      await router.push(returnTo);
    } else {
      // await router.push(`/users/${loginResponseBody.user.id}`);
      await props.refreshUserProfile();
      await router.push(`/`);
    }
  }

  return (
    <div>
      <Head>
        <title>Login</title>
        <meta name="description" content="Login an existing user" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Login</h1>
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
        <button onClick={() => loginHandler()}>Login</button>
        {errors.map((error) => (
          <div key={`error-${error.message}`}>{error.message}</div>
        ))}
      </main>
    </div>
  );
}
