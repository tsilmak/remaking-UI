"use client";
import React, { createContext, useContext, useState } from "react";

// Create a context to share tab state
export const TabContext = createContext({
  selectedTab: "For you",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setSelectedTab: (_value: string) => {},
});

// Provider component
export const TabProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedTab, setSelectedTab] = useState("For you");

  return (
    <TabContext.Provider value={{ selectedTab, setSelectedTab }}>
      {children}
    </TabContext.Provider>
  );
};

// Custom hook to use the tab context
export const useTabContext = () => useContext(TabContext);

// Tab component
const Tab = () => {
  const { selectedTab, setSelectedTab } = useTabContext();

  return (
    <div className="text-sm sticky top-0 dark:bg-black bg-opacity-80 backdrop-blur-md border-b border-borderColor">
      <div className="flex">
        <button
          className="w-1/2 py-3 text-center dark:hover:bg-colorHover hover:bg-[#e7e7e8] relative transition-colors duration-200"
          onClick={() => setSelectedTab("For you")}
        >
          {selectedTab === "For you" && (
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[55px] border-b-4 border-sky-500 rounded-full"></div>
          )}
          <h1
            className={`font-bold my-1 ${
              selectedTab === "For you" ? "" : " text-[#6c7075]"
            }`}
          >
            For you
          </h1>
        </button>
        <button
          className="w-1/2 py-3 text-center dark:hover:bg-colorHover hover:bg-[#e7e7e8] relative transition-colors duration-200"
          onClick={() => setSelectedTab("Following")}
        >
          {selectedTab === "Following" && (
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[55px] border-b-4 border-sky-500 rounded-b-full"></div>
          )}
          <h1
            className={`font-bold my-1 ${
              selectedTab === "Following" ? "" : " text-[#6c7075]"
            }`}
          >
            Following
          </h1>
        </button>
      </div>
    </div>
  );
};

export default Tab;
