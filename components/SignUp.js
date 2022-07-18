import { css } from '@emotion/react';
import Image from 'next/image';
import { useRouter } from 'next/router';

const mainContentWrapper = css`
  margin: 0%;
  padding: 0;
  height: 60vh;
  display: flex;
  background-color: #222;
  justify-content: space-evenly;

  .imgWrapper {
    max-width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .imgContent {
      display: flex;
    }
  }
`;

const divParagraphStyles = css`
  max-width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  color: #fbfbf6;
  //border: 1px solid yellow;

  .headerStyles {
    flex-direction: column;
    justify-content: flex-start;
    font-size: 3.5rem;
    font-weight: 600;
    margin: 1em;
    margin-bottom: 0.5em;
    padding: 0;
    // border: 1px solid white;
  }
  .textStyles {
    align-items: center;
    font-size: 1.5vw;
    font-weight: 400;
    // border: 1px solid pink;
  }
  .buttonStyles {
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
    background: #fbfbf6;
    color: #222;
    box-shadow: 0 0 0 3px #ccaaf3 inset;
    :hover {
      transform: translateY(-2px);
    }
  }
`;

export default function SignUp() {
  const router = useRouter();
  return (
    <section css={mainContentWrapper}>
      <div className="imgWrapper">
        <Image
          className="imageContent"
          src="/laptop.png"
          width={415}
          height={281}
          alt="profile intro"
        />
      </div>
      <div css={divParagraphStyles}>
        <h4 className="headerStyles">Why RBF ?</h4>
        <p className="textStyles">
          This is a platform for anyone who needs a quick or full workout at
          anytime and any place. Work out from the privacy of your own home,
          with an experienced trainer, without feeling pressured to perform or
          be perfect. The main goal is to make people feel empowered by their
          own strength and body.
        </p>
        <button
          className="buttonStyles"
          onClick={() => {
            router.push('/about').catch(() => {});
          }}
        >
          About Me
        </button>
      </div>
    </section>
  );
}
