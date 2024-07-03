import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Decal, Float, OrbitControls, Preload, useTexture } from "@react-three/drei";
import { Flex, Box } from '@react-three/flex';
import CanvasLoader from "./loader";
import { StaticImageData } from "next/image";

interface BallProps {
  imgUrl: StaticImageData;
}

const Ball: React.FC<BallProps> = ({ imgUrl }) => {
  const [decal] = useTexture([imgUrl.src]);

  return (
    <Flex justifyContent="center" alignItems="center">
      <Box width="auto" height="auto" flexGrow={1} centerAnchor>
        <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
          <ambientLight intensity={0.25} />
          <directionalLight position={[0, 0, 0.05]} />
          <mesh castShadow receiveShadow scale={2.25}>
            <icosahedronGeometry args={[1, 1]} />
            <meshStandardMaterial color='#fff8eb' flatShading />
            <Decal 
              position={[0, 0, 1]} 
              rotation={[2 * Math.PI, 0, 6.28]} 
              polygonOffsetFactor={-10} 
              scale={1} 
              map={decal} 
            />
          </mesh>
        </Float>
      </Box>
    </Flex>
  );
};

interface BallCanvasProps {
  icon: StaticImageData;
}

const BallCanvas: React.FC<BallCanvasProps> = ({ icon }) => {
  return (
    <Canvas
    //   noEvents
    //   colorManagement
    //   shadowMap
      frameloop='demand'
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls 
          enableZoom={false} 
          minAzimuthAngle={-Math.PI / 6} 
          maxAzimuthAngle={Math.PI / 6} 
          minPolarAngle={Math.PI / 3} 
          maxPolarAngle={Math.PI / 2} 
        />
        <Ball imgUrl={icon} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default BallCanvas;
