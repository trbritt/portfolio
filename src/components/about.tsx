import React from "react";
import { motion } from "framer-motion";
import { argtype, services } from "../utils/constants";
import SectionWrapper  from "../utils/section";
import { fadeIn, textVariant } from "../utils/motion";
import { StaticImageData } from "next/image";
import ExportedImage from "next-image-export-optimizer";
import { useState, useEffect } from "react";

// Define a type for the service
export type Service = {
  title: string;
  icon: StaticImageData;
}

// Define a type for the usePointerGlow hook status
interface PointerStatus {
  x: string;
  y: string;
  xp: string;
  yp: string;
}

// Custom hook for pointer glow effect
const usePointerGlow = (): [PointerStatus | null] => {
  const [status, setStatus] = React.useState<PointerStatus | null>(null);

  React.useEffect(() => {
    const syncPointer = ({ x: pointerX, y: pointerY }: { x: number; y: number }) => {
      const x = pointerX.toFixed(2);
      const y = pointerY.toFixed(2);
      const xp = (pointerX / window.innerWidth).toFixed(2);
      const yp = (pointerY / window.innerHeight).toFixed(2);
      document.documentElement.style.setProperty('--x', x);
      document.documentElement.style.setProperty('--xp', xp);
      document.documentElement.style.setProperty('--y', y);
      document.documentElement.style.setProperty('--yp', yp);
      setStatus({ x, y, xp, yp });
    };

    document.body.addEventListener('pointermove', syncPointer);
    return () => {
      document.body.removeEventListener('pointermove', syncPointer);
    };
  }, []);

  return [status];
};

// ServiceCard component with TypeScript annotations
const ServiceCard: React.FC<Service> = ({ title, icon }) => (
  <div className='xs:w-[250px] w-full'>
    <article className="shadow-card bg-quartary w-full p-[1px] rounded-[20px]">
      <div
        className='py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col'
      >
        <ExportedImage
          src={icon}
          alt={`${title}`}
          className='w-16 h-16 object-contain'
        />
        <div className='text-white text-[20px] font-bold text-center' dangerouslySetInnerHTML={{ __html: title }} />
      </div>
    </article>
  </div>
);

// About component
const About: React.FC<argtype> = ({isMobile}) => {
  return (
    <>
      <motion.div variants={textVariant(0)} custom={100} initial="initial" animate="final" className={`${isMobile ? 'mx-3' : 'mx-10'}`}>
            <p className="text-4xl font-bold text-zinc-100 ">Introduction</p>
            <h2 className="text-3xl font-semibold text-zinc-10 mb-10">Overview.</h2>
      </motion.div>
      <motion.div
        variants={fadeIn("down", "", 0.1, 1)}
        className={`mt-4 tracking-tight text-[17px] max-w-3xl leading-[30px] mb-6 text-zinc mb-20 ${isMobile ? 'mx-3' : 'mx-10'}`} custom={100} initial="initial" animate="final"
      >
        <p className="mb-5">
          Acquiring my doctorate (PhD) in Physics at McGill University enforced my high attention to detail, sharpened my analytical reasoning, and gave me robust and extensive backgrounds in Mathematics, Statistics, Programming, and high-quality real-time research. 
        </p>
        <p className="mb-5">
          My professional journey has equipped me with research-grade proficiency in {" "}
        <code className="bg-zinc-800 text-zinc-300 px-2 rounded py-1 text-sm mx-1">
          Rust
        </code>, {" "}
        <code className="bg-zinc-800 text-zinc-300 px-2 rounded py-1 text-sm mx-1">
          C++
        </code>, {" "}
        <code className="bg-zinc-800 text-zinc-300 px-2 rounded py-1 text-sm mx-1">
          Fortran
        </code>, and {" "}
        <code className="bg-zinc-800 text-zinc-300 px-2 rounded py-1 text-sm mx-1">
          Python
        </code>, and I have used these tools for a range of applications. My research at times involves the collection of extensive (~TB) datasets, and the efficient use of supercomputing resources, such as {" "}
        <code className="bg-zinc-800 text-zinc-300 px-2 rounded py-1 text-sm mx-1">
          MPI
        </code>,{" "}
        <code className="bg-zinc-800 text-zinc-300 px-2 rounded py-1 text-sm mx-1">
          OpenMP
        </code>,
        <code className="bg-zinc-800 text-zinc-300 px-2 rounded py-1 text-sm mx-1">
          Tokio/Rayon
        </code>, and {" "}
        <code className="bg-zinc-800 text-zinc-300 px-2 rounded py-1 text-sm mx-1">
          CUDA
        </code>, to extract and analyse the relevant information from the resulting data.
        </p>
        <p className="mb-5">
          My abilities to utilise cutting-edge technology, to analyse and successfully execute solutions to complex problems, and my strong willingness to collaborate with my peers poises me as successful researcher.
        </p>
      </motion.div>

      <div className='mt-20 flex justify-center flex-wrap gap-10'>
        {services.map((service, index) => (
          <ServiceCard key={index} title={service.title} icon={service.icon} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
