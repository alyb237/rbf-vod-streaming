import { css } from '@emotion/react';
import stripe from 'stripe';
import Head from '../node_modules/next/head';
import {
  createSubscription,
  getAllSubscriptions,
  getUserByValidSessionToken,
} from '../util/database';

const mainContentWrapper = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;

  .divContentWrapper {
    justify-content: center;
    max-width: 45%;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    padding: 20px;
  }

  button {
    display: flex;
    margin: 15px auto;
    outline: 0;
    border: 0;
    cursor: pointer;
    border-radius: 8px;
    padding: 7px 12px 8px;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1;
    transition: transform 200ms, ease-in 100ms;
    background: #fbfbf6;
    color: #222;
    box-shadow: 0 0 0 3px #ccaaf3 inset;
    :hover {
      transform: translateY(-2px);
    }
  }

  p {
    display: flex;
    justify-content: center;
  }
`;

export default function Success(props) {
  return (
    <>
      <Head>
        <title>Success</title>
        <meta name="description" content="successful payment page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section css={mainContentWrapper}>
        <div className="divContentWrapper">
          <h1>Successful Transaction</h1>
          <p>
            <span> Transaction total:{'  '} </span> {'   '} €
            {props.session.amount_total / 100}
          </p>
          <p>
            <span> Customer email: </span> {'   '}
            {props.session.customer_details.email}
          </p>
          <p>
            <span> Payment status: </span> {'   '}
            {props.session.payment_status}
          </p>
        </div>
      </section>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const stripeServer = stripe(process.env.STRIPE_SECRET_KEY);
  const { session_id: sessionId } = ctx.query;
  const session = await stripeServer.checkout.sessions.retrieve(sessionId);

  const allSubscriptions = await getAllSubscriptions();

  const user = await getUserByValidSessionToken(ctx.req.cookies.sessionToken);

  const idFoundInDbAndSession = allSubscriptions.find(
    (singleIdFromDb) => session.id === singleIdFromDb.checkoutId,
  );
  // console.log('checking for no match - want undefined', idFoundInDbAndSession);
  if (
    idFoundInDbAndSession === undefined &&
    session.payment_status === 'paid'
  ) {
    await createSubscription(
      session.payment_status,
      session.customer_details.name,
      session.customer_details.email,
      session.id,
      user.id,
    ).catch(() => {
      console.log('insert into subscription');
    });

    return {
      props: {
        session,
      },
    };
  } else {
    return {
      redirect: {
        destination: `/canceled`,
        permanent: false,
      },
    };
  }
}
