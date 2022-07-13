const videos = [
  {
    video_name: 'Booty House Vol 1 - Mix by Tin Man',
    link: 'https://d15kwqtkc455wm.cloudfront.net/booty-house-vol1.mp4',
    description_text:
      'First video in the Booty House music series. 30 minutes focused on glutes and lower body workouts. DJ mix by Tin Man! See SoundCloud link for music.',
  },
  {
    video_name: 'Booty House Vol. 2 - Mix by ROL:E',
    link: 'https://d15kwqtkc455wm.cloudfront.net/booty-house-vol2.mp4',
    description_text:
      'Second video in the Booty House music series. 30 minutes focused on glutes and lower body workouts. DJ mix by ROL:E from Funkroom! See SoundCloud link for music.',
  },
  {
    video_name: 'Booty House Vol. 3 - Mix by Mister Bellini',
    link: 'https://d15kwqtkc455wm.cloudfront.net/booty-house-vol3.mp4',
    description_text:
      'Third video in the Booty House music series. 30 minutes focused on glutes and lower body workouts. DJ mix by Mister Bellini from Funkroom! See SoundCloud link for music.',
  },

  {
    video_name: '35 minutes Stretch - Kraftwerk',
    link: 'https://d15kwqtkc455wm.cloudfront.net/35-min-stretch-kraftwerk.mp4',
    description_text:
      "This 35 minute stretching class takes inspiration from Kraftwerk's album The Man Machine.",
  },

  {
    video_name: '30 minutes Full Body - The Cramps',
    link: 'https://d15kwqtkc455wm.cloudfront.net/30-min-fullbody-thecramps.mp4',
    description_text:
      'This 30 minutes class will target every large muscle group and also isolate muscles to generate deep muscular heat. Sweat with The Cramps!',
  },

  {
    video_name: "30 minutes Full Body - 70's Dad Rock",
    link: 'https://d15kwqtkc455wm.cloudfront.net/30-min-fullbody-dadrock.mp4',
    description_text:
      "Get your leotard and long socks and get on the mat for this lengthening and strengthening class with some of the best 70's classic rock hits",
  },
  {
    video_name: '30 minutes Standing Core - O.M.D',
    link: 'https://d15kwqtkc455wm.cloudfront.net/30-min-core-omd.mp4',
    description_text:
      "This cardio based class focuses on low impact movements but still made to increase the heart rate. The core muscles are targeted with movements involving balance. Orchestral Manoeuvres in the Dark is one of the greatest bands from the 80's ",
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
