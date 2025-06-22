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

export const PlayerProvider = ({ children }: { children: React.ReactNode }) => {
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
  const [volume, setVolume] = usePersistedState("musicPlayer_volume", 50);
  const [previousVolume, setPreviousVolume] = usePersistedState(
    "musicPlayer_previousVolume",
    50
  );
  const [isMuted, setIsMuted] = usePersistedState("musicPlayer_isMuted", false);

  // Non-persisted states (these should reset on page refresh)
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isVolumeDragging, setIsVolumeDragging] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const volumeSliderRef = useRef<HTMLDivElement>(null);

  const music = musics[currentIndex];

  // Stop music on page load if it was playing (optional - you might want to auto-resume)
  useEffect(() => {
    if (isMusicPlaying) {
      setIsMusicPlaying(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run on mount

  const contextValue: PlayerContextProps = {
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
    music,
    duration,
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
