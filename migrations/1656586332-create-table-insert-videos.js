const videos = [
  {
    video_name: 'Booty House Vol 1 - Mix by Tin Man',
    link: process.env.VIDEO_1,
    description_text:
      "First video in the Booty House music series. 30 minutes focused on booty and lower body workouts. DJ mix by Tin Man! See SoundCloud link for music. Ghetto house or booty house is a subgenre of house music which started being recognized as a distinct style from around 1992 onwards. It features minimal 808 and 909 drum machine-driven. Please don't take the lyrics too serious and just have fun!",
    thumbnail: 'booty-house-vol1.0000015.jpg',
  },
  {
    video_name: 'Booty House Vol. 2 - Mix by ROL:E',
    link: process.env.VIDEO_2,
    description_text:
      "Second video in the Booty House music series. 30 minutes focused on booty and lower body workouts. DJ mix by ROL:E from Funkroom! See SoundCloud link for music.Ghetto house or booty house is a subgenre of house music which started being recognized as a distinct style from around 1992 onwards. It features minimal 808 and 909 drum machine-driven. Please don't take the lyrics too serious and just have fun!",
    thumbnail: 'booty-house-vol2.0000014.jpg',
  },
  {
    video_name: 'Booty House Vol. 3 - Mix by Mister Bellini',
    link: process.env.VIDEO_3,
    description_text:
      "Third video in the Booty House music series. 30 minutes focused on booty and lower body workouts. DJ mix by Mister Bellini from Funkroom! See SoundCloud link for music.Ghetto house or booty house is a subgenre of house music which started being recognized as a distinct style from around 1992 onwards. It features minimal 808 and 909 drum machine-driven. Please don't take the lyrics too serious and just have fun!",
    thumbnail: 'booty-house-vol3.0000030.jpg',
  },

  // {
  //   video_name: '35 minutes Stretch - Kraftwerk',
  //   link: process.env.VIDEO_4,
  //   description_text:
  //     "This 35 minute stretching class takes inspiration from Kraftwerk's album The Man Machine.",
  //    thumbnail: '',
  //      ,
  // },

  {
    video_name: '30 minutes Full Body - The Cramps',
    link: process.env.VIDEO_5,
    description_text:
      'This 30 minutes class will target every large muscle group and also isolate muscles to generate deep muscular heat. Sweat with The Cramps!',
    thumbnail: '30-min-fullbody-thecramps.0000026.jpg',
  },

  {
    video_name: "30 minutes Full Body - 70's Dad Rock",
    link: process.env.VIDEO_6,
    description_text:
      "Get your leotard and long socks and get on the mat for this lengthening and strengthening class with some of the best 70's classic rock hits",
    thumbnail: '30-min-fullbody-dadrock.0000175.jpg',
  },
  {
    video_name: '30 minutes Standing Core - O.M.D',
    link: process.env.VIDEO_7,
    description_text:
      "This cardio based class focuses on low impact movements but still made to increase the heart rate. The core muscles are targeted with movements involving balance. Orchestral Manoeuvres in the Dark is one of the greatest bands from the 80's ",
    thumbnail: '30-min-core-omd.0000264.jpg',
  },
];

exports.up = async (sql) => {
  await sql`
    INSERT INTO videos ${sql(
      videos,
      'video_name',
      'link',
      'description_text',
      'thumbnail',
    )}
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
        description_text = ${video.description_text} AND
        thumbnail = ${video.thumbnail}

    `;
  }
};
