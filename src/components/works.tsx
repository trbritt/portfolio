import React from "react";
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "@/utils/motion";
import Latex from 'react-latex-next';
import SectionWrapper from "../utils/section";
import { argtype, projects } from "@/utils/constants";
import { external_link } from "@/components/assets";
import { StaticImageData } from "next/image";
import ExportedImage from "next-image-export-optimizer";

interface Tag {
    name: string;
    color: string;
  }
  
interface Project {
    name: string;
    description: string;
    tags: Tag[];
    image: StaticImageData;
    source_code_link: string;
    isMobile : boolean
  }

interface ProjectCardProps extends Project {
    index: number;
  }

  const ProjectCard: React.FC<ProjectCardProps> = ({ index, name, description, tags, image, source_code_link, isMobile }) => {
    return (
      <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
        <article
          className={`bg-quartary border-outline border-2 p-5 rounded-2xl ${isMobile ? 'w-full' : 'w-3/4'} tracking-tight`}
        >
          <div className='relative w-full h-[230px]'>
            <ExportedImage
              src={image}
              alt='project_image'
              className='w-full h-full object-cover rounded-2xl'
            />
  
            <div className='absolute inset-0 flex justify-end m-3 card-img_hover'>
              <div
                onClick={() => window.open(source_code_link, "_blank")}
                className='green-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer'
              >
                <ExportedImage
                  src={external_link}
                  alt='source code'
                  className='w-1/2 h-1/2 object-contain'
                />
              </div>
            </div>
          </div>
  
          <div className='mt-5'>
            <h3 className='text-white font-bold text-[24px]'>{name}</h3>
            <p className='mt-2 text-secondary text-[14px]'>
              <Latex>{description}</Latex>
            </p>
          </div>
  
          <div className='mt-4 flex flex-wrap gap-2'>
            {tags.map((tag) => (
              <p
                key={`${name}-${tag.name}`}
                className={`text-[14px] ${tag.color}`}
              >
                #{tag.name}
              </p>
            ))}
          </div>
        </article>
      </motion.div>
    );
  };

  const Works: React.FC<argtype> = ({isMobile}) => {
    return (
      <>
        <motion.div variants={textVariant(0)} custom={100} initial="initial" animate="final" className={`${isMobile ? 'mx-3' : 'mx-10'}`} >
          <p className="text-4xl font-bold text-zinc-100 mt-20">Highlighted Research</p>
          {/*<h2 className="text-3xl font-semibold text-zinc-10">Research.</h2>*/}
        </motion.div>
  
        <div className='w-full flex'>
          <motion.p
            variants={fadeIn("down", "", 0.1, 1)}
            className='mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]'
          >
          </motion.p>
        </div>
  
        <div className='mt-20 flex flex-row justify-center flex-wrap gap-7'>
          {projects.map((project, index) => (
            <ProjectCard key={`project-${index}`} index={index} isMobile={isMobile} {...project} />
          ))}
        </div>
      </>
    );
  };
  
  export default SectionWrapper(Works, "work");