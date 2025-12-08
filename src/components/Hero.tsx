"use client";

import { motion } from "framer-motion";
import { siteConfig, skills } from "@/lib/data";
import { ArrowDown, ArrowRight } from "lucide-react";
import Link from "next/link";
import ASCIIText from "@/components/ASCIIText";

export default function Hero() {
    const skillsArray = Object.values(skills).flatMap((category) => category.items);
    const marqueeText = skillsArray.slice(0, 8).join(" · ");

    return (
        <section
            id="home"
            className="relative min-h-screen flex flex-col justify-between overflow-hidden its-grid-baseline"
        >
            {/* ITS: Mathematical Grid Overlay */}
            <div className="absolute inset-0 swiss-grid opacity-20" />

            {/* ITS: Large Background Index Number */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className="absolute top-1/2 -translate-y-1/2 -right-20 lg:right-0 pointer-events-none select-none"
            >
                <span className="its-number-display text-[#c6f135]">01</span>
            </motion.div>

            {/* Main Content Container */}
            <div className="swiss-container relative flex-1 flex flex-col justify-center pt-40 lg:pt-48 pb-24">

                {/* ITS: Top Index Row - Moved down with better spacing */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center gap-6 mb-20 lg:mb-24"
                >
                    <span className="its-index">Index 01</span>
                    <div className="its-rule flex-1 max-w-[200px]" />

                    <div className="ml-auto flex items-center gap-3 glass-card px-4 py-2">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c6f135] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#c6f135]"></span>
                        </span>
                        <span className="its-caption text-[#888]">Available for Work</span>
                    </div>
                </motion.div>

                {/* ITS: Main Typography */}
                <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-12 lg:col-span-10 lg:col-start-1">
                        <motion.div
                            initial={{ opacity: 0, y: 80 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden"
                        >
                            <h1 className="its-display text-white its-flush-left">
                                <ASCIIText
                                    text={siteConfig.name.split(" ")[0]}
                                    delay={400}
                                    revealDuration={200}
                                />
                            </h1>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 80 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden"
                        >
                            <h1 className="its-display gradient-text its-flush-left">
                                <ASCIIText
                                    text={siteConfig.name.split(" ")[1]}
                                    delay={800}
                                    revealDuration={400}
                                />
                            </h1>
                        </motion.div>
                    </div>
                </div>

                {/* ITS: Information Grid */}
                <div className="grid grid-cols-12 gap-6 mt-20">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.6 }}
                        className="col-span-12 lg:col-span-5 its-flush-left"
                    >
                        <div className="its-marker mb-4">
                            <span className="its-label-filled">{siteConfig.title}</span>
                        </div>

                        <p className="its-body text-[#888] mb-10 max-w-lg">
                            {siteConfig.description}
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <Link href="#projects" className="hoverable">
                                <motion.div
                                    whileHover={{ scale: 1.02, x: 4 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="group flex items-center gap-3 px-8 py-4 bg-[#c6f135] text-black font-bold text-sm tracking-wide uppercase brutal-shadow hover:shadow-none transition-all"
                                >
                                    View Projects
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </motion.div>
                            </Link>
                            <Link href="#contact" className="hoverable">
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="px-8 py-4 brutal-border text-white font-bold text-sm tracking-wide uppercase brutal-hover transition-all"
                                >
                                    Get In Touch
                                </motion.div>
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9, duration: 0.6 }}
                        className="col-span-12 lg:col-span-4 lg:col-start-9"
                    >
                        <div className="its-rule-accent w-16 mb-6" />

                        <div className="pattern-card-grid grid-cols-2">
                            {[
                                { value: "2+", label: "Years Exp" },
                                { value: "10+", label: "Technologies" },
                                { value: "5+", label: "Certifications" },
                                { value: "∞", label: "Passion" },
                            ].map((stat, i) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1 + i * 0.1 }}
                                    className="group p-5 hover:bg-[#1a1a1a] transition-colors"
                                >
                                    <div className="pattern-stat">
                                        <span className="stat-value brutal-mono group-hover:text-[#00f5ff] transition-colors">{stat.value}</span>
                                        <span className="stat-label">{stat.label}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* ITS: Bottom Bar - Larger Marquee */}
            <div className="relative border-t border-[#2a2a2a] glass-nav">
                <div className="swiss-container py-6">
                    <div className="flex items-center justify-between">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.2 }}
                            className="pattern-info-block"
                        >
                            <span className="info-label">Location</span>
                            <span className="info-value">{siteConfig.location}</span>
                        </motion.div>

                        <div className="hidden md:block flex-1 mx-12 overflow-hidden">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.3 }}
                                className="animate-marquee whitespace-nowrap"
                            >
                                <span className="text-lg lg:text-xl font-medium tracking-wide text-[#888]">
                                    {marqueeText} · {marqueeText} ·
                                </span>
                            </motion.div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.2 }}
                            className="pattern-info-block text-right"
                        >
                            <span className="info-label">Year</span>
                            <span className="info-value brutal-mono">{new Date().getFullYear()}</span>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-24 left-1/2 -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="flex flex-col items-center gap-3 text-[#666]"
                >
                    <span className="its-caption tracking-[0.3em]">Scroll</span>
                    <ArrowDown className="w-4 h-4" />
                </motion.div>
            </motion.div>
        </section>
    );
}
