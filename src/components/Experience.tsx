"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { experiences, education, certifications } from "@/lib/data";
import { Briefcase, GraduationCap, Award, ExternalLink } from "lucide-react";
import { SwissContainer, SwissTag, SwissCard } from "@/components/SwissGrid";
import { useLanguage } from "@/context/LanguageContext";

const colorMap: Record<string, string> = {
    lime: "#c6f135",
    cyan: "#00f5ff",
    magenta: "#ff00ff",
    orange: "#ff6b35",
};

export default function Experience() {
    const { t } = useLanguage();

    return (
        <section id="experience" className="swiss-section relative bg-[#0f0f0f] px-4 sm:px-6 lg:px-0">
            {/* Background Pattern */}
            <div className="absolute inset-0 swiss-grid opacity-10" />

            <SwissContainer className="relative">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="grid grid-cols-12 gap-4 sm:gap-6 mb-12 sm:mb-20"
                >
                    <div className="col-span-12 lg:col-span-2">
                        <span className="section-number text-[80px] sm:text-[120px] lg:text-[180px]">02</span>
                    </div>
                    <div className="col-span-12 lg:col-span-10">
                        <div className="flex items-center gap-4 sm:gap-6 mb-4 sm:mb-6">
                            <h2 className="swiss-headline text-3xl sm:text-4xl lg:text-5xl">{t("experience.title")}</h2>
                            <div className="h-px flex-1 bg-[#2a2a2a]" />
                        </div>
                        <p className="swiss-body-lg text-[#888] max-w-2xl text-sm sm:text-base lg:text-lg">
                            {t("experience.subtitle")}
                        </p>
                    </div>
                </motion.div>

                {/* Main Grid */}
                <div className="grid grid-cols-12 gap-4 sm:gap-6 lg:gap-8">
                    {/* Work Experience - Left Column */}
                    <div className="col-span-12 lg:col-span-8">
                        <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                            <SwissTag color="lime">
                                <Briefcase className="w-3 h-3 mr-1 sm:mr-2" />
                                {t("experience.work")}
                            </SwissTag>
                            <div className="h-px flex-1 bg-[#2a2a2a]" />
                        </div>

                        <div className="space-y-4 sm:space-y-6">
                            {experiences.map((exp, i) => (
                                <motion.div
                                    key={exp.id}
                                    initial={{ opacity: 0, x: -40 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.15 }}
                                    className="group"
                                >
                                    <div className="grid grid-cols-12 gap-2 sm:gap-4">
                                        {/* Timeline Number - Hidden on mobile */}
                                        <div className="hidden sm:block col-span-2 lg:col-span-1 relative">
                                            {/* vertical connector for timeline */}
                                            <span
                                                aria-hidden
                                                className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-[#1f1f1f]"
                                            />

                                            <div className="relative z-10 flex items-center justify-center">
                                                <div
                                                    className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full border-2 bg-[#0f0f0f] transition-transform group-hover:scale-110"
                                                    style={{ borderColor: colorMap[exp.color] }}
                                                    aria-hidden
                                                >
                                                    <span
                                                        className="swiss-overline text-[10px] sm:text-xs"
                                                        style={{ color: colorMap[exp.color] }}
                                                    >
                                                        0{i + 1}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="col-span-12 sm:col-span-10 lg:col-span-11">
                                            <SwissCard
                                                className="p-4 sm:p-6 hover:border-opacity-100 transition-all"
                                                style={{
                                                    borderTopColor: `${colorMap[exp.color]}30`,
                                                    borderRightColor: `${colorMap[exp.color]}30`,
                                                    borderBottomColor: `${colorMap[exp.color]}30`,
                                                    borderLeftWidth: '3px',
                                                    borderLeftColor: `${colorMap[exp.color]}60`,
                                                }}
                                            >
                                                {/* Header */}
                                                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4 mb-3 sm:mb-4">
                                                    <div>
                                                        <h4 className="swiss-subtitle text-white group-hover:text-[#c6f135] transition-colors mb-1 text-base sm:text-lg">
                                                            {exp.role}
                                                        </h4>
                                                        <p className="swiss-body text-[#888] text-xs sm:text-sm">
                                                            {exp.company} · {exp.location}
                                                        </p>
                                                    </div>
                                                    <span
                                                        className="swiss-tag self-start text-[10px] sm:text-xs"
                                                        style={{
                                                            backgroundColor: `${colorMap[exp.color]}15`,
                                                            color: colorMap[exp.color],
                                                            borderColor: `${colorMap[exp.color]}30`,
                                                        }}
                                                    >
                                                        {exp.period}
                                                    </span>
                                                </div>

                                                {/* Description */}
                                                <p className="swiss-body text-[#888] mb-4 sm:mb-6 leading-relaxed text-xs sm:text-sm">
                                                    {t(exp.descriptionKey)}
                                                </p>

                                                {/* Highlights */}
                                                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                                    {exp.highlights.map((highlight) => (
                                                        <span
                                                            key={highlight}
                                                            className="px-2 sm:px-3 py-1 text-[10px] sm:text-xs bg-[#0a0a0a] border border-[#2a2a2a] text-[#666] hover:text-white hover:border-[#c6f135]/50 transition-colors"
                                                        >
                                                            {highlight}
                                                        </span>
                                                    ))}
                                                </div>
                                            </SwissCard>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Education & Certifications - Right Column - Stacks below on mobile */}
                    <div className="col-span-12 lg:col-span-4 space-y-8 sm:space-y-12 mt-8 lg:mt-0">
                        {/* Education */}
                        <div>
                            <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                                <SwissTag color="cyan">
                                    <GraduationCap className="w-3 h-3 mr-1 sm:mr-2" />
                                    {t("experience.education")}
                                </SwissTag>
                            </div>

                            <div className="space-y-3 sm:space-y-4">
                                {education.map((edu, i) => (
                                    <motion.div
                                        key={edu.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className="group"
                                    >
                                        <SwissCard className="p-0 sm:p-0 hover:border-[#00f5ff]/50 transition-colors group overflow-hidden">
                                            <h4 className="swiss-body font-bold text-white group-hover:text-[#00f5ff] transition-colors mb-1 text-sm sm:text-base leading-tight break-words">
                                                {edu.institution}
                                            </h4>
                                            <p className="swiss-caption text-[#888] lowercase mb-2 sm:mb-3 text-xs sm:text-sm leading-tight break-words">{edu.field}</p>
                                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
                                                <span className="swiss-overline text-[#666] text-[10px] sm:text-xs">{edu.degree}</span>
                                                <span className="swiss-overline text-[#00f5ff] text-[10px] sm:text-xs">{edu.period}</span>
                                            </div>
                                        </SwissCard>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Certifications */}
                        <div>
                            <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                                <SwissTag color="magenta">
                                    <Award className="w-3 h-3 mr-1 sm:mr-2" />
                                    {t("experience.certifications")}
                                </SwissTag>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-1 gap-2 sm:gap-3">
                                {certifications.map((cert, i) => (
                                    <motion.div
                                        key={cert.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.08 }}
                                        className="group"
                                    >
                                        {cert.link ? (
                                            <a
                                                href={cert.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="block glass-card hover:border-[#ff00ff]/50 transition-all hoverable overflow-hidden"
                                            >
                                                {/* Mobile: Vertical card with large badge */}
                                                <div className="lg:hidden relative">
                                                    <div 
                                                        className="aspect-square w-full flex items-center justify-center p-3"
                                                        style={{ backgroundColor: `${cert.color}10` }}
                                                    >
                                                        {cert.image && (
                                                            <Image
                                                                src={cert.image}
                                                                alt={cert.name}
                                                                width={160}
                                                                height={160}
                                                                className="w-full h-full object-contain rounded-md"
                                                                unoptimized
                                                            />
                                                        )}
                                                    </div>
                                                    <div className="p-2 sm:p-3 bg-[#0a0a0a]">
                                                        <p className="font-medium text-white group-hover:text-[#ff00ff] transition-colors text-[10px] sm:text-xs leading-tight line-clamp-2">
                                                            {cert.name}
                                                        </p>
                                                        <p className="text-[#666] mt-1 text-[8px] sm:text-[10px] uppercase tracking-wider">{cert.issuer}</p>
                                                    </div>
                                                </div>
                                                
                                                {/* Desktop: Horizontal layout */}
                                                <div className="hidden lg:flex items-center gap-4 p-4">
                                                    <div
                                                        className="w-12 h-12 rounded-lg overflow-hidden shrink-0 flex items-center justify-center"
                                                        style={{ backgroundColor: `${cert.color}20` }}
                                                    >
                                                        {cert.image && (
                                                            <Image
                                                                src={cert.image}
                                                                alt={cert.name}
                                                                width={48}
                                                                height={48}
                                                                className="w-full h-full object-contain"
                                                                unoptimized
                                                            />
                                                        )}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="swiss-body font-medium text-white group-hover:text-[#ff00ff] transition-colors text-sm leading-tight">
                                                            {cert.name}
                                                        </p>
                                                        <p className="swiss-overline text-[#666] mt-1 text-xs">{cert.issuer}</p>
                                                    </div>
                                                    <ExternalLink className="w-4 h-4 text-[#666] group-hover:text-[#ff00ff] transition-colors shrink-0" />
                                                </div>
                                            </a>
                                        ) : (
                                            <div className="block glass-card hover:border-[#ff00ff]/30 transition-all overflow-hidden">
                                                {/* Mobile: Vertical card with large badge */}
                                                <div className="lg:hidden relative">
                                                    <div 
                                                        className="aspect-square w-full flex items-center justify-center p-3"
                                                        style={{ backgroundColor: `${cert.color}10` }}
                                                    >
                                                        {cert.image && (
                                                            <Image
                                                                src={cert.image}
                                                                alt={cert.name}
                                                                width={160}
                                                                height={160}
                                                                className="w-full h-full object-contain rounded-md"
                                                                unoptimized
                                                            />
                                                        )}
                                                    </div>
                                                    <div className="p-2 sm:p-3 bg-[#0a0a0a]">
                                                        <p className="font-medium text-white text-[10px] sm:text-xs leading-tight line-clamp-2">
                                                            {cert.name}
                                                        </p>
                                                        <p className="text-[#666] mt-1 text-[8px] sm:text-[10px] uppercase tracking-wider">{cert.issuer}</p>
                                                    </div>
                                                </div>
                                                
                                                {/* Desktop: Horizontal layout */}
                                                <div className="hidden lg:flex items-center gap-4 p-4">
                                                    <div
                                                        className="w-12 h-12 rounded-lg overflow-hidden shrink-0 flex items-center justify-center"
                                                        style={{ backgroundColor: `${cert.color}20` }}
                                                    >
                                                        {cert.image && (
                                                            <Image
                                                                src={cert.image}
                                                                alt={cert.name}
                                                                width={48}
                                                                height={48}
                                                                className="w-full h-full object-contain"
                                                                unoptimized
                                                            />
                                                        )}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="swiss-body font-medium text-white text-sm leading-tight">{cert.name}</p>
                                                        <p className="swiss-overline text-[#666] mt-1 text-xs">{cert.issuer}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </SwissContainer>
        </section>
    );
}
