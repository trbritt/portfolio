import {SectionWrapper} from '../hoc';
import React, {useState} from 'react';
import { fadeIn, textVariant } from "../utils/motion";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { faqs } from "../constants";

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

const FAQCard = ({index, question, response}) => {
    const [toggle, setToggle] = useState(false);
    return (
            <div className={`mb-2 h-[${toggle ? 450 : 30}px]`}>
                <div className="font-medium rounded-sm text-lg px-2 py-3 flex text-secondary flex-row-reverse mt-2 cursor-pointer " onClick={()=> setToggle(!toggle)}>
                    <div className="flex-auto">{question}</div>
                    <div className="px-2 mt-1">
                        <motion.div initial={{ scale: 1 }} animate={{ rotate: toggle ? 180 : 0, scale: 1 }} transition={{ type: "spring", stiffness: 260, damping: 20}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-up w-5 h-5">
                                <polyline points="18 15 12 9 6 15"></polyline>
                            </svg> 
                        </motion.div>
                    </div>
                </div>
                <motion.p animate={toggle ? show : hide} className='p-2 text-justify text-center text-secondary max-w-3xl'>
                    <div dangerouslySetInnerHTML={{__html: response}}></div>
                </motion.p>
            </div>
    );
}

const FAQ = () => {
    return (
        <>
            <motion.div variants={textVariant()}>
              <p className={`${styles.sectionSubText} `}>Fun facts</p>
              <h2 className={`${styles.sectionHeadText}`}>FAQs.</h2>
            </motion.div>
  
            <div className='w-full'>
              <motion.p
              variants={fadeIn("", "", 0.1, 1)}
              className='mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]'
              >
                  Feel free to check out my FAQs.
              {faqs.map((faq, index) =>(
                <FAQCard key={`faq-${index}`} index={index} {...faq}/>
              ))}  
            </motion.p>

            </div>
            
        </>
    )
  }
  
  export default SectionWrapper(FAQ, "FAQ")