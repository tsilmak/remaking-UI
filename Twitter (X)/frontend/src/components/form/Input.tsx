import React, { useState } from "react";

interface InputProps {
  inputId: string;
  inputNamePlaceHolder: string;
  showCharCount?: boolean;
  maxCharLength: number;
  onChange: (value: string) => void;
  isInputTextValid: boolean;
  inputTextInvalidText?: string;
  isInputNumeric: boolean;
  value?: string;
}

const Input = ({
  inputId,
  inputNamePlaceHolder,
  showCharCount,
  maxCharLength,
  onChange,
  isInputTextValid,
  inputTextInvalidText,
  isInputNumeric,
  value,
}: InputProps) => {
  const [charCount, setCharCount] = useState(0);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative">
      <input
        type={isInputNumeric ? "number" : "text"}
        id={inputId}
        className={`w-full bg-transparent border ${
          isInputTextValid
            ? "border-borderColor focus:ring-1 focus:border-[#1d9bf0] focus:ring-[#1d9bf0]"
            : "border-red-600 border-1 focus:ring-1 focus:border-red-600 focus:ring-red-600"
        } rounded p-2 pt-6 pb-1 focus:outline-none peer`}
        required
        value={value}
        maxLength={maxCharLength}
        onChange={(e) => {
          setCharCount(e.target.value.length);
          onChange(e.target.value);
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {showCharCount && isFocused && (
        <span className="absolute right-3 top-1 text-sm text-gray-500">
          {charCount} / {maxCharLength}
        </span>
      )}
      <label
        htmlFor={inputId}
        className={`${
          isInputTextValid
            ? " peer-focus:text-[#1d9bf0] absolute left-2 top-1/2 -translate-y-1/2 peer-valid:text-[#65686d] text-gray-500 duration-200 ease-in-out peer-focus:top-4 peer-valid:top-4 peer-focus:text-xs peer-valid:text-xs "
            : "peer-focus:text-red-600 absolute left-2 top-7 -translate-y-1/2 peer-valid:text-red-600 text-red-600 duration-200 ease-in-out peer-focus:top-4 peer-valid:top-4 peer-focus:text-xs peer-valid:text-xs "
        } `}
      >
        {inputNamePlaceHolder}
      </label>
      {!isInputTextValid && inputTextInvalidText && (
        <span className="text-red-700 text-sm mt-1">
          {inputTextInvalidText}
        </span>
      )}
    </div>
  );
};

export default Input;
