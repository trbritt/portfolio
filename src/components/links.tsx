import React from 'react';
import { motion } from 'framer-motion';
import  SectionWrapper  from '../utils/section';
import { fadeIn, textVariant } from '../utils/motion';
import { argtype, social_links } from '../utils/constants';
import { StaticImageData } from 'next/image';
import ExportedImage from "next-image-export-optimizer";

import { title } from 'process';

export interface SocialLink {
    title: string;
    icon: StaticImageData; // Assuming the icon is a URL or file path as a string
    source_code_link: string;
  }
  interface SocialLinkCardProps extends SocialLink {
    index: number;
  }
  
  const SocialLinkCard: React.FC<SocialLinkCardProps> = ({ index, title, icon, source_code_link }) => (
    <div className='xs:w-[250px] w-full'>
      <article
        className='w-full p-[1px] rounded-[20px] shadow-card bg-quartary cursor-pointer border-outline border-2'
        onClick={() => window.open(source_code_link, "_blank")}
      >
        <div
          className='rounded-[20px] py-5 px-12 min-h-[180px] flex justify-evenly items-center flex-col'
        >
          <ExportedImage
            src={icon}
            alt={title}
            className='w-16 h-16 object-contain'
          />
          <h3 className='text-white text-[20px] font-bold text-center'>
            {title}
          </h3>
        </div>
      </article>
    </div>
  );
  
const Links: React.FC<argtype> = ({isMobile}) => {
  return (
    <>
      <motion.div variants={textVariant(0)} custom={100} initial="initial" animate="final" className={`${isMobile ? 'mx-3' : 'mx-10'}`}>
        <p className="text-4xl font-bold text-zinc-100 mt-10">My links</p>
        <h2 className="text-3xl font-semibold text-zinc-10">Socials.</h2>
      </motion.div>

      <div className={`${isMobile ? 'mx-3' : 'mx-10'}w-full flex`}>
        <motion.p
          variants={fadeIn("down", "", 0.1, 1)}
          className={`mt-3 text-zinc-10 text-[17px] max-w-3xl leading-[30px] mx-20 tracking-tight ${isMobile ? 'mx-3' : 'mx-10'}`}
        >
          Feel free to check out my online socials for more details about me, my projects, or my publications.
        </motion.p>
      </div>
      
      <div className='mt-20 flex justify-center flex-wrap gap-10 text-zinc'>
        {social_links.map((social_link, index: number) => (
          <SocialLinkCard key={social_link.title} index={index} icon={social_link.icon} title={social_link.title} source_code_link={social_link.source_code_link} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Links, "");
