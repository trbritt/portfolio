import React, {useState} from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { styles } from '../styles';
import { close
 } from '../assets';
const Dissertation = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <AnimatePresence>
            <motion.div
                // key="modal"
                className='z-20 absolute flex items-center justify-center h-screen left-[5px] right-[5px] top-[80px] bg-indigo-500/10 cursor-default '
                initial={{ opacity: 0, scale: 0.5, x: "-50%", y: "-50%" }}
                animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                exit={{ opacity: 0 }}
            >
                <div className='w-full flex items-center justify-center h-5/6' >
                    <div className='absolute left-[5px] right-[5px] top-[20px] h-[28px] mr-[16px]'>
                        <motion.img animate src={close} alt="menu" className='w-[28px] h-[28px] object-contain cursor-pointer absolute' onClick={()=> setIsOpen(false)}/>
                    </div>
                WAHOO
                </div>
            </motion.div>
        </AnimatePresence>
    )
}


export default Dissertation;
