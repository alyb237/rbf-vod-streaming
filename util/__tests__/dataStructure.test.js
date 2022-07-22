import { getReducedVideo } from '../dataStructure';

test('reduce videos with users', () => {
  const videoUser = [
    {
      id: 1,
      firstName: 'Jessica',
      lastName: 'Gomez',
      email: 'jessica@example.com',
      videoId: 1,
      titleName: 'Booty House Vol. 1',
    },
    {
      id: 2,
      firstName: 'Jessica',
      lastName: 'Gomez',
      email: 'jessica@example.com',
      videoId: 2,
      titleName: 'Booty House Vol. 2',
    },
  ];

  expect(getReducedVideo(videoUser)).toStrictEqual({
    id: 1,
    firstName: 'Jessica',
    lastName: 'Gomez',
    email: 'jessica@example.com',
    videos: [
      { id: 1, title: 'Booty House Vol. 1' },
      { id: 2, title: 'Booty House Vol. 2' },
    ],
  });
});
