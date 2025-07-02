"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { musics } from "@/app/data/musics";
import {
  AddMusicIcon,
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
  ConnectDeviceIcon,
  ArrowUp,
  ArrowDown,
  AddedMusicIcon,
  ExitFullScreenIcon,
} from "@/components/icons/icons";
import { usePlayer } from "@/contexts/PlayerContext";
import ToolTip from "../ToolTip";

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
    isSongExpanded,
    setIsSongExpanded,
    likedSongs,
    setLikedSongs,
    isPlayingView,
    setIsPlayingView,
    isPlayingLyrics,
    setIsPlayingLyrics,
    isPlayingQueue,
    setIsPlayingQueue,
    isShowingConnectedDevices,
    setIsShowingConnectedDevices,
    isShowingMiniPlayer,
    setIsShowingMiniPlayer,
    isShowingFullscreen,
    setIsShowingFullscreen,
    isShowRemainingTime,
    setIsShowRemainingTime,
    music,
    isHydrated,
  } = usePlayer();

  // Add state for drag preview time
  const [dragPreviewTime, setDragPreviewTime] = React.useState(0);

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

  const calculateTimeFromMouse = React.useCallback(
    (e: MouseEvent | React.MouseEvent<HTMLDivElement>) => {
      if (!progressBarRef.current || !audioRef.current) return null;

      const audioDuration = audioRef.current.duration;
      if (!audioDuration || isNaN(audioDuration)) return null;

      const rect = progressBarRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const percentage = Math.max(0, Math.min(1, clickX / rect.width));
      const newTime = percentage * audioDuration;

      return newTime;
    },
    [audioRef, progressBarRef]
  );

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

    // Calculate initial drag preview time
    const previewTime = calculateTimeFromMouse(e);
    if (previewTime !== null) {
      setDragPreviewTime(previewTime);
    }
  };

  const handleMouseMove = React.useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      e.preventDefault();

      // Only update preview time during drag, don't seek the audio
      const previewTime = calculateTimeFromMouse(e);
      if (previewTime !== null) {
        setDragPreviewTime(previewTime);
      }
    },
    [isDragging, calculateTimeFromMouse]
  );

  const handleMouseUp = React.useCallback(() => {
    if (isDragging) {
      // Now actually seek to the dragged position
      if (audioRef.current && audioRef.current.readyState >= 2) {
        try {
          audioRef.current.currentTime = dragPreviewTime;
          setCurrentTime(dragPreviewTime);
        } catch (error) {
          console.error("Failed to seek:", error);
        }
      }
    }
    setIsDragging(false);
  }, [isDragging, dragPreviewTime, audioRef, setCurrentTime, setIsDragging]);

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

  // Calculate progress percentage - use dragPreviewTime during dragging
  const displayTime = isDragging ? dragPreviewTime : currentTime;
  const progressPercent = duration ? (displayTime / duration) * 100 : 0;
  const VolumeIcon = getVolumeIcon();

  // Helper function to check if a song is liked
  const isSongLiked = (id: string) => likedSongs.includes(id);

  const toggleSongLiked = (id: string) => {
    setLikedSongs((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="px-4 py-4 bg-black w-full flex justify-center items-center ">
      <audio ref={audioRef} src={music.audioUrl} preload="metadata" />

      <div className="flex w-full h-full items-center gap-4">
        {/* Left - Music Info */}
        <div className="flex-1 text-center">
          {isHydrated && (
            <div className="flex space-x-4 items-center">
              <div className="relative">
                <div className="group">
                  <Image
                    src={music.photoUrl}
                    alt={"Music image cover"}
                    width={56}
                    height={56}
                    className="rounded-sm"
                    priority={true}
                    onClick={() => setIsSongExpanded(!isSongExpanded)}
                  />
                  <div className="absolute top-1 right-1 z-10 group">
                    {isSongExpanded ? (
                      <div
                        onClick={() => setIsSongExpanded(false)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ToolTip text="Collapse">
                          <ArrowDown className="hover:scale-105 text-[#a2a2a2] hover:text-white h-6 w-6 bg-[#0c0a08]/70 hover:bg-[#0c0a08]/90 rounded-full px-1" />
                        </ToolTip>
                      </div>
                    ) : (
                      <div
                        onClick={() => setIsSongExpanded(true)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ToolTip text="Expand">
                          <ArrowUp className="hover:scale-105 text-[#a2a2a2] hover:text-white h-6 w-6 bg-[#0c0a08]/70 hover:bg-[#0c0a08]/90 rounded-full px-1" />
                        </ToolTip>
                      </div>
                    )}
                  </div>
                </div>
              </div>
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
                {isSongLiked(music.id) ? (
                  <ToolTip text="Remove from liked songs">
                    <button
                      onClick={() => toggleSongLiked(music.id)}
                      className=" text-[#1ed760] transition-colors hover:scale-105 cursor-pointer active:text-[#159743] active:hover:scale-100"
                    >
                      <AddedMusicIcon className="h-4 w-4" />
                    </button>
                  </ToolTip>
                ) : (
                  <ToolTip text="Add to liked songs">
                    <button
                      onClick={() => toggleSongLiked(music.id)}
                      className="text-[#b3b3b3] hover:text-white transition-colors hover:scale-105 cursor-pointer active:text-[#717171] active:hover:scale-100"
                    >
                      <AddMusicIcon className="h-4 w-4 " />
                    </button>
                  </ToolTip>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Center - Player Controls */}
        <div className="flex-1 text-center">
          {/* Controls */}
          <div className="flex items-center justify-center space-x-6">
            {isHydrated && (
              <ToolTip
                text={`${
                  isShuffleEnabled ? "Disable Shuffle" : "Enable Shuffle"
                }`}
              >
                <button
                  onClick={() => setIsShuffleEnabled(!isShuffleEnabled)}
                  className={`hover:scale-105 transition-transform items-center flex justify-center cursor-pointer active:scale-95  ${
                    isShuffleEnabled
                      ? "text-[#1ed760] active:text-[#159743]"
                      : "text-[#b3b3b3] active:text-[#7e7e7e] hover:text-[#e5e5e5]"
                  }`}
                >
                  <ShuffleMusicIcon className="h-4 w-4" />
                  {isShuffleEnabled && (
                    <span className="absolute top-full mt-1 h-0 flex justify-center items-center ">
                      •
                    </span>
                  )}
                </button>
              </ToolTip>
            )}

            {!isHydrated && (
              <ShuffleMusicIcon className={`h-4 w-4 text-[#2a2a2a]`} />
            )}

            {isHydrated ? (
              <ToolTip text="Previous">
                <button
                  onClick={goPrevious}
                  className={
                    "hover:scale-105 transition-transform items-center flex justify-center cursor-pointer  active:scale-95 text-[#b3b3b3] hover:text-[#ebebeb] active:text-[#7e7e7e]"
                  }
                >
                  <PreviousMusicIcon className={"h-4 w-4"} />
                </button>
              </ToolTip>
            ) : (
              <PreviousMusicIcon className="h-4 w-4 text-[#2a2a2a]" />
            )}

            {isHydrated && (
              <ToolTip text={`${isMusicPlaying ? "Pause" : "Play"}`}>
                <button
                  className="bg-white rounded-full w-8 h-8 flex items-center justify-center hover:scale-105 hover:bg-[#ebebeb] cursor-pointer transition-transform active:scale-95 text-black active:bg-[#b3b3b3]"
                  onClick={() => setIsMusicPlaying(!isMusicPlaying)}
                >
                  {isMusicPlaying ? (
                    <StopMusicIcon className="h-4 w-4" />
                  ) : (
                    <StartMusicIcon className="h-4 w-4" />
                  )}
                </button>
              </ToolTip>
            )}
            {!isHydrated && (
              <button className="bg-[#4d4d4d] rounded-full w-8 h-8 items-center flex justify-center text-black">
                <StopMusicIcon className="h-4 w-4" />
              </button>
            )}
            {isHydrated ? (
              <ToolTip text="Next">
                <button
                  onClick={goNext}
                  className={
                    "hover:scale-105 transition-transform items-center flex justify-center cursor-pointer  active:scale-95 active:text-[#7e7e7e] text-[#b3b3b3] hover:text-[#ebebeb] hover-scale-105 "
                  }
                >
                  <NextMusicIcon className="h-4 w-4" />
                </button>
              </ToolTip>
            ) : (
              <button>
                <NextMusicIcon className={`h-4 w-4 text-[#2a2a2a]`} />
              </button>
            )}

            {isHydrated && (
              <ToolTip
                text={
                  shuffleState.on
                    ? "Enable repeat one"
                    : shuffleState.off
                      ? "Enable repeat"
                      : "Disable repeat"
                }
              >
                <button
                  onClick={cycleRepeatMode}
                  className={`
      relative flex items-center justify-center
      hover:scale-105 active:scale-95 transition-transform cursor-pointer
      ${
        shuffleState.on || shuffleState.onetime
          ? "text-[#1ed760] active:text-[#159743]"
          : "text-[#b3b3b3] active:text-[#7e7e7e]"
      }
    `}
                >
                  {shuffleState.onetime ? (
                    <RepeatOneTimeMusicIcon className="h-4 w-4" />
                  ) : (
                    <RepeatMusicIcon className="h-4 w-4" />
                  )}

                  {(shuffleState.on || shuffleState.onetime) && (
                    <span className="absolute top-full mt-1 h-0 flex justify-center items-center ">
                      •
                    </span>
                  )}
                </button>
              </ToolTip>
            )}
            {!isHydrated && (
              <button>
                <RepeatMusicIcon className="h-4 w-4 text-[#2a2a2a]" />
              </button>
            )}
          </div>

          {/* Progress Bar  */}
          <div className="text-[#b3b3b3] flex items-center justify-between mt-2 text-xs w-full">
            <div className="text-right">
              {isHydrated ? formatTime(displayTime) : "-:--"}
            </div>

            <div
              ref={progressBarRef}
              className={`group relative mx-2 h-1 ${
                isHydrated ? " bg-[#4c4c4c]" : " bg-[#4d4d4d]"
              } rounded flex-1 cursor-pointer hover:h-1`}
              onMouseDown={handleMouseDown}
              onClick={handleProgressBarClick}
            >
              {/* Background track */}
              <div className="absolute inset-0 h-1 bg-[#4d4d4d] rounded transition-colors" />

              {/* Progress fill */}
              <div
                className={`absolute top-0 left-0 h-1  group-hover:bg-[#1ed760] rounded transition-color ${
                  isDragging ? "bg-[#1ed760]" : "bg-white"
                }`}
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

            <div
              className="text-left"
              onClick={() => setIsShowRemainingTime(!isShowRemainingTime)}
            >
              {isHydrated
                ? isShowRemainingTime
                  ? formatTime(duration)
                  : "-" + formatTime(duration - displayTime)
                : "-:--"}
            </div>
          </div>
        </div>

        {/* Right - Volume and miscelncs */}
        <div className="flex-1 text-center gap-4 flex items-center justify-end">
          <ToolTip text="Now playing view">
            <button
              onClick={() => {
                if (isPlayingView) {
                  setIsPlayingView(false);
                  setIsPlayingQueue(false);
                  setIsShowingConnectedDevices(false);
                } else {
                  setIsPlayingView(true);
                  setIsPlayingQueue(false);
                  setIsShowingConnectedDevices(false);
                }
              }}
              className={`relative flex items-center justify-center hover:scale-105 active:scale-95 transition-transform cursor-pointer ${
                isHydrated ? "" : "text-[#2a2a2a]"
              } ${isPlayingView ? "text-[#1ed760] active:text-[#159743]" : "text-[#b3b3b3] active:text-[#7e7e7e] hover:text-white"}`}
            >
              <PlayBackViewIcon className="h-4 w-4" />
              {isPlayingView && (
                <span className="absolute top-full mt-1 h-0 flex justify-center items-center ">
                  •
                </span>
              )}
            </button>
          </ToolTip>
          {isHydrated && (
            <ToolTip text="Lyrics" showTooltip={music.hasLyrics}>
              <button
                onClick={() => {
                  if (music.hasLyrics) {
                    setIsPlayingLyrics(!isPlayingLyrics);
                  }
                }}
                className={`
  relative flex items-center justify-center transition-transform
  ${
    music.hasLyrics
      ? `cursor-pointer hover:scale-105 active:scale-95 ${
          isPlayingLyrics
            ? "text-[#1ed760] active:text-[#159743]"
            : "text-[#b3b3b3] hover:text-white active:text-[#7e7e7e]"
        }`
      : "cursor-not-allowed text-[#323232]"
  }
`}
              >
                <LyricsIcon className="h-4 w-4" />
                {isPlayingLyrics && (
                  <span className="absolute top-full mt-1 h-0 flex justify-center items-center ">
                    •
                  </span>
                )}
              </button>
            </ToolTip>
          )}

          <ToolTip text="Queue">
            <button
              onClick={() => {
                if (isPlayingQueue) {
                  setIsPlayingView(false);
                  setIsPlayingQueue(false);
                  setIsShowingConnectedDevices(false);
                } else {
                  setIsPlayingView(false);

                  setIsPlayingQueue(true);
                  setIsShowingConnectedDevices(false);
                }
              }}
              className={`relative flex items-center justify-center hover:scale-105 active:scale-95 transition-transform cursor-pointer ${isPlayingQueue ? "text-[#1ed760] active:text-[#159743]" : "text-[#b3b3b3] active:text-[#7e7e7e] hover:text-white"}`}
            >
              <QueueIcon className="h-4 w-4" />
              {isPlayingQueue && (
                <span className="absolute top-full mt-1 h-0 flex justify-center items-center ">
                  •
                </span>
              )}
            </button>
          </ToolTip>

          <ToolTip text="Connect to a device">
            <button
              onClick={() => {
                if (isShowingConnectedDevices) {
                  setIsPlayingView(false);
                  setIsPlayingQueue(false);
                  setIsShowingConnectedDevices(false);
                } else {
                  setIsPlayingView(false);
                  setIsPlayingQueue(false);
                  setIsShowingConnectedDevices(true);
                }
              }}
              className={`relative flex items-center justify-center hover:scale-105 active:scale-95 transition-transform cursor-pointer ${isShowingConnectedDevices ? "text-[#1ed760] active:text-[#159743]" : "text-[#b3b3b3] active:text-[#7e7e7e] hover:text-white"}`}
            >
              <ConnectDeviceIcon className="h-4 w-4" />
              {isShowingConnectedDevices && (
                <span className="absolute top-full mt-1 h-0 flex justify-center items-center ">
                  •
                </span>
              )}
            </button>
          </ToolTip>

          {/* Volume Module */}
          <div className="flex items-center gap-2">
            <ToolTip text={`${isMuted ? "Unmute" : "Mute"}`}>
              <button
                onClick={toggleMute}
                className="hover:text-white transition-colors cursor-pointer active:scale-95 items-center flex justify-center"
              >
                <VolumeIcon className="h-4 w-4 text-[#b3b3b3] hover:text-white active:text-[#b3b3b3]" />
              </button>
            </ToolTip>

            <div className="flex items-center">
              <div
                ref={volumeSliderRef}
                className="relative w-23 h-1 bg-white/30 rounded cursor-pointer group"
                onMouseDown={handleVolumeMouseDown}
              >
                <div
                  className={`absolute top-0 left-0 h-1 ${
                    isVolumeDragging ? "bg-[#1ed760]" : "bg-white"
                  }  hover:bg-[#1ed760] rounded`}
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

          {isHydrated && (
            <ToolTip
              text={`${isShowingMiniPlayer ? "Close Miniplayer" : "Open Miniplayer"}`}
            >
              <button
                onClick={() => setIsShowingMiniPlayer(!isShowingMiniPlayer)}
                className={`relative flex items-center justify-center hover:scale-105 active:scale-95 transition-transform cursor-pointer ${isShowingMiniPlayer ? "text-[#1ed760] active:text-[#159743]" : "text-[#b3b3b3] active:text-[#7e7e7e] hover:text-white"}`}
              >
                <MiniReaderIcon className="h-4 w-4" />
                {isShowingMiniPlayer && (
                  <span className="absolute top-full mt-1 h-0 flex justify-center items-center ">
                    •
                  </span>
                )}
              </button>
            </ToolTip>
          )}
          <ToolTip
            text={`${isShowingFullscreen ? "Exit Full screen " : "Enter Full screen"}`}
          >
            <button
              onClick={() => setIsShowingFullscreen(!isShowingFullscreen)}
              className={`relative flex items-center justify-center hover:scale-105 active:scale-95 transition-transform cursor-pointer text-[#b3b3b3] active:text-[#7e7e7e] hover:text-white `}
            >
              {isShowingFullscreen ? (
                <ExitFullScreenIcon className="h-4 w-4" />
              ) : (
                <FullScreenIcon className="h-4 w-4" />
              )}
            </button>
          </ToolTip>
        </div>
      </div>
    </div>
  );
};

export default PlayerBar;
