import { Head, Html, Main, NextScript } from 'next/document';

// add closing tags for links and camelCase crossOrigin

export default function MyDocument() {
  return (
    <Html>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=DotGothic16&family=Public+Sans:wght@100&family=Rubik:ital,wght@0,400;0,800;1,400;1,900&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <body>
        <meta
          name="viewport"
          content="width=device-width"
          initial-scale="1.0"
        />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
