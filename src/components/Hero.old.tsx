"use client";

import { motion } from "framer-motion";
import { siteConfig, skills } from "@/lib/data";
import { ArrowDown, ArrowRight } from "lucide-react";
import Link from "next/link";
import ASCIIText from "@/components/ASCIIText";

export default function Hero() {
    const skillsArray = Object.values(skills).flatMap((category) => category.items);
    const marqueeText = skillsArray.join(" • ");

    return (
        <section
            id="home"
            className="relative min-h-screen flex flex-col justify-center overflow-hidden"
        >
            {/* Background Grid */}
            <div className="absolute inset-0 grid-lines opacity-30" />

            {/* Floating Elements */}
            <motion.div
                animate={{
                    y: [0, -20, 0],
                    rotate: [0, 5, 0],
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute top-1/4 right-[15%] w-32 h-32 border-2 border-[#c6f135] opacity-20"
            />
            <motion.div
                animate={{
                    y: [0, 20, 0],
                    rotate: [0, -5, 0],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute bottom-1/4 left-[10%] w-24 h-24 bg-[#00f5ff]/10 rounded-full"
            />

            {/* Main Content */}
            <div className="relative max-w-7xl mx-auto px-6 pt-32 pb-20">
                {/* Status Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] border border-[#2a2a2a] mb-8"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c6f135] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#c6f135]"></span>
                    </span>
                    <span className="text-sm text-[#888]">Available for opportunities</span>
                </motion.div>

                {/* Name with ASCII Animation */}
                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black leading-none tracking-tighter mb-4"
                >
                    <span className="block">
                        <ASCIIText
                            text={siteConfig.name.split(" ")[0]}
                            delay={600}
                            revealDuration={300}
                            
                            className="text-white"
                        />
                    </span>
                    <span className="block gradient-text">
                        <ASCIIText
                            text={siteConfig.name.split(" ")[1]}
                            delay={1200}
                            revealDuration={600}
                            className=""
                        />
                    </span>
                </motion.h1>

                {/* Title */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-wrap items-center gap-4 mb-8"
                >
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-mono text-[#c6f135]">
                        {siteConfig.title}
                    </h2>
                    <span className="hidden sm:block w-24 h-[2px] bg-gradient-to-r from-[#c6f135] to-transparent" />
                </motion.div>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="max-w-2xl text-[#888] text-lg md:text-xl leading-relaxed mb-12"
                >
                    {siteConfig.description}
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="flex flex-wrap gap-4"
                >
                    <Link href="#projects" className="hoverable">
                        <motion.div
                            whileHover={{ scale: 1.05, x: 5 }}
                            whileTap={{ scale: 0.95 }}
                            className="group flex items-center gap-3 px-8 py-4 bg-[#c6f135] text-black font-bold text-lg hover:bg-[#00f5ff] transition-colors"
                        >
                            View Projects
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </motion.div>
                    </Link>
                    <Link href="#contact" className="hoverable">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 border-2 border-white text-white font-bold text-lg hover:bg-white hover:text-black transition-all"
                        >
                            Get In Touch
                        </motion.div>
                    </Link>
                </motion.div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                    className="align-middle mt-13 mb-13 box-border grid grid-cols-2 sm:grid-cols-4 gap-8"
                >
                    {[
                        { value: "2+", label: "Years Experience" },
                        { value: "10+", label: "Technologies" },
                        { value: "5+", label: "Certifications" },
                        { value: "∞", label: "Passion" },
                    ].map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1 + i * 0.1 }}
                            className="group"
                        >
                            <div className="flex self-start items-center justify-between text-3xl sm:text-4xl font-black text-white group-hover:text-[#c6f135] transition-colors">
                                {stat.value}
                                <div className="text-xl text-[#888] ml-1.5">{stat.label}</div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Marquee */}
            <div className="absolute box-border  bottom-20 left-0 right-0 overflow-hidden border-y border-[#2a2a2a] bg-[#0a0a0a]/80 backdrop-blur-sm py-4">
                <div className="animate-marquee whitespace-nowrap flex">
                    <span className="text-xl font-mono text-[#888] mx-4">
                        {marqueeText} • {marqueeText} •
                    </span>
                    <span className="text-xl font-mono text-[#888] mx-4">
                        {marqueeText} • {marqueeText} •
                    </span>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="flex flex-col items-center gap-2 text-[#888]"
                >
                    <span className="text-xs font-mono tracking-widest">SCROLL</span>
                    <ArrowDown className="w-4 h-4" />
                </motion.div>
            </motion.div>
        </section>
    );
}
