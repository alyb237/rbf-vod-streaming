import { css } from '@emotion/react';
/** @jsxImportSource @emotion/react */
import { useRouter } from 'next/router';
import { useState } from 'react';
import Head from '../node_modules/next/head';
import { LoginResponseBody } from './api/login';

type Props = {
  refreshUserProfile: () => Promise<void>;
};

const mainContentWrapper = css`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .divContentWrapper {
    margin: auto;
    justify-content: center;
    align-items: center;
    max-width: 45%;
    padding: 20px;
    box-shadow: blue 0px 0px 0px 2px inset,
      rgb(255, 255, 255) 10px -10px 0px -3px, rgb(31, 193, 27) 10px -10px,
      rgb(255, 255, 255) 20px -20px 0px -3px, rgb(255, 217, 19) 20px -20px,
      rgb(255, 255, 255) 30px -30px 0px -3px, rgb(255, 156, 85) 30px -30px,
      rgb(255, 255, 255) 40px -40px 0px -3px, rgb(255, 85, 85) 40px -40px;
  }

  .inputStyles {
    margin: 10px;
  }

  a {
    text-decoration: none;
    color: limegreen;
  }

  button {
    display: flex;
    align-items: center;
    margin: 15px auto;
    outline: 0;
    appearance: none;
    padding: 0px 12px;
    border-radius: 4px;
    text-decoration: none;
    cursor: pointer;
    background-color: rgb(249, 251, 250);
    border: 1px solid rgb(137, 151, 155);
    box-shadow: rgb(6 22 33 / 30%) 0px 1px 2px;
    color: rgb(61, 79, 88);
    font-size: 14px;
    font-weight: 400;
    height: 36px;
    transition: all 150ms ease-in-out 0s;
    :hover {
      color: rgb(61, 79, 88);
      background-color: rgb(255, 255, 255);
      border: 1px solid rgb(93, 108, 116);
      box-shadow: rgb(0 0 0 / 30%) 0px 4px 4px, rgb(231 238 236) 0px 0px 0px 3px;
    }
  }
`;

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

      <main css={mainContentWrapper}>
        <div className="divContentWrapper">
          <h1>Login</h1>
          <label>
            {' '}
            email:
            <input
              className="inputStyles"
              placeholder="example@email.com"
              value={email}
              onChange={(event) => setEmail(event.currentTarget.value)}
              maxLength={20}
            />
          </label>
          <br />
          <label>
            {' '}
            password:
            <input
              className="inputStyles"
              placeholder="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.currentTarget.value)}
              maxLength={10}
            />
          </label>
          <br />
          <button onClick={() => loginHandler()}>Login</button>
          {errors.map((error) => (
            <div key={`error-${error.message}`}>{error.message}</div>
          ))}
          <br />
          <br />
          <div>
            Don't have an account? <a href="\register">Register</a>
          </div>
        </div>
      </main>
    </div>
  );
}
