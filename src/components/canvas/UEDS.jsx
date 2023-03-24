import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF} from "@react-three/drei";

import CanvasLoader from "../Loader";

const UEDS = ({ isMobile }) => {
  const ueds = useGLTF("./UEDS/scene.glb");

  return (
    
    <mesh>
      <hemisphereLight intensity={0.15} groundColor='black' />
      <spotLight position={[-20, 50, 10]} angle={0.12} penumbra={1} intensity={1} castShadow shadow-mapSize={1024}/>
      <spotLight position={[-10.5, 0, 100]} angle={0.35} attenuation={5} anglePower={1} intensity={1} castShadow penumbra={1} color="#0c8cbf" />
      <spotLight position={[8.5, -0.6, 4]} angle={0.25} attenuation={5} anglePower={1} intensity={10} castShadow penumbra={1} color="#b00c3f" />
      <spotLight position={[-8.5, -0.6, 100]} angle={0.25} attenuation={5} anglePower={1} intensity={1} penumbra={1} color="#b00c3f" />
      <spotLight position={[9.5, -0.6, 4.5]} angle={0.35} attenuation={5} anglePower={10} intensity={2} penumbra={1} color="#0c8cbf" />
      
      <pointLight intensity={1} />
      <fog attach="fog" args={['#202020', 5, 20]} />

      <primitive
        object={ueds.scene} scale={isMobile ? 0.01 : 0.025} position={isMobile ? [8, -0.5, 2.7] : [7, -0.5, 4]}
        rotation={isMobile ? [0,0.7,0] : [-0.0, 0.2, -0.]}
      />
    </mesh>
  );
};

const UEDSCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
  //   // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 500px)");

  //   // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);

  //   // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

  //   // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

  //   // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      frameloop='demand' shadows dpr={[1, 2]} camera={{ position: [20, 3, 5], fov: 25 }} gl={{ preserveDrawingBuffer: true } }
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.75} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2}/> 
        // //
        <UEDS isMobile={isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default UEDSCanvas;