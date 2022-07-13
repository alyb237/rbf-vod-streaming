import Link from 'next/link';
import stripe from 'stripe';
import {
  createSubscription,
  getAllSubscriptions,
  getUserByValidSessionToken,
} from '../util/database';

export default function Success(props) {
  return (
    <section>
      <h1>Successful Transaction</h1>
      <div>
        <p>
          <span> Transaction total:</span> {'   '}€
          {props.session.amount_total / 100}
        </p>
        <p>
          <span> Customer email:</span> {'   '}
          {props.session.customer_details.email}
        </p>
        <p>
          <span> Payment status:</span> {'   '}
          {props.session.payment_status}
        </p>
      </div>
      <Link href="/">
        <a>home</a>
      </Link>
    </section>
  );
}

export async function getServerSideProps(ctx) {
  const stripeServer = stripe(process.env.STRIPE_SECRET_KEY);
  const { session_id: sessionId } = ctx.query;
  const session = await stripeServer.checkout.sessions.retrieve(sessionId);
  console.log('this is the session', session);
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
      console.log('insert into subscription table fails');
    });
    console.log('subscriptions from database', allSubscriptions);

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
