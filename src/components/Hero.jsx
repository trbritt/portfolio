import { motion } from "framer-motion";
import { styles } from "../styles";
import { UEDSCanvas } from "./canvas";
import {setup, draw, resizeCanvas } from "../utils/hexagon";
import Sketch from 'react-p5';
import React, { Suspense, useEffect, useState } from "react";
import CanvasLoader from "./Loader";
import { Preload } from "@react-three/drei";
import Download from './DownloadButton'; // Assuming Download component is in the same directory

const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
  //   // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 500px)");

  //   // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);

  //   // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

  //   // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

  //   // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);
  return (
    <section id = "hero" className={`relative w-full h-screen mx-auto`}>
      <div
        className={`absolute inset-0 top-[120px]  max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
      >
        <div className='flex flex-col justify-center items-center mt-5'>
          <div className='w-5 h-5 rounded-full bg-[#915EFF]' />
          <div className='w-1 sm:h-80 h-40 violet-gradient' />
        </div>

        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>
            Hi, I'm <span className='text-[#915EFF]'>Tristan</span>
          </h1>
          <h3 className={`${styles.heroSubText} mt-2 text-white-100`}>
            I develop epic condensed matter code,
            <br className='sm:block hidden' />
            <p className="sm:hidden inline-block">&nbsp;</p>
            PhD candidate in ultrafast physics
          </h3>
          <Download
                fileName="Tristan_Britt_Resume_Professional.pdf"  // Specify the file name for download
                title="Download Resume"      // Specify the label for the download button
                tint="#4CAF50"             // Specify the background color for the button
                font={{
                    fontFace: "Arial",
                    size: 20,
                    color: "#fff",
                    weight: "bold"
                }}
                file="../assets/Tristan_Britt_Resume_Professional.pdf"   // Specify the path to the downloadable file
                radius={8}                  // Specify the border radius for the button
                topLeftRadius={8}           // Specify individual border radius if isMixedRadius is toggled
                topRightRadius={8}
                bottomRightRadius={8}
                bottomLeftRadius={8}
                stylePadding={16}           // Specify padding for the button
                topLeftPadding={16}         // Specify individual padding if isMixedPadding is toggled
                topRightPadding={16}
                bottomRightPadding={16}
                bottomLeftPadding={16}
          />
        </div>
      </div>
      <Suspense fallback={<CanvasLoader />}>
        <Sketch setup={setup} draw={(p5) => draw(p5, isMobile)} windowResized={resizeCanvas}></Sketch>
      </Suspense>
      <UEDSCanvas />
      <div className='absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center'>
        <a href='#about'>
          <div className='w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2'>
            <motion.div
              animate={{ y: [0, 24, 0],}}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop",}}
              className='w-3 h-3 rounded-full bg-secondary mb-1'
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;