/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Link from 'next/link';

const headerStyles = css`
  display: flex;
  justify-content: space-between;
  background-color: black;
  padding-top: 1px;
  flex-direction: column;

  .divWrapper {
    display: flex;
    justify-content: space-between;
  }
  ul {
    list-style: none;
    display: flex;
    color: black;
    justify-content: space-between;
    gap: 4px;
    text-decoration: none;
    margin-right: 10px;
  }

  a {
    text-decoration: none;
    color: white;
    padding: 5px;
    color: #99f442;
  }
  .imgStyles {
    cursor: pointer;
  }
`;

export default function Header() {
  return (
    <header css={headerStyles}>
      <div className="divWrapper">
        <img
          className="imgStyles"
          src="logo.png"
          alt="temporary logo"
          width="70"
        />
        <ul>
          <Link href="/" text-decoration="none">
            Home
          </Link>

          <Link href="/register" text-decoration="none">
            Register
          </Link>

          <Link href="/login" text-decoration="none">
            Login
          </Link>

          <Link href="/register" text-decoration="none">
            Logout
          </Link>
        </ul>
      </div>
    </header>
  );
}
