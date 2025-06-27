import React from "react";
import PlayerBar from "@/components/playerBar/PlayerBar";

const page = () => {
  return (
    <main className="flex flex-col h-screen ">
      {/* Top section */}
      <div className="bg-[#121212] mx-2 rounded-lg flex-1"></div>

      {/* Music Player */}
      <PlayerBar />
    </main>
  );
};

export default page;
