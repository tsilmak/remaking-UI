"use client";

import { CloseIcon, XLogo } from "@/utils/icons";
import { useRouter } from "next/navigation";
import GoogleSignUpButton from "../buttons/GoogleSignUpButton";
import AppleSignUpButton from "../buttons/AppleSignUpButton";
import React from "react";
import Input from "../form/Input";

export default function LoginForm({ isModal = false }) {
  const router = useRouter();

  // Apply overflow: hidden and overscroll-behavior-y: none to html when modal is open
  React.useEffect(() => {
    if (isModal) {
      document.documentElement.style.overflow = "hidden";
      document.documentElement.style.overscrollBehaviorY = "none";
    }

    return () => {
      document.documentElement.style.overflow = "";
      document.documentElement.style.overscrollBehaviorY = "";
    };
  }, [isModal]);

  if (!isModal) {
    return (
      <LoginFormContent onClose={() => router.push("/")} isModal={isModal} />
    );
  }

  // If Modal render with backdrop
  return <LoginFormContent onClose={() => router.back()} isModal={isModal} />;
}
function LoginFormContent({
  onClose,
  isModal,
}: {
  onClose: () => void;
  isModal: boolean;
}) {
  return (
    <div className="fixed inset-0 z-50 ">
      <div
        className={`absolute inset-0 ${
          isModal
            ? "dark:bg-black/50 bg-neutral-400/50"
            : "dark:bg-black bg-white"
        } transition-colors duration-300`}
      ></div>

      {/* Modal content */}
      <div className="flex items-center justify-center h-full">
        <div
          className="px-24 w-[600px] max-w-xl relative bg-white dark:bg-black border border-borderColor rounded-2xl  mx-4 z-10"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-2 left-2 rounded-full p-2  hover:bg-[#e7e7e8] dark:hover:bg-gray-800/50"
          >
            <CloseIcon
              width={"18"}
              height={"18"}
              fill="fill-black dark:fill-white"
            />
          </button>

          {/* Logo */}
          <div className="flex justify-center pt-2 pb-8">
            <div className="w-8 h-8">
              <XLogo
                width="100%"
                height="100%"
                fill="fill-black dark:fill-white"
              />
            </div>
          </div>

          {/* Login form */}
          <div className="px-8 pb-8">
            <h1 className="text-3xl font-bold mb-6 dark:text-white text-black">
              Sign in to X
            </h1>

            <div className="space-y-3 mb-3">
              {/* Google login button */}
              {/* TODO CHANGE IT TO LOGIN */}
              <div className="mb-6">
                <GoogleSignUpButton />
              </div>

              {/* Apple login button */}
              <AppleSignUpButton />
            </div>

            {/* Divider */}
            <div className="flex items-center my-4">
              <hr className="flex-1 h-[1px] bg-[#cfd9de] dark:bg-[#2F3336] border-none" />
              <p className="mx-2 text-sm">or</p>
              <hr className="flex-1 h-[1px] bg-[#cfd9de] dark:bg-[#2F3336] border-none" />
            </div>

            {/* Email/phone input */}
            <div className="mb-8">
              <Input
                inputId={"userIdentification"}
                inputNamePlaceHolder={"Phone, email address, or username"}
                onChange={function (): void {
                  throw new Error("Function not implemented.");
                }}
                maxCharLength={0}
                isInputTextValid={false}
                isInputNumeric={false}
              />
            </div>

            {/* Next button */}
            <button className="mb-4 w-full dark:bg-white hover:bg-[#272c30] bg-black text-white  dark:text-black font-bold py-1.5  rounded-full dark:hover:bg-gray-200">
              Next
            </button>

            {/* Forgot password */}
            <button className="w-full border border-borderColor dark:text-white text-black font-bold py-1.5 rounded-full mt-3 hover:bg-[#e7e7e8]  dark:hover:bg-gray-900">
              Forgot password?
            </button>

            {/* Sign up prompt */}
            <p className="mt-8 text-gray-500">
              Dont have an account?{" "}
              <a href="#" className="text-[#1d9bf0] hover:underline">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
