"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function GhostMesh({
  position,
  s,
  speed,
  color,
  geo,
}: {
  position: [number, number, number];
  s: number;
  speed: number;
  color: string;
  geo: "ico" | "torus";
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.elapsedTime * speed;
      ref.current.rotation.x = t * 0.15;
      ref.current.rotation.y = t * 0.1;
      ref.current.position.y = position[1] + Math.sin(t * 0.4) * 0.3;
    }
  });

  return (
    <mesh ref={ref} position={position} scale={s}>
      {geo === "ico" ? (
        <icosahedronGeometry args={[1, 0]} />
      ) : (
        <torusGeometry args={[1, 0.01, 8, 48]} />
      )}
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.04}
        wireframe={geo === "ico"}
        depthWrite={false}
      />
    </mesh>
  );
}

function Particles() {
  const ref = useRef<THREE.Points>(null);
  const count = 200;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.elapsedTime * 0.008;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.012}
        color="#8B5CF6"
        transparent
        opacity={0.25}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default function Scene3D() {
  return (
    <div className="fixed inset-0 z-0" style={{ pointerEvents: "none" }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        style={{ pointerEvents: "none" }}
        gl={{
          alpha: true,
          antialias: false,
          powerPreference: "high-performance",
          stencil: false,
          depth: false,
        }}
        dpr={[1, 1.5]}
      >
        <GhostMesh position={[-3.5, 2, -5]} s={1.2} speed={0.6} color="#8B5CF6" geo="ico" />
        <GhostMesh position={[3.5, -1, -6]} s={0.9} speed={0.9} color="#06FFA5" geo="ico" />
        <GhostMesh position={[-3, 0.5, -7]} s={1.4} speed={0.4} color="#8B5CF6" geo="torus" />
        <Particles />
      </Canvas>
    </div>
  );
}
