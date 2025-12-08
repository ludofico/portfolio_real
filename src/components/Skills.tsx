"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skills } from "@/lib/data";
import { SwissContainer, SwissTag } from "@/components/SwissGrid";
import Skills3DWrapper from "./Skills3DWrapper";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const colorMap: Record<string, string> = {
    lime: "#c6f135",
    cyan: "#00f5ff",
    magenta: "#ff00ff",
    orange: "#ff6b35",
};

const categories = Object.keys(skills);

export default function Skills() {
    const { t } = useLanguage();
    const [activeCategory, setActiveCategory] = useState(categories[0]);
    const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<"grid" | "3d">("3d");

    const skillsList = Object.entries(skills).flatMap(([category, data]) =>
        data.items.map(item => ({
            name: item,
            category,
            level: Math.floor(Math.random() * 3) + 7 // Mock level for visualization
        }))
    );

    return (
        <section id="skills" className="swiss-section relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-linear-to-r from-[#c6f135]/5 via-[#00f5ff]/5 to-[#ff00ff]/5 blur-3xl pointer-events-none" />

            <SwissContainer className="relative">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="grid grid-cols-12 gap-6 mb-20"
                >
                    <div className="col-span-12 lg:col-span-2">
                        <span className="section-number">03</span>
                    </div>
                    <div className="col-span-12 lg:col-span-10">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-6">
                                <h2 className="swiss-headline">{t("skills.title")}</h2>
                                <div className="h-px w-20 bg-[#2a2a2a]" />
                            </div>

                            {/* Carousel Navigation Arrows */}
                            <div className="flex items-center gap-4">
                                <span className="swiss-overline text-[#666] hidden sm:block">
                                    {viewMode === "grid" ? "GRID VIEW" : "3D VIEW"}
                                </span>
                                <div className="flex items-center">
                                    <button
                                        onClick={() => setViewMode(viewMode === "grid" ? "3d" : "grid")}
                                        className="p-3 border-2 border-[#2a2a2a] bg-[#0a0a0a] text-[#888] hover:text-[#c6f135] hover:border-[#c6f135] transition-all"
                                        aria-label="Previous view"
                                    >
                                        <ChevronLeft className="w-5 h-5" />
                                    </button>
                                    <div className="px-4 py-3 border-y-2 border-[#2a2a2a] bg-[#0a0a0a] min-w-[60px] text-center">
                                        <span className="swiss-overline text-[#c6f135]">
                                            {viewMode === "grid" ? "1" : "2"}/2
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => setViewMode(viewMode === "grid" ? "3d" : "grid")}
                                        className="p-3 border-2 border-[#2a2a2a] bg-[#0a0a0a] text-[#888] hover:text-[#c6f135] hover:border-[#c6f135] transition-all"
                                        aria-label="Next view"
                                    >
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <p className="swiss-body-lg text-[#888] max-w-2xl">
                            {t("skills.subtitle")}
                        </p>
                    </div>
                </motion.div>

                {/* Category Tabs - ITS Systematic Navigation */}
                <AnimatePresence mode="wait">
                    {viewMode === "grid" ? (
                        <motion.div
                            key="grid-view"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="grid grid-cols-12 gap-6 mb-16"
                            >
                                <div className="col-span-12 lg:col-span-2">
                                    <span className="swiss-overline text-[#666]">{t("skills.filter")}</span>
                                </div>
                                <div className="col-span-12 lg:col-span-10">
                                    <div className="flex flex-wrap gap-2">
                                        {categories.map((category, idx) => {
                                            const categoryData = skills[category as keyof typeof skills];
                                            const isActive = activeCategory === category;

                                            return (
                                                <motion.button
                                                    key={category}
                                                    onClick={() => setActiveCategory(category)}
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    className={`relative px-5 py-3 swiss-overline transition-all hoverable flex items-center gap-3 ${isActive
                                                        ? "text-black"
                                                        : "text-[#888] border border-[#2a2a2a] hover:border-[#888] hover:text-white"
                                                        }`}
                                                    style={{
                                                        backgroundColor: isActive ? colorMap[categoryData.color] : "transparent",
                                                    }}
                                                >
                                                    <span className={`text-[10px] ${isActive ? 'text-black/50' : 'text-[#666]'}`}>
                                                        {String(idx + 1).padStart(2, '0')}
                                                    </span>
                                                    {category}
                                                </motion.button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </motion.div>

                            {/* Skills Grid */}
                            <div className="grid grid-cols-12 gap-6">
                                {/* Large Number */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 0.1 }}
                                    className="hidden lg:flex col-span-2 items-start justify-center"
                                >
                                    <span
                                        className="text-[180px] font-black leading-none tracking-tighter select-none"
                                        style={{
                                            WebkitTextStroke: `1px ${colorMap[skills[activeCategory as keyof typeof skills].color]}`,
                                            WebkitTextFillColor: 'transparent',
                                        }}
                                    >
                                        {String(categories.indexOf(activeCategory) + 1).padStart(2, '0')}
                                    </span>
                                </motion.div>

                                {/* Skills */}
                                <div className="col-span-12 lg:col-span-10">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={activeCategory}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            transition={{ duration: 0.3 }}
                                            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
                                        >
                                            {skills[activeCategory as keyof typeof skills].items.map((skill, i) => {
                                                const categoryColor = colorMap[skills[activeCategory as keyof typeof skills].color];

                                                return (
                                                    <motion.div
                                                        key={skill}
                                                        initial={{ opacity: 0, scale: 0.9 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        transition={{ delay: i * 0.04 }}
                                                        onMouseEnter={() => setHoveredSkill(skill)}
                                                        onMouseLeave={() => setHoveredSkill(null)}
                                                        className="group hoverable"
                                                    >
                                                        <div
                                                            className={`relative p-5 bg-[#1a1a1a] border transition-all duration-300 ${hoveredSkill === skill
                                                                ? "scale-105 z-10"
                                                                : "border-[#2a2a2a]"
                                                                }`}
                                                            style={{
                                                                borderColor: hoveredSkill === skill ? categoryColor : undefined,
                                                                boxShadow: hoveredSkill === skill ? `0 0 30px ${categoryColor}15` : undefined,
                                                            }}
                                                        >
                                                            {/* Skill Name */}
                                                            <span
                                                                className={`swiss-body font-medium transition-colors ${hoveredSkill === skill ? "" : "text-white"
                                                                    }`}
                                                                style={{
                                                                    color: hoveredSkill === skill ? categoryColor : undefined,
                                                                }}
                                                            >
                                                                {skill}
                                                            </span>

                                                            {/* Corner Accent */}
                                                            <div
                                                                className="absolute top-0 right-0 w-0 h-0 border-l-[16px] border-l-transparent border-t-[16px] opacity-0 group-hover:opacity-100 transition-opacity"
                                                                style={{ borderTopColor: categoryColor }}
                                                            />
                                                        </div>
                                                    </motion.div>
                                                );
                                            })}
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="3d-view"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="h-full mb-10 mt-10 w-full relative"
                        >
                            <Skills3DWrapper
                                skills={skillsList}
                                categoryColors={colorMap}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Skill Distribution Bar */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="mt-20 grid grid-cols-12 gap-6"
                >
                    <div className="col-span-12 lg:col-span-2" />
                    <div className="col-span-12 lg:col-span-10">
                        <div className="p-8 bg-[#1a1a1a] border border-[#2a2a2a]">
                            <div className="flex items-center gap-4 mb-8">
                                <SwissTag color="lime">{t("skills.distribution")}</SwissTag>
                                <div className="h-px flex-1 bg-[#2a2a2a]" />
                            </div>

                            <div className="space-y-6">
                                {categories.map((category) => {
                                    const categoryData = skills[category as keyof typeof skills];
                                    const maxItems = Math.max(...categories.map((c) => skills[c as keyof typeof skills].items.length));
                                    const percentage = Math.round((categoryData.items.length / maxItems) * 100);

                                    return (
                                        <div key={category} className="group">
                                            <div className="flex justify-between items-baseline mb-2">
                                                <span className="swiss-body text-[#888] group-hover:text-white transition-colors">
                                                    {category}
                                                </span>
                                                <div className="flex items-baseline gap-4">
                                                    <span className="swiss-overline text-[#666]">
                                                        {percentage}%
                                                    </span>
                                                    <span
                                                        className="swiss-overline tabular-nums"
                                                        style={{ color: colorMap[categoryData.color] }}
                                                    >
                                                        {categoryData.items.length} skills
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="h-1 bg-[#0a0a0a] overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: `${percentage}%` }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 1, delay: 0.2 }}
                                                    className="h-full"
                                                    style={{ backgroundColor: colorMap[categoryData.color] }}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </SwissContainer>
        </section>
    );
}
