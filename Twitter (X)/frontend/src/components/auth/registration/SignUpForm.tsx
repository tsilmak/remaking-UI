"use client";

import { CloseIcon, XLogo } from "@/utils/icons";
import { useRouter } from "next/navigation";
import React from "react";

import { isValidEmail } from "@/utils/validateEmail";
import SettingsConsentForm from "./SettingsConsentForm";
import Input from "@/components/form/Input";
import Snackbar from "@/components/common/Snackbar";

export default function SignUpForm({ isModal = false }) {
  const router = useRouter();

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
      <SignUpFormContent onClose={() => router.push("/")} isModal={isModal} />
    );
  }
  return <SignUpFormContent onClose={() => router.back()} isModal={isModal} />;
}

function SignUpFormContent({
  onClose,
  isModal,
}: {
  onClose: () => void;
  isModal: boolean;
}) {
  React.useEffect(() => {
    return () => {
      document.documentElement.style.overflow = "hidden";
      document.documentElement.style.overscrollBehaviorY = "none";
    };
  }, []);

  const [errorMessage, setErrorMessage] = React.useState<string>("");
  const [showConsentForm, setShowConsentForm] = React.useState<boolean>(false);
  const [selectedDay, setSelectedDay] = React.useState<string>("");
  const [isDayFocused, setIsDayFocused] = React.useState<boolean>(false);
  const [selectedMonth, setSelectedMonth] = React.useState<string>("");
  const [isMonthFocused, setIsMonthFocused] = React.useState<boolean>(false);
  const [selectedYear, setSelectedYear] = React.useState<string>("");
  const [isYearFocused, setIsYearFocused] = React.useState<boolean>(false);
  const [userName, setUserName] = React.useState<string>("");
  const [userEmail, setUserEmail] = React.useState<string>("");
  const [nameTouched, setNameTouched] = React.useState<boolean>(false);
  const [emailTouched, setEmailTouched] = React.useState<boolean>(false);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

  const getDaysInMonth = (month: string, year: string) => {
    if (!month || !year) return Array.from({ length: 31 }, (_, i) => i + 1);
    const monthIndex = months.indexOf(month);
    const yearNum = parseInt(year);
    if (monthIndex === 1) {
      const isLeapYear =
        (yearNum % 4 === 0 && yearNum % 100 !== 0) || yearNum % 400 === 0;
      return Array.from({ length: isLeapYear ? 29 : 28 }, (_, i) => i + 1);
    }
    if ([3, 5, 8, 10].includes(monthIndex)) {
      return Array.from({ length: 30 }, (_, i) => i + 1);
    }
    return Array.from({ length: 31 }, (_, i) => i + 1);
  };

  const days = getDaysInMonth(selectedMonth, selectedYear);

  React.useEffect(() => {
    if (selectedDay && days.length) {
      const maxDays = days.length;
      const selectedDayNum = parseInt(selectedDay);
      if (selectedDayNum > maxDays) setSelectedDay("");
    }
  }, [selectedMonth, selectedYear, selectedDay, days.length]);

  const getMonthNumber = (monthName: string): string => {
    const monthIndex = months.indexOf(monthName) + 1;
    return monthIndex.toString().padStart(2, "0");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    setShowConsentForm(true);
  };

  const handleBack = (
    message: string,
    prevName: string,
    prevEmail: string,
    prevBirthDate: string
  ) => {
    setShowConsentForm(false);
    if (message) setErrorMessage(message);
    setUserName(prevName);
    setUserEmail(prevEmail);
    const [year, monthNum, day] = prevBirthDate.split("-");
    setSelectedYear(year);
    setSelectedMonth(months[parseInt(monthNum) - 1]);
    setSelectedDay(day.replace(/^0+/, ""));
    setNameTouched(true);
    setEmailTouched(true);
  };

  if (showConsentForm) {
    return (
      <SettingsConsentForm
        name={userName}
        email={userEmail}
        birthDate={`${selectedYear}-${getMonthNumber(
          selectedMonth
        )}-${selectedDay.padStart(2, "0")}`}
        onBack={handleBack}
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
        <div className="relative dark:bg-black bg-white md:border border-borderColor rounded-2xl w-full md:w-[600px] min-h-full md:min-h-[650px] md:max-h-[90vh] md:max-w-2xl md:mx-4 z-10 flex flex-col justify-between">
          <button
            onClick={onClose}
            className="absolute top-4 left-2 rounded-full p-2.5 hover:bg-[#e7e7e8] dark:hover:bg-gray-800/50"
          >
            <CloseIcon
              width="20"
              height="20"
              fill="fill-black dark:fill-white"
            />
          </button>
          <div className="flex justify-center mt-4">
            <XLogo width="32" height="32" fill="fill-black dark:fill-white" />
          </div>
          <div className="px-8 md:px-20 pb-72 md:pb-28">
            <h1 className="text-2xl md:text-3xl font-bold mb-6">
              Create your account
            </h1>
            <div className="relative w-full mb-8">
              <Input
                inputId="userName"
                inputNamePlaceHolder="Name"
                value={userName}
                onChange={(value) => {
                  setUserName(value);
                  setNameTouched(true);
                }}
                showCharCount={true}
                maxCharLength={50}
                isInputTextValid={!nameTouched || userName.length > 0}
                inputTextInvalidText="What's your name?"
                isInputNumeric={false}
              />
            </div>
            <div className="relative w-full mb-8">
              <Input
                inputId="userEmail"
                inputNamePlaceHolder="Email"
                value={userEmail}
                onChange={(value) => {
                  setUserEmail(value);
                  setEmailTouched(true);
                  setErrorMessage("");
                }}
                maxCharLength={255}
                isInputTextValid={
                  !emailTouched ||
                  (isValidEmail(userEmail) &&
                    errorMessage !== "The email provided is already taken")
                }
                inputTextInvalidText={
                  errorMessage === "The email provided is already taken"
                    ? "This email is already taken."
                    : "Please enter a valid email."
                }
                isInputNumeric={false}
              />
            </div>
            <div>
              <h1 className="font-bold mt-8">Date of birth</h1>
              <p className="mt-1.5 leading-4 text-sm text-[#536471]">
                This will not be shown publicly. Confirm your own age, even if
                this account is for a business, a pet, or something else.
              </p>
              <div className="flex gap-3 mt-5">
                <div
                  className={`relative w-[50%] rounded bg-white dark:bg-black ${
                    isMonthFocused
                      ? "border-[#1d9bf0] border-2 p-0"
                      : "border-borderColor border p-[1px]"
                  }`}
                  onFocus={() => setIsMonthFocused(true)}
                  onBlur={() => setIsMonthFocused(false)}
                >
                  <label
                    className={`${
                      isMonthFocused ? "text-[#1d9bf0]" : "text-gray-500"
                    }`}
                  >
                    <span className="mx-2 text-sm">Month</span>
                  </label>
                  <select
                    className="cursor-pointer w-full border-none bg-transparent text-[15px] text-gray-900 dark:text-white dark:bg-black appearance-none outline-none px-2"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                  >
                    <option disabled value=""></option>
                    {months.map((month) => (
                      <option key={month} value={month}>
                        {month}
                      </option>
                    ))}
                  </select>
                  <svg
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    fill="rgb(83, 100, 113)"
                  >
                    <path d="M3.543 8.96l1.414-1.42L12 14.59l7.043-7.05 1.414 1.42L12 17.41 3.543 8.96z" />
                  </svg>
                </div>
                <div
                  className={`relative w-[25%] rounded bg-white dark:bg-black ${
                    isDayFocused
                      ? "border-[#1d9bf0] border-2 p-0"
                      : "border-borderColor border p-[1px]"
                  }`}
                  onFocus={() => setIsDayFocused(true)}
                  onBlur={() => setIsDayFocused(false)}
                >
                  <label
                    className={`${
                      isDayFocused ? "text-[#1d9bf0]" : "text-gray-500"
                    }`}
                  >
                    <span className="mx-2 text-sm">Day</span>
                  </label>
                  <select
                    className="cursor-pointer w-full border-none bg-transparent text-gray-900 dark:text-white dark:bg-black appearance-none outline-none px-2"
                    value={selectedDay}
                    onChange={(e) => setSelectedDay(e.target.value)}
                  >
                    <option disabled value=""></option>
                    {days.map((day) => (
                      <option key={day} value={day}>
                        {day}
                      </option>
                    ))}
                  </select>
                  <svg
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    fill="rgb(83, 100, 113)"
                  >
                    <path d="M3.543 8.96l1.414-1.42L12 14.59l7.043-7.05 1.414 1.42L12 17.41 3.543 8.96z" />
                  </svg>
                </div>
                <div
                  className={`relative w-[25%] rounded bg-white dark:bg-black ${
                    isYearFocused
                      ? "border-[#1d9bf0] border-2 p-0"
                      : "border-borderColor border p-[1px]"
                  }`}
                  onFocus={() => setIsYearFocused(true)}
                  onBlur={() => setIsYearFocused(false)}
                >
                  <label
                    className={`${
                      isYearFocused ? "text-[#1d9bf0]" : "text-gray-500"
                    }`}
                  >
                    <span className="mx-1.5 text-sm">Year</span>
                  </label>
                  <select
                    className="cursor-pointer w-full border-none bg-transparent text-gray-900 dark:text-white dark:bg-black appearance-none outline-none px-2"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                  >
                    <option disabled value=""></option>
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                  <svg
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    fill="rgb(83, 100, 113)"
                  >
                    <path d="M3.543 8.96l1.414-1.42L12 14.59l7.043-7.05 1.414 1.42L12 17.41 3.543 8.96z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="px-12 md:px-20 pb-6 md:pb-12">
            {errorMessage &&
              errorMessage !== "The email provided is already taken" && (
                <div className="mb-12 md:mb-0 md:fixed md:bottom-12 md:right-12">
                  <Snackbar isError={true} message={errorMessage} />
                </div>
              )}
            <form onSubmit={handleSubmit}>
              <button
                type="submit"
                disabled={
                  selectedDay === "" ||
                  selectedMonth === "" ||
                  selectedYear === "" ||
                  !userName ||
                  !userEmail ||
                  (nameTouched && userName === "") ||
                  (emailTouched && !isValidEmail(userEmail)) ||
                  errorMessage === "The email provided is already taken"
                }
                className={`w-full font-bold py-3 rounded-full ${
                  selectedDay === "" ||
                  selectedMonth === "" ||
                  selectedYear === "" ||
                  !userName ||
                  !userEmail ||
                  (nameTouched && userName === "") ||
                  errorMessage === "The email provided is already taken" ||
                  (emailTouched && !isValidEmail(userEmail))
                    ? "bg-[#87898c] dark:bg-[#787a7a] text-white dark:text-black cursor-not-allowed"
                    : "dark:bg-white dark:text-black bg-[#171c20] hover:bg-[#272c30] text-white dark:hover:bg-gray-200"
                }`}
              >
                Next
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
