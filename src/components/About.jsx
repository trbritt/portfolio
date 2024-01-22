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
        Having worked extensively in the managerial teams of large scale organisations in the time before completing my undergraduate degree, I've developed team leadership skills from the beginning of my professional career. My industry research includes simulation and optimisation of custom radiofrequency (RF) waveguides for use in cryogenic axion dark matter experiments (ADMX) at the Korea Advanced Institute of Science and Technology (KAIST). In addition, I have also saw through the co-design and optimisation of the bending magnet currently in use in the LEReC beamline in the electron Relativistic Heavy Ion Collider (eRHIC) at Brookhaven National Lab (BNL). These projects have given me the experience and preparedness to handle high quality real-time research.
        My current focus is on examining the unique properties of 2D materials as revealed through momentum and time resolved ultrafast electron diffraction spectroscopy at McGill University, under the advisorship of Professor Bradley J Siwick, including both experiment and numerical simulations using time dependent perturbative density functional theory (TDPDFT). Experiments under progress include the observation of chiral phonons in monolayer molybdenum disulphide (MoS$_2$), as well as the thermoelectric properties of tin selenide (SnSe) approaching the PNMA phase transition at 600K.</Latex>
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