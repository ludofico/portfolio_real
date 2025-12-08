"use client";

import { motion } from "framer-motion";
import { siteConfig, languages } from "@/lib/data";
import { MapPin, Mail, Phone, Globe } from "lucide-react";
import { SwissContainer, SwissTag, SwissCard } from "@/components/SwissGrid";

export default function About() {
    return (
        <section id="about" className="swiss-section relative overflow-hidden">
            {/* Background accent */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-linear-to-l from-[#c6f135]/3 to-transparent pointer-events-none" />

            <SwissContainer>
                {/* Section Header - Swiss Grid Layout */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="grid grid-cols-12 gap-6 mb-20"
                >
                    {/* Section Number */}
                    <div className="col-span-12 lg:col-span-2">
                        <span className="section-number">01</span>
                    </div>

                    {/* Title Area */}
                    <div className="col-span-12 lg:col-span-10">
                        <div className="flex items-center gap-6 mb-6">
                            <h2 className="swiss-headline">About</h2>
                            <div className="h-px flex-1 bg-[#2a2a2a]" />
                        </div>
                        <p className="swiss-body-lg text-[#888] max-w-2xl">
                            Crafting intelligent digital solutions with a focus on AI integration and scalable architecture.
                        </p>
                    </div>
                </motion.div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-12 gap-6 lg:gap-8">
                    {/* Left Column - Bio */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="col-span-12 lg:col-span-7"
                    >
                        {/* Bio Text */}
                        <div className="space-y-6 mb-12">
                            <p className="swiss-body-lg text-[#888] leading-relaxed">
                                Sono un <span className="text-white font-semibold">Full-Stack Developer</span> e{" "}
                                <span className="text-white font-semibold">Software Architect</span> con un focus particolare
                                sulla scalabilità aziendale e l&apos;integrazione di soluzioni AI.
                            </p>
                            <p className="swiss-body-lg text-[#888] leading-relaxed">
                                La mia specializzazione consiste nel trasformare stack tecnologici tradizionali
                                (React, Node.js, WordPress) in <span className="text-[#c6f135]">ecosistemi intelligenti</span> tramite
                                architetture RAG e automazione avanzata.
                            </p>
                            <p className="swiss-body-lg text-[#888] leading-relaxed">
                                Esperto in <span className="text-[#00f5ff]">Strategia SEO Tecnica</span> e SGE (Search Generative Experience)
                                per massimizzare la visibilità organica e i Core Web Vitals.
                            </p>
                        </div>

                        {/* Contact Grid */}
                        <div className="grid grid-cols-2 gap-px bg-[#2a2a2a]">
                            {[
                                { icon: MapPin, label: "Location", value: siteConfig.location, color: "lime" },
                                { icon: Mail, label: "Email", value: siteConfig.email, color: "cyan" },
                                { icon: Phone, label: "Phone", value: siteConfig.phone, color: "magenta" },
                                { icon: Globe, label: "Status", value: "Open to Work", color: "orange" },
                            ].map((item, i) => (
                                <motion.div
                                    key={item.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.4 + i * 0.1 }}
                                    className="group flex items-start gap-4 p-5 bg-[#0a0a0a] hover:bg-[#1a1a1a] transition-colors"
                                >
                                    <item.icon className={`w-4 h-4 mt-0.5 text-[${item.color === 'lime' ? '#c6f135' : item.color === 'cyan' ? '#00f5ff' : item.color === 'magenta' ? '#ff00ff' : '#ff6b35'}]`} />
                                    <div>
                                        <p className="swiss-overline text-[#666] mb-1">{item.label}</p>
                                        <p className="swiss-body text-white">{item.value}</p>
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
                        className="col-span-12 lg:col-span-5"
                    >
                        {/* Languages */}
                        <div className="mb-12">
                            <div className="flex items-center gap-4 mb-8">
                                <SwissTag color="cyan">Languages</SwissTag>
                                <div className="h-px flex-1 bg-[#2a2a2a]" />
                            </div>

                            <div className="space-y-6">
                                {languages.map((lang, i) => (
                                    <motion.div
                                        key={lang.name}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.5 + i * 0.1 }}
                                    >
                                        <div className="flex justify-between mb-2">
                                            <span className="swiss-body font-medium text-white">{lang.name}</span>
                                            <span className="swiss-caption text-[#888]">{lang.level}</span>
                                        </div>
                                        <div className="h-1 bg-[#1a1a1a] overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${lang.percentage}%` }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1, delay: 0.6 + i * 0.1 }}
                                                className="h-full bg-linear-to-r from-[#c6f135] to-[#00f5ff]"
                                            />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Philosophy Card */}
                        <SwissCard bordered className="p-8">
                            <div className="flex items-center gap-4 mb-6">
                                <SwissTag color="lime">Philosophy</SwissTag>
                            </div>
                            <blockquote className="swiss-body-lg text-[#888] italic leading-relaxed">
                                &ldquo;Credo nell&apos;approccio orientato all&apos;ownership e all&apos;affidabilità.
                                Ogni riga di codice deve avere uno scopo, ogni sistema deve essere scalabile,
                                e ogni soluzione deve portare valore reale al business.&rdquo;
                            </blockquote>
                        </SwissCard>

                        {/* Quick Facts Grid */}
                        <div className="grid grid-cols-2 gap-4 mt-8">
                            {[
                                { label: "Focus", value: "AI Integration" },
                                { label: "Approach", value: "Modular Design" },
                                { label: "Strength", value: "Problem Solving" },
                                { label: "Goal", value: "Innovation" },
                            ].map((fact, i) => (
                                <motion.div
                                    key={fact.label}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.7 + i * 0.1 }}
                                    className="p-4 border border-[#2a2a2a] hover:border-[#c6f135]/50 transition-colors group"
                                >
                                    <p className="swiss-overline text-[#666] mb-2">{fact.label}</p>
                                    <p className="swiss-body font-bold text-white group-hover:text-[#c6f135] transition-colors">
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
