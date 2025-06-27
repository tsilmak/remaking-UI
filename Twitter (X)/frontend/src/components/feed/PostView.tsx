import React from "react";
import {
  BookMarkIcon,
  LikeIcon,
  ReplyIcon,
  RepostIcon,
  ShareIcon,
  ViewIcon,
} from "@/utils/icons";
import Image from "next/image";

interface PostViewProps {
  name: string;
  username: string;
  postContent: string;
  postDate: string;
  postLikes: number;
  postComments: number;
  postRetweets: number;
  postViews: number;
  profileImageUrl?: string;
}

// Utility function to format large numbers
const formatCount = (count: number): string => {
  if (count < 1000) {
    return count.toString();
  }

  if (count < 1000000) {
    const thousands = count / 1000;
    // If it's a whole number, don't show decimal
    if (thousands === Math.floor(thousands)) {
      return Math.floor(thousands) + "K";
    }
    // Otherwise show one decimal place
    return thousands.toFixed(1) + "K";
  }

  const millions = count / 1000000;
  if (millions === Math.floor(millions)) {
    return Math.floor(millions) + "M";
  }
  return millions.toFixed(1) + "M";
};

const PostView: React.FC<PostViewProps> = ({
  name,
  username,
  postContent,
  postDate,
  postLikes,
  postComments,
  postRetweets,
  postViews,
  profileImageUrl,
}) => {
  return (
    <article
      className="border-b  border-borderColor p-3 dark:hover:bg-[#080808] hover:bg-[#f7f7f7] transition-colors duration-200 cursor-pointer"
      aria-label={`Post by ${name}`}
    >
      <div className="flex space-x-2.5">
        {/* Profile Image */}
        <div
          className="w-10 h-10 rounded-full bg-neutral-500 flex-shrink-0 overflow-hidden"
          aria-label={`${name}'s profile picture`}
        >
          {profileImageUrl ? (
            <Image
              src={profileImageUrl}
              alt={`${name}'s profile`}
              className="w-full h-full object-cover"
            />
          ) : null}
        </div>

        {/* Post Content */}
        <div className="flex-1 ">
          {/* User Info */}
          <div className="flex items-center space-x-1.5  ">
            <span className="font-bold ">{name}</span>
            <span className="text-neutral-500 ">
              @{username} · {postDate}
            </span>
          </div>

          {/* Post Text */}
          <p className="mb-1.5">{postContent}</p>

          {/* Post Interactions */}
          <div
            aria-label={`${postComments} replies, ${postRetweets} reposts, ${postLikes} likes, ${postViews} views`}
            role="group"
            className="flex flex-row items-stretch"
          >
            {/* Reply */}
            <div className="flex flex-row flex-1 text-sm text-neutral-500">
              <button
                aria-label={`${postComments} Replies. Reply`}
                role="button"
                className="group flex items-center hover:text-sky-500 transition-colors -ml-2"
              >
                <div className="p-2 rounded-full group-hover:bg-sky-500/10">
                  <ReplyIcon width="20" height="20" fill="currentColor" />
                </div>
                <span className="-ml-1">{formatCount(postComments)}</span>
              </button>
            </div>

            {/* Repost */}
            <div className="flex flex-row flex-1 text-sm text-neutral-500">
              <button
                aria-label={`${postRetweets} Reposts. Repost`}
                role="button"
                className="group flex items-center hover:text-green-500 transition-colors -ml-2"
              >
                <div className="p-2 rounded-full group-hover:bg-green-500/10">
                  <RepostIcon width="20" height="20" fill="currentColor" />
                </div>
                <span className="-ml-1">{formatCount(postRetweets)}</span>
              </button>
            </div>

            {/* Like */}
            <div className="flex flex-row flex-1 text-sm text-neutral-500">
              <button
                aria-label={`${postLikes} Likes. Like`}
                role="button"
                className="group flex items-center hover:text-pink-500 transition-colors -ml-1.5"
              >
                <div className="p-2 rounded-full group-hover:bg-pink-500/10">
                  <LikeIcon width="20" height="20" fill="currentColor" />
                </div>
                <span className="-ml-1">{formatCount(postLikes)}</span>
              </button>
            </div>

            {/* Views */}
            <div className="flex flex-row flex-1 text-sm text-neutral-500">
              <a
                href="#"
                aria-label={`${postViews} Views. View post analytics`}
                role="link"
                className="group flex items-center hover:text-sky-500 transition-colors -ml-2"
              >
                <div className="p-2 rounded-full group-hover:bg-sky-500/10">
                  <ViewIcon width="20" height="20" fill="currentColor" />
                </div>
                <span className="-ml-1">{formatCount(postViews)}</span>
              </a>
            </div>

            {/* Bookmark */}
            <div className="text-neutral-500">
              <button
                aria-label="Bookmark"
                role="button"
                className="group flex items-center hover:text-sky-500 transition-colors -ml-2"
              >
                <div className="p-2 mr-1.5 rounded-full group-hover:bg-sky-500/10">
                  <BookMarkIcon width="20" height="20" fill="currentColor" />
                </div>
              </button>
            </div>
            {/* Share */}
            <div className="text-neutral-500">
              <button
                aria-label="Share"
                role="button"
                className="group flex items-center hover:text-sky-500 transition-colors -ml-2"
              >
                <div className="p-2 rounded-full group-hover:bg-sky-500/10">
                  <ShareIcon width="20" height="20" fill="currentColor" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostView;
