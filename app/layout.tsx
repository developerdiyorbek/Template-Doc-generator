import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { PropsWithChildren } from "react";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Template Doc Generator",
  description: "By Sulaymonov Diyorbek",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased`}>{children}</body>
    </html>
  );
}
