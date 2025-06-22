import React from "react";
import PlayerBar from "@/components/PlayerBar";

const page = () => {
  return (
    <div className="flex flex-col h-screen ">
      {/* Top section */}
      <div className="bg-[#121212] mx-2 rounded-lg flex-1"></div>

      {/* Music Player */}
      <PlayerBar />
    </div>
  );
};

export default page;
