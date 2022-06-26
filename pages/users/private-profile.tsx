// import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { getUserByValidSessionToken, User } from '../../util/database';

type Props = {
  user?: User;
};

export default function Profile(props: Props) {
  if (!props.user) {
    return (
      <>
        <Head>
          <title>User not found</title>
          <meta name="description" content="User not found" />
        </Head>
        <h1>404 - User not found 😞 </h1>
      </>
    );
  }
  return (
    <>
      <Head>
        <title>
          {props.user.firstName} {props.user.lastName}
        </title>
        <meta name="description" content="Profile" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <main>
          <h1>
            User #{props.user.id} (Name: {props.user.firstName}
            {props.user.lastName})
          </h1>
        </main>
      </main>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // context, request, cookies, name of cookie
  // console.log('session token: ', context.req.cookies.sessionToken);
  const user = await getUserByValidSessionToken(
    context.req.cookies.sessionToken,
  );
  if (user) {
    return {
      props: {
        user: user,
      },
    };
  }
  // if user with session token redirect to private profile once logged in
  return {
    redirect: {
      destination: `/login?returnTo=/users/private-profile`,
      permanent: false,
    },
  };
}
