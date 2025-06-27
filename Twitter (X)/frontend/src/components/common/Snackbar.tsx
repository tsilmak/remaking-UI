import React from "react";

type SnackBarProps = {
  isError: boolean;
  message: string;
};

const Snackbar = ({ isError, message }: SnackBarProps) => {
  return (
    <div
      className={`max-w-lg w-[350px] rounded-lg border-2 h-[75px] mx-auto ${
        isError
          ? "border-red-600 bg-[#e04048]/30"
          : "border-blue-500 bg-[#eafaff]"
      }`}
    >
      <span className="text-center flex justify-center items-center h-full">
        {message}
      </span>
    </div>
  );
};

export default Snackbar;
