"use client";
import React from "react";
import Image from "next/image";
import { musics } from "../data/musics";
import { VideoclipeIcon } from "../icons/icons";

const PlayerBar = () => {
  const [currentIndex, setCurrentIndex] = React.useState<number>(0);

  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % musics.length);
  };
  const music = musics[currentIndex];

  return (
    <div className="px-4 py-4 bg-black w-full h-[87px] flex justify-center items-center">
      <div className="flex w-full h-full items-center">
        <div className="flex-1 text-center">
          {/* Music Image */}
          <div className="flex  space-x-4">
            <Image
              src={`${music.photoUrl}`}
              alt={"Music Image from artist " + music.artist}
              width={56}
              height={56}
              className="rounded-sm"
            />
            {/* Song Information */}
            <div className="flex flex-col justify-center items-start">
              <h2 className="text-white text-sm font-medium tracking-tight">
                {music.title}
              </h2>
              <p className="text-[#999999] text-xs font-medium flex items-center gap-1 tracking-tight">
                {music.hasVideoClipe && (
                  <>
                    <VideoclipeIcon className="h-3 w-3 text-[#b3b3b3] mr-1" />
                    <span>Videoclipe </span>
                    <span>•</span>
                  </>
                )}
                {music.artist}
              </p>
            </div>
          </div>
        </div>
        <div className="flex-1 text-center px-2 py-2">
          {/* Player controls */}
          <button
            className="text-white bg-red-400 cursor-pointer"
            onClick={goNext}
          >
            go next
          </button>
        </div>
        <div className="flex-1 text-center">FLEX 3</div>
      </div>
    </div>
  );
};

export default PlayerBar;
