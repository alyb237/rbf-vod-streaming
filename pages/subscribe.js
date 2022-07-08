import { loadStripe } from '@stripe/stripe-js';
// import { useState } from 'react';
import stripe from 'stripe';
import Subscription from '../components/Subscription';

export default function Subscribe(props) {
  // use state variable for updating the the subscribed database

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

    // 2. Redirect customer to url from Checkout session
    stripeClient.redirectToCheckout({ sessionId: session.id }).catch(() => {
      console.log('redirect fails');
    });
  }

  return (
    <div>
      <div>
        <Subscription image={props.productPrices[0].image} />
        <button
          onClick={() =>
            handlePurchase(1, 'subscription', props.productPrices[0].priceId)
          }
        >
          Buy for $ {props.productPrices[0].amount}
        </button>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  // 1. connect with stripe
  // auth with stripe server

  const stripeServer = stripe(process.env.STRIPE_SECRET_KEY);

  // 2. Get price from PRICE env variable
  const price2 = await stripeServer.prices.retrieve(process.env.PRICE2);
  const subscription = await stripeServer.products.retrieve(price2.product);
  console.log(price2);
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
