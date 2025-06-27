"use client";

import Link from "next/link";
import React, { useState } from "react";
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
  ActiveProfileIcon,
  ProfileIcon,
} from "@/utils/icons";

const MobileSidebar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    {
      icon: pathname === "/home" ? ActiveHomeIcon : HomeIcon,
      text: "Home",
      path: "/home",
    },
    {
      icon: pathname === "/explore" ? ActiveSearchIcon : SearchIcon,
      text: "Explore",
      path: "/explore",
    },
    {
      icon:
        pathname === "/notifications"
          ? ActiveNotificationIcon
          : NotificationIcon,
      text: "Notifications",
      path: "/notifications",
    },
    {
      icon: pathname === "/messages" ? ActiveMessageIcon : MessageIcon,
      text: "Messages",
      path: "/messages",
    },
    {
      icon: pathname === "/username" ? ActiveProfileIcon : ProfileIcon,
      text: "Profile",
      path: "/username",
    },
  ];

  return (
    <>
      {/* Profile icon top */}
      <div className="w-full">
        <button
          className="fixed top-2 left-2 z-40 p-0.5 bg-black rounded-full border-white border-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          <ProfileIcon />
        </button>
      </div>

      {/* Mobile Sidebar */}
      <nav
        className={`fixed top-0 left-0 h-screen w-64 bg-black text-white flex flex-col transform transition-transform duration-300 ease-in-out z-40  ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close Button */}
        <button className="self-end p-4" onClick={() => setIsOpen(false)}>
          <XLogo width={"24"} height={"24"} fill={"white"} />
        </button>

        {/* Navigation Items */}
        <ul className="w-full px-4 flex flex-col gap-2">
          {navItems.map((item, index) => {
            const isActive = pathname === item.path;
            return (
              <li key={index}>
                <Link href={item.path} onClick={() => setIsOpen(false)}>
                  <div
                    className={`flex items-center p-3 rounded-full hover:bg-gray-800 ${
                      isActive ? "font-bold" : ""
                    }`}
                  >
                    <item.icon />
                    <span className="ml-4 text-lg">{item.text}</span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Post Button */}
        <div className="px-4 mt-4">
          <button className="w-full bg-white text-black font-bold rounded-full h-12 flex items-center justify-center">
            <span>Post</span>
          </button>
        </div>

        {/* Profile Section */}
        <div className="mt-auto px-4 mb-4">
          <div className="flex items-center p-3 rounded-full hover:bg-gray-800">
            <ProfileIcon />
            <span className="ml-4 text-lg">Profile</span>
          </div>
        </div>
      </nav>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 xl:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default MobileSidebar;
