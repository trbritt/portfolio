import { motion } from "framer-motion";
import { styles } from "./styles";
import { staggerContainer } from "./motion";
import React, { FC } from "react";
import { argtype } from "./constants";

export const useMobile = () => {
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(()=>{
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    setIsMobile(mediaQuery.matches);
    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
        setIsMobile(event.matches);
    };
    mediaQuery.addEventListener("change", handleMediaQueryChange);
    return () => {
        mediaQuery.removeEventListener("change", handleMediaQueryChange);
      };
  }, []);
  return isMobile;
}

const SectionWrapper = (Component: FC<argtype>, idName: string) => {

  const HOC: FC = () => {
    return (
      <>
        <span className='hash-span' id={idName} />
        <motion.section
          variants={staggerContainer(0.8, 0.1)} // Add appropriate delay and stagger values
          initial={idName === 'about' || idName === 'work' ? 'show' : 'hidden'}
          whileInView='show'
          viewport={{ once: true, amount: 0.25 }}
          className={`${styles.padding} max-w-7xl mx-auto relative z-0`}
        >
          <Component isMobile={useMobile()}/>
        </motion.section>
      </>
    );
  };

  return HOC;
};

export default SectionWrapper;
