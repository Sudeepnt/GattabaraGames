"use client";

import React from "react";
import { Canvas } from "@react-three/fiber";
import { Text3D, Center, Float, Environment } from "@react-three/drei";

// Using a standard font from Three.js examples for immediate compatibility.
// You can download a chunky font JSON (like Inter_Bold.json) and put it in your public/fonts folder.
const FONT_URL = "https://threejs.org/examples/fonts/helvetiker_bold.typeface.json";

const BalloonText = () => {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <Center>
        <Text3D
          font={FONT_URL}
          size={3}
          height={0.2} // Thickness of the letter body
          curveSegments={32}
          bevelEnabled
          bevelThickness={1} // High value creates the "puff"
          bevelSize={0.1}    // Tucks the bevel in
          bevelOffset={0}
          bevelSegments={20} // Smoothness of the puff
        >
          KEPLER
          <meshPhysicalMaterial 
            color="#3035e6" // Cobalt Blue
            roughness={0.4}
            metalness={0.1}
            clearcoat={1}   // Adds a shiny plastic/balloon layer
            clearcoatRoughness={0.2}
          />
        </Text3D>
      </Center>
    </Float>
  );
};

export default function BloatedKepler() {
  return (
    <div className="w-full h-[300px] md:h-[400px] cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-5, -5, 5]} intensity={1} color="#3035e6" />
        
        <BalloonText />
        
        {/* Environment helps with reflections on the balloon surface */}
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}