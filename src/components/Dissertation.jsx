import React, {useState} from 'react';
import {  motion } from 'framer-motion';
import { close
 } from '../assets';

const center = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  };
  
 const Dissertation = () => {
    const [isOpen, setIsOpen] = useState(true);
    return (
        <motion.div
          className={`z-20 absolute flex items-center justify-center h-screen left-[5px] right-[5px] top-[80px] bg-indigo-500/10 cursor-default`}
          initial={{ opacity: 0, scale: 0.5, translateX: -center.x, translateY: -center.y }}
          animate={isOpen ? { opacity: 1, scale: 1, translateX: 0, translateY: 0 } : { opacity: 0, scale: 1, translateX: 0, translateY: 0 }}
        >
             <div className='absolute left-[5px] right-[5px] top-[20px] h-[28px] mr-[16px]'>
                      <motion.img animate src={close} alt="menu" className='w-[28px] h-[28px] object-contain cursor-pointer absolute' onClick={()=> {setIsOpen(false); console.log(isOpen);setIsOpen(true);}}/>
              </div>
            <p className='backdrop-blur-2xl text-secondary text-[17px] max-w-3xl'>Sed aliquam sollicitudin turpis, quis ullamcorper dolor finibus non. Suspendisse lacus arcu, finibus ac ligula quis, luctus luctus turpis. Quisque eleifend ex et eleifend pretium. Suspendisse ac lacus felis. Sed blandit finibus odio, sed viverra justo lacinia luctus. Aliquam sed arcu non elit malesuada fermentum a quis lorem. Curabitur at dui eleifend, ultricies lorem finibus, elementum nulla. Fusce ipsum mauris, aliquam non odio sed, finibus feugiat purus. Nam ac vehicula turpis, id laoreet massa. Aliquam sed condimentum augue. Ut eu augue pulvinar dolor porta congue. Morbi facilisis at nisl nec cursus. Nulla eu sapien feugiat, viverra augue sit amet, feugiat eros. Pellentesque nec massa enim. Morbi volutpat sollicitudin ante at elementum. Vestibulum pharetra dui at egestas tempor.</p>
        </motion.div>
    )
  }

export default Dissertation;
