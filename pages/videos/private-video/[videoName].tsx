import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import ReactPlayer from 'react-player';
import { getVideoByName, Video } from '../../../util/database';
import { queryParamString } from '../../../util/queryParams';

type Props = {
  video?: Video;
};

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

      <main>
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
        <div>{props.video.descriptionText}</div>
      </main>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const videoNameFromUrl = queryParamString(context.query.videoName);
  // console.log(context.query);
  // console.log('name from url', videoNameFromUrl);

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
}
