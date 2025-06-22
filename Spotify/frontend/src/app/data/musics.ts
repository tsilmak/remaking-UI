export interface MusicType {
  id: string;
  photoUrl: string;
  title: string;
  artists: Array<string>;
  duration: number;
  hasVideoClipe: boolean;
  audioUrl: string;
}

export const musics: MusicType[] = [
  {
    id: "3",
    photoUrl:
      "https://i.scdn.co/image/ab67616d000048511d4675d5a0345bb93686e4b6",
    title: "My Life",
    artists: ["Billy Joel"],
    duration: 285,
    hasVideoClipe: true,
    audioUrl: "/music/Billy Joel - My Life.mp3",
  },
];
