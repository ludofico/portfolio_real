"use client";

import { useState, useEffect } from "react";
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

// Map category names to their actual colors
const getCategoryColor = (categoryName: string): string => {
    const categoryData = skills[categoryName as keyof typeof skills];
    if (categoryData) {
        return colorMap[categoryData.color] || "#c6f135";
    }
    return "#c6f135";
};

const categories = Object.keys(skills);

export default function Skills() {
    const { t } = useLanguage();
    const [activeCategory, setActiveCategory] = useState(categories[0]);
    const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<"grid" | "3d">("grid");
    const [isMobile, setIsMobile] = useState(true); // Default to mobile to prevent 3D flash

    // Detect mobile on mount and disable 3D on mobile
    useEffect(() => {
        const checkMobile = () => {
            const mobile = window.innerWidth < 1024;
            setIsMobile(mobile);
            // Force grid view on mobile
            if (mobile) {
                setViewMode("grid");
            }
        };
        
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Build the skills list with proper color mapping
    const skillsList = Object.entries(skills).flatMap(([category, data]) =>
        data.items.map(item => ({
            name: item,
            category,
            level: Math.floor(Math.random() * 3) + 7 // Mock level for visualization
        }))
    );

    // Create a category colors map for the 3D visualization
    const categoryColorsFor3D = Object.fromEntries(
        categories.map(cat => [cat, getCategoryColor(cat)])
    );

    return (
        <section id="skills" className="swiss-section relative overflow-hidden px-4 sm:px-6">
            {/* Background Gradient */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] lg:w-[800px] h-[400px] sm:h-[600px] lg:h-[800px] rounded-full bg-linear-to-r from-[#c6f135]/5 via-[#00f5ff]/5 to-[#ff00ff]/5 blur-3xl pointer-events-none" />

            <SwissContainer className="relative">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="grid grid-cols-12 gap-4 sm:gap-6 mb-10 sm:mb-16 lg:mb-20"
                >
                    <div className="col-span-12 lg:col-span-2">
                        <span className="section-number text-4xl sm:text-5xl lg:text-6xl">03</span>
                    </div>
                    <div className="col-span-12 lg:col-span-10">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 sm:mb-6">
                            <div className="flex items-center gap-4 sm:gap-6">
                                <h2 className="swiss-headline text-2xl sm:text-3xl lg:text-4xl">{t("skills.title")}</h2>
                                <div className="h-px w-12 sm:w-20 bg-[#2a2a2a] hidden sm:block" />
                            </div>

                            {/* Carousel Navigation Arrows - Hidden on mobile since 3D is disabled */}
                            {!isMobile && (
                                <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto justify-between sm:justify-end">
                                    <span className="swiss-overline text-[#666] text-[10px] sm:text-xs">
                                        {viewMode === "grid" ? "GRID" : "3D"}
                                    </span>
                                    <div className="flex items-center">
                                        <button
                                            onClick={() => setViewMode(viewMode === "grid" ? "3d" : "grid")}
                                            className="p-2 sm:p-3 border-2 border-[#2a2a2a] bg-[#0a0a0a] text-[#888] hover:text-[#c6f135] hover:border-[#c6f135] active:bg-[#1a1a1a] transition-all touch-manipulation"
                                            aria-label="Previous view"
                                        >
                                            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                                        </button>
                                        <div className="px-3 sm:px-4 py-2 sm:py-3 border-y-2 border-[#2a2a2a] bg-[#0a0a0a] min-w-[50px] sm:min-w-[60px] text-center">
                                            <span className="swiss-overline text-[#c6f135] text-[10px] sm:text-xs">
                                                {viewMode === "grid" ? "1" : "2"}/2
                                            </span>
                                        </div>
                                        <button
                                            onClick={() => setViewMode(viewMode === "grid" ? "3d" : "grid")}
                                            className="p-2 sm:p-3 border-2 border-[#2a2a2a] bg-[#0a0a0a] text-[#888] hover:text-[#c6f135] hover:border-[#c6f135] active:bg-[#1a1a1a] transition-all touch-manipulation"
                                            aria-label="Next view"
                                        >
                                            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                        <p className="swiss-body-lg text-[#888] max-w-2xl text-sm sm:text-base">
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
                                className="grid grid-cols-12 gap-4 sm:gap-6 mb-8 sm:mb-12 lg:mb-16"
                            >
                                <div className="col-span-12 lg:col-span-2">
                                    <span className="swiss-overline text-[#666] text-[10px] sm:text-xs">{t("skills.filter")}</span>
                                </div>
                                <div className="col-span-12 lg:col-span-10">
                                    {/* Horizontally scrollable on mobile */}
                                    <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap scrollbar-hide">
                                        {categories.map((category, idx) => {
                                            const categoryData = skills[category as keyof typeof skills];
                                            const isActive = activeCategory === category;

                                            return (
                                                <motion.button
                                                    key={category}
                                                    onClick={() => setActiveCategory(category)}
                                                    whileTap={{ scale: 0.98 }}
                                                    className={`relative px-3 sm:px-5 py-2 sm:py-3 swiss-overline text-[10px] sm:text-xs transition-all touch-manipulation flex items-center gap-2 sm:gap-3 whitespace-nowrap shrink-0 ${isActive
                                                        ? "text-black"
                                                        : "text-[#888] border border-[#2a2a2a] hover:border-[#888] hover:text-white"
                                                        }`}
                                                    style={{
                                                        backgroundColor: isActive ? colorMap[categoryData.color] : "transparent",
                                                    }}
                                                >
                                                    <span className={`text-[8px] sm:text-[10px] ${isActive ? 'text-black/50' : 'text-[#666]'}`}>
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
                            <div className="grid grid-cols-12 gap-4 sm:gap-6">
                                {/* Large Number - Hidden on mobile */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 0.1 }}
                                    className="hidden lg:flex col-span-2 items-start justify-center"
                                >
                                    <span
                                        className="text-[120px] xl:text-[180px] font-black leading-none tracking-tighter select-none"
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
                                            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 lg:gap-4"
                                        >
                                            {skills[activeCategory as keyof typeof skills].items.map((skill, i) => {
                                                const categoryColor = colorMap[skills[activeCategory as keyof typeof skills].color];

                                                return (
                                                    <motion.div
                                                        key={skill}
                                                        initial={{ opacity: 0, scale: 0.9 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        transition={{ delay: i * 0.03 }}
                                                        onMouseEnter={() => setHoveredSkill(skill)}
                                                        onMouseLeave={() => setHoveredSkill(null)}
                                                        onTouchStart={() => setHoveredSkill(skill)}
                                                        onTouchEnd={() => setTimeout(() => setHoveredSkill(null), 300)}
                                                        className="group touch-manipulation"
                                                    >
                                                        <div
                                                            className={`relative p-3 sm:p-4 lg:p-5 bg-[#1a1a1a] border transition-all duration-300 ${hoveredSkill === skill
                                                                ? "scale-[1.02] sm:scale-105 z-10"
                                                                : "border-[#2a2a2a]"
                                                                }`}
                                                            style={{
                                                                borderColor: hoveredSkill === skill ? categoryColor : undefined,
                                                                boxShadow: hoveredSkill === skill ? `0 0 20px ${categoryColor}15` : undefined,
                                                            }}
                                                        >
                                                            {/* Skill Name */}
                                                            <span
                                                                className={`swiss-body text-xs sm:text-sm font-medium transition-colors ${hoveredSkill === skill ? "" : "text-white"
                                                                    }`}
                                                                style={{
                                                                    color: hoveredSkill === skill ? categoryColor : undefined,
                                                                }}
                                                            >
                                                                {skill}
                                                            </span>

                                                            {/* Corner Accent */}
                                                            <div
                                                                className="absolute top-0 right-0 w-0 h-0 border-l-[12px] sm:border-l-[16px] border-l-transparent border-t-[12px] sm:border-t-[16px] opacity-0 group-hover:opacity-100 transition-opacity"
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
                            className="h-[300px] sm:h-[400px] lg:h-[500px] mb-6 sm:mb-10 mt-6 sm:mt-10 w-full relative"
                        >
                            <Skills3DWrapper
                                skills={skillsList}
                                categoryColors={categoryColorsFor3D}
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
                    className="mt-10 sm:mt-16 lg:mt-20 grid grid-cols-12 gap-4 sm:gap-6"
                >
                    <div className="col-span-12 lg:col-span-2" />
                    <div className="col-span-12 lg:col-span-10">
                        <div className="p-4 sm:p-6 lg:p-8 bg-[#1a1a1a] border border-[#2a2a2a]">
                            <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                                <SwissTag color="lime">{t("skills.distribution")}</SwissTag>
                                <div className="h-px flex-1 bg-[#2a2a2a]" />
                            </div>

                            <div className="space-y-4 sm:space-y-6">
                                {categories.map((category) => {
                                    const categoryData = skills[category as keyof typeof skills];
                                    const maxItems = Math.max(...categories.map((c) => skills[c as keyof typeof skills].items.length));
                                    const percentage = Math.round((categoryData.items.length / maxItems) * 100);

                                    return (
                                        <div key={category} className="group">
                                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 sm:gap-0 mb-2">
                                                <span className="swiss-body text-xs sm:text-sm text-[#888] group-hover:text-white transition-colors">
                                                    {category}
                                                </span>
                                                <div className="flex items-baseline gap-3 sm:gap-4">
                                                    <span className="swiss-overline text-[10px] sm:text-xs text-[#666]">
                                                        {percentage}%
                                                    </span>
                                                    <span
                                                        className="swiss-overline text-[10px] sm:text-xs tabular-nums"
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
