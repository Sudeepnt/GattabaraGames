"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Center, Sphere, RoundedBox, Outlines, useTexture, Environment } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import * as THREE from "three";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const CrodalLogo3D = ({
  activePage,
  logoType = 'gg',
  mouseRefProp
}: {
  activePage: string,
  logoType?: 'gg' | 'star' | 'star2',
  mouseRefProp: React.MutableRefObject<{ x: number, y: number }>
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const internalMotionRef = useRef<THREE.Group>(null);

  // Use the passed prop for mouse control
  const mouseRef = mouseRefProp;


  // Load the texture based on type
  let textureUrl = "/gg-logo.png";
  if (logoType === 'star') textureUrl = "/star-logo.png";
  if (logoType === 'star2') textureUrl = "/star2-logo.png";

  const logoTexture = useTexture(textureUrl);

  // Configure texture for smoother look
  useMemo(() => {
    logoTexture.minFilter = THREE.LinearFilter;
    logoTexture.magFilter = THREE.LinearFilter;
    logoTexture.generateMipmaps = true;
  }, [logoTexture]);

  // --- ALIVE MOTION ---
  useFrame((state, delta) => {
    if (!internalMotionRef.current) return;

    // BASE_ROT_Y: 0.3 turns the logo face 5% to the right (approx 18 degrees).
    const BASE_ROT_Y = 0;
    const SENSITIVITY = 1.0;
    const LIMIT = 0.5;

    let targetRotX = 0;
    let targetRotY = BASE_ROT_Y;
    let targetRotZ = 0;

    const scrollY = window.scrollY;
    const scrollFactor = activePage === "home" ? Math.max(0, 1 - scrollY / 50) : 1.0;

    if (scrollFactor > 0) {
      const { x, y } = mouseRef.current;
      const DEAD_ZONE = 0.2;

      let rotX_Val = 0;
      if (Math.abs(y) > DEAD_ZONE) {
        rotX_Val = -y * SENSITIVITY;
      }
      targetRotX = THREE.MathUtils.clamp(rotX_Val, -LIMIT, LIMIT);

      let rotY_Val = 0;
      if (Math.abs(x) > DEAD_ZONE) {
        rotY_Val = x * SENSITIVITY;
      }
      targetRotY = BASE_ROT_Y + THREE.MathUtils.clamp(rotY_Val, -LIMIT, LIMIT);
    }

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
      let baseScale = isMobile ? 0.525 : 1;

      if (logoType === 'star' || logoType === 'star2') {
        baseScale *= 0.8;
      }

      const startScale = baseScale;
      const endScale = startScale / 3;

      gsap.set(groupRef.current.scale, { x: startScale, y: startScale, z: startScale });
      gsap.set(groupRef.current.position, { x: isMobile ? 0 : 2.5, y: 0, z: 0 });
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
  const layers = 120; // Moderate layers are enough with solid-body method
  const depth = 0.35; // Tighter depth for a "coin" or "plaque" feel
  const step = depth / layers;

  return (
    <group dispose={null} ref={groupRef}>
      <group ref={internalMotionRef}>
        <Center>
          {Array.from({ length: layers }).map((_, i) => {
            const z = (i - (layers - 1) / 2) * step;
            const isFace = i === 0 || i === layers - 1;

            // Body shading: Internal layers are slightly darker to mimic a solid material
            const bodyBrightness = 0.85;
            const faceBrightness = 1.0;
            const c = isFace ? faceBrightness : bodyBrightness;

            return (
              <mesh
                key={i}
                position={[0, 0, z]}
                frustumCulled={false}
                // Internal layers slightly larger to wrap and hide the slice edges
                scale={isFace ? [1, 1, 1] : [1.015, 1.015, 1]}
              >
                <planeGeometry args={[3, 3]} />
                <meshPhysicalMaterial
                  color={new THREE.Color(c, c, c)}
                  // CRITICAL: Remove texture from sides to stop "cut line" artifacts
                  map={isFace ? logoTexture : null}
                  alphaMap={logoTexture}
                  transparent={true}
                  alphaTest={0.5}
                  side={THREE.DoubleSide}
                  roughness={isFace ? 0.2 : 0.4}
                  metalness={0.1}
                  // Clean highlights only on the faces
                  clearcoat={isFace ? 1.0 : 0}
                  clearcoatRoughness={0.1}
                  reflectivity={0.5}
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
  // Shared ref for mouse position, updated by the HTML div, read by the 3D component
  const mouseRef = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate normalized mouse coordinates (-1 to 1) for the entire window
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseRef.current = { x, y };
    };

    const handleMouseLeave = () => {
      // Reset to center position when mouse leaves the window
      mouseRef.current = { x: 0, y: 0 };
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Fade logo to 20% opacity as user scrolls down
    gsap.to(containerRef.current, {
      opacity: 0.2,
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "30% top",
        scrub: true,
      }
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="fixed top-0 left-0 w-full h-full z-[5] pointer-events-none transition-opacity duration-300">
      <Canvas
        className="pointer-events-none"
        camera={{ position: [0, 0, 10], fov: 32 }}
        dpr={[1, 2]}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
      >
        <ambientLight intensity={2.0} color="#ffffff" />

        {/* Subtle Fill to prevent total blackness on shadows */}
        <directionalLight position={[0, 0, 5]} intensity={1.0} color="#ffffff" />

        <Environment preset="studio" />

        {/* Pass shared mouseRef to the 3D component */}
        <CrodalLogo3D activePage={activePage} logoType={logoType} mouseRefProp={mouseRef} />
      </Canvas>
    </div>
  );
}