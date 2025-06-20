import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";

const SpotifyMix = localFont({
  src: [
    {
      path: "./fonts/SpotifyMix-Ultra.woff2",
      weight: "900",
      style: "normal",
    },
    {
      path: "./fonts/SpotifyMix-UltraItalic.woff2",
      weight: "900",
      style: "italic",
    },
    {
      path: "./fonts/SpotifyMix-Black.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "./fonts/SpotifyMix-BlackItalic.woff2",
      weight: "800",
      style: "italic",
    },
    {
      path: "./fonts/SpotifyMix-Extrabold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/SpotifyMix-ExtraboldItalic.woff2",
      weight: "700",
      style: "italic",
    },
    {
      path: "./fonts/SpotifyMix-Bold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/SpotifyMix-BoldItalic.woff2",
      weight: "600",
      style: "italic",
    },
    {
      path: "./fonts/SpotifyMix-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/SpotifyMix-MediumItalic.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "./fonts/SpotifyMix-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/SpotifyMix-RegularItalic.woff2",
      weight: "400",
      style: "italic",
    },

    {
      path: "./fonts/SpotifyMix-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/SpotifyMix-LightItalic.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "./fonts/SpotifyMix-Thin.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "./fonts/SpotifyMix-ThinItalic.woff2",
      weight: "100",
      style: "italic",
    },
  ],
});

export const metadata: Metadata = {
  title: "Spotify Player Bar",
  description: "Player bar from Spotify",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${SpotifyMix.className}  antialiased`}>{children}</body>
    </html>
  );
}
