import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Decal, Float, OrbitControls, Preload, useTexture } from "@react-three/drei";
import { Flex, Box } from '@react-three/flex'

import CanvasLoader from "../Loader";

const Ball = (props) => {
  const [decal] = useTexture([props.imgUrl]);

  return (
    <Flex justifyContent="center" alignItems="center">
      <Box width="auto" height="auto" flexGrow={1} centerAnchor>
        <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
          <ambientLight intensity={0.25} />
          <directionalLight position={[0, 0, 0.05]} />
          <mesh castShadow receiveShadow scale={2.25}>
            <icosahedronGeometry args={[1, 1]} />
            <meshStandardMaterial color='#fff8eb'   flatShading/>
            <Decal position={[0, 0, 1]} rotation={[2 * Math.PI, 0, 6.28]}  polygonOffset polygonOffsetFactor={-10} scale={1} map={decal} flatShading/>
          </mesh>
        </Float>
      </Box>
    </Flex>
    
  );
};

const BallCanvas = ({ icon }) => {
  return (
    <Canvas
    concurrent noEvents colorManagement shadowMap frameloop='demand' dpr={[1, 2]} gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls  enableZoom={false} minAzimuthAngle={-Math.PI / 6} maxAzimuthAngle={Math.PI / 6} minPolarAngle={Math.PI/3} maxPolarAngle={Math.PI / 2}/>
        <Ball imgUrl={icon} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default BallCanvas;