"use client";

import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import MobileSidebar from "../components/Sidebar/Mobile/MobileSidebar";
import LoadingOverlayXLogo from "../components/LoadingOverlayXLogo";
import { useSelector } from "react-redux";
import { RootState } from "@/app/lib/store";

//  hook to detect screen size
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<{ width: number | undefined }>({
    width: undefined,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
      });
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};

const Navigation = () => {
  const { username } = useSelector((state: RootState) => state.user);

  const { width } = useWindowSize();
  const breakpoint = 640;

  if (width === undefined) {
    return <LoadingOverlayXLogo />;
  }

  return width < breakpoint ? (
    <MobileSidebar />
  ) : (
    <Sidebar username={username} />
  );
};

export default Navigation;
