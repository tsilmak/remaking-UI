"use client";
import React, { useState, useEffect } from "react";
import { GoBackIcon, XLogo } from "@/utils/icons";

import {
  useSendEmailConfirmationCodeMutation,
  useVerifyEmailConfirmationCodeMutation,
} from "@/app/lib/api/authApi";
import PasswordUpdateForm from "./PasswordUpdateForm";
import Input from "@/components/form/Input";

type CodeConfirmationFormProps = {
  email: string;
  username: string;
  isModal: boolean;
};

const CodeConfirmationForm: React.FC<CodeConfirmationFormProps> = ({
  email,
  isModal,
  username,
}) => {
  const [
    resendEmailConfirmationCode,
    { isLoading: isLoadingResendEmailConfirmationCode },
  ] = useSendEmailConfirmationCodeMutation();

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isInputError, setIsInputError] = useState<boolean>(false);
  const [code, setCode] = useState<string>("");
  const [resendText, setResendText] = useState<string>("Check your spam inbox");
  const [isResendDisabled, setIsResendDisabled] = useState<boolean>(true);
  const [cooldownTime, setCooldownTime] = useState<number>(60); // 1 minute in seconds
  const [isInCooldown, setIsInCooldown] = useState<boolean>(true);

  const [confirmCode, { isLoading, isError, error }] =
    useVerifyEmailConfirmationCodeMutation();
  const [showSetPasswordForm, setShowPasswordForm] = useState<boolean>(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isInCooldown && cooldownTime > 0) {
      timer = setInterval(() => {
        setCooldownTime((prevTime) => {
          const newTime = prevTime - 1;
          if (newTime <= 0) {
            setIsResendDisabled(false);
            setIsInCooldown(false);
            setResendText("Didn't receive an email?");
            clearInterval(timer);
          }
          return newTime;
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isInCooldown, cooldownTime]);

  const handleConfirmUserAccount = async () => {
    try {
      await confirmCode({ code, username }).unwrap();
      setShowPasswordForm(true);
    } catch (err) {
      console.error("Confirmation failed:", err);

      // Check for specific error conditions first
      if (
        isError &&
        error &&
        "data" in error &&
        typeof error.data === "string"
      ) {
        setErrorMessage(error.data);
      } else {
        // Default error message
        setErrorMessage(
          "Email confirmation failed. Please try again or request a new code."
        );
      }

      setIsInputError(true);
    }
  };

  // Clears the error when the user starts typing
  const handleCodeChange = (value: string) => {
    setCode(value);
    if (isInputError) {
      setIsInputError(false);
    }
  };

  const handleGoBack = () => {
    window.location.href = "/i/flow/login";
  };

  const handleResendEmail = () => {
    if (isResendDisabled) return;

    resendEmailConfirmationCode({ username });

    setIsResendDisabled(true);
    setIsInCooldown(true);
    setCooldownTime(60); // Reset to 1 minute
    setResendText("Check your spam inbox");
  };

  const formatCooldownTime = () => {
    const minutes = Math.floor(cooldownTime / 60);
    const seconds = cooldownTime % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  if (showSetPasswordForm) {
    return <PasswordUpdateForm isModal={isModal} username={username} />;
  }

  return (
    <div className="fixed inset-0 z-50">
      <div
        className={`absolute inset-0 ${
          isModal ? "dark:bg-black/50 bg-black/40" : "dark:bg-black bg-white"
        } transition-colors duration-300`}
      />
      <div className="flex items-center justify-center h-full">
        <div className="relative dark:bg-black bg-white md:border border-borderColor rounded-2xl w-full md:w-[600px] h-full md:h-[650px] md:max-w-2xl md:mx-4 z-10 flex flex-col justify-between">
          <button
            onClick={handleGoBack}
            className="absolute top-2 left-2 rounded-full p-2 hover:bg-[#e7e7e8] dark:hover:bg-gray-800/50"
          >
            <GoBackIcon
              width="20"
              height="20"
              fill="fill-black dark:fill-white"
            />
          </button>
          <div className="flex justify-center pt-3 pb-8">
            <XLogo width="32" height="32" fill="fill-black dark:fill-white" />
          </div>
          <div className="px-8 md:px-20 pb-72 md:pb-64 overflow-y-auto">
            <h1 className="text-2xl md:text-3xl font-bold mb-8">
              We sent you a code
            </h1>
            <p className="mb-4">Enter it below to verify {email}.</p>
            <Input
              inputId={"code"}
              inputNamePlaceHolder={"Verification code"}
              maxCharLength={6}
              onChange={handleCodeChange}
              isInputTextValid={!isInputError}
              inputTextInvalidText={errorMessage}
              isInputNumeric={true}
            />
            <div className="flex items-center text-sm mt-0.5 dark:text-neutral-400 ml-1">
              <button
                onClick={handleResendEmail}
                disabled={isResendDisabled}
                className={`hover:underline hover:text-blue-400 ${
                  isResendDisabled
                    ? "cursor-not-allowed opacity-80"
                    : "cursor-pointer"
                }`}
              >
                {isLoadingResendEmailConfirmationCode
                  ? "Sending..."
                  : resendText}
              </button>
              {isInCooldown && (
                <span className="ml-2 text-neutral-500">
                  ({formatCooldownTime()})
                </span>
              )}
            </div>
          </div>
          <div className="border-0 dark:bg-black md:py-[38px] rounded-2xl flex items-center justify-center">
            <button
              onClick={handleConfirmUserAccount}
              disabled={!code || isLoading}
              className={`px-[317px] mb-6 md:mb-0 md:px-[202px] font-bold py-3 rounded-full ${
                !code || isLoading
                  ? "bg-[#87898c] dark:bg-[#787a7a] text-white dark:text-black cursor-not-allowed"
                  : "dark:bg-white dark:text-black bg-[#171c20] hover:bg-[#272c30] text-white dark:hover:bg-gray-200"
              }`}
            >
              {isLoading ? "Loading..." : "Confirm"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeConfirmationForm;
