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
        <div className="w-full h-full min-h-[300px] relative bg-[#0a0a0a] border-2 border-[#1f1f1f] flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
            <div className="text-center mb-4 sm:mb-8">
                <p className="swiss-overline text-[#c6f135] mb-1 sm:mb-2 text-[10px] sm:text-xs">SKILLS OVERVIEW</p>
                <p className="swiss-caption text-[#666] text-[10px] sm:text-xs">Interactive 3D view unavailable</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 w-full max-w-2xl overflow-y-auto max-h-[200px] sm:max-h-[280px]">
                {skills.slice(0, 16).map((skill) => (
                    <div
                        key={skill.name}
                        className="p-2 sm:p-3 bg-[#111] border border-[#2a2a2a] hover:border-[#c6f135]/50 transition-colors touch-manipulation"
                    >
                        <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                            <div
                                className="w-1.5 h-1.5 sm:w-2 sm:h-2 shrink-0"
                                style={{ backgroundColor: categoryColors[skill.category] || "#c6f135" }}
                            />
                            <span className="swiss-caption text-white truncate text-[10px] sm:text-xs">{skill.name}</span>
                        </div>
                        <div className="h-0.5 sm:h-1 bg-[#1a1a1a]">
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

            {/* Legend - Mobile Responsive */}
            <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 p-2 sm:p-4 border-2 border-[#2a2a2a] bg-[#0a0a0a]/90 max-w-[calc(100%-1rem)] sm:max-w-none">
                <p className="swiss-overline text-[#c6f135] mb-1 sm:mb-2 tracking-widest text-[8px] sm:text-[10px]">CATEGORIES</p>
                <div className="flex flex-wrap gap-1 sm:gap-3">
                    {Object.entries(categoryColors).map(([category, color]) => (
                        <div key={category} className="flex items-center gap-1 sm:gap-2">
                            <div
                                className="w-2 h-2 sm:w-3 sm:h-3"
                                style={{ backgroundColor: color }}
                            />
                            <span className="swiss-caption text-[#888] uppercase tracking-wide text-[8px] sm:text-[10px]">{category}</span>
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
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setMounted(true);
        setWebGLSupported(isWebGLAvailable());
        setIsMobile(window.innerWidth < 640);

        const handleResize = () => {
            setIsMobile(window.innerWidth < 640);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            setMounted(false);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleContextLost = useCallback(() => {
        setContextLost(true);
    }, []);

    // Show nothing during SSR
    if (!mounted) {
        return (
            <div className="w-full h-[300px] sm:h-[400px] lg:h-[500px] relative animate-pulse" />
        );
    }

    // Show fallback if WebGL not supported or context was lost
    if (!webGLSupported || contextLost) {
        return <FallbackVisualization skills={skills} categoryColors={categoryColors} />;
    }

    return (
        <div className="w-full h-full relative" style={{ background: 'transparent' }}>
            <Canvas
                camera={{ position: [0, 0, isMobile ? 12 : 10], fov: isMobile ? 60 : 50 }}
                gl={{
                    antialias: !isMobile, // Disable antialiasing on mobile for performance
                    alpha: true,
                    powerPreference: isMobile ? "low-power" : "high-performance",
                    failIfMajorPerformanceCaveat: true, // Fail gracefully on weak devices
                }}
                style={{ background: 'transparent' }}
                dpr={isMobile ? 1 : [1, 1.5]} // Lower DPR on mobile
                frameloop="always"
                onCreated={({ gl }) => {
                    gl.setClearColor(0x000000, 0);
                }}
            >
                <ContextLossHandler onContextLost={handleContextLost} />

                <ambientLight intensity={0.4} />
                <pointLight position={[10, 10, 10]} intensity={0.8} color="#c6f135" />
                <pointLight position={[-10, -10, -10]} intensity={0.4} color="#00f5ff" />

                <Skills3DScene skills={skills} categoryColors={categoryColors} />

                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    autoRotate
                    autoRotateSpeed={isMobile ? 0.3 : 0.5}
                    maxPolarAngle={Math.PI / 1.5}
                    minPolarAngle={Math.PI / 3}
                    touches={{ ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_PAN }}
                />
            </Canvas>

            {/* Legend - Mobile Responsive */}
            <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 p-2 sm:p-4 border-2 border-[#2a2a2a] bg-[#0a0a0a]/90 backdrop-blur-sm max-w-[calc(100%-1rem)] sm:max-w-none">
                <p className="swiss-overline text-[#c6f135] mb-1 sm:mb-2 tracking-widest text-[8px] sm:text-[10px]">CATEGORIES</p>
                <div className="flex flex-wrap gap-1 sm:gap-3">
                    {Object.entries(categoryColors).map(([category, color]) => (
                        <div key={category} className="flex items-center gap-1 sm:gap-2">
                            <div
                                className="w-2 h-2 sm:w-3 sm:h-3"
                                style={{ backgroundColor: color }}
                            />
                            <span className="swiss-caption text-[#888] uppercase tracking-wide text-[8px] sm:text-[10px]">{category}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
