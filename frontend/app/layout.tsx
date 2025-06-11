import type { Metadata } from "next";
import { M_PLUS_1_Code, VT323, Princess_Sofia } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const vt323 = VT323({
  weight:'400',
  variable: "--font-vt323",
  subsets: ["latin"],
});

const mplus=M_PLUS_1_Code({
  weight:'400',
  variable:'--font-mplus',
  subsets:['latin']
})

const princess = Princess_Sofia({
  weight: '400',
  variable: '--font-princess',
  subsets:['latin']
})
export const metadata: Metadata = {
  title: "PixelPenguin",
  description: "Ideas in pixels, Stories in code",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${vt323.variable} ${mplus.variable} ${princess.variable} antialiased`}
      >
        <Navbar/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
