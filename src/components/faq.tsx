import React, { useState } from 'react';
import { motion } from "framer-motion";
import { argtype, faqs } from '@/utils/constants';
import SectionWrapper from '@/utils/section';
import { fadeIn, textVariant } from '@/utils/motion';

interface FAQType  {
    question: string;
    response: string;
  }
interface FAQCardProps extends FAQType {
    index: number;
  }
  
const show = {
    opacity: 1,
    display: "block"
  };
  
  const hide = {
    opacity: 0,
    transitionEnd: {
      display: "none"
    }
  };


const FAQCard: React.FC<FAQCardProps> = ({ index, question, response }) => {
    const [toggle, setToggle] = useState(false);
    return (
      <div className={`mb-2 h-[${toggle ? 450 : 30}px] text-zinc bg-quartary rounded-2xl`}>
        <div className="font-medium rounded-sm text-lg px-2 py-3 flex flex-row-reverse mt-2 cursor-pointer" onClick={() => setToggle(!toggle)}>
          <div className="flex-auto">{question}</div>
          <div className="px-2 mt-1">
            <motion.div initial={{ scale: 1 }} animate={{ rotate: toggle ? 180 : 0, scale: 1 }} transition={{ type: "spring", stiffness: 260, damping: 20 }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-up w-5 h-5">
                <polyline points="18 15 12 9 6 15"></polyline>
              </svg>
            </motion.div>
          </div>
        </div>
        <motion.p animate={toggle ? show : hide} className='p-2 text-justify text-center text-zinc max-w-3xl'>
          <div dangerouslySetInnerHTML={{ __html: response }}></div>
        </motion.p>
      </div>
    );
  };

  const FAQ: React.FC<argtype> = ({isMobile}) => {
    return (
      <>
        <motion.div variants={textVariant(5)} className={`${isMobile ? 'mx-3' : 'mx-10'}`}>
          <p className="text-4xl font-bold text-zinc-100 mt-20">Fun facts</p>
          <h2 className="text-3xl font-semibold text-zinc-10">FAQs.</h2>
        </motion.div>
  
        <div className='w-full'>
          <motion.p
            variants={fadeIn("down", "", 0.1, 1)}
            className={`mt-3 text-zinc text-[17px] max-w-3xl leading-[30px] ${isMobile ? 'mx-3' : 'mx-10'}`}
          >
            Feel free to check out my FAQs.
            {faqs.map((faq: FAQType, index: number) => (
              <FAQCard key={`faq-${index}`} index={index} {...faq} />
            ))}
          </motion.p>
        </div>
      </>
    );
  };
  
  export default SectionWrapper(FAQ, "FAQ");