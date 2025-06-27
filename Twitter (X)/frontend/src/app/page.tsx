import { XLogo } from "@/utils/icons";
import GoogleSignUpButton from "@/components/buttons/GoogleSignUpButton";
import AppleSignUpButton from "@/components/buttons/AppleSignUpButton";
import { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = {
  title: "X. It's what's happening / X",
  description: "X App",
  openGraph: {
    title: "X. It's what's happening",
    description:
      "From breaking news and entertainment to sports and politics, get the full story with all the live commentary.",
    siteName: "X (formerly Twitter)",
    type: "website",
    url: `${process.env.WEBSITE_URL}`,
    images: [
      {
        url: `${process.env.MAIN_IMAGE_URL}`,
        alt: "X Social Platform",
      },
    ],
  },
};
export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <div className="mb-24 md:mb-44 mt-4 md:mt-52 flex items-center justify-center ">
        <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 md:gap-10">
          <div className="w-full flex justify-center mt-0 md:mt-12">
            <div className="w-[90px] h-[160px] md:w-[400px] md:h-[370px]">
              <XLogo
                width="100%"
                height="100%"
                fill="fill-black dark:fill-white"
              />
            </div>
          </div>

          {/* Content Section */}
          <div className=" mx-auto md:ml-24 text-center md:text-left md:mt-[-40px] w-full max-w-[320px] md:max-w-none px-2 md:px-0">
            <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-6xl font-extrabold leading-tight">
              Happening now
            </h1>
            <h2 className="text-2xl sm:text-3xl md:text-3xl font-extrabold mt-10 md:mt-14">
              Join today.
            </h2>
            <div className="mt-6 md:mt-8">
              <div>
                <div className="mb-2">
                  <GoogleSignUpButton />
                </div>
                <div className="mb-2">
                  <AppleSignUpButton />
                </div>
              </div>
              <div className="flex items-center mb-2">
                <hr className="flex-1 h-[1px] max-w-[140px] bg-[#2F3336] border-none" />
                <p className="mx-2 text-sm">or</p>
                <hr className="flex-1 h-[1px] max-w-[140px] bg-[#2F3336] border-none" />
              </div>
              <div>
                <Link
                  href={"/i/flow/signup"}
                  className="inline-block w-full max-w-[300px]"
                >
                  <button className="text-[15px] bg-[#1d9bf0] text-white w-full max-w-[300px] py-2 px-2 rounded-full font-bold hover:bg-[#1a8cd8]">
                    Create account
                  </button>
                </Link>
              </div>
              <div>
                <p className="leading-3 text-[11px] w-full max-w-[300px] mt-1.5 text-[#71767b]">
                  By signing up, you agree to the{" "}
                  <span className="text-[#117dd6] hover:text-[#1585d9] hover:cursor-pointer hover:underline">
                    Terms of Service
                  </span>{" "}
                  and{" "}
                  <span className="text-[#117dd6] hover:text-[#1585d9] hover:cursor-pointer hover:underline">
                    Privacy Policy
                  </span>
                  , including{" "}
                  <span className="text-[#117dd6] hover:text-[#1585d9] hover:cursor-pointer hover:underline">
                    Cookie Use
                  </span>
                  .
                </p>
              </div>
            </div>
            <div className="mt-10 md:mt-14">
              <h2 className="font-bold mb-4">Already have an account?</h2>
              <Link
                href="/i/flow/login"
                className="inline-block w-full max-w-[300px]"
              >
                <button className="border border-borderColor text-[15px] bg-transparent text-[#178fe5] w-full py-2 px-2 rounded-full font-bold hover:bg-[#e8f5fd] dark:hover:bg-[#031018]">
                  Sign in
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <footer className="gap-4 text-[12px] sm:text-[14px] text-[#71767b] flex flex-row flex-wrap justify-center pb-3 pt-3 px-2 sm:px-4">
        <span>About</span>
        <span>Download the X app</span>
        <span>Help Center</span>
        <span>Terms of Service</span>
        <span>Privacy Policy</span>
        <span>Cookie Policy</span>
        <span>Accessibility</span>
        <span>Ads info</span>
        <span>Blog</span>
        <span>Careers</span>
        <span>Brand Resources</span>
        <span>Advertising</span>
        <span>Marketing</span>
        <span>X for Business</span>
        <span>Developers</span>
        <span>Directory</span>
        <span>Settings</span>
        <span>© 2025 X Corp.</span>
      </footer>
    </div>
  );
}
