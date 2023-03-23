import {SectionWrapper} from '../hoc'
import { fadeIn, textVariant } from "../utils/motion";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { social_links } from "../constants";
import Tilt from "react-tilt";

const SocialLinkCard = ({ index, title, icon, source_code_link }) => (
    <Tilt className='xs:w-[250px] w-full' >
      <motion.div
        variants={fadeIn("right", "spring", index * 0.5, 0.75)}
        className='w-full maroon-slate-gradient p-[1px] rounded-[20px] shadow-card cursor-pointer' onClick={() => window.open(source_code_link, "_blank")}
      >
        <div
          options={{
            max: 1,
            scale: 1,
            speed: 150,
          }}
          className='bg-tertiary rounded-[20px] py-5 px-12 min-h-[180px] flex justify-evenly items-center flex-col'
        >
          <img
            src={icon}
            alt='web-development'
            className='w-16 h-16 object-contain'
          />
  
          <h3 className='text-white text-[20px] font-bold text-center'>
            {title}
          </h3>
        </div>
      </motion.div>
    </Tilt>
  );
const Links = () => {
  return (
    <>
        <motion.div variants={textVariant()}>
            <p className={`${styles.sectionSubText} `}>My links</p>
            <h2 className={`${styles.sectionHeadText}`}>Socials.</h2>
        </motion.div>

        <div className='w-full flex'>
            <motion.p
            variants={fadeIn("", "", 0.1, 1)}
            className='mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]'
            >
                Feel free to check out my online socials for more details about me, my projects, or my publications.
            </motion.p>
        </div>
        <div className='mt-20 flex justify-center flex-wrap gap-10' >
        {social_links.map((social_link, index) => (
          <SocialLinkCard key={social_link.title} index={index} {...social_link} />
        ))}
      </div>
    </>
  )
}

export default SectionWrapper(Links, "")