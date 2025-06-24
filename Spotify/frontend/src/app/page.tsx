import React from "react";
import PlayerBar from "@/components/playerBar/PlayerBar";

export const metadata = {
  title: "Spotify - Web Player: Music for Everyone",
  description:
    "Spotify is a digital music service that gives you access to millions of songs.",
  openGraph: {
    title: "Spotify - Web Player: Music for Everyone",
    description:
      "Spotify is a digital music service that gives you access to millions of songs.",
    images: [
      "https://open.spotifycdn.com/cdn/images/download-page-image-mac.fec937cc.png",
    ],
    siteName: "Spotify - Player Bar",
    type: "website",
  },
};
export default function Home() {
  return (
    <div className="flex flex-col h-screen ">
      {/* Top section */}
      <div className="bg-[#121212] mx-2 rounded-lg flex-1">
        {/* Your top content here */}
        <h1 className="text-white font-bold">Header</h1>
      </div>

      {/* Music Player */}
      <PlayerBar />
    </div>
  );
}
