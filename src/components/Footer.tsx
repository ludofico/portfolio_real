"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { siteConfig } from "@/lib/data";
import { ArrowUp, Heart, Linkedin, Github, Mail } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
    const { t } = useLanguage();
    const currentYear = new Date().getFullYear();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const navLinks = [
        { name: t("nav.home"), href: "#home" },
        { name: t("nav.about"), href: "#about" },
        { name: t("nav.experience"), href: "#experience" },
        { name: t("nav.skills"), href: "#skills" },
        { name: t("nav.projects"), href: "#projects" },
        { name: t("nav.contact"), href: "#contact" },
    ];

    return (
        <footer className="relative bg-[#0a0a0a] border-t border-[#2a2a2a]">
            {/* Scroll to Top */}
            <motion.button
                onClick={scrollToTop}
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.9 }}
                className="absolute -top-6 left-1/2 -translate-x-1/2 p-4 bg-[#c6f135] text-black hover:bg-[#00f5ff] transition-colors hoverable"
            >
                <ArrowUp className="w-5 h-5" />
            </motion.button>

            <div className="max-w-7xl mx-auto px-6 pt-20 pb-8">
                {/* ITS 12-column grid */}
                <div className="grid grid-cols-12 gap-6 lg:gap-8 mb-12">
                    {/* Brand - spans 4 columns */}
                    <div className="col-span-12 md:col-span-4">
                        <Link href="#home" className="inline-block mb-4 hoverable">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="text-3xl font-black tracking-tighter"
                            >
                                <span className="text-white">LV</span>
                                <span className="text-[#c6f135]">.</span>
                            </motion.div>
                        </Link>
                        <p className="swiss-body text-[#888] leading-relaxed mb-6 max-w-xs">
                            {t("about.subtitle")}
                        </p>
                        <div className="flex gap-3">
                            <motion.a
                                href={siteConfig.links.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.1, y: -3 }}
                                className="p-3 bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#c6f135] transition-colors hoverable"
                            >
                                <Linkedin className="w-4 h-4 text-[#888] hover:text-[#c6f135]" />
                            </motion.a>
                            <motion.a
                                href={siteConfig.links.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.1, y: -3 }}
                                className="p-3 bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#c6f135] transition-colors hoverable"
                            >
                                <Github className="w-4 h-4 text-[#888] hover:text-[#c6f135]" />
                            </motion.a>
                            <motion.a
                                href={siteConfig.links.email}
                                whileHover={{ scale: 1.1, y: -3 }}
                                className="p-3 bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#c6f135] transition-colors hoverable"
                            >
                                <Mail className="w-4 h-4 text-[#888] hover:text-[#c6f135]" />
                            </motion.a>
                        </div>
                    </div>

                    {/* Quick Links - spans 4 columns */}
                    <div className="col-span-6 md:col-span-4">
                        <h4 className="swiss-overline text-[#c6f135] mb-6">
                            Navigation
                        </h4>
                        <nav className="grid grid-cols-2 gap-3">
                            {navLinks.map((link, idx) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="swiss-body text-[#888] hover:text-white transition-colors link-hover hoverable flex items-center gap-2"
                                >
                                    <span className="text-[10px] text-[#666]">{String(idx + 1).padStart(2, '0')}</span>
                                    {link.name}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Contact - spans 4 columns */}
                    <div className="col-span-6 md:col-span-4">
                        <h4 className="swiss-overline text-[#c6f135] mb-6">
                            Get In Touch
                        </h4>
                        <div className="space-y-4">
                            <div>
                                <p className="swiss-overline text-[#666] mb-1">Email</p>
                                <a
                                    href={`mailto:${siteConfig.email}`}
                                    className="swiss-body text-[#888] hover:text-[#c6f135] transition-colors hoverable"
                                >
                                    {siteConfig.email}
                                </a>
                            </div>
                            <div>
                                <p className="swiss-overline text-[#666] mb-1">Phone</p>
                                <a
                                    href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                                    className="swiss-body text-[#888] hover:text-[#c6f135] transition-colors hoverable"
                                >
                                    {siteConfig.phone}
                                </a>
                            </div>
                            <div>
                                <p className="swiss-overline text-[#666] mb-1">Location</p>
                                <p className="swiss-body text-[#888]">{siteConfig.location}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-[#2a2a2a]">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="swiss-body text-[#888] tabular-nums">
                            © {currentYear} {siteConfig.name}. All rights reserved.
                        </p>
                        <p className="swiss-caption text-[#666] flex items-center gap-2">
                            Built with{" "}
                            <Heart className="w-3 h-3 text-red-500 fill-red-500" /> using
                            Next.js & Tailwind
                        </p>
                    </div>
                </div>
            </div>

            {/* Decorative Line */}
            <div className="h-1 bg-linear-to-r from-[#c6f135] via-[#00f5ff] to-[#ff00ff]" />
        </footer>
    );
}
