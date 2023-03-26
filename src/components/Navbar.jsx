import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { styles } from '../styles';
import { navLinks } from '../constants';
import { logo, menu, close } from '../assets';
import { fadeIn } from '../utils/motion';
import { AnimatePresence, motion } from "framer-motion";
import {Dissertation} from "./Dissertation";

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


const Navbar = () => {
  const [active, setActive] = useState('');
  const [toggle, setToggle] = useState(false);
	const [isOpen, setIsOpen] = React.useState(false)

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
            <li key={link.id} className={`${(active === link.title && active !== "Dissertation") ? "text-white" : "text-secondary"} hover:text-white text-[18px] font-medium cursor-pointer`}
                onClick={()=> {setActive(link.title);setIsOpen(!isOpen);}}>
                <a href={`#${link.id}`}>{link.title}</a>
                {(active==="Dissertation") && (link.id==="dissertation") ? <Dissertation isOpen={isOpen} setIsOpen={setIsOpen}/> : null}
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