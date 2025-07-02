"use client";

import React, {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
} from "react";
import { musics } from "@/app/data/musics";
import { ToggleRepeatMusic } from "@/@types/types";

interface PlayerContextProps {
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  isMusicPlaying: boolean;
  setIsMusicPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  isShuffleEnabled: boolean;
  setIsShuffleEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  shuffleState: ToggleRepeatMusic;
  setShuffleState: React.Dispatch<React.SetStateAction<ToggleRepeatMusic>>;
  currentTime: number;
  setCurrentTime: React.Dispatch<React.SetStateAction<number>>;
  setDuration: React.Dispatch<React.SetStateAction<number>>;
  isDragging: boolean;
  setIsDragging: React.Dispatch<React.SetStateAction<boolean>>;
  volume: number;
  setVolume: React.Dispatch<React.SetStateAction<number>>;
  previousVolume: number;
  setPreviousVolume: React.Dispatch<React.SetStateAction<number>>;
  isMuted: boolean;
  setIsMuted: React.Dispatch<React.SetStateAction<boolean>>;
  isVolumeDragging: boolean;
  setIsVolumeDragging: React.Dispatch<React.SetStateAction<boolean>>;
  audioRef: React.RefObject<HTMLAudioElement | null>;
  progressBarRef: React.RefObject<HTMLDivElement | null>;
  volumeSliderRef: React.RefObject<HTMLDivElement | null>;
  duration: number;
  music: (typeof musics)[number];
  isSongExpanded: boolean;
  setIsSongExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  likedSongs: string[];
  setLikedSongs: React.Dispatch<React.SetStateAction<string[]>>;
  isPlayingView: boolean;
  setIsPlayingView: React.Dispatch<React.SetStateAction<boolean>>;
  isPlayingLyrics: boolean;
  setIsPlayingLyrics: React.Dispatch<React.SetStateAction<boolean>>;
  isPlayingQueue: boolean;
  setIsPlayingQueue: React.Dispatch<React.SetStateAction<boolean>>;
  isShowingConnectedDevices: boolean;
  setIsShowingConnectedDevices: React.Dispatch<React.SetStateAction<boolean>>;
  isShowingMiniPlayer: boolean;
  setIsShowingMiniPlayer: React.Dispatch<React.SetStateAction<boolean>>;
  isShowingFullscreen: boolean;
  setIsShowingFullscreen: React.Dispatch<React.SetStateAction<boolean>>;
  isShowRemainingTime: boolean;
  setIsShowRemainingTime: React.Dispatch<React.SetStateAction<boolean>>;
  isHydrated: boolean;
}

const PlayerContext = createContext<PlayerContextProps | undefined>(undefined);

// Helper function to get stored values
function getStoredValue<T>(key: string, defaultValue: T): T {
  if (typeof window === "undefined") return defaultValue;
  try {
    const stored = localStorage.getItem(key);
    return stored ? (JSON.parse(stored) as T) : defaultValue;
  } catch {
    return defaultValue;
  }
}

// Helper function to set stored values
function setStoredValue<T>(key: string, value: T): void {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn(`Failed to save ${key} to localStorage:`, error);
    }
  }
}

// Custom hook for persisted state
function usePersistedState<T>(
  key: string,
  defaultValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = useState<T>(() =>
    getStoredValue(key, defaultValue)
  );

  useEffect(() => {
    setStoredValue(key, state);
  }, [key, state]);

  return [state, setState];
}

// Custom hook for persisted current time with throttling
function usePersistedCurrentTime(): [
  number,
  React.Dispatch<React.SetStateAction<number>>,
] {
  const [currentTime, setCurrentTime] = usePersistedState(
    "musicPlayer_currentTime",
    0
  );
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Create a throttled setter that only persists every 2 seconds
  const setCurrentTimeThrottled = React.useCallback(
    (value: React.SetStateAction<number>) => {
      setCurrentTime(value);

      // Clear existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Set new timeout to persist after 2 seconds of no updates
      timeoutRef.current = setTimeout(() => {
        const newValue =
          typeof value === "function" ? value(currentTime) : value;
        setStoredValue("musicPlayer_currentTime", newValue);
      }, 2000);
    },
    [currentTime, setCurrentTime]
  );

  return [currentTime, setCurrentTimeThrottled];
}

export const PlayerProvider = ({ children }: { children: React.ReactNode }) => {
  const [isHydrated, setIsHydrated] = useState(false);

  // Persisted states
  const [currentIndex, setCurrentIndex] = usePersistedState(
    "musicPlayer_currentIndex",
    0
  );
  const [isMusicPlaying, setIsMusicPlaying] = usePersistedState(
    "musicPlayer_isMusicPlaying",
    false
  );
  const [isShuffleEnabled, setIsShuffleEnabled] = usePersistedState(
    "musicPlayer_isShuffleEnabled",
    false
  );
  const [shuffleState, setShuffleState] = usePersistedState<ToggleRepeatMusic>(
    "musicPlayer_shuffleState",
    {
      on: false,
      off: true,
      onetime: false,
    }
  );
  const [volume, setVolume] = usePersistedState("musicPlayer_volume", 100);
  const [previousVolume, setPreviousVolume] = usePersistedState(
    "musicPlayer_previousVolume",
    100
  );
  const [isMuted, setIsMuted] = usePersistedState("musicPlayer_isMuted", false);

  // Persisted current time with throttling to avoid too frequent localStorage writes
  const [currentTime, setCurrentTime] = usePersistedCurrentTime();

  // Track the current song to reset time when song changes
  const [lastSongIndex, setLastSongIndex] = usePersistedState(
    "musicPlayer_lastSongIndex",
    0
  );

  const [isSongExpanded, setIsSongExpanded] = usePersistedState(
    "musicPlayer_isSongExpanded",
    false
  );

  const [likedSongs, setLikedSongs] = usePersistedState<string[]>(
    "musicPlayer_likedSongs",
    []
  );

  const [isPlayingView, setIsPlayingView] = usePersistedState(
    "musicPlayer_isPlayingView",
    false
  );

  const [isPlayingLyrics, setIsPlayingLyrics] = usePersistedState(
    "musicPlayer_isPlayingLyrics",
    false
  );

  const [isPlayingQueue, setIsPlayingQueue] = usePersistedState(
    "musicPlayer_isPlayingQueue",
    false
  );

  const [isShowingConnectedDevices, setIsShowingConnectedDevices] =
    usePersistedState("musicPlayer_isShowingConnectedDevices", false);

  const [isShowingMiniPlayer, setIsShowingMiniPlayer] = usePersistedState(
    "musicPlayer_isShowingMiniPlayer",
    false
  );
  const [isShowingFullscreen, setIsShowingFullscreen] = usePersistedState(
    "musicPlayer_isShowingFullscreen",
    false
  );
  const [isShowRemainingTime, setIsShowRemainingTime] = usePersistedState(
    "musicPlayer_isShowRemainingTime",
    false
  );

  const [duration, setDuration] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isVolumeDragging, setIsVolumeDragging] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const volumeSliderRef = useRef<HTMLDivElement>(null);

  const music = musics[currentIndex];

  // Reset current time when song changes
  useEffect(() => {
    if (currentIndex !== lastSongIndex) {
      setCurrentTime(0);
      setLastSongIndex(currentIndex);
    }
  }, [currentIndex, lastSongIndex, setCurrentTime, setLastSongIndex]);

  // Initialize audio with persisted current time when audio loads
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      // Only set persisted time if it's for the same song and within bounds
      if (
        currentIndex === lastSongIndex &&
        currentTime > 0 &&
        currentTime < audio.duration
      ) {
        audio.currentTime = currentTime;
      }
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [currentIndex, lastSongIndex, currentTime]);

  // Stop music on page load if it was playing
  useEffect(() => {
    if (isMusicPlaying) {
      setIsMusicPlaying(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run on mount

  // Enhanced setCurrentIndex that resets time
  const setCurrentIndexWithTimeReset = React.useCallback(
    (value: React.SetStateAction<number>) => {
      setCurrentIndex(value);
      setCurrentTime(0);
    },
    [setCurrentIndex, setCurrentTime]
  );
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const contextValue: PlayerContextProps = {
    currentIndex,
    setCurrentIndex: setCurrentIndexWithTimeReset,
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
    music,
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
    duration,
    isHydrated,
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
};
