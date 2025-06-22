"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { musics } from "../app/data/musics";
import {
  AddMusicIcon,
  DevicesIcon,
  FullScreenIcon,
  LyricsIcon,
  MiniReaderIcon,
  NextMusicIcon,
  PlayBackViewIcon,
  PreviousMusicIcon,
  QueueIcon,
  RepeatMusicIcon,
  RepeatOneTimeMusicIcon,
  ShuffleMusicIcon,
  StartMusicIcon,
  StopMusicIcon,
  VideoclipeIcon,
  VolumeMediumIcon,
  VolumeLowIcon,
  VolumeHighIcon,
  VolumeMutedIcon,
} from "../app/icons/icons";
import { usePlayer } from "@/contexts/PlayerContext";

const PlayerBar = () => {
  const {
    currentIndex,
    setCurrentIndex,
    isMusicPlaying,
    setIsMusicPlaying,
    isShuffleEnabled,
    setIsShuffleEnabled,
    shuffleState,
    setShuffleState,
    currentTime,
    setCurrentTime,
    setDuration,
    isDragging,
    setIsDragging,
    volume,
    setVolume,
    previousVolume,
    setPreviousVolume,
    isMuted,
    setIsMuted,
    isVolumeDragging,
    setIsVolumeDragging,
    audioRef,
    progressBarRef,
    volumeSliderRef,
    duration,
    music,
  } = usePlayer();

  const cycleRepeatMode = () => {
    setShuffleState((prev) => {
      if (prev.on) return { on: false, onetime: true, off: false };
      if (prev.onetime) return { on: false, onetime: false, off: true };
      return { on: true, onetime: false, off: false };
    });
  };

  const goNext = React.useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % musics.length);
    setCurrentTime(0);
  }, [setCurrentIndex, setCurrentTime]);

  const goPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + musics.length) % musics.length);
    setCurrentTime(0);
  };

  const formatTime = (t: number) => {
    const minutes = Math.floor(t / 60);
    const seconds = Math.floor(t % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const updateProgressFromMouse = React.useCallback(
    (e: MouseEvent | React.MouseEvent<HTMLDivElement>) => {
      if (!progressBarRef.current || !audioRef.current) return;

      const audioDuration = audioRef.current.duration;
      if (!audioDuration || isNaN(audioDuration)) return;

      // Check if audio is ready for seeking
      if (audioRef.current.readyState < 2) {
        console.log("Audio not ready for seeking");
        return;
      }

      const rect = progressBarRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const percentage = Math.max(0, Math.min(1, clickX / rect.width));
      const newTime = percentage * audioDuration;

      try {
        audioRef.current.currentTime = newTime;
        setCurrentTime(newTime);
      } catch (error) {
        console.error("Failed to seek:", error);
      }
    },
    [audioRef, progressBarRef, setCurrentTime]
  );

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    updateProgressFromMouse(e);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    updateProgressFromMouse(e);
  };

  const handleMouseMove = React.useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      updateProgressFromMouse(e);
    },
    [isDragging, updateProgressFromMouse]
  );

  const handleMouseUp = React.useCallback(() => {
    setIsDragging(false);
  }, [setIsDragging]);

  const handleVolumeChange = React.useCallback(
    (newVolume: number) => {
      const clampedVolume = Math.max(0, Math.min(100, newVolume));
      setVolume(clampedVolume);
      if (audioRef.current) {
        audioRef.current.volume = clampedVolume / 100;
      }
      if (clampedVolume > 0 && isMuted) {
        setIsMuted(false);
      }
    },
    [audioRef, isMuted, setIsMuted, setVolume]
  );

  const handleVolumeSliderClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!volumeSliderRef.current) return;

    const rect = volumeSliderRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, clickX / rect.width));
    const newVolume = percentage * 100;

    handleVolumeChange(newVolume);
  };

  const handleVolumeMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    setIsVolumeDragging(true);
    handleVolumeSliderClick(e);
  };

  const handleVolumeMouseMove = React.useCallback(
    (e: MouseEvent) => {
      if (!isVolumeDragging || !volumeSliderRef.current) return;

      const rect = volumeSliderRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const percentage = Math.max(0, Math.min(1, clickX / rect.width));
      const newVolume = percentage * 100;

      handleVolumeChange(newVolume);
    },
    [isVolumeDragging, volumeSliderRef, handleVolumeChange]
  );

  const handleVolumeMouseUp = React.useCallback(() => {
    setIsVolumeDragging(false);
  }, [setIsVolumeDragging]);

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      handleVolumeChange(previousVolume);
    } else {
      setPreviousVolume(volume);
      setIsMuted(true);
      handleVolumeChange(0);
    }
  };

  const getVolumeIcon = () => {
    if (isMuted || volume === 0) return VolumeMutedIcon;
    if (volume < 33) return VolumeLowIcon;
    if (volume < 66) return VolumeMediumIcon;
    return VolumeHighIcon;
  };

  // Add progress bar drag event listeners
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        e.preventDefault();
        handleMouseMove(e);
      }
    };

    const handleGlobalMouseUp = () => {
      if (isDragging) {
        handleMouseUp();
      }
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleGlobalMouseMove);
      document.addEventListener("mouseup", handleGlobalMouseUp);
      document.body.style.userSelect = "none"; // Prevent text selection while dragging
    }

    return () => {
      document.removeEventListener("mousemove", handleGlobalMouseMove);
      document.removeEventListener("mouseup", handleGlobalMouseUp);
      document.body.style.userSelect = "";
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  useEffect(() => {
    if (isVolumeDragging) {
      document.addEventListener("mousemove", handleVolumeMouseMove);
      document.addEventListener("mouseup", handleVolumeMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleVolumeMouseMove);
      document.removeEventListener("mouseup", handleVolumeMouseUp);
    };
  }, [handleVolumeMouseMove, handleVolumeMouseUp, isVolumeDragging]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => {
      if (!isDragging) {
        setCurrentTime(audio.currentTime);
      }
    };

    const onLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const onEnded = () => {
      if (shuffleState.onetime) {
        // Repeat current song
        audio.currentTime = 0;
        audio.play();
      } else if (shuffleState.on || shuffleState.off) {
        // Go to next song (shuffle logic can be added here)
        goNext();
      }
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("ended", onEnded);
    };
  }, [
    audioRef,
    currentIndex,
    goNext,
    isDragging,
    setCurrentTime,
    setDuration,
    shuffleState,
  ]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Set initial volume
    audio.volume = volume / 100;

    if (isMusicPlaying) {
      audio.play().catch(console.error);
    } else {
      audio.pause();
    }
  }, [isMusicPlaying, currentIndex, volume, audioRef]);

  // Use duration from context state instead of audioRef for consistency
  const progressPercent = duration ? (currentTime / duration) * 100 : 0;
  console.log(duration);
  const VolumeIcon = getVolumeIcon();

  return (
    <div className="px-4 py-4 bg-black w-full h-[87px] flex justify-center items-center gap-4">
      <audio ref={audioRef} src={music.audioUrl} preload="metadata" />

      <div className="flex w-full h-full items-center">
        {/* Left - Music Info */}
        <div className="flex-1 text-center">
          <div className="flex space-x-4">
            <Image
              src={music.photoUrl}
              alt={"Music Image from artist " + music.artists.join(", ")}
              width={56}
              height={56}
              className="rounded-sm"
              priority={true}
            />
            <div className="flex flex-col justify-center items-start">
              <h2 className="text-white text-sm tracking-tight cursor-pointer hover:underline">
                {music.title}
              </h2>
              <div className="text-[#999999] text-xs flex items-center gap-1 tracking-tight cursor-pointer  ">
                {music.hasVideoClipe && (
                  <>
                    <VideoclipeIcon className="h-3 w-3 text-[#b3b3b3] mr-1 " />
                    <span className="hover:underline hover:text-[#ebebeb]">
                      Videoclipe
                    </span>
                    <span>•</span>
                  </>
                )}
                <p className="hover:underline hover:text-[#ebebeb]">
                  {music.artists.join(", ")}
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <button>
                <AddMusicIcon className="h-4 w-4 text-[#b3b3b3] hover:text-white transition-colors" />
              </button>
            </div>
          </div>
        </div>

        {/* Center - Player Controls */}
        <div className="flex-1 text-center px-2 py-2">
          {/* Controls */}
          <div className="flex items-center justify-center space-x-6">
            <button
              onClick={() => setIsShuffleEnabled(!isShuffleEnabled)}
              className="hover:text-white transition-colors"
            >
              <ShuffleMusicIcon
                className={`h-4 w-4 ${
                  isShuffleEnabled ? "text-[#1ed760]" : "text-[#b3b3b3]"
                }`}
              />
              {isShuffleEnabled && (
                <div className="items-center flex justify-center">
                  <span className="fixed mt-2 text-[#1ed760]">•</span>
                </div>
              )}
            </button>
            <button
              onClick={goPrevious}
              className="hover:text-white transition-colors"
            >
              <PreviousMusicIcon className="h-4 w-4 text-[#b3b3b3]" />
            </button>
            <button
              className="bg-white rounded-full w-8 h-8 items-center flex justify-center hover:scale-105 transition-transform"
              onClick={() => setIsMusicPlaying(!isMusicPlaying)}
            >
              {isMusicPlaying ? (
                <StopMusicIcon className="h-4 w-4 text-black" />
              ) : (
                <StartMusicIcon className="h-4 w-4 text-black" />
              )}
            </button>
            <button
              onClick={goNext}
              className="hover:text-white transition-colors"
            >
              <NextMusicIcon className="h-4 w-4 text-[#b3b3b3]" />
            </button>
            <button
              onClick={cycleRepeatMode}
              className="hover:text-white transition-colors"
            >
              {shuffleState.on ? (
                <>
                  <RepeatMusicIcon className="h-4 w-4 text-[#1ed760]" />
                  <div className="items-center flex justify-center">
                    <span className="fixed mt-2 text-[#1ed760]">•</span>
                  </div>
                </>
              ) : shuffleState.off ? (
                <RepeatMusicIcon className="h-4 w-4 text-[#b3b3b3]" />
              ) : (
                <>
                  <RepeatOneTimeMusicIcon className="h-4 w-4 text-[#1ed760]" />
                  <div className="items-center flex justify-center">
                    <span className="fixed mt-2 text-[#1ed760]">•</span>
                  </div>
                </>
              )}
            </button>
          </div>

          {/* Progress Bar - FIXED */}
          <div className="text-[#b3b3b3] flex items-center justify-between mt-2 text-xs w-full">
            <div className="w-10 text-right">{formatTime(currentTime)}</div>

            <div
              ref={progressBarRef}
              className="group relative mx-2 h-1 bg-white/30 rounded flex-1 cursor-pointer hover:h-1"
              onMouseDown={handleMouseDown}
              onClick={handleProgressBarClick}
            >
              {/* Background track - this makes the entire area hoverable */}
              <div className="absolute inset-0 h-1 bg-white/30 rounded group-hover:bg-white/40 transition-colors" />

              {/* Progress fill */}
              <div
                className="absolute top-0 left-0 h-1 bg-white group-hover:bg-[#1ed760] rounded transition-colors"
                style={{ width: `${progressPercent}%` }}
              >
                {/* Progress handle/thumb */}
                <div
                  className={`absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity ${
                    isDragging ? "opacity-100" : ""
                  }`}
                  style={{ right: "-6px" }}
                />
              </div>
            </div>

            <div className="w-10 text-left">{formatTime(duration)}</div>
          </div>
        </div>

        {/* Right - Reserved */}
        <div className="flex-1 text-center text-white gap-4 flex items-center justify-end">
          <button>
            <PlayBackViewIcon className="h-4 w-4 text-[#b3b3b3]" />
          </button>
          <button>
            <LyricsIcon className="h-4 w-4 text-[#b3b3b3]" />
          </button>
          <button>
            <QueueIcon className="h-4 w-4 text-[#b3b3b3]" />
          </button>
          <button>
            <DevicesIcon className="h-4 w-4 text-[#b3b3b3]" />
          </button>

          {/* Fixed Volume Module */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleMute}
              className="hover:text-white transition-colors"
            >
              <VolumeIcon className="h-4 w-4 text-[#b3b3b3] hover:text-white" />
            </button>

            <div className="flex items-center">
              <div
                ref={volumeSliderRef}
                className="relative w-20 h-1 bg-white/30 rounded cursor-pointer group"
                onMouseDown={handleVolumeMouseDown}
              >
                <div
                  className="absolute top-0 left-0 h-1 bg-white hover:bg-[#1ed760] rounded"
                  style={{ width: `${volume}%` }}
                >
                  <div
                    className={`absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity ${
                      isVolumeDragging ? "opacity-100" : ""
                    }`}
                    style={{ right: "-6px" }}
                  />
                </div>
              </div>
            </div>
          </div>

          <button>
            <MiniReaderIcon className="h-4 w-4 text-[#b3b3b3]" />
          </button>
          <button>
            <FullScreenIcon className="h-4 w-4 text-[#b3b3b3]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayerBar;
