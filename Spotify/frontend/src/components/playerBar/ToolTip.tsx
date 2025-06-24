import React from "react";

type Props = {
  text: string;
  children: React.ReactNode;
};

const ToolTip = ({ text, children }: Props) => {
  return (
    <div className="relative group inline-block">
      {children}
      <div
        className="
          absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 
          bg-[#282828] text-white text-sm rounded px-2 py-1 
          opacity-0 transition-opacity duration-200 
          group-hover:opacity-100 group-hover:delay-250 pointer-events-none
          whitespace-nowrap z-10
        "
      >
        {text}
      </div>
    </div>
  );
};

export default ToolTip;
