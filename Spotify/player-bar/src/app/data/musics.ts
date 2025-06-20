export interface MusicType {
  id: string;
  photoUrl: string;
  title: string;
  artist: string;
  duration: string;
  hasVideoClipe: boolean;
  url: string;
}

export const musics: MusicType[] = [
  {
    id: "1",
    photoUrl:
      "https://i.scdn.co/image/ab67616d000048516ce61113662ecf693b605ee5",
    title: "Song Title 1",
    artist: "Artist Name 1",
    duration: "3:45",
    hasVideoClipe: false,
    url: "https://open.spotify.com/track/1",
  },
  {
    id: "2",
    photoUrl:
      "https://i.scdn.co/image/ab67616d000048514ce8b4e42588bf18182a1ad2",
    title: "Song Title 2",
    artist: "Artist Name 2",
    duration: "4:20",
    hasVideoClipe: false,
    url: "https://open.spotify.com/track/2",
  },
  {
    id: "3",
    photoUrl:
      "https://i.scdn.co/image/ab67616d000048511d4675d5a0345bb93686e4b6",
    title: "My Life",
    artist: "Billy Joel",
    duration: "4:44",
    hasVideoClipe: true,
    url: "https://open.spotify.com/track/2",
  },
  // Add more music objects as needed
];
