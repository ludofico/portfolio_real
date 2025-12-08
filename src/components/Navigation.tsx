"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { siteConfig } from "@/lib/data";
import LanguageToggle from "@/components/LanguageToggle";
import { useLanguage } from "@/context/LanguageContext";

export default function Navigation() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("home");
    const { t } = useLanguage();

    const navItems = [
        { name: t("nav.home"), href: "#home" },
        { name: t("nav.about"), href: "#about" },
        { name: t("nav.experience"), href: "#experience" },
        { name: t("nav.skills"), href: "#skills" },
        { name: t("nav.projects"), href: "#projects" },
        { name: t("nav.contact"), href: "#contact" },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            // Update active section based on scroll position
            const sections = navItems.map((item) => item.href.substring(1));
            for (const section of sections.reverse()) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 150) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            {/* Desktop Navigation */}
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "glass-nav" : ""
                    }`}
            >
                <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="#home" className="group hoverable">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="font-bold text-xl tracking-tighter"
                        >
                            <span className="text-white">LV</span>
                            <span className="text-[#c6f135]">.</span>
                        </motion.div>
                    </Link>

                    {/* Desktop Nav Links */}
                    <div className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`relative text-sm font-medium transition-colors hoverable ${activeSection === item.href.substring(1)
                                    ? "text-[#c6f135]"
                                    : "text-white/70 hover:text-white"
                                    }`}
                            >
                                {item.name}
                                {activeSection === item.href.substring(1) && (
                                    <motion.div
                                        layoutId="activeSection"
                                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#c6f135]"
                                    />
                                )}
                            </Link>
                        ))}
                    </div>

                    {/* Language Toggle + CTA Button */}
                    <div className="hidden md:flex items-center gap-4">
                        <LanguageToggle />
                        <Link
                            href="#contact"
                            className="hoverable"
                        >
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-4 py-2 bg-[#c6f135] text-black font-bold text-sm hover:bg-[#00f5ff] transition-colors"
                            >
                                LET&apos;S TALK
                            </motion.div>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5 hoverable"
                    >
                        <motion.span
                            animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 6 : 0 }}
                            className="w-6 h-0.5 bg-white block"
                        />
                        <motion.span
                            animate={{ opacity: isOpen ? 0 : 1 }}
                            className="w-6 h-0.5 bg-white block"
                        />
                        <motion.span
                            animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -6 : 0 }}
                            className="w-6 h-0.5 bg-white block"
                        />
                    </button>
                </nav>
            </motion.header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40 md:hidden"
                    >
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Menu Content */}
                        <motion.nav
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-[#0a0a0a] border-l border-[#2a2a2a] flex flex-col"
                        >
                            {/* Close button area */}
                            <div className="h-20" />

                            {/* Nav Links */}
                            <div className="flex-1 flex flex-col justify-center px-8 gap-6">
                                {navItems.map((item, i) => (
                                    <motion.div
                                        key={item.name}
                                        initial={{ opacity: 0, x: 50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                    >
                                        <Link
                                            href={item.href}
                                            onClick={() => setIsOpen(false)}
                                            className="block text-4xl font-bold text-white hover:text-[#c6f135] transition-colors hoverable"
                                        >
                                            {item.name}
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Footer */}
                            <div className="px-8 py-8 border-t border-[#2a2a2a]">
                                <p className="text-[#888] text-sm">{siteConfig.email}</p>
                            </div>
                        </motion.nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
