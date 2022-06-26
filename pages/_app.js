import { css, Global } from '@emotion/react';
import { useCallback, useEffect, useState } from 'react';
import Layout from '../components/Layout';

export default function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState();

  // useCallBack hook that receives a function and it stores it only once

  const refreshUserProfile = useCallback(async () => {
    const profileResponse = await fetch('/api/profile');

    const profileResponseBody = await profileResponse.json();

    if (!('errors' in profileResponseBody)) {
      setUser(profileResponseBody.user);
    } else {
      profileResponseBody.errors.forEach((error) => console.log(error.message));
      setUser(undefined);
    }
  }, []);

  useEffect(() => {
    refreshUserProfile().catch(() => console.log('fetch api failed'));
  }, [refreshUserProfile]);

  return (
    <>
      <Global
        styles={css`
          html,
          body {
            padding: 0;
            margin: 0;
            font-family: 'Quicksand', sans-serif;
            background-color: white;
            box-sizing: border-box;
            color: black;
          }
        `}
      />
      <Layout user={user}>
        <Component {...pageProps} refreshUserProfile={refreshUserProfile} />
      </Layout>
    </>
  );
}
