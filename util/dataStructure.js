export function getReducedVideo(videoUsers) {
  const videoUser = {
    id: videoUsers[0].id,
    firstName: videoUsers[0].firstName,
    lastName: videoUsers[0].lastName,
    email: videoUsers[0].email,
    videos: videoUsers.map((video) => {
      return {
        id: video.videoId,
        title: video.titleName,
      };
    }),
  };
  return videoUser;
}
