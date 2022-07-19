/* eslint-disable react/iframe-missing-sandbox */

import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { getAllVideos, Video } from '../../../util/database';

const pageWrapper = css`
  background-color: #222;
`;

const mainContentDiv = css`
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  align-content: center;
  overflow: hidden;
  gap: 15px;

  .divGridBox {
    height: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    align-items: center;
    justify-content: center;
    gap: 40px;
    overflow: auto;
    margin: 2em;
    padding: 1em;
  }

  .divContentWrapper {
  }
`;

const videosListStyles = css`
  display: flex;
  box-shadow: rgb(85, 91, 255) 0px 0px 0px 3px, rgb(31, 193, 27) 0px 0px 0px 6px,
    rgb(255, 217, 19) 0px 0px 0px 9px, rgb(255, 156, 85) 0px 0px 0px 12px,
    rgb(255, 85, 85) 0px 0px 0px 15px;
  border-radius: 4px;
  flex-direction: column;
  justify-content: center;
  border-radius: 4px;
  max-height: 40vh;
  max-width: 100%;
  /* padding: 12px 16px; */

  /* margin: 2px;
  & + & {
    margin-top: 10px;
  } */
  .nameStyles {
    display: flex;
    justify-content: center;
    align-items: center;
    a {
      text-decoration: none;
      cursor: pointer;
      color: #fbfbf6;
      font-weight: 400;
    }
  }
`;

const soundcloudStyle = css`
  font-size: 10px;
  color: #928989;
  line-break: anywhere;
  word-break: normal;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-family: Interstate, Lucida Grande, Lucida Sans Unicode, Lucida Sans,
    Garuda, Verdana, Tahoma, sans-serif;
  font-weight: 100;

  a {
    color: #cccccc;
    text-decoration: none;
  }
`;

const headerWrapper = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    color: #222;
    margin: 0px;
  }
`;

const iframeWrapper = css`
  display: flex;
  flex-direction: column;
  padding: 2em;

  h3 > em {
    padding: 0%;
    margin: 0%;
    font-weight: 400;
    color: #fbfbf6;
    justify-content: center;
    align-items: center;
  }
`;

type Props = {
  videos: Video[];
};

export default function Browse(props: Props) {
  return (
    <div css={pageWrapper}>
      <Head>
        <title>Browse</title>
        <meta name="description" content="browse videos" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div css={headerWrapper}>
        <h1>Browse All</h1>
      </div>
      <main css={mainContentDiv}>
        <div className="divGridBox">
          {props.videos.map((video) => {
            return (
              <div className="divContentWrapper" key={`videos-${video.id}`}>
                <div css={videosListStyles}>
                  <Image src={`/${video.thumbnail}`} width={320} height={180} />

                  <div className="nameStyles">
                    <Link href={`private-video/${video.videoName}`}>
                      {video.videoName}
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <div css={iframeWrapper}>
        {/* <h3>
          <em>
            **Recommended to open SoundCloud on another tab in order to have
            volume control**
          </em>
        </h3> */}
        <iframe
          title="soundcloud"
          width="100%"
          height="450"
          scrolling="no"
          frameBorder="no"
          allow="autoplay"
          src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/1223454346%3Fsecret_token%3Ds-06vK4TUIxqc&color=%23a7e497&auto_play=false&hide_related=true&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"
        />

        <div css={soundcloudStyle}>
          <a href="https://soundcloud.com/ldyosc" title="LDY OSC">
            LDY OSC ©
          </a>{' '}
          ·{' '}
          <a href="https://soundcloud.com/ldyosc/sets/r-b-f" title="R.B.F.">
            R.B.F.
          </a>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const videos = await getAllVideos();
  console.log('videos', videos);

  return {
    props: {
      videos: videos,
    },
  };
}
