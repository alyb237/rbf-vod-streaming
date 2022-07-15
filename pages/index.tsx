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

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Homepage" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
          Body Fluid
          <br /> Conscious
          <br /> Movement
        </p>
      </section>
      <BannerStyles />
      <Classes />
      <SignUp />
      <Link href="/subscribe">Subscribe</Link>
    </>
  );
}
