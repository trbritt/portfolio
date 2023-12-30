import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import 'katex/dist/katex.min.css';
import React, { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion"
import {About, Contact, Experience, Hero, Navbar, Tech, Links, FAQ, Works, StarsCanvas} from './components';
import Modal from "./components/modal404";
const App = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const Modal404 = () => {
    modalOpen ? setModalOpen(false) : setModalOpen(true);
    return (
      <AnimatePresence
          // Disable any initial animations on children that
          // are present when the component is first rendered
          initial={false}
          // Only render one component at a time.
          // The exiting component will finish its exit
          // animation before entering component is rendered
          // Fires when all exiting nodes have completed animating out
          onExitComplete={() => null}
      >
          {modalOpen && <Modal modalOpen={modalOpen} handleClose={close} />}
      </AnimatePresence>
    )
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={
          <Navigate to="/404" replace />
        }/>
        <Route path="/" element={
          <div className="relative z-0 bg-primary">
          <div className="bg-cover bg-no-repeat bg-center">
            <Navbar/>
            <Hero/>
          </div>
          <About/>
          <Experience/>
          <Tech/>
          <Links/>
          <Works/>
          <FAQ/>
          <div className="relative z-0">
          <Contact/>
          <StarsCanvas/>
          </div>
          </div>
        } />
      </Routes>
    </BrowserRouter>

  )
}

export default App
