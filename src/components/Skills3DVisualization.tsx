"use client";

import { useRef, useMemo, useState, useEffect, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const SWISS_COLORS = {
    lime: "#d4ff4d",
    cyan: "#4df5ff",
    magenta: "#ff4dff",
    orange: "#ff8f5d",
    white: "#ffffff",
};

// Detect mobile device
function isMobileDevice(): boolean {
    if (typeof window === "undefined") return false;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        || window.innerWidth < 768;
}

function isWebGLAvailable(): boolean {
    if (typeof window === "undefined") return false;
    try {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
        return !!ctx;
    } catch {
        return false;
    }
}

function getLighterColor(color: string): string {
    const colorMap: Record<string, string> = {
        "#c6f135": SWISS_COLORS.lime,
        "#00f5ff": SWISS_COLORS.cyan,
        "#ff00ff": SWISS_COLORS.magenta,
        "#ff6b35": SWISS_COLORS.orange,
    };
    return colorMap[color] || color;
}

interface Skill3DNodeProps {
    position: [number, number, number];
    color: string;
    size: number;
    name: string;
    onHover: (name: string | null, screenPos: { x: number; y: number } | null) => void;
}

// Node with hover - uses pointer events, no dynamic 3D components
function Skill3DNode({ position, color, size, name, onHover }: Skill3DNodeProps) {
    const lighterColor = getLighterColor(color);
    const meshRef = useRef<THREE.Mesh>(null);
    const { camera, size: canvasSize } = useThree();
    const [isHovered, setIsHovered] = useState(false);

    const handlePointerOver = useCallback(() => {
        setIsHovered(true);
        if (meshRef.current) {
            const vector = new THREE.Vector3();
            meshRef.current.getWorldPosition(vector);
            vector.project(camera);
            const x = (vector.x * 0.5 + 0.5) * canvasSize.width;
            const y = (-vector.y * 0.5 + 0.5) * canvasSize.height;
            onHover(name, { x, y });
        }
    }, [camera, canvasSize, name, onHover]);

    const handlePointerOut = useCallback(() => {
        setIsHovered(false);
        onHover(null, null);
    }, [onHover]);

    return (
        <mesh
            ref={meshRef}
            position={position}
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
            scale={isHovered ? 1.3 : 1}
        >
            <sphereGeometry args={[size, 12, 12]} />
            <meshStandardMaterial
                color={isHovered ? lighterColor : SWISS_COLORS.white}
                emissive={lighterColor}
                emissiveIntensity={isHovered ? 0.6 : 0.35}
                roughness={0.3}
            />
        </mesh>
    );
}

interface Skills3DVisualizationProps {
    skills: Array<{
        name: string;
        category: string;
        level: number;
    }>;
    categoryColors: Record<string, string>;
}

interface HoverInfo {
    name: string;
    screenPos: { x: number; y: number };
    color: string;
}

interface Skills3DSceneProps extends Skills3DVisualizationProps {
    onHoverChange: (info: HoverInfo | null) => void;
    isMobile: boolean;
}

function Skills3DScene({ skills, categoryColors, onHoverChange, isMobile }: Skills3DSceneProps) {
    const groupRef = useRef<THREE.Group>(null);

    useFrame(() => {
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.002;
        }
    });

    const skillNodes = useMemo(() => {
        const totalSkills = skills.length;
        // Scale factor for mobile - optimized for iPhone XR (414px) and smaller
        const scaleFactor = isMobile ? 0.6 : 1;

        return skills.map((skill, i) => {
            // Distribuzione Fibonacci sphere per uniformità
            const goldenRatio = (1 + Math.sqrt(5)) / 2;
            const theta = 2 * Math.PI * i / goldenRatio;
            const phi = Math.acos(1 - 2 * (i + 0.5) / totalSkills);

            // Compact radius for mobile fit
            const baseRadius = (totalSkills > 30 ? 1.8 : 1.6) * scaleFactor;
            const radius = baseRadius + (skill.level / 10) * 0.4 * scaleFactor;

            return {
                ...skill,
                position: [
                    radius * Math.sin(phi) * Math.cos(theta),
                    radius * Math.sin(phi) * Math.sin(theta),
                    radius * Math.cos(phi),
                ] as [number, number, number],
                // Smaller spheres for mobile
                size: (totalSkills > 30 ? 0.06 : 0.08) * scaleFactor + (skill.level / 10) * 0.03 * scaleFactor,
                color: getLighterColor(categoryColors[skill.category] || "#c6f135"),
            };
        });
    }, [skills, categoryColors, isMobile]);

    const handleNodeHover = useCallback(
        (nodeName: string, nodeColor: string) =>
            (name: string | null, screenPos: { x: number; y: number } | null) => {
                if (name && screenPos) {
                    onHoverChange({ name, screenPos, color: nodeColor });
                } else {
                    onHoverChange(null);
                }
            },
        [onHoverChange]
    );

    return (
        <group ref={groupRef}>
            {skillNodes.map((skill) => (
                <Skill3DNode
                    key={skill.name}
                    position={skill.position}
                    color={skill.color}
                    size={skill.size}
                    name={skill.name}
                    onHover={handleNodeHover(skill.name, skill.color)}
                />
            ))}

            {/* Center sphere - smaller */}
            <mesh>
                <sphereGeometry args={[isMobile ? 0.12 : 0.15, 10, 10]} />
                <meshStandardMaterial
                    color={SWISS_COLORS.white}
                    emissive={SWISS_COLORS.lime}
                    emissiveIntensity={0.3}
                />
            </mesh>
        </group>
    );
}

function FallbackVisualization({ skills, categoryColors }: Skills3DVisualizationProps) {
    return (
        <div className="w-full h-full min-h-[300px] relative bg-[#0a0a0a] border-2 border-[#1f1f1f] flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
            <div className="text-center mb-4 sm:mb-8">
                <p className="swiss-overline text-[#d4ff4d] mb-1 sm:mb-2 text-[10px] sm:text-xs tracking-[0.2em] font-bold">SKILLS OVERVIEW</p>
                <p className="swiss-caption text-[#666] text-[10px] sm:text-xs">Interactive 3D view unavailable</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 w-full max-w-2xl overflow-y-auto max-h-[200px] sm:max-h-[280px]">
                {skills.map((skill) => {
                    const lighterColor = getLighterColor(categoryColors[skill.category] || "#c6f135");
                    return (
                        <div
                            key={skill.name}
                            className="p-2 sm:p-3 bg-[#111] border border-[#2a2a2a] hover:border-[#d4ff4d]/50 transition-colors"
                        >
                            <div className="flex items-center gap-1 sm:gap-2 mb-1">
                                <div
                                    className="w-2 h-2 rounded-full shrink-0"
                                    style={{ backgroundColor: lighterColor }}
                                />
                                <span className="text-white truncate text-[10px] sm:text-xs uppercase tracking-wide font-medium">{skill.name}</span>
                            </div>
                            <div className="h-1 bg-[#1a1a1a] rounded-full">
                                <div
                                    className="h-full rounded-full"
                                    style={{
                                        width: skill.level * 10 + "%",
                                        backgroundColor: lighterColor,
                                    }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 p-2 sm:p-4 border-2 border-[#2a2a2a] bg-[#0a0a0a]/95">
                <p className="text-[#d4ff4d] mb-1 tracking-[0.2em] text-[8px] sm:text-[10px] font-bold uppercase">Categories</p>
                <div className="flex flex-wrap gap-2 sm:gap-4">
                    {Object.entries(categoryColors).map(([category, color]) => (
                        <div key={category} className="flex items-center gap-1 sm:gap-2">
                            <div
                                className="w-2 h-2 sm:w-3 sm:h-3 rounded-full"
                                style={{ backgroundColor: getLighterColor(color) }}
                            />
                            <span className="text-[#aaa] uppercase tracking-wider text-[8px] sm:text-[10px] font-medium">{category}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function Skills3DVisualization({ skills, categoryColors }: Skills3DVisualizationProps) {
    const [showFallback, setShowFallback] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [hoverInfo, setHoverInfo] = useState<HoverInfo | null>(null);
    const [isMobile, setIsMobile] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMounted(true);
        const mobile = isMobileDevice();
        setIsMobile(mobile);

        // Only fallback if WebGL unavailable - show 3D on all devices including iPhone XR (414px)
        if (!isWebGLAvailable()) {
            setShowFallback(true);
        }

        // Handle resize
        const handleResize = () => {
            const newMobile = isMobileDevice();
            setIsMobile(newMobile);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            setMounted(false);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleError = useCallback(() => {
        setShowFallback(true);
    }, []);

    const handleHoverChange = useCallback((info: HoverInfo | null) => {
        setHoverInfo(info);
    }, []);

    if (!mounted) {
        return <div className="w-full h-[280px] sm:h-[350px] lg:h-[450px] relative bg-[#0a0a0a]" />;
    }

    if (showFallback) {
        return <FallbackVisualization skills={skills} categoryColors={categoryColors} />;
    }

    // Camera position optimized for iPhone XR and up
    const cameraZ = isMobile ? 3.5 : 4.5;
    const cameraFov = isMobile ? 60 : 50;

    return (
        <div ref={containerRef} className="w-full h-full min-h-[280px] sm:min-h-[350px] lg:min-h-[450px] relative" style={{ background: "transparent" }}>
            <Canvas
                camera={{ position: [0, 0, cameraZ], fov: cameraFov }}
                gl={{
                    antialias: false,
                    alpha: true,
                    powerPreference: "low-power",
                    preserveDrawingBuffer: false,
                    stencil: false,
                    depth: true,
                    failIfMajorPerformanceCaveat: false, // Allow mobile to try 3D
                }}
                dpr={1}
                frameloop="always"
                style={{ background: "transparent" }}
                onCreated={({ gl }) => {
                    gl.setClearColor(0x000000, 0);
                    gl.setPixelRatio(1);
                    gl.domElement.addEventListener("webglcontextlost", (e) => {
                        e.preventDefault();
                        handleError();
                    });
                }}
            >
                <ambientLight intensity={0.8} />
                <pointLight position={[10, 10, 10]} intensity={0.6} />
                <Skills3DScene
                    skills={skills}
                    categoryColors={categoryColors}
                    onHoverChange={handleHoverChange}
                    isMobile={isMobile}
                />
                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    enableRotate={true}
                    autoRotate={false}
                    maxPolarAngle={Math.PI / 1.5}
                    minPolarAngle={Math.PI / 3}
                />
            </Canvas>

            {/* CSS Tooltip - rendered OUTSIDE Canvas to avoid WebGL issues */}
            {hoverInfo && (
                <div
                    className="absolute pointer-events-none z-50 px-3 py-2 bg-[#0a0a0a]/95 border-2 backdrop-blur-sm transform -translate-x-1/2 -translate-y-full"
                    style={{
                        left: hoverInfo.screenPos.x,
                        top: hoverInfo.screenPos.y - 20,
                        borderColor: hoverInfo.color,
                    }}
                >
                    <span
                        className="text-xs font-bold uppercase tracking-[0.15em]"
                        style={{ color: hoverInfo.color }}
                    >
                        {hoverInfo.name}
                    </span>
                </div>
            )}

            <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 p-2 sm:p-4 border-2 border-[#2a2a2a] bg-[#0a0a0a]/95 backdrop-blur-sm max-w-[calc(100%-1rem)] sm:max-w-none">
                <p className="text-[#d4ff4d] mb-1 sm:mb-2 tracking-[0.2em] text-[8px] sm:text-[10px] font-bold uppercase">Categories</p>
                <div className="flex flex-wrap gap-2 sm:gap-4">
                    {Object.entries(categoryColors).map(([category, color]) => (
                        <div key={category} className="flex items-center gap-1 sm:gap-2">
                            <div
                                className="w-2 h-2 sm:w-3 sm:h-3 rounded-full"
                                style={{ backgroundColor: getLighterColor(color) }}
                            />
                            <span className="text-[#aaa] uppercase tracking-wider text-[8px] sm:text-[10px] font-medium">{category}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
