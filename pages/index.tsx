import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';

const mainContentWrapper = css`
  margin: 0%;
  padding: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const imgStyles = css`
  display: flex;
  .heroImgStyles {
    border-radius: 40px;
    margin-top: 40px;
    margin-top: 20px;
    align-items: center;
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
      <section css={mainContentWrapper}>
        <div css={imgStyles}>
          <Image
            className="heroImgStyles"
            src="/RBF_slogan.jpg"
            alt="hero slogan"
            width="11733"
            height="2945"
          />
        </div>
      </section>
    </>
  );
}
