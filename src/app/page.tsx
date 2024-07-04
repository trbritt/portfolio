'use client'
// import {
  // createWallet,
  // walletConnect,
  // inAppWallet,
// } from "thirdweb/wallets";
// import { ConnectButton } from "thirdweb/react";
import React, { Suspense } from "react";
import dynamic from 'next/dynamic'
// import { client } from "./client";
// import  Component  from "./component";
// import TXButtons from "./tx_button";
import Navbar from "@/components/navbar";
import About from "@/components/about";
import Experience from "@/components/experience";
import Tech from "@/components/tech";
import Links from "@/components/links";
import Works from "@/components/works";
import FAQ from "@/components/faq";
import Contact from "@/components/contact";
import Loader from "@/components/loader";
import { argtype } from "@/utils/constants";
import { useMobile } from "@/utils/section";
import { TypeAnimation } from "react-type-animation";
import Resume from "@/components/assets/Tristan_Britt_Resume.pdf";

// import DonateButton from "@/components/modal";

const Hexagons = dynamic(
  () => import ("@/components/hexagons"),
  {ssr: false}
)
// const wallets = [
//   createWallet("io.metamask"),
//   createWallet("com.coinbase.wallet"),
//   walletConnect(),
//   inAppWallet({
//     auth: {
//       options: [
//         "email",
//         "google",
//         "apple",
//         "facebook",
//         "phone",
//       ],
//     },
//   }),
// ];


export default function Home() {
  return (
    <main className="relative z-0 bg-cover bg-no-repeat bg-center">
      <div className="bg-cover bg-no-repeat bg-center">
        <Navbar isMobile={useMobile()}/>
      </div>
      <div className="relative w-full h-screen mx-auto">
        <Suspense fallback={<Loader />}>
          <Hexagons isMobile={useMobile()}/>
        </Suspense> 
      </div>
      <div className={`py-20 absolute inset-0 ${useMobile() ? 'top-[20px]' : 'top-[120px]'}`}>
        <Header isMobile={useMobile()}/>
        {/* <div className="flex flex-col items-center">
          <ConnectButton
            client={client}
            wallets={wallets}
            theme={"dark"}
            connectModal={{size: "wide"}}
          />
          <Component/>
          <DonateButton/>
          <TXButtons/>
        </div> */}
      </div>
      <About/>
      <Experience/>
      <Tech/>
      <Links/>
      <Works/>
      <FAQ/>
      <Contact/>
      <footer className={`h-10 text-zinc-100 tracking-tighter text-center ${useMobile() ? 'text-sm': 'text-md'} `}>Copyright Tristan Britt, 2024</footer>
    </main>
    
  );
}

function Header( args: argtype) {
  //typeanimator is memoized once so can't evaluate anything
  //dynamically inside it
  const typewriter_contents: string = "I write high performance code ...\n ... for high performance research";
  return (
    <header id = "hero" className="w-full flex flex-col items-center mb-10 md:mb-20 gap-y-8">
      <div className={`justify-center flex ${args.isMobile ? 'flex-col' : 'flex-row'} items-center`}>
        <h1 className={`text-6xl font-bold tracking-tighter mb-6 text-zinc-100 ${args.isMobile ? 'px-3' : 'px-0'}`}>
        Hi, I&apos;m{" "}
        <span className="inline-block -skew-x-6 text-[#8693f2]">Tristan, Ph.D. </span>
      </h1>
      </div>
      <p className="text-zinc-300 font-semibold tracking-tighter text-2xl">
        <TypeAnimation 
          style={{whiteSpace:'pre-line', display:'inline-block', height: '100px'}}
          sequence={[typewriter_contents]}
          speed = {{type:'keyStrokeDelayInMs', value:75}}
          className="w-[350px]"
        />
      </p>
      <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center cursor-pointer">
          <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/></svg>
          <a download="Tristan_Britt_Resume.pdf" href={Resume}>Download Resume</a>
          {/* <span className="cursor-pointer" onClick={() => {return <iframe src="/src/components/assets/Tristan_Britt_Resume.pdf"/>}}>Download Resume</span> */}
      </button>
    </header>
  );
}
