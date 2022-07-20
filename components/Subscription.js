import { css } from '@emotion/react';

const mainContentWrapper = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .textWrapper {
  }

  img {
    display: flex;
    /* justify-content: center; */
    align-items: center;
    height: auto;
    border-radius: 10px;
    max-width: 25%;
    margin: auto;

    .imgWrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      /* justify-content: center; */
    }
  }
`;

export default function Subscription(props) {
  return (
    <main css={mainContentWrapper}>
      <h1>Subscription Plan</h1>
      <p>
        <em>
          This is a recurring monthly payment powered by Stripe. You will be
          redirected to the checkout page. To view billing date check your
          account. When you're ready to cancel please email me.
        </em>
      </p>

      <div className="imgWrapper">
        <img alt="resonate body logo" src="/RBF_logo_waves_white.jpg" />
      </div>
    </main>
  );
}
