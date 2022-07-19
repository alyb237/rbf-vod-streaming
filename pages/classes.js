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

export default function Classes() {
  return (
    <>
      <Head>
        <title>Classes</title>
        <meta name="description" content="class description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main css={mainContentWrapper}>
        <p className="paragraphStyles">
          <strong>Classic Barre:</strong>
          <br />
          Based on my most practiced and taught class. It is a Pilates, Yoga
          fusion class with Ballet warm ups. We will cover the whole body, but
          the real attraction with Barre is the booty lifting with all it is
          tucking and pulsing micro movements.
          <br />
          <strong>Cardio:</strong>
          <br />
          Made to get the heart rate going but still keeping the exercises low
          impact on the joints. These are great for boosting energy by pumping
          fresh oxygen into the lungs and bloodstream. Mostly with out
          equipment.
          <br />
          <strong>Core:</strong>
          <br />
          Focusing on the abdominal area, obliques, and occasionally adding back
          extensions to strengthen the psoas muscle which plays a crucial role
          in safely developing core strength. A Pilates Ball is used frequently
          but modifications for those without one will always be offered.
          <br />
          <strong>Full Body:</strong>
          <br />
          We will cover the whole body, focusing on muscle toning and improving
          posture and flexibility. Props may or may not be used and if so
          modifications will be offered.
          <br />
          <strong>Themed:</strong>
          <br />
          From my collection of purchased music I have created playlist such as
          The Cramps, Kraftwerk, O.M.D., and 70's Dad Rock. There is also the
          Booty House DJ mix series! All playlist are accessible via SoundCloud.
        </p>
      </main>
    </>
  );
}
