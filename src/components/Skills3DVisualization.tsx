"use client";

import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, Float, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

interface Skill3DNodeProps {
    position: [number, number, number];
    label: string;
    color: string;
    size: number;
    isHovered: boolean;
    onHover: (hovered: boolean) => void;
}

function Skill3DNode({ position, label, color, size, isHovered, onHover }: Skill3DNodeProps) {
    const meshRef = useRef<THREE.Mesh>(null);
    const [hovered, setHovered] = useState(false);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
            meshRef.current.rotation.y += 0.005;

            // Scale animation on hover
            const targetScale = hovered || isHovered ? 1.3 : 1;
            meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <group position={position}>
                <mesh
                    ref={meshRef}
                    onPointerEnter={() => { setHovered(true); onHover(true); }}
                    onPointerLeave={() => { setHovered(false); onHover(false); }}
                >
                    <icosahedronGeometry args={[size, 1]} />
                    <meshStandardMaterial
                        color={color}
                        emissive={color}
                        emissiveIntensity={hovered ? 0.5 : 0.2}
                        metalness={0.8}
                        roughness={0.2}
                        transparent
                        opacity={hovered ? 1 : 0.8}
                    />
                </mesh>

                {/* Label */}
                {hovered && (
                    <Text
                        position={[0, size + 0.5, 0]}
                        fontSize={0.3}
                        color="white"
                        anchorX="center"
                        anchorY="middle"
                        font="/fonts/inter-bold.woff"
                    >
                        {label}
                    </Text>
                )}
            </group>
        </Float>
    );
}

interface ConnectionLineProps {
    start: [number, number, number];
    end: [number, number, number];
    color: string;
}

function ConnectionLine({ start, end, color }: ConnectionLineProps) {
    const points = useMemo(() => {
        return [new THREE.Vector3(...start), new THREE.Vector3(...end)];
    }, [start, end]);

    const lineGeometry = useMemo(() => {
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        return geometry;
    }, [points]);

    return (
        <line geometry={lineGeometry}>
            <lineBasicMaterial color={color} transparent opacity={0.2} />
        </line>
    );
}

interface Skills3DVisualizationProps {
    skills: Array<{
        name: string;
        category: string;
        level: number; // 1-10
    }>;
    categoryColors: Record<string, string>;
}

function Skills3DScene({ skills, categoryColors }: Skills3DVisualizationProps) {
    const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.2;
        }
    });

    // Position skills in a 3D sphere
    const skillNodes = useMemo(() => {
        return skills.map((skill, i) => {
            const phi = Math.acos(-1 + (2 * i) / skills.length);
            const theta = Math.sqrt(skills.length * Math.PI) * phi;
            const radius = 3 + (skill.level / 10) * 1.5;

            return {
                ...skill,
                position: [
                    radius * Math.cos(theta) * Math.sin(phi),
                    radius * Math.sin(theta) * Math.sin(phi),
                    radius * Math.cos(phi),
                ] as [number, number, number],
                size: 0.15 + (skill.level / 10) * 0.2,
            };
        });
    }, [skills]);

    // Generate connections between skills in same category
    const connections = useMemo(() => {
        const conns: Array<{ start: [number, number, number]; end: [number, number, number]; color: string }> = [];

        skillNodes.forEach((skill, i) => {
            skillNodes.slice(i + 1).forEach((other) => {
                if (skill.category === other.category) {
                    conns.push({
                        start: skill.position,
                        end: other.position,
                        color: categoryColors[skill.category] || "#ffffff",
                    });
                }
            });
        });

        return conns;
    }, [skillNodes, categoryColors]);

    return (
        <group ref={groupRef}>
            {/* Connection lines */}
            {connections.map((conn, i) => (
                <ConnectionLine key={i} {...conn} />
            ))}

            {/* Skill nodes */}
            {skillNodes.map((skill, i) => (
                <Skill3DNode
                    key={skill.name}
                    position={skill.position}
                    label={skill.name}
                    color={categoryColors[skill.category] || "#c6f135"}
                    size={skill.size}
                    isHovered={hoveredSkill === skill.name}
                    onHover={(hovered) => setHoveredSkill(hovered ? skill.name : null)}
                />
            ))}

            {/* Center sphere */}
            <mesh>
                <sphereGeometry args={[0.5, 32, 32]} />
                <meshStandardMaterial
                    color="#1a1a1a"
                    emissive="#c6f135"
                    emissiveIntensity={0.1}
                    metalness={0.9}
                    roughness={0.1}
                />
            </mesh>
        </group>
    );
}

export default function Skills3DVisualization({ skills, categoryColors }: Skills3DVisualizationProps) {
    return (
        <div className="w-full h-[400px] lg:h-[500px] relative">
            <Canvas
                camera={{ position: [0, 0, 10], fov: 50 }}
                gl={{ antialias: true, alpha: true }}
            >
                <ambientLight intensity={0.3} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#c6f135" />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00f5ff" />
                <pointLight position={[0, 10, 0]} intensity={0.5} color="#ff00ff" />

                <Skills3DScene skills={skills} categoryColors={categoryColors} />

                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    autoRotate
                    autoRotateSpeed={0.5}
                    maxPolarAngle={Math.PI / 1.5}
                    minPolarAngle={Math.PI / 3}
                />
            </Canvas>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 glass-card p-4">
                <p className="swiss-overline text-[#666] mb-2">Categories</p>
                <div className="flex flex-wrap gap-2">
                    {Object.entries(categoryColors).map(([category, color]) => (
                        <div key={category} className="flex items-center gap-2">
                            <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: color }}
                            />
                            <span className="swiss-caption text-[#888]">{category}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
