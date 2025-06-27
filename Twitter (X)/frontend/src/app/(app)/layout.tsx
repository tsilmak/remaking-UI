import type { Metadata } from "next";
import "./app.css";
import Navigation from "@/hooks/Navigation";
import GrokIconButton from "@/components/common/grok/GrokIconButton";
import MessagesButton from "@/components/common/MessagesButton";

export const metadata: Metadata = {
  title: "X",
  description: "X App",
  openGraph: {
    title: "X",
    description: "X (formerly Twitter)",
    images: [
      {
        url: `${process.env.MAIN_IMAGE_URL}`,
        alt: "X Social Platform",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex justify-center min-h-screen dark:bg-black">
      <div className="sm:flex max-w-screen-xl w-full">
        <Navigation />
        <main className="sm:ml-20 mt-14 sm:mt-0 xl:ml-64 w-full">
          {children}
          <GrokIconButton />
          <MessagesButton />
        </main>
      </div>
    </div>
  );
}
