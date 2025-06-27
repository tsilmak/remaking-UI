"use client";
import { useRouter } from "next/navigation";
import React from "react";

const OrganizationsSubscription = () => {
  const router = useRouter();

  interface CloseHandlerEvent {
    preventDefault: () => void;
  }

  const handleClose = (e: CloseHandlerEvent): void => {
    e.preventDefault();
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <div className="fixed inset-0 z-40 w-full h-full bg-black flex items-center justify-center">
      <div className="text-white text-xl">Organizations</div>
      <button
        onClick={handleClose}
        className="absolute top-4 left-4 text-white"
        aria-label="Close modal"
      >
        X
      </button>
    </div>
  );
};

export default OrganizationsSubscription;
