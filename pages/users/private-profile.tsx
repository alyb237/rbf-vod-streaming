import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import {
  getUserByValidSessionToken,
  getUserWithValidTokenAndSubscription,
  Subscription,
  User,
} from '../../util/database';

type Props = {
  user?: User;
  subscribedUser: Omit<Subscription, 'expiryTimestamp'> & {
    expirationDate: string;
  };
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
`;

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
      <main css={mainContentWrapper}>
        <div className="divContentWrapper">
          <h1>
            Account: {props.user.lastName},{props.user.firstName}
          </h1>

          <h3>Expiration Date: {props.subscribedUser.expirationDate}</h3>
          <p>
            Please email me at contact@resonatebody.com at least three days
            before your expiration date. I will then cancel your subscription
            from the Stripe dashboard. Thank you!{' '}
          </p>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const user = await getUserByValidSessionToken(
    context.req.cookies.sessionToken,
  );
  console.log('user', user);

  const subscribedUser = await getUserWithValidTokenAndSubscription(
    context.req.cookies.sessionToken,
  );
  console.log('subscribed user info from db', subscribedUser);

  if (user) {
    return {
      props: {
        user: user,
        subscribedUser: subscribedUser,
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
