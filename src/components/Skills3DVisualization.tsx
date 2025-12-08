"use client";

import { useRef, useMemo, useState, useEffect, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text, Float, OrbitControls, Line } from "@react-three/drei";
import * as THREE from "three";

// Check if WebGL is available
function isWebGLAvailable(): boolean {
    if (typeof window === "undefined") return false;
    try {
        const canvas = document.createElement("canvas");
        return !!(
            window.WebGLRenderingContext &&
            (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
        );
    } catch {
        return false;
    }
}

// Context loss handler component
function ContextLossHandler({ onContextLost }: { onContextLost: () => void }) {
    const { gl } = useThree();

    useEffect(() => {
        const canvas = gl.domElement;

        const handleContextLost = (event: Event) => {
            event.preventDefault();
            console.warn("WebGL context lost");
            onContextLost();
        };

        const handleContextRestored = () => {
            console.log("WebGL context restored");
        };

        canvas.addEventListener("webglcontextlost", handleContextLost);
        canvas.addEventListener("webglcontextrestored", handleContextRestored);

        return () => {
            canvas.removeEventListener("webglcontextlost", handleContextLost);
            canvas.removeEventListener("webglcontextrestored", handleContextRestored);
        };
    }, [gl, onContextLost]);

    return null;
}

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
                        emissiveIntensity={hovered ? 0.8 : 0.6}
                        metalness={0.2}
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
                        font="./fonts/Bebas_Neue,Inter/Inter/Inter-VariableFont_opsz,wght.ttf"
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
    return (
        <Line
            points={[start, end]}
            color={color}
            transparent
            opacity={0.2}
            lineWidth={1}
        />
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

// Fallback component when WebGL is not available or context is lost
function FallbackVisualization({ skills, categoryColors }: Skills3DVisualizationProps) {
    return (
        <div className="w-full h-[400px] lg:h-[500px] relative bg-[#0a0a0a] border-2 border-[#1f1f1f] flex flex-col items-center justify-center p-8">
            <div className="text-center mb-8">
                <p className="swiss-overline text-[#c6f135] mb-2">SKILLS OVERVIEW</p>
                <p className="swiss-caption text-[#666]">Interactive 3D view unavailable</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 w-full max-w-2xl">
                {skills.slice(0, 16).map((skill) => (
                    <div
                        key={skill.name}
                        className="p-3 bg-[#111] border border-[#2a2a2a] hover:border-[#c6f135]/50 transition-colors"
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <div
                                className="w-2 h-2"
                                style={{ backgroundColor: categoryColors[skill.category] || "#c6f135" }}
                            />
                            <span className="swiss-caption text-white truncate">{skill.name}</span>
                        </div>
                        <div className="h-1 bg-[#1a1a1a]">
                            <div
                                className="h-full transition-all"
                                style={{
                                    width: `${skill.level * 10}%`,
                                    backgroundColor: categoryColors[skill.category] || "#c6f135",
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Legend - Brutalist Style */}
            <div className="absolute bottom-4 left-4 p-4 border-2 border-[#2a2a2a] bg-[#0a0a0a]/90">
                <p className="swiss-overline text-[#c6f135] mb-2 tracking-widest">CATEGORIES</p>
                <div className="flex flex-wrap gap-3">
                    {Object.entries(categoryColors).map(([category, color]) => (
                        <div key={category} className="flex items-center gap-2">
                            <div
                                className="w-3 h-3"
                                style={{ backgroundColor: color }}
                            />
                            <span className="swiss-caption text-[#888] uppercase tracking-wide">{category}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function Skills3DVisualization({ skills, categoryColors }: Skills3DVisualizationProps) {
    const [webGLSupported, setWebGLSupported] = useState<boolean | null>(null);
    const [contextLost, setContextLost] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        setWebGLSupported(isWebGLAvailable());

        return () => {
            setMounted(false);
        };
    }, []);

    const handleContextLost = useCallback(() => {
        setContextLost(true);
    }, []);

    // Show nothing during SSR
    if (!mounted) {
        return (
            <div className="w-full h-[400px] lg:h-[500px] relative animate-pulse" />
        );
    }

    // Show fallback if WebGL not supported or context was lost
    if (!webGLSupported || contextLost) {
        return <FallbackVisualization skills={skills} categoryColors={categoryColors} />;
    }

    return (
        <div className="w-full h-[400px] lg:h-[500px] relative" style={{ background: 'transparent' }}>
            <Canvas
                camera={{ position: [0, 0, 10], fov: 50 }}
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: "high-performance",
                    failIfMajorPerformanceCaveat: false,
                }}
                style={{ background: 'transparent' }}
                dpr={[1, 1.5]} // Limit pixel ratio for performance
                frameloop="always" // Keep rendering for auto-rotation
                onCreated={({ gl }) => {
                    // Optimize renderer settings - keep transparent
                    gl.setClearColor(0x000000, 0);
                }}
            >
                <ContextLossHandler onContextLost={handleContextLost} />

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

            {/* Legend - Brutalist Style */}
            <div className="absolute bottom-4 left-4 p-4 border-2 border-[#2a2a2a] bg-[#0a0a0a]/90 backdrop-blur-sm">
                <p className="swiss-overline text-[#c6f135] mb-2 tracking-widest">CATEGORIES</p>
                <div className="flex flex-wrap gap-3">
                    {Object.entries(categoryColors).map(([category, color]) => (
                        <div key={category} className="flex items-center gap-2">
                            <div
                                className="w-3 h-3"
                                style={{ backgroundColor: color }}
                            />
                            <span className="swiss-caption text-[#888] uppercase tracking-wide">{category}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
