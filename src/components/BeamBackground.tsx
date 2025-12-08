"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function BeamBackground() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Transform scroll progress to beam positions
    const beam1Y = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
    const beam2X = useTransform(scrollYProgress, [0, 1], ["-100%", "100%"]);
    const beam3Rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
    const beam4Scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.5, 1]);

    if (!mounted) return null;

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 pointer-events-none overflow-hidden z-[1]"
        >
            {/* Grid overlay - Swiss Design */}
            <div className="absolute inset-0 grid-lines opacity-[0.05]" />

            {/* Vertical beam laser - left */}
            <motion.div
                className="absolute left-[10%] top-0 w-[2px] h-[200vh]"
                style={{
                    background:
                        "linear-gradient(180deg, transparent 0%, #b9fb2a 50%, transparent 100%)",
                    y: beam1Y,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ duration: 1 }}
            />

            {/* Vertical beam laser - right */}
            <motion.div
                className="absolute right-[15%] top-0 w-[2px] h-[200vh]"
                style={{
                    background:
                        "linear-gradient(180deg, transparent 0%, #00f5ff 50%, transparent 100%)",
                    y: beam1Y,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ duration: 1, delay: 0.2 }}
            />

            {/* Horizontal scanning beam */}
            <motion.div
                className="absolute top-1/3 left-0 h-[2px] w-[200vw]"
                style={{
                    background:
                        "linear-gradient(90deg, transparent 0%, #ff00ff 50%, transparent 100%)",
                    x: beam2X,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ duration: 1, delay: 0.4 }}
            />

            {/* Second horizontal beam */}
            <motion.div
                className="absolute top-2/3 left-0 h-[2px] w-[200vw]"
                style={{
                    background:
                        "linear-gradient(90deg, transparent 0%, #ff6b35 50%, transparent 100%)",
                    x: beam2X,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.35 }}
                transition={{ duration: 1, delay: 0.6 }}
            />

            {/* Corner accent - top left (Swiss style) */}
            <motion.div
                className="absolute top-20 left-8 w-32 h-32"
                style={{ rotate: beam3Rotate }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <div className="absolute top-0 left-0 w-full h-[2px] bg-[#b9fb2a] opacity-40" />
                <div className="absolute top-0 left-0 w-[2px] h-full bg-[#b9fb2a] opacity-40" />
            </motion.div>

            {/* Corner accent - bottom right */}
            <motion.div
                className="absolute bottom-20 right-8 w-24 h-24"
                style={{ rotate: beam3Rotate }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
            >
                <div className="absolute bottom-0 right-0 w-full h-[2px] bg-[#00f5ff] opacity-40" />
                <div className="absolute bottom-0 right-0 w-[2px] h-full bg-[#00f5ff] opacity-40" />
            </motion.div>

            {/* Floating geometric shapes - Brutalist style */}
            <motion.div
                className="absolute top-[20%] right-[20%] w-16 h-16 border-2 border-[#b9fb2a]"
                style={{ scale: beam4Scale }}
                initial={{ opacity: 0 }}
                animate={{
                    opacity: 0.2,
                    rotate: [0, 90, 180, 270, 360],
                }}
                transition={{
                    opacity: { duration: 1 },
                    rotate: {
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                    },
                }}
            />

            <motion.div
                className="absolute top-[60%] left-[5%] w-24 h-24 border-2 border-[#00f5ff]"
                initial={{ opacity: 0 }}
                animate={{
                    opacity: 0.15,
                    rotate: [360, 270, 180, 90, 0],
                }}
                transition={{
                    opacity: { duration: 1 },
                    rotate: {
                        duration: 25,
                        repeat: Infinity,
                        ease: "linear",
                    },
                }}
            />

            {/* Cross marks - Swiss Design element */}
            <motion.div
                className="absolute top-[40%] left-[30%]"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.3, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
            >
                <div className="w-10 h-[2px] bg-[#ff00ff] absolute top-1/2 -translate-y-1/2" />
                <div className="w-[2px] h-10 bg-[#ff00ff] absolute left-1/2 -translate-x-1/2" />
            </motion.div>

            <motion.div
                className="absolute top-[70%] right-[25%]"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.3, scale: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
            >
                <div className="w-8 h-[2px] bg-[#ff6b35] absolute top-1/2 -translate-y-1/2" />
                <div className="w-[2px] h-8 bg-[#ff6b35] absolute left-1/2 -translate-x-1/2" />
            </motion.div>

            {/* Radial gradient accents */}
            <div className="absolute top-0 left-0 w-[60vw] h-[60vh] bg-[radial-gradient(ellipse_at_top_left,#b9fb2a_0%,transparent_70%)] opacity-[0.04]" />
            <div className="absolute bottom-0 right-0 w-[60vw] h-[60vh] bg-[radial-gradient(ellipse_at_bottom_right,#00f5ff_0%,transparent_70%)] opacity-[0.04]" />

            {/* Animated dots grid - Brutalist element */}
            <div className="absolute inset-0">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1.5 h-1.5 bg-white rounded-full"
                        style={{
                            left: `${(i % 5) * 25 + 10}%`,
                            top: `${Math.floor(i / 5) * 25 + 10}%`,
                        }}
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: [0.05, 0.15, 0.05],
                            scale: [1, 1.3, 1],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: i * 0.15,
                        }}
                    />
                ))}
            </div>

            {/* Diagonal beam */}
            <motion.div
                className="absolute top-0 left-0 w-[2px] h-[200vh] origin-top-left"
                style={{
                    background:
                        "linear-gradient(180deg, transparent 0%, #b9fb2a 30%, #00f5ff 70%, transparent 100%)",
                    rotate: "30deg",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.2 }}
                transition={{ duration: 1.5, delay: 0.5 }}
            />
        </div>
    );
}
