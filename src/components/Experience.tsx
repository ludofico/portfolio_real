"use client";

import { motion } from "framer-motion";
import { experiences, education, certifications } from "@/lib/data";
import { Briefcase, GraduationCap, Award, ExternalLink } from "lucide-react";
import { SwissContainer, SwissTag, SwissCard } from "@/components/SwissGrid";

const colorMap: Record<string, string> = {
    lime: "#c6f135",
    cyan: "#00f5ff",
    magenta: "#ff00ff",
    orange: "#ff6b35",
};

export default function Experience() {
    return (
        <section id="experience" className="swiss-section relative bg-[#0f0f0f]">
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
                        <span className="section-number">02</span>
                    </div>
                    <div className="col-span-12 lg:col-span-10">
                        <div className="flex items-center gap-6 mb-6">
                            <h2 className="swiss-headline">Experience</h2>
                            <div className="h-px flex-1 bg-[#2a2a2a]" />
                        </div>
                        <p className="swiss-body-lg text-[#888] max-w-2xl">
                            Professional journey through software development and AI integration.
                        </p>
                    </div>
                </motion.div>

                {/* Main Grid */}
                <div className="grid grid-cols-12 gap-6 lg:gap-8">
                    {/* Work Experience - Left Column */}
                    <div className="col-span-12 lg:col-span-8">
                        <div className="flex items-center gap-4 mb-8">
                            <SwissTag color="lime">
                                <Briefcase className="w-3 h-3 mr-2" />
                                Work
                            </SwissTag>
                            <div className="h-px flex-1 bg-[#2a2a2a]" />
                        </div>

                        <div className="space-y-6">
                            {experiences.map((exp, i) => (
                                <motion.div
                                    key={exp.id}
                                    initial={{ opacity: 0, x: -40 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.15 }}
                                    className="group"
                                >
                                    <div className="grid grid-cols-12 gap-4">
                                        {/* Timeline Number */}
                                        <div className="col-span-2 lg:col-span-1 relative">
                                            {/* vertical connector for timeline */}
                                            <span
                                                aria-hidden
                                                className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-[#1f1f1f]"
                                            />

                                            <div className="relative z-10 flex items-center justify-center">
                                                <div
                                                    className="w-10 h-10 flex items-center justify-center rounded-full border-2 bg-[#0f0f0f] transition-transform group-hover:scale-110"
                                                    style={{ borderColor: colorMap[exp.color] }}
                                                    aria-hidden
                                                >
                                                    <span
                                                        className="swiss-overline"
                                                        style={{ color: colorMap[exp.color] }}
                                                    >
                                                        0{i + 1}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="col-span-10 lg:col-span-11">
                                            <SwissCard
                                                className="p-6 hover:border-opacity-100 transition-all"
                                                style={{
                                                    borderTopColor: `${colorMap[exp.color]}30`,
                                                    borderRightColor: `${colorMap[exp.color]}30`,
                                                    borderBottomColor: `${colorMap[exp.color]}30`,
                                                    borderLeftWidth: '4px',
                                                    borderLeftColor: `${colorMap[exp.color]}60`,
                                                }}
                                            >
                                                {/* Header */}
                                                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                                                    <div>
                                                        <h4 className="swiss-subtitle text-white group-hover:text-[#c6f135] transition-colors mb-1">
                                                            {exp.role}
                                                        </h4>
                                                        <p className="swiss-body text-[#888]">
                                                            {exp.company} · {exp.location}
                                                        </p>
                                                    </div>
                                                    <span
                                                        className="swiss-tag"
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
                                                <p className="swiss-body text-[#888] mb-6 leading-relaxed">
                                                    {exp.description}
                                                </p>

                                                {/* Highlights */}
                                                <div className="flex flex-wrap gap-2">
                                                    {exp.highlights.map((highlight) => (
                                                        <span
                                                            key={highlight}
                                                            className="px-3 py-1 text-xs bg-[#0a0a0a] border border-[#2a2a2a] text-[#666] hover:text-white hover:border-[#c6f135]/50 transition-colors"
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

                    {/* Education & Certifications - Right Column */}
                    <div className="col-span-12 lg:col-span-4 space-y-12">
                        {/* Education */}
                        <div>
                            <div className="flex items-center gap-4 mb-8">
                                <SwissTag color="cyan">
                                    <GraduationCap className="w-3 h-3 mr-2" />
                                    Education
                                </SwissTag>
                            </div>

                            <div className="space-y-4">
                                {education.map((edu, i) => (
                                    <motion.div
                                        key={edu.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                    >
                                        <SwissCard className="p-5 hover:border-[#00f5ff]/50 transition-colors group">
                                            <h4 className="swiss-body font-bold text-white group-hover:text-[#00f5ff] transition-colors mb-1">
                                                {edu.institution}
                                            </h4>
                                            <p className="swiss-caption text-[#888] lowercase mb-3">{edu.field}</p>
                                            <div className="flex items-center justify-between">
                                                <span className="swiss-overline text-[#666]">{edu.degree}</span>
                                                <span className="swiss-overline text-[#00f5ff]">{edu.period}</span>
                                            </div>
                                        </SwissCard>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Certifications */}
                        <div>
                            <div className="flex items-center gap-4 mb-8">
                                <SwissTag color="magenta">
                                    <Award className="w-3 h-3 mr-2" />
                                    Certifications
                                </SwissTag>
                            </div>

                            <div className="space-y-3">
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
                                                className="flex items-center gap-4 p-4 glass-card hover:border-[#ff00ff]/50 transition-all hoverable"
                                            >
                                                {/* Certification Badge Image */}
                                                <div
                                                    className="w-12 h-12 rounded-lg overflow-hidden shrink-0 flex items-center justify-center"
                                                    style={{ backgroundColor: `${cert.color}20` }}
                                                >
                                                    {cert.image && (
                                                        <img
                                                            src={cert.image}
                                                            alt={cert.name}
                                                            className="w-10 h-10 object-contain"
                                                        />
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="swiss-body font-medium text-white group-hover:text-[#ff00ff] transition-colors truncate">
                                                        {cert.name}
                                                    </p>
                                                    <p className="swiss-overline text-[#666] mt-1">{cert.issuer}</p>
                                                </div>
                                                <ExternalLink className="w-4 h-4 text-[#666] group-hover:text-[#ff00ff] transition-colors shrink-0" />
                                            </a>
                                        ) : (
                                            <div className="flex items-center gap-4 p-4 glass-card hover:border-[#ff00ff]/30 transition-all">
                                                {/* Certification Badge Image */}
                                                <div
                                                    className="w-12 h-12 rounded-lg overflow-hidden shrink-0 flex items-center justify-center"
                                                    style={{ backgroundColor: `${cert.color}20` }}
                                                >
                                                    {cert.image && (
                                                        <img
                                                            src={cert.image}
                                                            alt={cert.name}
                                                            className="w-10 h-10 object-contain"
                                                        />
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="swiss-body font-medium text-white truncate">{cert.name}</p>
                                                    <p className="swiss-overline text-[#666] mt-1">{cert.issuer}</p>
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
