import { css } from '@emotion/react';
import Image from 'next/image';

const mainContentWrapper = css`
  margin: 0%;
  padding: 0;
  height: 100vh;
  display: flex;
  background-color: #222;

  /* .imgWrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .imgContent {
      display: flex;
    }
  } */
`;

const paragraphStyles = css`
  display: flex;
  justify-content: center;
  align-content: center;
  width: 100%;
  height: 10vh;
  color: #d1f3aa;
  font-size: 5vw;
  font-weight: 600;
  /* margin: 20px;
  padding: 10px; */
  border: 1px solid white;
  p {
    margin: 0;
    padding: 0;
  }
`;

export default function SignUp() {
  return (
    <section css={mainContentWrapper}>
      <p css={paragraphStyles}>How does it work?</p>
      <div className="imgWrapper">
        {/* <Image
          className="imageContent"
          src="/img2Hero.png"
          width={349}
          height={480}
          alt="profile intro"
        /> */}
      </div>
    </section>
  );
}
