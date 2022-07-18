import { css } from '@emotion/react';
import { loadStripe } from '@stripe/stripe-js';
import stripe from 'stripe';
import Subscription from '../components/Subscription';

const mainContentWrapper = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
`;

const divContentWrapper = css`
  justify-content: center;
  max-width: 45%;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  .imgWrapper {
    //border: 2px solid purple;
    padding: 10px;
    //width: 40vw;
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
`;

export default function Subscribe(props) {
  async function handlePurchase(quantity, mode, priceId) {
    // 1. connect with stripe
    // auth with stripe client
    const stripeClient = await loadStripe(props.publicKey);

    // 2. Send order information
    const response = await fetch('/api/session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        quantity: quantity,
        mode: mode,
        priceId: priceId,
      }),
    });

    const { session } = await response.json();

    //
    //

    // 2. Redirect customer to url from Checkout session
    stripeClient.redirectToCheckout({ sessionId: session.id }).catch(() => {
      console.log('redirect fails');
    });
  }

  return (
    <main css={mainContentWrapper}>
      <div css={divContentWrapper}>
        <div className="imgWrapper">
          <Subscription image={props.productPrices[0].image} />
        </div>
        <button
          className="buttonStyles"
          onClick={() =>
            handlePurchase(1, 'subscription', props.productPrices[0].priceId)
          }
        >
          Subscribe for €{props.productPrices[0].amount}
        </button>
      </div>
    </main>
  );
}

export async function getServerSideProps() {
  // 1. connect with stripe
  // auth with stripe server

  const stripeServer = stripe(process.env.STRIPE_SECRET_KEY);

  // 2. Get price from PRICE env variable
  const price2 = await stripeServer.prices.retrieve(process.env.PRICE2);
  const subscription = await stripeServer.products.retrieve(price2.product);

  // 3. send props to the frontend
  return {
    props: {
      publicKey: process.env.STRIPE_PUBLISHABLE_KEY,
      productPrices: [
        {
          priceId: process.env.PRICE2,
          amount: price2.unit_amount / 100,
          image: subscription.images[0],
        },
      ],
    },
  };
}
