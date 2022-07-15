import { css } from '@emotion/react';
import Marquee from 'react-fast-marquee';

const marqueeStyles = css`
  width: 100%;
  color: #fff;
  margin-top: 0;
  overflow: hidden;
  padding: 15px 30px;
  background-color: #222;
  &:first-child {
    margin-top: 0;
  }

  .text {
    margin: 0 25px;
    font-size: 44px;
    white-space: nowrap;
  }
`;

export default function BannerStyles() {
  return (
    <section css={marqueeStyles}>
      {/* <Marquee behavior="scroll" direction="left" speed="8">
        Let's Sweat! 💦{' '}
      </Marquee> */}
      <Marquee speed="80" gradient={false} direction="left">
        <div className="text"> Let's Sweat! 💦 </div>
        <div className="text"> Online! 💪🏽 </div>
        <div className="text"> On Demand! 🍑 </div>
        <div className="text"> Anytime! 🌈 </div>
      </Marquee>
    </section>
  );
}
