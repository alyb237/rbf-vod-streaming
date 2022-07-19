/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Link from 'next/link';

const headerStyles = css`
  display: flex;
  background-color: #fbfbf6;
  border-bottom: 2px solid #888;

  .divWrapper {
    width: 100%;
    .headerNameDiv {
      h3 {
        margin: auto;
        justify-content: flex-start;
        margin: 0;
        font-weight: 900;
        font-style: italic;
        font-size: x-large;
      }
    }
    ul {
      display: flex;
      justify-content: space-between;
      align-items: center;
      list-style: none;
      color: #222;
      text-decoration: none;
      a {
        margin: auto;
        font-weight: 400;
        text-decoration: none;
        color: #222;
        padding-left: 10px;
        padding-right: 10px;
      }
    }
  }
`;

export default function Header(props) {
  return (
    <header css={headerStyles}>
      <div className="divWrapper">
        <ul>
          <div className="headerNameDiv">
            <h3>Resonate Body Fitness</h3>
          </div>
          <div>
            <Link href="/" text-decoration="none">
              Home
            </Link>
            <Link href="/users/private-profile" text-decoration="none">
              Account
            </Link>
            <Link href="/videos/private-video" text-decoration="none">
              Browse
            </Link>
            {props.user && (
              <Link href="/users/private-profile">{props.user.firstName}</Link>
            )}
            {props.user ? (
              // using a instead of Link since we want to force a full refresh

              <Link href="/logout">Logout</Link>
            ) : (
              <>
                <Link href="/register">Register</Link>
                <Link href="/login">Login</Link>
              </>
            )}
          </div>
        </ul>
      </div>
    </header>
  );
}
