"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Center, Sphere, RoundedBox, Outlines, useTexture } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import * as THREE from "three";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const CrodalLogo3D = ({ activePage, logoType = 'gg' }: { activePage: string, logoType?: 'gg' | 'star' | 'star2' }) => {
  const groupRef = useRef<THREE.Group>(null);
  const internalMotionRef = useRef<THREE.Group>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  // Load the texture based on type
  let textureUrl = "/gg-logo.png";
  if (logoType === 'star') textureUrl = "/star-logo.png";
  if (logoType === 'star2') textureUrl = "/star2-logo.png";

  const logoTexture = useTexture(textureUrl);

  // Configure texture for pixel art look
  useMemo(() => {
    logoTexture.minFilter = THREE.NearestFilter;
    logoTexture.magFilter = THREE.NearestFilter;
    logoTexture.generateMipmaps = false;
  }, [logoTexture]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // --- ALIVE MOTION ---
  useFrame((state, delta) => {
    if (!internalMotionRef.current) return;

    let targetRotX = 0;
    let targetRotY = 0;
    let targetRotZ = 0;

    if (activePage === "home") {
      const scrollY = window.scrollY;

      if (scrollY > 1) {
        mouseRef.current = { x: 0, y: 0 };
      }

      const scrollFactor = Math.max(0, 1 - scrollY / 50);

      if (scrollFactor > 0) {
        const { x, y } = mouseRef.current;

        // 1. REDUCED SENSITIVITY
        let rawX = y * 1.0;
        let rawY = x * 1.0;

        const LIMIT = 0.5;

        targetRotX = THREE.MathUtils.clamp(rawX, -LIMIT, LIMIT) * scrollFactor;
        targetRotY = THREE.MathUtils.clamp(rawY, -LIMIT, LIMIT) * scrollFactor;

        targetRotZ = THREE.MathUtils.clamp(-x * 0.3, -0.2, 0.2) * scrollFactor;
      }
    }

    // 2. SMOOTHER ANIMATION
    internalMotionRef.current.rotation.x = THREE.MathUtils.lerp(internalMotionRef.current.rotation.x, targetRotX, delta * 4.0);
    internalMotionRef.current.rotation.y = THREE.MathUtils.lerp(internalMotionRef.current.rotation.y, targetRotY, delta * 4.0);
    internalMotionRef.current.rotation.z = THREE.MathUtils.lerp(internalMotionRef.current.rotation.z, targetRotZ, delta * 4.0);
  });

  // --- GSAP SCROLL ---
  useGSAP(() => {
    if (!groupRef.current) return;

    gsap.killTweensOf(groupRef.current);
    gsap.killTweensOf(groupRef.current.position);
    gsap.killTweensOf(groupRef.current.rotation);
    gsap.killTweensOf(groupRef.current.scale);
    ScrollTrigger.getAll().forEach(t => t.kill());

    const isMobile = window.innerWidth < 768;

    if (activePage === "home") {
      // Reduced size by half as requested
      let baseScale = isMobile ? 0.75 : 1.25;

      // Reduce Star size by 20%
      if (logoType === 'star' || logoType === 'star2') {
        baseScale *= 0.8;
      }

      const startScale = baseScale;
      const endScale = startScale / 2;

      gsap.set(groupRef.current.scale, { x: startScale, y: startScale, z: startScale });
      gsap.set(groupRef.current.position, { x: 0, y: 0, z: 0 });
      gsap.set(groupRef.current.rotation, { x: 0, y: 0, z: 0 });

      ScrollTrigger.refresh();

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "+=100vh",
          scrub: 1,
        }
      });

      // Scroll Animation: 1 Full Rotation
      tl.to(groupRef.current.rotation, {
        y: Math.PI * 2,
        x: 0,
        z: 0,
        duration: 1,
        ease: "none"
      }, 0);

      tl.to(groupRef.current.scale, {
        x: endScale,
        y: endScale,
        z: endScale,
        duration: 1
      }, 0);

    } else {
      const sideScale = isMobile ? 0.8 : 1.2;
      const sidePos = [isMobile ? 1.5 : 3.5, 0, -2];

      gsap.to(groupRef.current.scale, { x: sideScale, y: sideScale, z: sideScale, duration: 1.5, ease: "power3.inOut" });
      gsap.to(groupRef.current.position, { x: sidePos[0], y: sidePos[1], z: sidePos[2], duration: 1.5, ease: "power3.inOut" });
      gsap.to(groupRef.current.rotation, { x: 0, y: 0, z: 0, duration: 1.5 });
    }
  }, [activePage]);

  // --- GEOMETRY: Stacking for Thickness (Pseudo-Extrusion) ---
  const layers = 32; // Number of slices to create thickness
  const depth = 0.5; // Total thickness

  return (
    <group dispose={null} ref={groupRef}>
      <group ref={internalMotionRef}>
        <Center>
          {Array.from({ length: layers }).map((_, i) => {
            const z = (i - (layers - 1) / 2) * (depth / layers);

            // Color variation for "sides" vs front/back
            // We make the middle layers slightly darker to simulate shadow/depth on the edges
            const isFace = i === 0 || i === layers - 1;
            // Bright faces, slightly darker 'body'
            const brightness = isFace ? 12 : 8;

            return (
              <mesh key={i} position={[0, 0, z]}>
                <planeGeometry args={[3, 3]} />
                <meshStandardMaterial
                  color={isFace ? "#000000" : "#1a1a1a"}
                  map={logoTexture}
                  alphaMap={logoTexture}
                  transparent={true}
                  alphaTest={0.15}
                  roughness={0.15}  // Shiny
                  metalness={0.1}   // Plastic
                />
              </mesh>
            );
          })}
        </Center>
      </group>
    </group>
  );
};

export default function Scene({ activePage, logoType = 'gg' }: { activePage: string, logoType?: 'gg' | 'star' | 'star2' }) {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-[1] pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 32 }}
        dpr={[1, 2]}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
      >
        <ambientLight intensity={1.5} color="#ffffff" />
        <directionalLight position={[5, 5, 5]} intensity={0.5} color="#ffffff" />

        {/* Top/Back Light */}
        <spotLight
          position={[0, 10, -5]}
          intensity={8.0}
          angle={0.5}
          penumbra={1}
          color="#ffffff"
          target-position={[0, 0, 0]}
        />

        {/* Bottom Light - CHANGED TO WHITE */}
        <spotLight
          position={[0, -10, -5]}
          intensity={5.0}
          color="#ffffff"  // Was #3035e6 (Blue)
          angle={0.5}
        />

        <CrodalLogo3D activePage={activePage} logoType={logoType} />
      </Canvas>
    </div>
  );
}