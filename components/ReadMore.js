import { css } from '@emotion/react';
import Link from 'next/link';

const mainContentWrapper = css`
  height: 35vh;
  margin: 0%;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  /* border: 1px solid red; */
  background-color: #d1f3aa;
`;

const listContainer = css`
  box-shadow: rgb(85, 91, 255) 0px 0px 0px 3px, rgb(31, 193, 27) 0px 0px 0px 6px,
    rgb(255, 217, 19) 0px 0px 0px 9px, rgb(255, 156, 85) 0px 0px 0px 12px,
    rgb(255, 85, 85) 0px 0px 0px 15px;
  border-radius: 4px;
  background-color: #fbfbf6;
  padding: 10px;
`;

export default function ReadMore() {
  return (
    <section css={mainContentWrapper}>
      <div css={listContainer}>
        <Link href="/pages/subscribe">Subscribe</Link>
      </div>
    </section>
  );
}
