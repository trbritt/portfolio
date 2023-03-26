import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { styles } from '../styles';
import { navLinks } from '../constants';
import { logo, menu, close } from '../assets';
import { fadeIn } from '../utils/motion';
import { AnimatePresence, motion } from "framer-motion";
// import Dissertation from "./Dissertation";

const center = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2,
};

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
const Dissertation = ({setter, title}) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
      <motion.div
        className={`z-20 absolute flex items-center justify-center h-screen left-[5px] right-[5px] top-[80px] bg-indigo-500/10 cursor-default`}
        initial={{ opacity: 0, scale: 0.5, translateX: -center.x, translateY: -center.y }}
        animate={isOpen ? { opacity: 1, scale: 1, translateX: 0, translateY: 0 } : { opacity: 0, scale: 1, translateX: 0, translateY: 0 }}
      >
           <div className='absolute left-[5px] right-[5px] top-[20px] h-[28px] mr-[16px]'>
                    <motion.img animate src={close} alt="menu" className='w-[28px] h-[28px] object-contain cursor-pointer absolute' onClick={()=> {setIsOpen(!isOpen); console.log(isOpen);}}/>
            </div>
          <p className='backdrop-blur-2xl text-secondary text-[17px] max-w-3xl'>Sed aliquam sollicitudin turpis, quis ullamcorper dolor finibus non. Suspendisse lacus arcu, finibus ac ligula quis, luctus luctus turpis. Quisque eleifend ex et eleifend pretium. Suspendisse ac lacus felis. Sed blandit finibus odio, sed viverra justo lacinia luctus. Aliquam sed arcu non elit malesuada fermentum a quis lorem. Curabitur at dui eleifend, ultricies lorem finibus, elementum nulla. Fusce ipsum mauris, aliquam non odio sed, finibus feugiat purus. Nam ac vehicula turpis, id laoreet massa. Aliquam sed condimentum augue. Ut eu augue pulvinar dolor porta congue. Morbi facilisis at nisl nec cursus. Nulla eu sapien feugiat, viverra augue sit amet, feugiat eros. Pellentesque nec massa enim. Morbi volutpat sollicitudin ante at elementum. Vestibulum pharetra dui at egestas tempor.</p>
      </motion.div>
  )
}

const Navbar = () => {
  const [active, setActive] = useState('');
  const [toggle, setToggle] = useState(false);

  return (
    <nav className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20  backdrop-blur-sm backgrop-filter shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]`}>
      <div className='w-full flex justify-between items-center max-w-7xl mx-auto'>
        <Link to="/portfolio" className='flex items-center gap-2' onClick={()=> {setActive("");window.scrollTo(0,0);}}>
          <img src={logo} alt="logo" className='w-9 h-9 object-contain'/>
          <p className='test-white test-[18px] font-bold cursor-pointer flex'>
            Tristan&nbsp;
            <span className='sm:block hidden'>| Portfolio</span></p>
        </Link>
        <ul className='list-none hidden sm:flex flex-row gap-10'>
          {navLinks.map((link) => (
            <li key={link.id} className={`${active === link.title ? "text-white" : "text-secondary"} hover:text-white text-[18px] font-medium cursor-pointer`}
                onClick={()=> setActive(link.title)}>
                <a href={`#${link.id}`}>{link.title}</a>
                {(active==="Dissertation") && (link.id==="dissertation") ? <Dissertation currentSetter={setActive} currentTitle={link.title}/> : <></>}
            </li>
          ))}
        </ul>
        <div className='sm:hidden flex flex-1 justify-end items-center'>
          <div className='h-[28px] mr-[16px]'>
            <motion.img animate={{opacity: toggle ? 0 : 1}} src={menu} alt="menu" className='w-[28px] h-[28px] object-contain cursor-pointer absolute' onClick={()=> setToggle(!toggle)}/>
            <motion.img animate={{opacity: toggle ? 1 : 0}} src={close} alt="menu" className='w-[28px] h-[28px] object-contain cursor-pointer absolute' onClick={()=> setToggle(!toggle)}/>
          </div>
          <motion.div animate={toggle ? show : hide} className={`${!toggle ? 'hidden' : 'flex'} p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}>
            {/* same as above  */}
            <ul className='list-none flex justify-end items-start flex-col gap-4'>
            {navLinks.map((link) => (
              <li key={link.id} className={`${active === link.title ? "text-white" : "text-secondary"} font-poppins font-medium cursor-pointer text-[16px]`}
                  onClick={()=> {
                    setToggle(!toggle);
                    setActive(link.title);
                  }
              }>
                <a href={`#${link.id}`}>{link.title}</a>
              </li>
            ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar