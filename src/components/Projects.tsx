"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/lib/data";
import { ExternalLink, Github, ArrowUpRight, Sparkles } from "lucide-react";
import { SwissContainer, SwissTag, SwissCard } from "@/components/SwissGrid";
import { useLanguage } from "@/context/LanguageContext";

const colorMap: Record<string, string> = {
    lime: "#c6f135",
    cyan: "#00f5ff",
    magenta: "#ff00ff",
    orange: "#ff6b35",
};

const filters = ["All", "Featured"];

export default function Projects() {
    const { t } = useLanguage();
    const [activeFilter, setActiveFilter] = useState("All");
    const [hoveredProject, setHoveredProject] = useState<number | null>(null);

    const filteredProjects =
        activeFilter === "Featured"
            ? projects.filter((p) => p.featured)
            : projects;

    return (
        <section id="projects" className="swiss-section relative bg-[#0f0f0f]">
            {/* Background Pattern */}
            <div className="absolute inset-0 swiss-grid opacity-10" />

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
                        <span className="section-number">04</span>
                    </div>
                    <div className="col-span-12 lg:col-span-10">
                        <div className="flex items-center gap-6 mb-6">
                            <h2 className="swiss-headline">{t("projects.title")}</h2>
                            <div className="h-px flex-1 bg-[#2a2a2a]" />
                        </div>
                        <p className="swiss-body-lg text-[#888] max-w-2xl">
                            {t("projects.subtitle")}
                        </p>
                    </div>
                </motion.div>

                {/* Filters - ITS Systematic */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="grid grid-cols-12 gap-6 mb-12"
                >
                    <div className="col-span-12 lg:col-span-2">
                        <span className="swiss-overline text-[#666]">{t("projects.view")}</span>
                    </div>
                    <div className="col-span-12 lg:col-span-10 flex items-center gap-4">
                        {filters.map((filter) => (
                            <motion.button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className={`px-5 py-3 swiss-overline transition-all hoverable flex items-center gap-2 ${activeFilter === filter
                                    ? "bg-[#c6f135] text-black"
                                    : "text-[#888] border border-[#2a2a2a] hover:border-[#888] hover:text-white"
                                    }`}
                            >
                                {filter === "Featured" && (
                                    <Sparkles className="w-3 h-3" />
                                )}
                                {filter === "All" ? t("projects.all") : t("projects.featured")}
                            </motion.button>
                        ))}
                        <span className="ml-auto swiss-overline text-[#666] tabular-nums">
                            {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}
                        </span>
                    </div>
                </motion.div>

                {/* Projects Grid */}
                <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-12 lg:col-span-2" />
                    <div className="col-span-12 lg:col-span-10">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeFilter}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="grid md:grid-cols-2 gap-6"
                            >
                                {filteredProjects.map((project, i) => (
                                    <motion.div
                                        key={project.id}
                                        initial={{ opacity: 0, y: 40 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        onMouseEnter={() => setHoveredProject(project.id)}
                                        onMouseLeave={() => setHoveredProject(null)}
                                        className="group hoverable"
                                    >
                                        <SwissCard
                                            className={`relative h-full p-8 transition-all duration-500 ${hoveredProject === project.id
                                                ? "border-opacity-100"
                                                : ""
                                                }`}
                                            style={{
                                                borderTopColor:
                                                    hoveredProject === project.id
                                                        ? colorMap[project.color]
                                                        : undefined,
                                                borderRightColor:
                                                    hoveredProject === project.id
                                                        ? colorMap[project.color]
                                                        : undefined,
                                                borderBottomColor:
                                                    hoveredProject === project.id
                                                        ? colorMap[project.color]
                                                        : undefined,
                                                borderLeftWidth: '4px',
                                                borderLeftColor: `${colorMap[project.color]}60`,
                                            }}
                                        >
                                            {/* Project Number */}
                                            <div
                                                className="absolute top-6 right-6 text-6xl font-black opacity-10 transition-all duration-500 group-hover:opacity-20"
                                                style={{ color: colorMap[project.color] }}
                                            >
                                                0{project.id}
                                            </div>

                                            {/* Featured Badge */}
                                            {project.featured && (
                                                <motion.div
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    className="mb-4"
                                                >
                                                    <SwissTag color={project.color as "lime" | "cyan" | "magenta" | "orange"}>
                                                        <Sparkles className="w-3 h-3 mr-1" />
                                                        Featured
                                                    </SwissTag>
                                                </motion.div>
                                            )}

                                            {/* Content */}
                                            <div className="relative z-10">
                                                <h3
                                                    className="swiss-subtitle mb-4 transition-colors duration-300"
                                                    style={{
                                                        color:
                                                            hoveredProject === project.id
                                                                ? colorMap[project.color]
                                                                : "white",
                                                    }}
                                                >
                                                    {project.title}
                                                </h3>

                                                <p className="swiss-body text-[#888] mb-6 leading-relaxed">
                                                    {t(project.descriptionKey)}
                                                </p>

                                                {/* Tags */}
                                                <div className="flex flex-wrap gap-2 mb-6">
                                                    {project.tags.map((tag) => (
                                                        <span
                                                            key={tag}
                                                            className="px-3 py-1 text-xs bg-[#0a0a0a] border border-[#2a2a2a] text-[#666] transition-colors group-hover:border-[#888]/30"
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>

                                                {/* Action Links */}
                                                <div className="flex items-center gap-4">
                                                    <motion.button
                                                        whileHover={{ x: 4 }}
                                                        className="flex items-center gap-2 swiss-overline transition-colors hoverable"
                                                        style={{ color: colorMap[project.color] }}
                                                    >
                                                        View Details
                                                        <ArrowUpRight className="w-4 h-4" />
                                                    </motion.button>

                                                    <motion.button
                                                        whileHover={{ scale: 1.1 }}
                                                        className="p-2 border border-[#2a2a2a] hover:border-[#888] transition-colors hoverable"
                                                    >
                                                        <Github className="w-4 h-4 text-[#888]" />
                                                    </motion.button>

                                                    <motion.button
                                                        whileHover={{ scale: 1.1 }}
                                                        className="p-2 border border-[#2a2a2a] hover:border-[#888] transition-colors hoverable"
                                                    >
                                                        <ExternalLink className="w-4 h-4 text-[#888]" />
                                                    </motion.button>
                                                </div>
                                            </div>

                                            {/* Hover Border Animation */}
                                            <motion.div
                                                className="absolute inset-0 pointer-events-none"
                                                initial={{ opacity: 0 }}
                                                animate={{
                                                    opacity: hoveredProject === project.id ? 1 : 0,
                                                }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <div
                                                    className="absolute top-0 left-0 w-full h-[2px]"
                                                    style={{
                                                        background: `linear-gradient(to right, ${colorMap[project.color]}, transparent)`,
                                                    }}
                                                />
                                                <div
                                                    className="absolute bottom-0 right-0 w-full h-[2px]"
                                                    style={{
                                                        background: `linear-gradient(to left, ${colorMap[project.color]}, transparent)`,
                                                    }}
                                                />
                                            </motion.div>
                                        </SwissCard>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="grid grid-cols-12 gap-6 mt-20"
                >
                    <div className="col-span-12 lg:col-span-2" />
                    <div className="col-span-12 lg:col-span-10 text-center lg:text-left">
                        <p className="swiss-body text-[#888] mb-6">
                            Interested in seeing more of my work?
                        </p>
                        <motion.a
                            href="#contact"
                            whileHover={{ scale: 1.02, x: 4 }}
                            whileTap={{ scale: 0.98 }}
                            className="inline-flex items-center gap-3 px-8 py-4 bg-[#c6f135] text-black font-bold swiss-overline hover:bg-[#00f5ff] transition-colors hoverable"
                        >
                            Let&apos;s Discuss Your Project
                            <ArrowUpRight className="w-4 h-4" />
                        </motion.a>
                    </div>
                </motion.div>
            </SwissContainer>
        </section>
    );
}
