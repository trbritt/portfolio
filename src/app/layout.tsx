import type { Metadata } from "next";
import {Spline_Sans_Mono} from "next/font/google";
import "./globals.css";
import { ThirdwebProvider } from "thirdweb/react";

const splineSansMono = Spline_Sans_Mono({ subsets: ["latin-ext"] });

export const metadata: Metadata = {
  title: "trbritt | portfolio",
  description:
    "my little portfolio of professional experiences",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={ `${splineSansMono.className} bg-tertiary`}>
        <ThirdwebProvider >{children}</ThirdwebProvider>
      </body>
    </html>
  );
}
