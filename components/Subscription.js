import { css } from '@emotion/react';
import Image from 'next/image';

const imageDiv = css`
  img {
    height: auto;
    max-width: 50%;
  }
`;

export default function Subscription(props) {
  return (
    <>
      <h1>Subscription Plan</h1>
      <p>This is a recurring payment, email me to cancel anytime!</p>
      <div css={imageDiv}>
        <img
          alt="resonate body logo"
          src={props.image || '/RBF_logo_waves_white.jpg'}
        />
      </div>
    </>
  );
}
