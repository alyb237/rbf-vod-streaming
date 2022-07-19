import { css } from '@emotion/react';
import Link from 'next/link';
import Head from '../node_modules/next/head';

const mainContentWrapper = css`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-color: #d1f3aa;
  .paragraphStyles {
    border-radius: 10px;
    background-color: #fbfbf6;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    width: 20%;
    padding: 20px;
    line-height: 2;

    a {
      text-decoration: underline;
      color: #222;
    }
  }
`;

export default function Contact() {
  return (
    <>
      <Head>
        <title>contact</title>
        <meta name="description" content="questions and answers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main css={mainContentWrapper}>
        <p className="paragraphStyles">
          Alyssa C. Auvinen Barrera
          <br />
          contact@resonatebody.com
          <br />
          <Link href="https://www.instagram.com/resonate_body/">
            @resonate_body
          </Link>
        </p>
      </main>
    </>
  );
}
