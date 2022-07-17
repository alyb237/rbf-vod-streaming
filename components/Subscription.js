import { css } from '@emotion/react';
import Image from 'next/image';

const mainContentWrapper = css`
  display: flex;
  flex-direction: column;
  //justify-content: center;
  align-items: center;

  p {
    justify-content: center;
  }

  img {
    display: flex;
    /* justify-content: center; */
    align-items: center;
    height: auto;
    border-radius: 10px;
    max-width: 50%;

    .imgWrapper {
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }
`;

export default function Subscription(props) {
  return (
    <main css={mainContentWrapper}>
      <h1>Subscription Plan</h1>
      <p>
        This is a recurring monthly payment powered by Stripe. You will be
        redirected to the checkout page.
      </p>
      <p>
        <em>
          To view billing date please check your account. Email me to cancel!
        </em>
      </p>
      <div className="imgWrapper">
        <img
          alt="resonate body logo"
          src={props.image || '/RBF_logo_waves_white.jpg'}
        />
      </div>
    </main>
  );
}
