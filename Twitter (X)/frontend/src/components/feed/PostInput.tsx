"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  EmojiIcon,
  GifIcon,
  GrokIcon,
  LocationIcon,
  MediaIcon,
  PollIcon,
  ScheduleIcon,
} from "@/utils/icons";
import CharacterCount from "./CharacterCount";
import Link from "next/link";

const PostInput = () => {
  // Maybe get this from a global context
  const maxLength = 280;

  const [inputText, setInputText] = useState("");
  const textareaRef = useRef(null);
  const highlightRef = useRef(null);

  // Handle textarea input
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  // Auto-resize textarea when content changes
  useEffect(() => {
    if (textareaRef.current) {
      const textarea = textareaRef.current as HTMLTextAreaElement;
      // Reset height to get accurate scrollHeight
      textarea.style.height = "auto";
      // Set height to scrollHeight
      textarea.style.height = `${textarea.scrollHeight}px`;

      // Update highlight div height
      if (highlightRef.current) {
        const highlight = highlightRef.current as HTMLDivElement;
        highlight.style.height = `${textarea.scrollHeight}px`;
      }
    }
  }, [inputText]);

  // Create highlighted text
  const getHighlightedText = () => {
    if (inputText.length <= maxLength) {
      return <span>{inputText}</span>;
    }

    const normalText = inputText.substring(0, maxLength);
    const exceededText = inputText.substring(maxLength);

    return (
      <>
        <span>{normalText}</span>
        <span className="bg-red-500 bg-opacity-30 ">{exceededText}</span>
      </>
    );
  };

  return (
    <div className="p-3 border-b border-borderColor">
      <div className="flex space-x-3">
        <div className="w-11 h-11 bg-gray-600 rounded-full"></div>
        <div className="flex-1">
          {/* Highlight container */}
          <div className="relative">
            {/* Highlighted text */}
            <div
              ref={highlightRef}
              className="absolute top-0 left-0 right-0 w-full mt-2 text-xl text-transparent overflow-hidden whitespace-pre-wrap break-words pointer-events-none"
              aria-hidden="true"
            >
              {getHighlightedText()}
            </div>
            {/* Actual textarea */}
            <textarea
              ref={textareaRef}
              value={inputText}
              onChange={handleTextChange}
              className="w-full mt-2 bg-transparent border-none text-xl placeholder-gray-500 focus:outline-none resize-none overflow-hidden min-h-[50px] relative"
              placeholder="What is happening?!"
              rows={1}
              style={{
                caretColor: inputText.length > maxLength ? "#F4212E" : "auto",
              }}
            ></textarea>

            {/* If the user is not premium and exceeded the maxlen render a premium ad  */}
            {inputText.length > maxLength && (
              <div className="bg-[#02113d] p-3 rounded-lg my-2 text-sm">
                <h1>Upgrade to Premium+ to write longer posts and Articles.</h1>
                <Link
                  href={"/i/premium_sign_up?referring_page=post-composer"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <p className="underline mt-2 font-bold">
                    Upgrade to Premium+
                  </p>
                </Link>
              </div>
            )}
          </div>

          <div className="flex justify-between">
            <div className="flex space-x-1 justify-center items-center">
              <div className="rounded-full dark:hover:bg-[#031018] hover:bg-[#e8f5fd] cursor-pointer p-2">
                <MediaIcon />
              </div>
              <div className="rounded-full dark:hover:bg-[#031018] hover:bg-[#e8f5fd] cursor-pointer p-2">
                <GifIcon />
              </div>
              <div className="rounded-full dark:hover:bg-[#031018] hover:bg-[#e8f5fd] cursor-pointer p-2">
                <GrokIcon
                  width="20"
                  height="20"
                  fill="fill-[#1D9BF0] dark:fill-[#1D9BF0]"
                />
              </div>
              <div className="rounded-full dark:hover:bg-[#031018] hover:bg-[#e8f5fd] cursor-pointer p-2">
                <PollIcon width="20" height="20" fill="rgb(29, 155, 240)" />
              </div>
              <div className="rounded-full dark:hover:bg-[#031018] hover:bg-[#e8f5fd] cursor-pointer p-2">
                <EmojiIcon width="20" height="20" fill="rgb(29, 155, 240)" />
              </div>
              <div className="rounded-full dark:hover:bg-[#031018] hover:bg-[#e8f5fd] cursor-pointer p-2">
                <ScheduleIcon width="20" height="20" fill="rgb(29, 155, 240)" />
              </div>
              <div className="rounded-full p-2">
                <LocationIcon
                  width="20"
                  height="20"
                  fill="rgba(13,68,105,255)"
                />
              </div>
            </div>
            <div className="flex items-center">
              {/* Character count */}
              <div>
                <CharacterCount inputText={inputText} maxLength={maxLength} />
              </div>
              <div className="flex justify-between items-center gap-5">
                {inputText.trim() !== "" && (
                  <div className="font-bold flex items-center justify-center">
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      className="w-7 h-7"
                    >
                      <g>
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          fill="none"
                          stroke="#45545e"
                          strokeWidth="2"
                        />
                        <g transform="scale(0.7) translate(5.2, 5.2)">
                          <path
                            d="M11 11V4h2v7h7v2h-7v7h-2v-7H4v-2h7z"
                            fill="rgb(29, 155, 240)"
                          />
                        </g>
                      </g>
                    </svg>
                  </div>
                )}
                <button
                  disabled={
                    inputText.trim() === "" || inputText.length > maxLength
                  }
                  className={`bg-white text-black font-bold py-1.5 px-4 rounded-full ${
                    inputText.trim() === "" || inputText.length > maxLength
                      ? "bg-neutral-500"
                      : "hover:bg-neutral-100"
                  }`}
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostInput;
