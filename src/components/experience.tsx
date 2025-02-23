import React from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import { motion } from 'framer-motion';
import 'react-vertical-timeline-component/style.min.css';
import { argtype, experiences } from "@/utils/constants";
import  SectionWrapper  from '../utils/section';
import { textVariant } from "@/utils/motion";
import ExportedImage from "next-image-export-optimizer";
import { StaticImageData } from "next/image";

interface ExperienceCardProps {
  experience: Experience;
}
export interface Experience {
    title: string;
    company_name: string;
    icon: StaticImageData;
    iconBg: string;
    date: string;
    points: string[];
  }

  const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience }) => (
    <VerticalTimelineElement
      contentStyle={{ background: '#01120f', color: '#fff', border: "2px solid #6abc96"}}
      contentArrowStyle={{ borderRight: '7px solid #6abc96' }}
      date={experience.date}
      iconStyle={{ background: experience.iconBg }}
      icon={
        <div className='flex justify-center items-center w-full h-full'>
          <ExportedImage src={experience.icon} alt={experience.company_name} className='w-[60%] h-[60%] object-contain' />
        </div>
      }
    >
      <div>
        <h3 className='text-white text-[24px] font-bold'>{experience.title}</h3>
        <p className='text-secondary text-[16px] font-semibold' style={{ margin: 0 }}>{experience.company_name}</p>
      </div>
      <ul className='mt-5 list-disc ml-5 space-y-2'>
        {experience.points.map((point, index) => (
          <li key={`experience-point-${index}`} className='text-white-100 text-[14px] pl-1 tracking-wider'>
            <div dangerouslySetInnerHTML={{ __html: point }}></div>
          </li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
  const Experience: React.FC<argtype> = ({isMobile}) => {
    return (
      <>
        <motion.div variants={textVariant(0)} custom={100} initial="initial" animate="final" className={`${isMobile ? 'mx-3' : 'mx-10'} mt-20`}>
          <p className="text-4xl font-bold text-zinc-100 ">Experience</p>
          {/*<h2 className="text-3xl font-semibold text-zinc-10">*/}
          {/*  Experience.*/}
          {/*</h2>*/}
        </motion.div>
        <div className='mt-20 flex flex-col tracking-tight'>
          <VerticalTimeline>
            {experiences.map((experience, index) => (
              <ExperienceCard key={`experience-${index}`} experience={experience} />
            ))}
          </VerticalTimeline>
        </div>
      </>
    );
  }

  export default SectionWrapper(Experience, "experience");