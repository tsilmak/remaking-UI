export interface MusicType {
  id: string;
  photoUrl: string;
  title: string;
  artists: Array<string>;
  duration: number;
  hasVideoClipe: boolean;
  hasLyrics: boolean;
  audioUrl: string;
}

export const musics: MusicType[] = [
  {
    id: "1",
    photoUrl:
      "https://i.scdn.co/image/ab67616d000048511d4675d5a0345bb93686e4b6",
    title: "My Life",
    artists: ["Billy Joel"],
    duration: 285,
    hasVideoClipe: true,
    hasLyrics: true,
    audioUrl: "/music/Billy Joel - My Life.mp3",
  },
  {
    id: "2",
    photoUrl:
      "https://i.scdn.co/image/ab67616d00004851dcbca161a7787a3fe0cb429c",
    title: "City of Tears",
    artists: ["Christopher Larkin, Amelia Jones"],
    duration: 178,
    hasVideoClipe: false,
    hasLyrics: false,
    audioUrl: "/music/City of Tears.mp3",
  },
  {
    id: "3",
    photoUrl:
      "https://i.scdn.co/image/ab67616d00004851baf75feff7c9a2c4ceaee87e",
    title: "Obstacles",
    artists: ["Syd Matters"],
    duration: 208,
    hasVideoClipe: false,
    hasLyrics: true,
    audioUrl: "/music/Syd Matters - Obstacles.mp3",
  },
];
