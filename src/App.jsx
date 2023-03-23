import { BrowserRouter } from "react-router-dom";
import 'katex/dist/katex.min.css';

import {About, Contact, Experience, Hero, Navbar, Tech, Links, FAQ, Works, StarsCanvas} from './components';


const App = () => {
  return (
    <BrowserRouter>
      <div className="relative z-0 bg-primary">
        <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
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
    </BrowserRouter>

  )
}

export default App
