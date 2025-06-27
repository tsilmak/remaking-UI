"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

import {
  HomeIcon,
  ActiveHomeIcon,
  XLogo,
  SearchIcon,
  ActiveSearchIcon,
  ActiveNotificationIcon,
  NotificationIcon,
  MessageIcon,
  ActiveMessageIcon,
  ActiveGrokIcon,
  CommunitiesIcon,
  ActiveCommunitiesIcon,
  PremiumIcon,
  VerifiedOrgIcon,
  ActiveProfileIcon,
  ProfileIcon,
  MoreIcon,
  PostIcon,
  ActivePremiumIcon,
  ActiveBookmarkIcon,
  BookmarkIcon,
  JobsIcon,
  GrokIconSidebar,
} from "@/utils/icons";
import LoadingOverlayXLogo from "../LoadingOverlayXLogo";

type SidebarProps = {
  username: string;
};

const Sidebar = ({ username }: SidebarProps) => {
  const pathname = usePathname();
  const [isMoreOpen, setIsMoreOpen] = useState<boolean>(false);
  const [windowHeight, setWindowHeight] = useState<number>(0);
  const [showScrollbar, setShowScrollbar] = useState<boolean>(false);
  // Add loading state
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Effect to get and update window height
  useEffect(() => {
    // Set initial height
    setWindowHeight(window.innerHeight);
    setShowScrollbar(window.innerHeight <= 540);
    // Set loading to false once measurements are complete
    setIsLoading(false);

    // Update height on resize
    const handleResize = () => {
      const height = window.innerHeight;
      setWindowHeight(height);
      setShowScrollbar(height <= 540);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const moreItems = [
    "Lists",
    "Bookmarks",
    "Monetization",
    "Ads",
    "Jobs",
    "Create your Space",
  ];

  const navItems = [
    {
      icon: pathname === "/home" ? ActiveHomeIcon : HomeIcon,
      text: "Home",
      path: "/home",
      minHeight: 0, // Always show
    },
    {
      icon: pathname === "/explore" ? ActiveSearchIcon : SearchIcon,
      text: "Explore",
      path: "/explore",
      minHeight: 0,
    },
    {
      icon:
        pathname === "/notifications"
          ? ActiveNotificationIcon
          : NotificationIcon,
      text: "Notifications",
      path: "/notifications",
      minHeight: 0,
    },
    {
      icon: pathname === "/messages" ? ActiveMessageIcon : MessageIcon,
      text: "Messages",
      path: "/messages",
      minHeight: 0,
    },
    {
      icon: pathname === "/i/grok" ? ActiveGrokIcon : GrokIconSidebar,
      text: "Grok",
      path: "/i/grok",
      minHeight: 0,
    },
    {
      icon: pathname === "/i/bookmarks" ? ActiveBookmarkIcon : BookmarkIcon,
      text: "Bookmarks",
      path: "/i/bookmarks",
      minHeight: 729, // Hide when height < 729px
    },
    {
      icon: JobsIcon,
      text: "Jobs",
      path: "/jobs",
      minHeight: 800,
    },
    {
      icon: pathname.endsWith("/communities/explore")
        ? ActiveCommunitiesIcon
        : CommunitiesIcon,
      text: "Communities",
      path: "/username/communities/explore",
      minHeight: 541,
    },
    {
      icon: pathname === "/i/premium_sign_up" ? ActivePremiumIcon : PremiumIcon,
      text: "Premium",
      path: "/i/premium_sign_up",
      minHeight: 590,
    },
    {
      icon: VerifiedOrgIcon,
      text: "Verified Orgs",
      path: "/i/organizations",
      minHeight: 685,
    },
    {
      icon: pathname === "/username" ? ActiveProfileIcon : ProfileIcon,
      text: "Profile",
      path: "/username",
      minHeight: 0,
    },
    {
      icon: MoreIcon,
      text: "More",
      path: "#",
      minHeight: 0,
    },
  ];

  // Filter nav items based on current window height
  const visibleNavItems = navItems.filter(
    (item) => windowHeight >= item.minHeight
  );

  // Show loading state while measurements are being calculated
  if (isLoading) {
    return <LoadingOverlayXLogo />;
  }

  return (
    <nav className="fixed h-screen w-20 xl:w-64 bg-white text-black  dark:bg-black dark:text-white flex flex-col items-center border-r border-borderColor">
      {/* X Logo */}
      <div className="ml-5 xl:ml-7 w-full">
        <button className="hover:bg-[#e7e7e8] dark:hover:bg-colorHover rounded-full p-3.5 transition-all duration-200 ">
          <XLogo width={"30"} height={"30"} fill="fill-black dark:fill-white" />
        </button>
      </div>

      {/* Navigation Items - with scrollbar for small heights */}
      <ul
        className={`w-full px-5 xl:ml-0 relative flex-grow ${
          showScrollbar
            ? "overflow-y-auto overflow-x-hidden"
            : "overflow-hidden"
        }`}
      >
        {visibleNavItems.map((item, index) => {
          const isMoreItem = item.text === "More";
          const isActive =
            item.text === "Communities"
              ? pathname.endsWith("/communities/explore")
              : pathname === item.path;

          return (
            <li key={index} className="relative">
              {isMoreItem ? (
                <button
                  onClick={() => setIsMoreOpen(!isMoreOpen)}
                  className={`
                mt-2.5 xl:mt-0 mb-4 w-full flex items-center justify-start group
                rounded-full transition-all duration-200  ${
                  showScrollbar
                    ? "p-0 py-1 ml-1"
                    : windowHeight <= 930
                    ? "p-2 xl:p-2.5"
                    : "p-2 xl:p-4"
                } ${
                    !showScrollbar &&
                    "hover:bg-[#e7e7e8] dark:hover:bg-colorHover"
                  }`}
                >
                  <item.icon
                    width="24"
                    height="24"
                    fill="fill-black dark:fill-white"
                  />
                  <span
                    className={`ml-0 xl:ml-5 text-xl hidden xl:inline dark:group-hover:text-gray-200 transition-colors duration-200 ${
                      isActive ? "font-bold" : ""
                    }`}
                  >
                    {item.text}
                  </span>
                </button>
              ) : (
                <Link href={item.path} className="block">
                  <button
                    className={`mt-2.5 xl:mt-0 w-full flex items-center justify-start group rounded-full transition-all duration-200  ${
                      showScrollbar
                        ? "p-0 py-1 ml-1"
                        : windowHeight <= 930
                        ? "p-2 xl:p-2.5"
                        : "p-2 xl:p-4"
                    } ${
                      !showScrollbar &&
                      "hover:bg-[#e7e7e8] dark:hover:bg-colorHover"
                    }`}
                  >
                    <item.icon width="24" height="24" fill="white" />
                    <span
                      className={`ml-5 mr-2 text-xl hidden xl:inline dark:group-hover:text-gray-200 transition-colors duration-200 ${
                        isActive ? "font-bold" : ""
                      }`}
                    >
                      {item.text}
                    </span>
                  </button>
                </Link>
              )}

              {/* More dropdown */}
              {isMoreItem && isMoreOpen && (
                <div className="z-40 absolute left-full top-0 xl:left-0 xl:mt-14 w-64 bg-black border border-gray-800 rounded-lg shadow-lg">
                  {moreItems.map((moreItem, idx) => (
                    <Link
                      key={idx}
                      href={`/${moreItem.toLowerCase().replace(/\s+/g, "-")}`}
                      className="block px-4 py-2 hover:bg-gray-900 text-white"
                      onClick={() => setIsMoreOpen(false)}
                    >
                      {moreItem}
                    </Link>
                  ))}
                </div>
              )}
            </li>
          );
        })}

        {/* Post Button */}
        <div className={`mt-2  ${showScrollbar ? "py-2" : "mr-0"} w-full`}>
          <button className="dark:bg-white  bg-[#0f1419] dark:hover:bg-neutral-100 hover:bg-[#272c30] dark:text-black text-white font-bold rounded-full w-full h-9 xl:h-12 flex items-center justify-center transition-all duration-200  ">
            <span className="hidden xl:inline">Post</span>
            <PostIcon className="inline xl:hidden" />
          </button>
        </div>
      </ul>

      {/* Profile Section */}
      <div className="w-full px-3.5 mb-4 cursor-pointer hover:bg-[#e7e7e8] mr-2 rounded-full">
        <div className="flex items-center justify-start p-3 hover:bg-colorHover rounded-full transition-all duration-200">
          <ProfileIcon />
          <span className="hidden xl:inline mx-4 text-lg">
            @{username ? username : "Profile bottom"}
          </span>

          <button className="hidden xl:inline">
            <MoreIcon />{" "}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
