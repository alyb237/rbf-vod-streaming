import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import ReactPlayer from 'react-player';
import {
  getSubscriptionStatus,
  getUserByValidSessionToken,
  getVideoByName,
  Video,
} from '../../../util/database';
import { queryParamString } from '../../../util/queryParams';

type Props = {
  video?: Video;
};

const mainContentWrapper = css`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-color: #222;

  .paragraphStyles {
    width: 50%;
    align-content: center;
    color: #fbfbf6;
  }
`;

export default function VideoName(props: Props) {
  if (!props.video) {
    return (
      <>
        <Head>
          <title>Video not found</title>
          <meta name="description" content="Video found" />
        </Head>
        <h1>404 - Video not found</h1>
      </>
    );
  }

  return (
    <div>
      <Head>
        <title>{props.video.videoName}</title>
        <meta name="description" content="About the app" />
      </Head>

      <main css={mainContentWrapper}>
        <ReactPlayer
          url={props.video.link}
          controls={true}
          config={{
            file: {
              attributes: {
                onContextMenu: (e: any) => e.preventDefault(),
                controlsList: 'nodownload',
              },
            },
          }}
        />
        <br />
        <div className="paragraphStyles">{props.video.descriptionText}</div>
      </main>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const videoNameFromUrl = queryParamString(context.query.videoName);

  // get current logged in user
  const user = await getUserByValidSessionToken(
    context.req.cookies.sessionToken,
  );

  // get subscription table and check for valid payment_status

  if (!user) {
    console.log('please register or login');
    return {
      redirect: {
        destination: `/login`,
        permanent: false,
      },
    };
  }
  const status = await getSubscriptionStatus(user.id);

  if (status === 'paid') {
    if (!videoNameFromUrl || Array.isArray(videoNameFromUrl)) {
      return { props: {} };
    }

    const video = await getVideoByName(videoNameFromUrl);
    if (!video) {
      context.res.statusCode = 404;
    }

    return {
      props: {
        video: video,
      },
    };
  } else {
    return {
      redirect: {
        destination: `/subscribe?returnTo=/videos/private-video/`,
        permanent: false,
      },
    };
  }
}
