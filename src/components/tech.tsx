
import React from 'react';
import  BallCanvas  from './balls';
import  SectionWrapper  from '../utils/section';
import  {argtype, technologies}  from "@/utils/constants";
import { StaticImageData } from 'next/image';
// types.ts
export interface Technology {
name: string;
icon: StaticImageData; // Assuming the icon is a URL or file path as a string
}
const Tech: React.FC<argtype> = ({isMobile}) => {
return (
    <div className='flex flex-row flex-wrap justify-center gap-10'>
    {technologies.map((technology: Technology) => (
        <div className='w-28 h-28' key={technology.name}>
        <BallCanvas icon={technology.icon} />
        </div>
    ))}
    </div>
);
}

export default SectionWrapper(Tech, "");
