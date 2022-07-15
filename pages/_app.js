/** @jsxImportSource @emotion/react */
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
            font-family: 'DotGothic16', sans-serif;
            font-family: 'Public Sans', sans-serif;
            font-family: 'Rubik', sans-serif;
            padding: 0;
            margin: 0;
            background-color: #fbfbf6;
            box-sizing: border-box;
            color: #222;
          }
        `}
      />
      <Layout user={user}>
        <Component {...pageProps} refreshUserProfile={refreshUserProfile} />
      </Layout>
    </>
  );
}
