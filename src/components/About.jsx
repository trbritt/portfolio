import React from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import Latex from 'react-latex-next';
const usePointerGlow = () => {
  const [status, setStatus] = React.useState(null)
  React.useEffect(() => {
    const syncPointer = ({ x: pointerX, y: pointerY }) => {
      const x = pointerX.toFixed(2)
      const y = pointerY.toFixed(2)
      const xp = (pointerX / window.innerWidth).toFixed(2)
      const yp = (pointerY / window.innerHeight).toFixed(2)
      document.documentElement.style.setProperty('--x', x)
      document.documentElement.style.setProperty('--xp', xp)
      document.documentElement.style.setProperty('--y', y)
      document.documentElement.style.setProperty('--yp', yp)
      setStatus({ x, y, xp, yp })
    }
    document.body.addEventListener('pointermove', syncPointer)
    return () => {
      document.body.removeEventListener('pointermove', syncPointer)
    }
  }, [])
  return [status]
}
const ServiceCard = ({ index, title, icon }) => (
  <div className='xs:w-[250px] w-full'>
    <article data-glow className="shadow-card bg-tertiary w-full p-[1px] rounded-[20px]">
      <div
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className='py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col'
      >
        <img
          src={icon}
          alt='web-development'
          className='w-16 h-16 object-contain'
        />
        <div className='text-white text-[20px] font-bold text-center' dangerouslySetInnerHTML={{__html: title}}/>
      </div>

      </article>
   </div>
);

const About = () => {
  const [status] = usePointerGlow();
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("down", "", 0.1, 1)}
        className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]'
      >
        <Latex>
        Acquiring my doctorate (PhD) in Physics at McGill University enforced my high attention to detail, sharpened my analytical reasoning, and gave me robust and extensive backgrounds in Mathematics, Statistics, Programming, and high-quality real-time research. 

        My professional journey has equipped me with research-grade proficiency in C++, Fortran, and Python, and I have used these tools for a range of industrial applications, from experiment design at the Large Hadron Collider (LHC) in Switzerland, to designing and implementing a competitive replacement for the LabView infrastructure at Flojoy, Inc. Further, my academic research required the collection of extensive (~TB) datasets, and the efficient use of supercomputing resources, such as MPI, OpenMP, and CUDA, to extract and analyse the relevant information from the resulting data. 

        My abilities to utilise cutting-edge technology, to analyse and successfully execute solutions to complex problems, and my strong willingness to collaborate with my peers poises me as successful researcher.</Latex>
      </motion.p>

      <div className='mt-20 flex justify-center flex-wrap gap-10'>
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");