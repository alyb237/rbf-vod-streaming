import { css } from '@emotion/react';
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
    width: 70%;
    padding: 20px;
    line-height: 1.5;
    p {
      line-height: 0.8;
    }
  }
`;

export default function Faq() {
  return (
    <>
      <Head>
        <title>FAQ</title>
        <meta name="description" content="questions and answers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main css={mainContentWrapper}>
        <p className="paragraphStyles">
          <strong>Is this safe for pre or post natal:</strong>
          <br />
          Most of the classes are safe but you'll need to wait at least six
          weeks and for clearance from your doctor before any strenuous
          exercise, but you can start with gentle deep core engagement and
          breathing exercises soon after birth, which will help with
          recovery.After 6 weeks post natal, you can start doing basic and
          gentle exercises provided you had a normal, vaginal delivery. If you
          had a caesarean section, you need to wait 5 to 6 months before
          starting doing exercise such as Pilates and Barre.
          <br />
          <strong>Are there modifications for certain injuries ? </strong>
          <br />
          Yes, but because it is prerecorded I can not modify every move
          depending on the body part. Please always be aware to use extra
          support under knees, and for sensitive wrists you may try going onto
          your forearms. If you have any concerns please email me and I can
          offer you modifications.
          <br />
          <strong>How does payment work and is it safe?</strong>
          <br />
          All payments are managed by Stripe and that makes it as safe as
          possible.
          <br />
          <strong>How can I cancel my subscription</strong>
          <br />
          Email me at least 3 days before the subscription renewal date in order
          to make sure that the cancelation goes through. I will do this
          manually from Stripe's dashboard. contact@resonatebody.com
          <br />
          <strong>Are you certified? </strong>
          <br />
          Yes, please refer to the About Me page for more details.
          <br />
        </p>
      </main>
    </>
  );
}
