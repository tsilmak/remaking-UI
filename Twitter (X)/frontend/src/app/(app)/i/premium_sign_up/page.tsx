"use client";
import { CloseIcon } from "@/utils/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const PremiumSignUp = () => {
  const [selectedPlan, setSelectedPlan] = React.useState<"annual" | "monthly">(
    "annual"
  );

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
    <>
      <div className="fixed inset-0 z-40 w-full h-full bg-black flex flex-col">
        {/* Subtle light gradient overlay */}
        <div
          className="min-h-[650px] w-full top-[-300px] absolute z-10"
          style={{
            background:
              "radial-gradient(56.1514% 56.1514% at 49.972% 38.959%, #273649 0%, #000000 100%)",
          }}
        />
        {/* Information content */}
        <div className="items-center justify-center flex z-10 relative py-6">
          <div className="text-center">
            <h1 className="text-neutral-200 font-bold text-2xl sm:text-5xl xl:text-5xl 2xl:text-6xl mt-8 sm:mt-6 2xl:mt-36 mb-3 sm:mb-4">
              Upgrade to Premium
            </h1>
            <p className="text-sm sm:text-lg xl:text-lg 2xl:text-xl text-[#b0b2b5]">
              Enjoy an enhanced experience, exclusive creator tools, top-tier
              verification and security.
              <br />
              (For organizations,{" "}
              <Link
                href={"/i/organizations"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="underline text-white font-bold">
                  sign up here
                </span>
              </Link>
              )
            </p>
            {/* Plan Annual or Monthly */}

            <div className=" text-white flex items-center justify-center p-0.5 rounded-full bg-[#202327] w-72 mx-auto mt-4 sm:mt-6 2xl:mt-20">
              <div
                className={`flex-1 py-1 rounded-full cursor-pointer transition-colors duration-200 ${
                  selectedPlan === "annual" ? "bg-black" : ""
                }`}
                onClick={() => setSelectedPlan("annual")}
              >
                <span className="text-sm font-bold">Annual</span>{" "}
                <span className="text-xs font-bold text-[#c2f1dc] bg-[#00251a] p-1 rounded-full">
                  Best Value
                </span>
              </div>
              <div
                className={`flex-1 py-1 rounded-full cursor-pointer transition-colors duration-200 ${
                  selectedPlan === "monthly" ? "bg-black" : ""
                }`}
                onClick={() => setSelectedPlan("monthly")}
              >
                <span className="text-sm font-bold">Monthly</span>
              </div>
            </div>
            {/* Card options */}
            <div className="z-10 grid grid-cols-3 gap-4 mt-8 ">
              <div className="h-[445px] w-[325px] bg-[#00251a] rounded-lg">
                ssssssss
              </div>
              <div className="h-[445px] w-[325px] bg-[#00251a] rounded-lg">
                ssssssss
              </div>
              <div className="h-[445px] w-[325px] bg-[#00251a] rounded-lg">
                ssssssss
              </div>
            </div>
          </div>
        </div>
        {/* Top left close button */}
        <div>
          <button
            onClick={handleClose}
            className="z-40 absolute top-4 left-4 text-white p-2 hover:bg-[#1c1d1f] rounded-full transition duration-200 hover:transition-delay-150"
            aria-label="Close modal"
          >
            <CloseIcon width={"20"} height={"20"} fill={"white"} />
          </button>
        </div>

        {/* Fixed bottom card with information chosen */}
        <div className="hidden sm:flex h-40 fixed bottom-0 left-0 right-0 border-t border-[rgb(32,35,39)] bg-black/95 text-white p-3 z-10">
          {/* Plan Information */}
          <div className="p-8  rounded-lg">
            <div className="flex flex-col max-w-lg justify-center">
              <h1 className="text-xl mb-3 tracking-tighter font-thin">Basic</h1>
              <div className="flex flex-row items-end">
                <span className="text-3xl font-semibold mb-0">€39.36</span>
                <span className="mb-1 ml-1">
                  / {selectedPlan === "annual" ? "year" : "month"}
                </span>
              </div>
              <p className="text-sm mt-2">
                Billed {selectedPlan === "annual" ? "annually" : "monthly"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PremiumSignUp;
