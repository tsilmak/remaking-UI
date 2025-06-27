import Navigation from "@/hooks/Navigation";
import { XLogo } from "@/utils/icons";
import React from "react";

export const ProfilePictureFormModal: React.FC = () => {
  return (
    <div className="flex justify-center min-h-screen dark:bg-black">
      <div className="sm:flex max-w-screen-xl w-full relative">
        <Navigation />
        <div className="absolute inset-0 dark:bg-black/50 bg-black/40 transition-colors duration-300" />
        <main className="ml-40 w-full flex items-center justify-center relative z-10">
          <div className="dark:bg-black bg-white md:border border-borderColor rounded-2xl w-full md:w-[600px] h-full md:h-[650px] md:max-w-2xl md:mx-4 flex flex-col justify-between">
            <div className="flex justify-center pt-3 pb-8">
              <XLogo width="32" height="32" fill="fill-black dark:fill-white" />
            </div>
            {/* md:px-20 pb-72 md:pb-64  */}
            <div className="px-8  overflow-y-auto">
              <h1 className="text-2xl md:text-3xl font-bold mb-8">
                Pick a profile picture
              </h1>
              <p className="leading-[0px]">
                Have a favorite selfie? Upload it now.
              </p>
              <div className="flex justify-center items-center ">
                <div className="w-44 h-44 bg-red-500 rounded-full my-24 cursor-pointer hover:bg-red-600"></div>
              </div>
            </div>

            <div className="border-0 dark:bg-black md:py-[38px] rounded-2xl flex items-center justify-center">
              <button
                onClick={() => console.log("Hhh")}
                disabled={false}
                className={`px-[317px] mb-6 md:mb-0 md:px-[202px] font-bold py-3 rounded-full ${
                  false
                    ? "bg-[#87898c] dark:bg-[#787a7a] text-white dark:text-black cursor-not-allowed"
                    : "dark:bg-white dark:text-black bg-[#171c20] hover:bg-[#272c30] text-white dark:hover:bg-gray-200"
                }`}
              >
                {false ? "Loading..." : "Skip for now"}
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export const ProfilePictureFormNonModal: React.FC = () => {
  return (
    <div className="flex justify-center min-h-screen dark:bg-black">
      <div
        className={`z-20 absolute inset-0 ${"dark:bg-black/55 bg-white"} transition-colors duration-300`}
      />
      <div className="z-30 sm:flex max-w-screen-xl w-full relative">
        <main className="w-full flex items-center justify-center relative z-10 mr-24">
          <div className="dark:bg-black bg-white md:border border-borderColor rounded-2xl w-full md:w-[600px] h-full md:h-[650px] md:max-w-2xl md:mx-4 flex flex-col justify-between ">
            <div className="flex justify-center pt-3 pb-8">
              <XLogo width="32" height="32" fill="fill-black dark:fill-white" />
            </div>
            <div className="px-8 md:px-20 pb-72 md:pb-64 overflow-y-auto">
              <h1 className="text-2xl md:text-3xl font-bold mb-8">
                Pick a profile picture
              </h1>
              <p>Have a favorite selfie? Upload it now.</p>
            </div>
            <div className="flex justify-center items-center ">
              <div className="w-44 h-44 bg-red-500 rounded-full my-24 cursor-pointer hover:bg-red-600"></div>
            </div>
            <div className="border-0 dark:bg-black md:py-[38px] rounded-2xl flex items-center justify-center"></div>{" "}
          </div>
        </main>
      </div>
    </div>
  );
};
