import React, { useState } from 'react';
import { argtype, navLinks } from "@/utils/constants";

import { motion } from "framer-motion";

const show = {
  opacity: 1,
  display: "block",
};

const hide = {
  opacity: 0,
  transitionEnd: {
    display: "none",
  },
};

const Navbar: React.FC<argtype> = ({isMobile}) => {
  const [active, setActive] = useState<string>('');
  const [toggle, setToggle] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <nav className={`green-gradient w-full flex items-center py-5 content-center fixed top-0 z-20 backdrop-blur-sm backgrop-filter`}>
      <div className='w-full flex justify-center max-w-7xl mx-auto'>
        {/* <Image src={trace} alt="logo" className='w-16 h-16 object-contain cursor-pointer' onClick={() => { setActive(''); window.scrollTo(0, 0); }}/> */}
        <ul className='hidden sm:flex flex-row gap-10 font-semibold md:font-bold content-center text-lg'>
          {navLinks.map((link) => (
            <li key={link.id} className={`${(active === link.title && active !== "Dissertation") ? "text-white" : "text-secondary"} hover:text-white font-medium cursor-pointer`}
              onClick={() => { setActive(link.title); setIsOpen(!isOpen); }}>
              {(link.id === "dissertation") ? <a href={"https://dissertation.tbritt.xyz"}>{link.title}</a> : <a href={`#${link.id}`}>{link.title}</a>}
            </li>
          ))}
        </ul>
        <div className='sm:hidden flex flex-1 justify-end items-center'>
          <div className="w-[28px] h-[28px] mr-[16px] object-contain cursor-pointer absolute" onClick={() => setToggle(!toggle)}>
            <div className="px-2 mt-1">
              <motion.div initial={{ scale: 1 }} animate={{ rotate: toggle ? 180 : 0, scale: 1 }} transition={{ type: "spring", stiffness: 260, damping: 20 }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-up w-5 h-5">
                  <polyline points="18 15 12 9 6 15"></polyline>
                </svg>
              </motion.div>
            </div>
          </div>
            {/* <motion.img animate={{ opacity: toggle ? 0 : 1 }} src={menu} alt="menu" className='w-[28px] h-[28px] object-contain cursor-pointer absolute' onClick={() => setToggle(!toggle)} />
            <motion.img animate={{ opacity: toggle ? 1 : 0 }} src={close} alt="menu" className='w-[28px] h-[28px] object-contain cursor-pointer absolute' onClick={() => setToggle(!toggle)} /> */}
          </div>
          <motion.div animate={toggle ? show : hide} className={`${!toggle ? 'hidden' : 'flex'} p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}>
            <ul className='list-none flex justify-end items-start flex-col gap-4'>
              {navLinks.map((link) => (
                <li key={link.id} className={`${(active === link.title && active !== "Dissertation") ? "text-white" : "text-secondary"} font-medium cursor-pointer text-[16px]`}
                  onClick={() => {
                    setToggle(!toggle);
                    setActive(link.title);
                    setIsOpen(!isOpen);
                  }}>
                  {(link.id === "dissertation") ?
                    <a href="https://dissertation.tbritt.xyz/dissertation_draft.pdf">{link.title}</a> :
                    <a href={`#${link.id}`}>{link.title}</a>
                  }
                </li>
              ))}
            </ul>
          </motion.div>
        </div> 
    </nav>
  );
}

export default Navbar;
