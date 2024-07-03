import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThirdwebProvider } from "thirdweb/react";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={ `${inter.className} bg-tertiary`}>
        <ThirdwebProvider >{children}</ThirdwebProvider>
      </body>
    </html>
  );
}
