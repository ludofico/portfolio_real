"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skills } from "@/lib/data";
import { SwissContainer, SwissTag } from "@/components/SwissGrid";

const colorMap: Record<string, string> = {
    lime: "#c6f135",
    cyan: "#00f5ff",
    magenta: "#ff00ff",
    orange: "#ff6b35",
};

const categories = Object.keys(skills);

export default function Skills() {
    const [activeCategory, setActiveCategory] = useState(categories[0]);
    const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

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
                        <div className="flex items-center gap-6 mb-6">
                            <h2 className="swiss-headline">Skills</h2>
                            <div className="h-px flex-1 bg-[#2a2a2a]" />
                        </div>
                        <p className="swiss-body-lg text-[#888] max-w-2xl">
                            A comprehensive toolkit spanning frontend, backend, AI, and DevOps technologies.
                        </p>
                    </div>
                </motion.div>

                {/* Category Tabs - ITS Systematic Navigation */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="grid grid-cols-12 gap-6 mb-16"
                >
                    <div className="col-span-12 lg:col-span-2">
                        <span className="swiss-overline text-[#666]">Filter</span>
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
                                <SwissTag color="lime">Distribution</SwissTag>
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
