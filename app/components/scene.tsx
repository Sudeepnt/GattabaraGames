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
  let textureUrl = "/logos/gg-logo.png";
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

    // BASE_ROT_Y: Adjusted to -0.25 (User requested "5% more" rotation to the right)
    const BASE_ROT_Y = -0.25;

    // -- ROTATION CONTROL LINES --
    // These are the lines affecting how much it turns:
    const SENSITIVITY = 3;
    const LIMIT = 0.5;

    let targetRotX = 0;
    let targetRotY = BASE_ROT_Y;
    let targetRotZ = 0;

    const scrollY = window.scrollY;
    const scrollFactor = activePage === "home" ? Math.max(0, 1 - scrollY / 50) : 1.0;

    // Check for mobile: Disable mouse movement on small screens
    const isMobile = window.innerWidth < 768;

    if (scrollFactor > 0 && !isMobile) {
      const { x, y } = mouseRef.current;
      const DEAD_ZONE = 0.1; // Reduced deadzone slightly for better feel

      // Calculate rotations with a smooth ease-in from the deadzone
      // This prevents "jumping" when the cursor leaves the center area

      let rotX_Val = 0;
      if (Math.abs(y) > DEAD_ZONE) {
        // Subtract deadzone so rotation starts from 0 at the edge of the zone
        const sign = Math.sign(y);
        rotX_Val = -(Math.abs(y) - DEAD_ZONE) * sign * SENSITIVITY;
      }
      targetRotX = THREE.MathUtils.clamp(rotX_Val, -LIMIT, LIMIT);

      let rotY_Val = 0;
      if (Math.abs(x) > DEAD_ZONE) {
        const sign = Math.sign(x);
        rotY_Val = (Math.abs(x) - DEAD_ZONE) * sign * SENSITIVITY;
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
      // increased mobile scale from 0.525 to 0.7
      let baseScale = isMobile ? 0.7 : 1;

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

            // Border configuration: Increased opacity and solidity
            const borderColor = new THREE.Color("#151515");
            const faceColor = new THREE.Color(1, 1, 1);

            return (
              <mesh
                key={i}
                position={[0, 0, z]}
                frustumCulled={false}
                // Internal layers scaled up to create the "border" effect visible from front
                scale={isFace ? [1, 1, 1] : [1.025, 1.025, 1]}
              >
                <planeGeometry args={[3, 3]} />
                <meshPhysicalMaterial
                  color={isFace ? faceColor : borderColor}
                  // Internal layers share shape but are solid color
                  map={isFace ? logoTexture : null}
                  alphaMap={logoTexture}
                  transparent={true}
                  alphaTest={0.5}
                  side={THREE.DoubleSide}
                  opacity={isFace ? 1.0 : 0.8} // Increased by 30% from 0.5 -> 0.8
                  roughness={isFace ? 0.2 : 0.1}
                  metalness={isFace ? 0.1 : 0.8}
                  // Low emission for visibility
                  emissive={isFace ? new THREE.Color(0, 0, 0) : new THREE.Color("#111111")}
                  emissiveIntensity={isFace ? 0 : 0.2}
                  // Clean highlights
                  clearcoat={1.0}
                  clearcoatRoughness={0.1}
                  reflectivity={1.0}
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



  return (
    <div ref={containerRef} className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none transition-opacity duration-300">
      <Canvas
        className="pointer-events-none"
        camera={{ position: [0, 0, 10], fov: 32 }}
        dpr={[1, 2]}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
      >
        <ambientLight intensity={1.5} color="#ffffff" />

        {/* Key light */}
        <directionalLight position={[0, 0, 5]} intensity={1.0} color="#ffffff" />

        {/* Backlight (Rim Light) to manage the "lightning" and visibility */}
        <spotLight position={[0, 5, -10]} intensity={25} angle={0.5} penumbra={1} color="#ffffff" />
        <pointLight position={[0, -5, -5]} intensity={5} color="#444444" />

        <Environment preset="studio" />

        {/* Pass shared mouseRef to the 3D component */}
        <CrodalLogo3D activePage={activePage} logoType={logoType} mouseRefProp={mouseRef} />
      </Canvas>
    </div>
  );
}