const videos = [
  {
    video_name: 'Booty House Vol. 1',
    link: 'https://d15kwqtkc455wm.cloudfront.net/booty_house_vol._1%20(720p).mp4',
    description_text:
      'First video in the Booty House music series. 30 minutes focused on glutes and lower body workouts. DJ mix by Tin Man! See SoundCloud link for music.',
  },
  {
    video_name: 'Booty House Vol. 2',
    link: 'https://d15kwqtkc455wm.cloudfront.net/booty_house_vol.2%20(720p).mp4',
    description_text:
      'Second video in the Booty House music series. 30 minutes focused on glutes and lower body workouts. DJ mix by ROL:E from Funkroom! See SoundCloud link for music.',
  },
  {
    video_name: 'Booty House Vol. 3',
    link: 'https://d15kwqtkc455wm.cloudfront.net/booty_house_vol._3%20(720p).mp4',
    description_text:
      'Third video in the Booty House music series. 30 minutes focused on glutes and lower body workouts. DJ mix by Mister Bellini from Funkroom! See SoundCloud link for music.',
  },
];

exports.up = async (sql) => {
  await sql`
    INSERT INTO videos ${sql(videos, 'video_name', 'link', 'description_text')}
  `;
};

exports.down = async (sql) => {
  for (const video of videos) {
    await sql`
      DELETE FROM
        videos
      WHERE
        video_name = ${video.video_name} AND
        link = ${video.link} AND
        description_text = ${video.description_text}

    `;
  }
};
