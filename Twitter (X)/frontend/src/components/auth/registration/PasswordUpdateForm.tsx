"use client";

import { XLogo } from "@/utils/icons";
import React from "react";
import Input from "../../form/Input";
import { useUpdatePasswordMutation } from "@/app/lib/api/authApi";
import {
  ProfilePictureFormModal,
  ProfilePictureFormNonModal,
} from "./ProfilePictureForm";
import { setUser } from "@/app/lib/features/user/userSlice";
import { useAppDispatch } from "@/app/lib/hooks";

type PasswordUpdateFormProps = {
  isModal: boolean;
  username: string;
};

const PasswordUpdateForm = ({ isModal, username }: PasswordUpdateFormProps) => {
  const dispatch = useAppDispatch();

  const [updatePassword, { isLoading, isError, error }] =
    useUpdatePasswordMutation();

  const [errorMessage, setErrorMessage] = React.useState<string>("");
  const [isInputError, setIsInputError] = React.useState<boolean>(false);
  const [password, setPassword] = React.useState<string>("");

  const [showProfilePictureUpdateForm, setShowProfilePictureUpdateForm] =
    React.useState<boolean>(false);

  const handleUpdateUserPassword = async () => {
    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters.");
      setIsInputError(true);
      return;
    }

    try {
      await updatePassword({ password, username }).unwrap();
      dispatch(setUser({ username: username, profilePictureSrc: "" }));
      setShowProfilePictureUpdateForm(true);
    } catch (err) {
      console.error("Confirmation failed:", err);
      setErrorMessage(
        isError && error && "data" in error && typeof error.data === "string"
          ? error.data
          : "Password update failed. Please try again."
      );
      setIsInputError(true);
    }
  };

  if (showProfilePictureUpdateForm) {
    if (isModal) return <ProfilePictureFormModal />;
    if (!isModal) return <ProfilePictureFormNonModal />;
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
          <div className="flex justify-center pt-3 pb-8">
            <XLogo width="32" height="32" fill="fill-black dark:fill-white" />
          </div>
          <div className="px-8 md:px-20 pb-96 md:pb-64">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">
                You will need a password
              </h1>
              <p className="dark:text-neutral-500 mb-6 mt-2">
                Must be 8 characters or more.
              </p>
            </div>
            <Input
              inputId="password"
              inputNamePlaceHolder="Password"
              maxCharLength={128}
              onChange={(value) => {
                setPassword(value);
                if (value.length > 128) {
                  setErrorMessage("Password must be less than 128 characters.");
                  setIsInputError(true);
                } else if (isInputError && value.length >= 8) {
                  setIsInputError(false);
                }
              }}
              isInputTextValid={password.length <= 128}
              inputTextInvalidText={errorMessage}
              isInputNumeric={false}
            />
          </div>

          <div className="border-0 dark:bg-black md:py-[38px] rounded-2xl flex items-center justify-center">
            <button
              onClick={handleUpdateUserPassword}
              disabled={
                !password ||
                isLoading ||
                password.length > 128 ||
                password.length < 8
              }
              className={`px-[317px] mb-6 md:mb-0 md:px-[202px] font-bold py-3 rounded-full ${
                !password ||
                isLoading ||
                password.length > 128 ||
                password.length < 8
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
export default PasswordUpdateForm;
