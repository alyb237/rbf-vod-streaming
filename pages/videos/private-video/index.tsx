import { css } from '@emotion/react';
// import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
// import ReactPlayer from 'react-player';
import { getAllVideos, Video } from '../../../util/database';

const mainContentDiv = css`
  height: 110vh;
`;

const videosListStyles = css`
  display: flex;
  border: 2px solid black;
  justify-content: center;
  border-radius: 4px;
  padding: 12px 16px;

  margin: 2px;
  & + & {
    margin-top: 10px;
  }
`;

type Props = {
  videos: Video[];
};

export default function Browse(props: Props) {
  return (
    <div>
      <Head>
        <title>Browse</title>
        <meta name="description" content="browse videos" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Browse</h1>
      <div css={mainContentDiv}>
        {props.videos.map((video) => {
          return (
            <div key={`videos-${video.id}`}>
              <div css={videosListStyles}>
                <div>
                  Name:{' '}
                  <Link href={`private-video/${video.videoName}`}>
                    {video.videoName}
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      \{' '}
    </div>
  );
}

export async function getServerSideProps() {
  const videos = await getAllVideos();
  // console.log('checking videos ', videos);
  // console.log('checking to see what is in dB', videos);

  // check to see if user is logged in and if not redirect to login page or subscribe
  // const user = await getUserByValidSessionToken(
  //   context.req.cookies.sessionToken,
  // );
  // console.log('user', user);

  // const subscribedUser = await getUserWithValidTokenAndSubscription(
  //   context.req.cookies.sessionToken,
  // );
  // console.log('subscribed user', subscribedUser);

  return {
    props: {
      videos: videos,
    },
  };

  // return {
  //   redirect: {
  //     destination: `/login?returnTo=/videos/private-video`,
  //     permanent: false,
  //   },
  // };
}
