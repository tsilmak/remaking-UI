"use client";
import { ExpandIcon, NewMessageIcon } from "@/utils/icons";
import { usePathname } from "next/navigation";
import React from "react";

const MessagesButton = () => {
  const pathname = usePathname();
  const excludedRoutes = ["/messages", "/i/grok", "/jobs"];

  // Don't render MessagesButton on excluded routes
  if (excludedRoutes.includes(pathname)) return null;

  return (
    <div className="messages-button cursor-pointer hidden lg:block rounded-t-2xl shadow-glow h-[53px] w-[400px] fixed bottom-0 right-5 dark:bg-black bg-white z-10">
      <div className="p-3.5 ml-1 w-full flex justify-between items-center">
        <h1 className="text-xl font-bold text-primaryText">Messages</h1>
        <div className="flex gap-4 mr-3.5">
          <NewMessageIcon
            width="20"
            height="20"
            fill="fill-black dark:fill-white"
          />
          <ExpandIcon
            width="20"
            height="20"
            fill="fill-black dark:fill-white"
          />
        </div>
      </div>
    </div>
  );
};

export default MessagesButton;
