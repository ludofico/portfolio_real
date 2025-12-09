"use client";

import { motion } from "framer-motion";
import { siteConfig, languages } from "@/lib/data";
import { MapPin, Mail, Phone, Globe } from "lucide-react";
import { SwissContainer, SwissTag, SwissCard } from "@/components/SwissGrid";
import { useLanguage } from "@/context/LanguageContext";

export default function About() {
    const { t } = useLanguage();

    return (
        <section id="about" className="swiss-section relative overflow-hidden px-4 sm:px-6 lg:px-0">
            {/* Background accent */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-linear-to-l from-[#c6f135]/3 to-transparent pointer-events-none" />

            <SwissContainer>
                {/* Section Header - Swiss Grid Layout */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="grid grid-cols-12 gap-4 sm:gap-6 mb-12 sm:mb-20"
                >
                    {/* Section Number */}
                    <div className="col-span-12 lg:col-span-2">
                        <span className="section-number text-[80px] sm:text-[120px] lg:text-[180px]">01</span>
                    </div>

                    {/* Title Area */}
                    <div className="col-span-12 lg:col-span-10">
                        <div className="flex items-center gap-4 sm:gap-6 mb-4 sm:mb-6">
                            <h2 className="swiss-headline text-3xl sm:text-4xl lg:text-5xl">{t("about.title")}</h2>
                            <div className="h-px flex-1 bg-[#2a2a2a]" />
                        </div>
                        <p className="swiss-body-lg text-[#888] max-w-2xl text-sm sm:text-base lg:text-lg">
                            {t("about.subtitle")}
                        </p>
                    </div>
                </motion.div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-12 gap-4 sm:gap-6 lg:gap-8">
                    {/* Left Column - Bio */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="col-span-12 lg:col-span-7"
                    >
                        {/* Bio Text */}
                        <div className="space-y-4 sm:space-y-6 mb-8 sm:mb-12">
                            <p className="swiss-body-lg text-[#888] leading-relaxed text-sm sm:text-base lg:text-lg">
                                {t("about.bio1")} <span className="text-white font-semibold">{t("about.bio1Role1")}</span> {t("about.bio1And")}{" "}
                                <span className="text-white font-semibold">{t("about.bio1Role2")}</span> {t("about.bio1End")}
                            </p>
                            <p className="swiss-body-lg text-[#888] leading-relaxed text-sm sm:text-base lg:text-lg">
                                {t("about.bio2")} <span className="text-[#c6f135]">{t("about.bio2Highlight")}</span> {t("about.bio2End")}
                            </p>
                            <p className="swiss-body-lg text-[#888] leading-relaxed text-sm sm:text-base lg:text-lg">
                                {t("about.bio3")} <span className="text-[#00f5ff]">{t("about.bio3Highlight")}</span> {t("about.bio3End")}
                            </p>
                        </div>

                        {/* Contact Grid - Stack on mobile */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#2a2a2a]">
                            {[
                                { icon: MapPin, label: t("about.location"), value: siteConfig.location, color: "lime" },
                                { icon: Mail, label: t("about.email"), value: siteConfig.email, color: "cyan" },
                                { icon: Phone, label: t("about.phone"), value: siteConfig.phone, color: "magenta" },
                                { icon: Globe, label: t("about.status"), value: t("about.openToWork"), color: "orange" },
                            ].map((item, i) => (
                                <motion.div
                                    key={item.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.4 + i * 0.1 }}
                                    className="group flex items-start gap-3 sm:gap-4 p-4 sm:p-5 bg-[#0a0a0a] hover:bg-[#1a1a1a] transition-colors"
                                >
                                    <item.icon className={`w-4 h-4 mt-0.5 shrink-0 text-[${item.color === 'lime' ? '#c6f135' : item.color === 'cyan' ? '#00f5ff' : item.color === 'magenta' ? '#ff00ff' : '#ff6b35'}]`} />
                                    <div className="min-w-0">
                                        <p className="swiss-overline text-[#666] mb-1 text-[10px] sm:text-xs">{item.label}</p>
                                        <p className="swiss-body text-white text-xs sm:text-sm break-all sm:break-normal">{item.value}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Column - Languages & Philosophy */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="col-span-12 lg:col-span-5 mt-8 lg:mt-0"
                    >
                        {/* Languages */}
                        <div className="mb-8 sm:mb-12">
                            <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                                <SwissTag color="cyan">{t("about.languages")}</SwissTag>
                                <div className="h-px flex-1 bg-[#2a2a2a]" />
                            </div>

                            <div className="space-y-4 sm:space-y-6">
                                {languages.map((lang, i) => (
                                    <motion.div
                                        key={lang.name}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.5 + i * 0.1 }}
                                    >
                                        <div className="flex justify-between mb-2">
                                            <span className="swiss-body font-bold text-white uppercase tracking-wider text-xs sm:text-sm">{lang.name}</span>
                                            <span className="swiss-caption text-[#c6f135] font-mono text-xs sm:text-sm">{lang.level}</span>
                                        </div>
                                        <div className="h-1.5 sm:h-2 bg-[#1a1a1a] border border-[#2a2a2a]">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${lang.percentage}%` }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1, delay: 0.6 + i * 0.1 }}
                                                className="h-full bg-[#c6f135]"
                                            />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Philosophy Card - Brutalist Style */}
                        <div className="border-2 sm:border-4 border-[#c6f135] bg-[#0a0a0a] p-5 sm:p-8 relative">
                            <div className="absolute -top-3 sm:-top-4 left-4 sm:left-6 bg-[#0a0a0a] px-2 sm:px-3">
                                <SwissTag color="lime">{t("about.philosophy")}</SwissTag>
                            </div>
                            <blockquote className="swiss-body-lg text-white font-bold leading-relaxed mt-2 border-l-2 sm:border-l-4 border-[#c6f135] pl-4 sm:pl-6 text-sm sm:text-base lg:text-lg">
                                &ldquo;{t("about.philosophyQuote")}&rdquo;
                            </blockquote>
                        </div>

                        {/* Quick Facts Grid - More Brutalist */}
                        <div className="grid grid-cols-2 gap-0 mt-6 sm:mt-8 border-2 border-[#c6f135]">
                            {[
                                { label: t("about.focus"), value: t("about.aiIntegration") },
                                { label: t("about.approach"), value: t("about.modularDesign") },
                                { label: t("about.strength"), value: t("about.problemSolving") },
                                { label: t("about.goal"), value: t("about.innovation") },
                            ].map((fact, i) => (
                                <motion.div
                                    key={fact.label}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.7 + i * 0.1 }}
                                    className="p-3 sm:p-5 border border-[#2a2a2a] hover:bg-[#c6f135] hover:text-black transition-all group"
                                >
                                    <p className="swiss-overline text-[#666] mb-1 sm:mb-2 group-hover:text-black/60 uppercase tracking-[0.1em] sm:tracking-[0.2em] text-[8px] sm:text-[10px]">{fact.label}</p>
                                    <p className="swiss-body font-black text-white group-hover:text-black uppercase text-[10px] sm:text-xs lg:text-sm leading-tight">
                                        {fact.value}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </SwissContainer>
        </section>
    );
}
