"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float } from "@react-three/drei";
import * as THREE from "three";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function Blob() {
  const meshRef = useRef<THREE.Mesh>(null);

  const uniforms = useMemo(
    () => ({
      u_time: { value: 0 },
      u_color1: { value: new THREE.Color("#6C63FF") },
      u_color2: { value: new THREE.Color("#00D4AA") },
      u_color3: { value: new THREE.Color("#FF6B35") },
    }),
    []
  );

  useFrame((state) => {
    if (meshRef.current) {
      uniforms.u_time.value = state.clock.elapsedTime;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
      meshRef.current.rotation.y += 0.003;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} scale={2.2}>
        <icosahedronGeometry args={[1, 64]} />
        <MeshDistortMaterial
          color="#6C63FF"
          roughness={0.2}
          metalness={0.8}
          distort={0.4}
          speed={2}
          envMapIntensity={1}
        />
      </mesh>
    </Float>
  );
}

function InnerGlow() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.scale.setScalar(
        1.8 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      );
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshBasicMaterial color="#6C63FF" transparent opacity={0.05} />
    </mesh>
  );
}

export function HeroBlob() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) return null;

  return (
    <div
      className="absolute inset-0 z-0"
      style={{ opacity: 0.85 }}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={isMobile ? 1 : Math.min(window.devicePixelRatio, 2)}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1} color="#6C63FF" />
        <directionalLight position={[-5, -5, 5]} intensity={0.5} color="#00D4AA" />
        <pointLight position={[0, 0, 3]} intensity={0.8} color="#FF6B35" />
        <Blob />
        <InnerGlow />
      </Canvas>
    </div>
  );
}
