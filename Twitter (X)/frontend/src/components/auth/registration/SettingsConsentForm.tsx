"use client";

import React from "react";
import {
  useRegisterUserMutation,
  useSendEmailConfirmationCodeMutation,
} from "@/app/lib/api/authApi";
import { GoBackIcon, XLogo } from "@/utils/icons";
import Checkbox from "../../form/CheckBox";
import CodeConfirmationForm from "./CodeConfirmationForm";

interface SettingsConsentFormProps {
  name: string;
  email: string;
  birthDate: string;
  onBack: (
    message: string,
    name: string,
    email: string,
    birthDate: string
  ) => void;
  isModal: boolean;
}

const SettingsConsentForm: React.FC<SettingsConsentFormProps> = ({
  name,
  email,
  birthDate,
  onBack,
  isModal,
}) => {
  const [showConfirmationForm, setShowConfirmationForm] =
    React.useState<boolean>(false);

  const [registerUser, { isLoading, isError, error }] =
    useRegisterUserMutation();

  const [username, setUsername] = React.useState<string>("");

  const [
    sendEmailConfirmationCode,
    { isLoading: isLoadingSendingEmailConfirmationCode },
  ] = useSendEmailConfirmationCodeMutation();

  React.useEffect(() => {
    return () => {
      document.documentElement.style.overflow = "hidden";
      document.documentElement.style.overscrollBehaviorY = "none";
    };
  }, []);

  // if not registered go back and show error message
  React.useEffect(() => {
    if (isError && error) {
      let message = "Registration failed. Please try again.";
      if (error && "data" in error && typeof error.data === "string") {
        message = error.data;
      }
      onBack(message, name, email, birthDate);
    }
  }, [isError, error, onBack, name, email, birthDate]);

  const handleRegister = async () => {
    try {
      // Register the user
      const userObject = await registerUser({
        name,
        email,
        birthDate,
      }).unwrap();

      await sendEmailConfirmationCode({ username: userObject.username });
      setUsername(userObject.username);

      //show form to confirm the code sent
      setShowConfirmationForm(true);
    } catch (err) {
      // Error handling is managed by useEffect, by going back
      console.error(err);
    }
  };

  const handleGoBack = () => {
    onBack("", name, email, birthDate);
  };

  if (showConfirmationForm) {
    return (
      <CodeConfirmationForm
        username={username}
        email={email}
        isModal={isModal}
      />
    );
  }
  return (
    <div className="fixed inset-0 z-50">
      <div
        className={`absolute inset-0 ${
          isModal ? "dark:bg-black/50 bg-black/40" : "dark:bg-black bg-white"
        } transition-colors duration-300`}
      ></div>
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
          <div className="px-8 md:px-20 pb-72 md:pb-28 overflow-y-auto">
            <h1 className="text-2xl md:text-3xl font-bold mb-8">
              Customize your experience
            </h1>
            <div className="leading-5 my-4">
              <h2 className="text-xl mb-2 font-bold">Get more out of X</h2>
              <div className="relative">
                <div className="absolute top-0 right-0">
                  <Checkbox />
                </div>
                <div className="pr-10">
                  <p>
                    Receive email about your X activity and recommendations.
                  </p>
                </div>
              </div>
            </div>
            <div className="leading-5 my-4">
              <h2 className="text-xl mb-2 font-bold">
                Connect with people you know
              </h2>
              <div className="relative">
                <div className="absolute top-0 right-0">
                  <Checkbox />
                </div>
                <div className="pr-10">
                  <p>Let others find your X account by your email address.</p>
                </div>
              </div>
            </div>

            <div className="leading-5 my-4">
              <h2 className="text-xl mb-2 font-bold">Personalized ads</h2>
              <div className="relative">
                <div className="absolute top-0 right-0">
                  <Checkbox />
                </div>
                <div className="pr-10">
                  <p>
                    You will always see ads on X based on your X activity. When
                    this setting is enabled, X may further personalize ads from
                    X advertisers, on and off X, by combining your X activity
                    with other online activity and information from our
                    partners.
                  </p>
                </div>
              </div>
            </div>

            <p className=" mt-8 leading-5 text-[#62656a]">
              By signing up, you agree to our{" "}
              <a href="#" className="text-[#1d9bf0]">
                Terms
              </a>
              ,{" "}
              <a href="#" className="text-[#1d9bf0]">
                Privacy Policy
              </a>
              , and{" "}
              <a href="#" className="text-[#1d9bf0]">
                Cookie Use
              </a>
              . X may use your contact information, including your email address
              and phone number for purposes outlined in our Privacy Policy.{" "}
              <a href="#" className="text-[#1d9bf0]">
                Learn more
              </a>
            </p>
          </div>
          <div className="border-0 md:border-t border-borderColor md:shadow-glow dark:bg-black md:py-[43px] rounded-2xl flex items-center justify-center">
            <button
              onClick={handleRegister}
              disabled={isLoading || isLoadingSendingEmailConfirmationCode}
              className={`px-[317px] mb-6 md:mb-0 md:px-[202px] font-bold py-3 rounded-full ${
                isLoading || isLoadingSendingEmailConfirmationCode
                  ? "bg-[#87898c] dark:bg-[#787a7a] text-white dark:text-black cursor-not-allowed"
                  : "dark:bg-white dark:text-black bg-[#171c20] hover:bg-[#272c30] text-white dark:hover:bg-gray-200"
              }`}
            >
              {isLoading || isLoadingSendingEmailConfirmationCode
                ? "Loading..."
                : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsConsentForm;
