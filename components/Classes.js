import { css } from '@emotion/react';
import Image from 'next/image';

const mainContentWrapper = css`
  margin: 0%;

  padding: 0;
  height: 105vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
  /* border: 1px solid red; */
  background-color: #d1f3aa;

  .imgWrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* border: 2px solid green; */

    .imgContent {
      display: flex;
    }
  }
`;

const paragraphStyles = css`
  font-size: 7vw;
  font-weight: 600;
  margin: 20px;
  padding: 10px;
`;

export default function Classes() {
  return (
    <section css={mainContentWrapper}>
      <p css={paragraphStyles}>
        Barre
        <br /> Booty
        <br /> Cardio
        <br /> Full Body
        <br /> Stretch
      </p>
      <div className="imgWrapper">
        <Image
          className="imageContent"
          src="/img2Hero.png"
          width={349}
          height={480}
          alt="profile intro"
        />
      </div>
    </section>
  );
}
