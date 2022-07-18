import { css } from '@emotion/react';
import Image from 'next/image';
import { useRouter } from 'next/router';

const mainContentWrapper = css`
  margin: 0%;

  padding: 0;
  height: 100vh;
  justify-content: space-around;
  align-items: center;
  display: flex;
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

const buttonWrapper = css`
  padding: 1em;
`;

const buttonStyle = css`
  display: inline-block;
  outline: 0;
  border: 0;
  cursor: pointer;
  border-radius: 8px;
  padding: 14px 24px 16px;
  font-size: 18px;
  font-weight: 700;
  line-height: 1;
  transition: transform 200ms, ease-in 100ms;
  background: #f3ccaa;
  color: #222;
  box-shadow: 0 0 0 3px #222 inset;
  :hover {
    transform: translateY(-2px);
  }
`;

const paragraphStyles = css`
  font-size: 7vw;
  font-weight: 600;
  margin: 20px;
  padding: 10px;
`;

export default function Classes() {
  const router = useRouter();
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
        <div css={buttonWrapper}>
          <button
            onClick={() => {
              router.push('/classes').catch(() => {});
            }}
            css={buttonStyle}
          >
            Classes
          </button>
        </div>
      </div>
    </section>
  );
}
