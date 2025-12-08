"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function BrutalistShape({
    position,
    color,
    speed = 1,
    rotationAxis = "y",
}: {
    position: [number, number, number];
    color: string;
    speed?: number;
    rotationAxis?: "x" | "y" | "z";
}) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            const time = state.clock.getElapsedTime() * speed * 0.1;
            if (rotationAxis === "x") {
                meshRef.current.rotation.x = time;
            } else if (rotationAxis === "y") {
                meshRef.current.rotation.y = time;
            } else {
                meshRef.current.rotation.z = time;
            }
        }
    });

    return (
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
            <mesh ref={meshRef} position={position}>
                <boxGeometry args={[1, 1, 1]} />
                <meshBasicMaterial color={color} wireframe opacity={0.15} transparent />
            </mesh>
        </Float>
    );
}

function CrossShape({
    position,
    color,
    scale = 1,
}: {
    position: [number, number, number];
    color: string;
    scale?: number;
}) {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.z =
                Math.sin(state.clock.getElapsedTime() * 0.2) * 0.3;
        }
    });

    return (
        <group ref={groupRef} position={position} scale={scale}>
            {/* Horizontal bar */}
            <mesh>
                <boxGeometry args={[1.5, 0.1, 0.1]} />
                <meshBasicMaterial color={color} opacity={0.2} transparent />
            </mesh>
            {/* Vertical bar */}
            <mesh>
                <boxGeometry args={[0.1, 1.5, 0.1]} />
                <meshBasicMaterial color={color} opacity={0.2} transparent />
            </mesh>
        </group>
    );
}

function GridPlane() {
    const geometry = useMemo(() => {
        const geo = new THREE.PlaneGeometry(20, 20, 20, 20);
        return geo;
    }, []);

    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, 0]}>
            <primitive object={geometry} />
            <meshBasicMaterial color="#b9fb2a" wireframe opacity={0.03} transparent />
        </mesh>
    );
}

function FloatingRing({
    position,
    color,
}: {
    position: [number, number, number];
    color: string;
}) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.3;
            meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.5}>
            <mesh ref={meshRef} position={position}>
                <torusGeometry args={[0.8, 0.05, 16, 100]} />
                <meshBasicMaterial color={color} opacity={0.2} transparent />
            </mesh>
        </Float>
    );
}

function Scene() {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (groupRef.current) {
            // Subtle parallax effect based on mouse
            const mouseX = state.pointer.x * 0.5;
            const mouseY = state.pointer.y * 0.5;
            groupRef.current.rotation.y = THREE.MathUtils.lerp(
                groupRef.current.rotation.y,
                mouseX * 0.1,
                0.05
            );
            groupRef.current.rotation.x = THREE.MathUtils.lerp(
                groupRef.current.rotation.x,
                mouseY * 0.1,
                0.05
            );
        }
    });

    return (
        <group ref={groupRef}>
            {/* Grid plane at bottom */}
            <GridPlane />

            {/* Brutalist cubes */}
            <BrutalistShape
                position={[-4, 2, -5]}
                color="#b9fb2a"
                speed={0.5}
                rotationAxis="y"
            />
            <BrutalistShape
                position={[5, -1, -8]}
                color="#00f5ff"
                speed={0.7}
                rotationAxis="x"
            />
            <BrutalistShape
                position={[2, 3, -6]}
                color="#ff00ff"
                speed={0.3}
                rotationAxis="z"
            />
            <BrutalistShape
                position={[-3, -2, -10]}
                color="#ff6b35"
                speed={0.4}
                rotationAxis="y"
            />

            {/* Cross shapes - Swiss design element */}
            <CrossShape position={[-5, 0, -7]} color="#b9fb2a" scale={0.8} />
            <CrossShape position={[4, 2, -9]} color="#00f5ff" scale={0.6} />

            {/* Floating rings */}
            <FloatingRing position={[3, -2, -6]} color="#ff00ff" />
            <FloatingRing position={[-2, 1, -8]} color="#ff6b35" />

            {/* Additional geometric elements */}
            <Float speed={1} rotationIntensity={0.3}>
                <mesh position={[0, -3, -12]}>
                    <octahedronGeometry args={[1.5]} />
                    <meshBasicMaterial
                        color="#b9fb2a"
                        wireframe
                        opacity={0.1}
                        transparent
                    />
                </mesh>
            </Float>

            {/* Line elements - Brutalist style */}
            <Float speed={0.5} floatIntensity={0.2}>
                <mesh position={[-6, 1, -5]}>
                    <boxGeometry args={[0.02, 3, 0.02]} />
                    <meshBasicMaterial color="#b9fb2a" opacity={0.3} transparent />
                </mesh>
            </Float>
            <Float speed={0.5} floatIntensity={0.2}>
                <mesh position={[6, -1, -7]}>
                    <boxGeometry args={[0.02, 2.5, 0.02]} />
                    <meshBasicMaterial color="#00f5ff" opacity={0.3} transparent />
                </mesh>
            </Float>
        </group>
    );
}

export default function GeometricBackground() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none">
            <Canvas
                camera={{ position: [0, 0, 10], fov: 60 }}
                dpr={[1, 1.5]}
                gl={{ antialias: true, alpha: true }}
            >
                <Scene />
            </Canvas>
        </div>
    );
}
