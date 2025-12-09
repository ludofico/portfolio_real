"use client";

import { motion } from "framer-motion";
import { siteConfig, skills } from "@/lib/data";
import { ArrowDown, ArrowRight } from "lucide-react";
import Link from "next/link";
import ASCIIText from "@/components/ASCIIText";
import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
    const { t } = useLanguage();
    const skillsArray = Object.values(skills).flatMap((category) => category.items);
    const marqueeText = skillsArray.slice(0, 8).join(" · ");

    return (
        <section
            id="home"
            className="relative min-h-screen flex flex-col justify-between overflow-hidden its-grid-baseline px-4 sm:px-6"
        >
            {/* ITS: Mathematical Grid Overlay */}
            <div className="absolute inset-0 swiss-grid opacity-20" />

            {/* ITS: Large Background Index Number */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className="absolute top-1/2 -translate-y-1/2 -right-10 sm:-right-20 lg:right-0 pointer-events-none select-none"
            >
                <span className="its-number-display text-[#c6f135] text-[120px] sm:text-[180px] lg:text-[250px]">01</span>
            </motion.div>

            {/* Main Content Container */}
            <div className="swiss-container relative flex-1 flex flex-col justify-center pt-28 sm:pt-40 lg:pt-48 pb-16 sm:pb-24">

                {/* ITS: Top Index Row - cleaner, without availability badge (moved to nav) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center gap-4 sm:gap-6 mb-10 sm:mb-16 lg:mb-20"
                >
                    <span className="its-index font-black tracking-[0.2em] sm:tracking-[0.3em] text-[10px] sm:text-xs">INDEX 01</span>
                    <div className="its-rule flex-1 max-w-[100px] sm:max-w-[200px] h-0.5 sm:h-1 bg-[#c6f135]" />
                </motion.div>

                {/* ITS: Main Typography */}
                <div className="grid grid-cols-12 gap-4 sm:gap-6">
                    <div className="col-span-12 lg:col-span-10 lg:col-start-1">
                        <motion.div
                            initial={{ opacity: 0, y: 80 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden"
                        >
                            <h1 className="its-display text-white its-flush-left text-[2.5rem] sm:text-[4rem] lg:text-[6rem] xl:text-[8rem]">
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
                            <h1 className="its-display gradient-text its-flush-left text-[2.5rem] sm:text-[4rem] lg:text-[6rem] xl:text-[8rem]">
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
                <div className="grid grid-cols-12 gap-4 sm:gap-6 mt-12 sm:mt-20">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.6 }}
                        className="col-span-12 lg:col-span-5 its-flush-left"
                    >
                        <div className="its-marker mb-3 sm:mb-4">
                            <span className="its-label-filled text-xs sm:text-sm">{siteConfig.title}</span>
                        </div>

                        <p className="its-body text-[#888] mb-6 sm:mb-10 max-w-lg text-sm sm:text-base leading-relaxed">
                            {t("hero.description")}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                            <Link href="#projects" className="hoverable">
                                <motion.div
                                    whileHover={{ scale: 1.02, x: 4 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="group flex items-center justify-center sm:justify-start gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-[#c6f135] text-black font-bold text-xs sm:text-sm tracking-wide uppercase brutal-shadow hover:shadow-none transition-all"
                                >
                                    {t("hero.viewProjects")}
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </motion.div>
                            </Link>
                            <Link href="#contact" className="hoverable">
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="px-6 sm:px-8 py-3 sm:py-4 brutal-border text-white font-bold text-xs sm:text-sm tracking-wide uppercase brutal-hover transition-all text-center"
                                >
                                    {t("hero.getInTouch")}
                                </motion.div>
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9, duration: 0.6 }}
                        className="col-span-12 lg:col-span-4 lg:col-start-9 mt-8 lg:mt-0"
                    >
                        <div className="its-rule-accent w-16 mb-4 sm:mb-6" />

                        <div className="grid grid-cols-2 gap-6 sm:gap-4 w-max">
                            {[
                                { value: "2+", label: t("hero.yearsExp") },
                                { value: "10+", label: t("hero.technologies") },
                                { value: "5+", label: t("hero.certifications") },
                                { value: "∞", label: t("hero.passion") },
                            ].map((stat, i) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1 + i * 0.1 }}
                                    className="group p-5 sm:p-6 w-30 bg-[#0a0a0a] border-2 border-[#1f1f1f] hover:border-[#c6f135]/50 hover:bg-[#1a1a1a] transition-colors"
                                >
                                    <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                                        <span className="font-black text-[#c6f135] group-hover:text-[#00f5ff] transition-colors text-4xl sm:text-5xl lg:text-6xl leading-none">{stat.value}</span>
                                        <span className="text-[#666] uppercase tracking-wider text-[9px] sm:text-[10px] mt-2 sm:mt-3">{stat.label}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* ITS: Bottom Bar - Larger Marquee */}
            <div className="relative border-t border-[#2a2a2a] glass-nav">
                <div className="swiss-container py-4 sm:py-6">
                    <div className="flex items-center justify-between">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.2 }}
                            className="pattern-info-block"
                        >
                            <span className="info-label text-[8px] sm:text-[10px]">{t("hero.location")}</span>
                            <span className="info-value text-xs sm:text-sm">{siteConfig.location}</span>
                        </motion.div>

                        <div className="hidden md:block flex-1 mx-8 lg:mx-12 overflow-hidden">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.3 }}
                                className="animate-marquee whitespace-nowrap"
                            >
                                <span className="text-base lg:text-xl font-medium tracking-wide text-[#888]">
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
                            <span className="info-label text-[8px] sm:text-[10px]">{t("hero.year")}</span>
                            <span className="info-value brutal-mono text-xs sm:text-sm">{new Date().getFullYear()}</span>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator - Hidden on very small screens */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-20 sm:bottom-24 left-1/2 -translate-x-1/2 hidden sm:block"
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="flex flex-col items-center gap-2 sm:gap-3 text-[#666]"
                >
                    <span className="its-caption tracking-[0.2em] sm:tracking-[0.3em] text-[10px] sm:text-xs">{t("hero.scroll")}</span>
                    <ArrowDown className="w-3 h-3 sm:w-4 sm:h-4" />
                </motion.div>
            </motion.div>
        </section>
    );
}
