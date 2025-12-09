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
        <footer className="relative bg-[#0a0a0a] border-t border-[#2a2a2a] overflow-hidden">
            {/* Scroll to Top */}
            <motion.button
                onClick={scrollToTop}
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.9 }}
                className="absolute -top-6 left-1/2 -translate-x-1/2 p-3 sm:p-4 bg-[#c6f135] text-black hover:bg-[#00f5ff] transition-colors hoverable"
            >
                <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.button>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 sm:pt-20 pb-6 sm:pb-8">
                {/* ITS 12-column grid */}
                <div className="grid grid-cols-12 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
                    {/* Brand - spans full on mobile, 4 columns on desktop */}
                    <div className="col-span-12 md:col-span-4">
                        <Link href="#home" className="inline-block mb-3 sm:mb-4 hoverable">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="text-2xl sm:text-3xl font-black tracking-tighter"
                            >
                                <span className="text-white">LV</span>
                                <span className="text-[#c6f135]">.</span>
                            </motion.div>
                        </Link>
                        <p className="swiss-body text-[#888] leading-relaxed mb-4 sm:mb-6 max-w-xs text-sm sm:text-base">
                            {t("about.subtitle")}
                        </p>
                        <div className="flex gap-2 sm:gap-3">
                            <motion.a
                                href={siteConfig.links.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.1, y: -3 }}
                                className="p-2.5 sm:p-3 bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#c6f135] transition-colors hoverable"
                            >
                                <Linkedin className="w-4 h-4 text-[#888] hover:text-[#c6f135]" />
                            </motion.a>
                            <motion.a
                                href={siteConfig.links.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.1, y: -3 }}
                                className="p-2.5 sm:p-3 bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#c6f135] transition-colors hoverable"
                            >
                                <Github className="w-4 h-4 text-[#888] hover:text-[#c6f135]" />
                            </motion.a>
                            <motion.a
                                href={siteConfig.links.email}
                                whileHover={{ scale: 1.1, y: -3 }}
                                className="p-2.5 sm:p-3 bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#c6f135] transition-colors hoverable"
                            >
                                <Mail className="w-4 h-4 text-[#888] hover:text-[#c6f135]" />
                            </motion.a>
                        </div>
                    </div>

                    {/* Quick Links - spans 6 columns on mobile */}
                    <div className="col-span-6 md:col-span-4 mt-6 md:mt-0">
                        <h4 className="swiss-overline text-[#c6f135] mb-4 sm:mb-6 text-[10px] sm:text-xs">
                            Navigation
                        </h4>
                        <nav className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                            {navLinks.map((link, idx) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="swiss-body text-[#888] hover:text-white transition-colors link-hover hoverable flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm"
                                >
                                    <span className="text-[8px] sm:text-[10px] text-[#666]">{String(idx + 1).padStart(2, '0')}</span>
                                    {link.name}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Contact - spans 6 columns on mobile */}
                    <div className="col-span-6 md:col-span-4 mt-6 md:mt-0">
                        <h4 className="swiss-overline text-[#c6f135] mb-4 sm:mb-6 text-[10px] sm:text-xs">
                            Get In Touch
                        </h4>
                        <div className="space-y-3 sm:space-y-4">
                            <div>
                                <p className="swiss-overline text-[#666] mb-1 text-[8px] sm:text-[10px]">Email</p>
                                <a
                                    href={`mailto:${siteConfig.email}`}
                                    className="swiss-body text-[#888] hover:text-[#c6f135] transition-colors hoverable text-[10px] sm:text-sm break-all"
                                >
                                    {siteConfig.email}
                                </a>
                            </div>
                            <div>
                                <p className="swiss-overline text-[#666] mb-1 text-[8px] sm:text-[10px]">Phone</p>
                                <a
                                    href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                                    className="swiss-body text-[#888] hover:text-[#c6f135] transition-colors hoverable text-xs sm:text-sm"
                                >
                                    {siteConfig.phone}
                                </a>
                            </div>
                            <div>
                                <p className="swiss-overline text-[#666] mb-1 text-[8px] sm:text-[10px]">Location</p>
                                <p className="swiss-body text-[#888] text-xs sm:text-sm">{siteConfig.location}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-6 sm:pt-8 border-t border-[#2a2a2a]">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
                        <p className="swiss-body text-[#888] tabular-nums text-[10px] sm:text-sm text-center sm:text-left">
                            © {currentYear} {siteConfig.name}. All rights reserved.
                        </p>
                        <p className="swiss-caption text-[#666] flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs">
                            Built with{" "}
                            <Heart className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-red-500 fill-red-500" /> using
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
