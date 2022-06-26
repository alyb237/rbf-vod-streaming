import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { getUserById, User } from '../../util/database';

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
  const userIdFromUrl = context.query.userId;

  // if it exist and if it does not return empty array
  if (!userIdFromUrl || Array.isArray(userIdFromUrl)) {
    return { props: {} };
  }

  const userWithId = await getUserById(parseInt(userIdFromUrl));

  if (!userWithId) {
    context.res.statusCode = 404;
    return { props: {} };
  }

  return {
    props: {
      user: userWithId,
    },
  };
}
