import Link from 'next/link';
import stripe from 'stripe';
import { createSubscription } from '../util/database';

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

  if (session.payment_status === 'paid') {
    await createSubscription(
      session.status,
      session.expires_at,
      session.customer_details.name,
      session.customer_details.email,
      session.id,
    ).catch(() => {
      console.log('insert into subscription table fails');
    });

    // console.log('paid!');
    return {
      props: {
        session,
      },
    };
  }
  if (session.payment_status !== 'paid') {
    return {
      redirect: {
        destination: `/canceled`,
        permanent: false,
      },
    };
  }
}
