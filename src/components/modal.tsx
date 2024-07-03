import React, { useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";


const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

interface BackdropProps  {
    children: ReactNode;
    onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

interface ModalProps {
    handleClose: (event: React.MouseEvent<HTMLButtonElement | HTMLDivElement, MouseEvent>) => void;
    text: string;
    modalOpen: boolean;
  }

const Backdrop: React.FC<BackdropProps> = ({ children, onClick }) => {
 
    return (
      <motion.div
        onClick={onClick}
        className="absolute -top-20 start-0 h-full bg-[#000000f0] w-full flex align-center justify-center z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {children}
      </motion.div>
    );
  };
  
const Modal: React.FC<ModalProps> = ({ handleClose, text }) => {
    return (
      <Backdrop onClick={handleClose}>
        <motion.div
          onClick={(e) => e.stopPropagation()}  
          className="w-[160px] h-[200px] bg-emerald-500 rounded-xl flex flex-col align-center"
          variants={dropIn}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <p>{text}</p>
          <button className="h-[2.5rem] mx-[2rem] my-auto bg-[#101111] rounded-xl" onClick={handleClose}>
            Close
        </button>
        </motion.div>
      </Backdrop>
    );
  };

  function DonateButton () {
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = (event: React.MouseEvent<HTMLButtonElement | HTMLDivElement, MouseEvent>) => {
        setModalOpen(false);
    };
  
    return (
        <>
            <div>
                <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="save-button"
                onClick={modalOpen ? handleCloseModal : handleOpenModal}
                >
                Donate
                </motion.button>
            </div>
            <AnimatePresence
                // Disable any initial animations on children that
                // are present when the component is first rendered
                initial={false}
                // Only render one component at a time.
                // The exiting component will finish its exit
                // animation before entering component is rendered
                mode="wait"
                // Fires when all exiting nodes have completed animating out
                onExitComplete={() => null}
            >
                {modalOpen && <Modal modalOpen={modalOpen} handleClose={handleCloseModal} text="Content!"/>}
            </AnimatePresence>
      </>
    )
  }

  export default DonateButton;