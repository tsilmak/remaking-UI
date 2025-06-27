import React from "react";

const RightSidebar = () => {
  return (
    <div className="w-[350px] z-40 pl-4 mr-4 hidden lg:block">
      {/* Search */}
      <div className="sticky top-0 bg-white dark:bg-black backdrop-blur-md py-1">
        <input
          type="text"
          placeholder="Search"
          className="w-full dark:bg-black bg-white text-white border border-borderColor rounded-full px-4 py-2 focus:outline-none focus:border-[#1d9bf0]"
        />
      </div>

      {/* Subscribe to Premium */}
      <div className="dark:bg-black  bg-white  border-borderColor border rounded-2xl p-3 mt-1">
        <h2 className="text-xl font-bold mb-1.5">Subscribe to Premium</h2>
        <p className="text-[#0f1419] dark:text-white font-light leading-2">
          Subscribe to unlock new features and if eligible, receive a share of
          revenue.
        </p>
        <button className="bg-[#1d9bf0] hover:bg-[#1a8cd8] text-white font-bold py-1.5 px-4 rounded-full mt-2 justify-start">
          Subscribe
        </button>
      </div>

      {/* Who to Follow */}
      <div className="bg-white dark:bg-black  mt-4 border-borderColor border rounded-2xl">
        <h2 className="text-xl font-bold text-black p-2.5 mx-1.5 dark:text-white">
          Who to follow
        </h2>
        <div>
          <div className="hover:bg-[#f7f7f7] dark:hover:bg-[#080808] w-full px-4 py-2 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gray-600 rounded-full" />
              <div>
                <p className="font-bold">Countdown ⏳</p>
                <p className="text-gray-500">@Countdown</p>
              </div>
            </div>
            <button className="text-sm dark:bg-white bg-black hover:bg-[#272c30] text-white dark:text-black font-bold py-1.5 px-4 rounded-full">
              Follow
            </button>
          </div>
          <div className="hover:bg-[#f7f7f7] dark:hover:bg-[#080808] px-4 py-2 flex items-center justify-between ">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gray-600 rounded-full" />
              <div>
                <p className="font-bold">Countdown ⏳</p>
                <p className="text-gray-500">@Countdown</p>
              </div>
            </div>
            <button className="text-sm dark:bg-white bg-black hover:bg-[#272c30] text-white dark:text-black font-bold py-1.5 px-4 rounded-full">
              Follow
            </button>
          </div>
          <div className="hover:bg-[#f7f7f7] dark:hover:bg-[#080808] px-4 py-2 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gray-600 rounded-full" />
              <div>
                <p className="font-bold">Countdown ⏳</p>
                <p className="text-gray-500">@Countdown</p>
              </div>
            </div>
            <button className="text-sm dark:bg-white bg-black hover:bg-[#272c30] text-white dark:text-black font-bold py-1.5 px-4 rounded-full">
              Follow
            </button>
          </div>
        </div>
        <div className="hover:bg-[#f7f7f7] dark:hover:bg-[#080808] rounded-b-2xl cursor-pointer ">
          <button className="text-[#1d9bf0]  my-4 mx-4">Show more</button>
        </div>
      </div>

      {/* Trending Now */}
      <div className="dark:bg-black  bg-white rounded-xl p-4 mt-4  border  border-borderColor">
        <h2 className="text-xl font-bold">What&apos;s happening</h2>
        <div className="mt-4">
          <div className="mt-2">
            <p className="font-bold">Grok 3 is here. Try it for free.</p>
            <p className="text-gray-500">LIVE</p>
          </div>
          <div className="mt-2">
            <p className="text-gray-500">Trending in Portugal</p>
            <p className="font-bold">Tiago Grila</p>
          </div>
          <div className="mt-2">
            <p className="text-gray-500">Trending in Portugal</p>
            <p className="font-bold">Ruy de Carvalho</p>
          </div>
          <div className="mt-2">
            <p className="text-gray-500">Trending in Portugal</p>
            <p className="font-bold">Peculiar</p>
            <p className="text-gray-500">4,242 posts</p>
          </div>
          <div className="mt-2">
            <p className="text-gray-500">Trending in Portugal</p>
            <p className="font-bold">Hugo Soares</p>
          </div>
        </div>
        <button className="text-[#1d9bf0] mt-2">Show more</button>
      </div>

      {/* Footer Links */}
      <div className="text-gray-500 text-sm mt-4 flex flex-wrap gap-2">
        <a href="#" className="hover:underline">
          Terms of Service
        </a>
        <a href="#" className="hover:underline">
          Privacy Policy
        </a>
        <a href="#" className="hover:underline">
          Cookie Policy
        </a>
        <a href="#" className="hover:underline">
          Accessibility
        </a>
        <a href="#" className="hover:underline">
          Ads info
        </a>
        <span>More etc etc you know how X is</span>
      </div>
    </div>
  );
};

export default RightSidebar;
