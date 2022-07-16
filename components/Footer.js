import { css } from '@emotion/react';
import { Link } from 'next/link';

const footerContentWrapper = css`
  background-color: #fbfbf6;
  border-top: 2px solid #888;

  .divFooterContentWrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;

    .ulLinkStyles {
      width: 100%;
      display: flex;
      justify-content: center;
      list-style: none;
      padding: 0px;
      margin: 0px;
      .headerNameDiv {
        margin: auto;
      }
      li {
        justify-content: center;
        align-items: center;
        margin: auto;
        padding: 0px;
      }
    }
  }
`;

export default function Footer() {
  return (
    <footer css={footerContentWrapper}>
      <div className="divFooterContentWrapper">
        <ul className="ulLinkStyles">
          <li>Contact</li>
          <div className="headerNameDiv">
            <h3>Made with 💝 and 💦 in Vienna, AU</h3>
          </div>

          <li>FAQ</li>
        </ul>
      </div>
    </footer>
  );
}
