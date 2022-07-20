import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import BannerStyles from '../components/BannerStyles';
import Classes from '../components/Classes';
import SignUp from '../components/SignUp';

const mainContentWrapper = css`
  margin: 0%;
  padding: 0;
  height: 100vh;
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

const mainSubscribeWrapper = css`
  height: 30vh;
  margin: 0%;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  /* border: 1px solid red; */
  background-color: #d1f3aa;
`;

const rainbowContainer = css`
  box-shadow: rgb(85, 91, 255) 0px 0px 0px 3px, rgb(31, 193, 27) 0px 0px 0px 6px,
    rgb(255, 217, 19) 0px 0px 0px 9px, rgb(255, 156, 85) 0px 0px 0px 12px,
    rgb(255, 85, 85) 0px 0px 0px 15px;
  border-radius: 4px;
  background-color: #fbfbf6;
  padding: 10px;

  .aTagLink {
    text-decoration: none;
    color: #222;
    font-weight: 600;
  }
`;

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Homepage" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <section css={mainContentWrapper}>
          <div className="imgWrapper">
            <Image
              className="imageContent"
              src="/imgHero.png"
              width={349}
              height={480}
              alt="profile intro"
            />
          </div>

          <p css={paragraphStyles}>
            Conscious <br />
            Movement <br />
            For Anyone
            <br />
            at Anytime
          </p>
        </section>
        <BannerStyles />
        <Classes />
        <SignUp />
      </div>
      <section css={mainSubscribeWrapper}>
        <div css={rainbowContainer}>
          <Link href="/subscribe">
            <a className="aTagLink">Subscribe and find out more!</a>
          </Link>
        </div>
      </section>
    </>
  );
}
