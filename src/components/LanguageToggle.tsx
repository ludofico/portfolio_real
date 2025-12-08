"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Globe } from "lucide-react";

export default function LanguageToggle() {
    const { language, setLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);

    const languages = [
        { code: "en", label: "English", flag: "🇬🇧" },
        { code: "it", label: "Italiano", flag: "🇮🇹" },
    ] as const;

    const currentLang = languages.find((l) => l.code === language);

    return (
        <div className="relative">
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-3 py-2 glass-card hoverable"
            >
                <Globe className="w-4 h-4 text-[#c6f135]" />
                <span className="text-sm font-medium uppercase tracking-wider">
                    {currentLang?.code}
                </span>
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 z-40"
                        />

                        {/* Dropdown */}
                        <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.15 }}
                            className="absolute top-full right-0 mt-2 z-50 glass-card overflow-hidden min-w-[140px]"
                        >
                            {languages.map((lang) => (
                                <motion.button
                                    key={lang.code}
                                    onClick={() => {
                                        setLanguage(lang.code);
                                        setIsOpen(false);
                                    }}
                                    whileHover={{ backgroundColor: "rgba(185, 251, 42, 0.1)" }}
                                    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${language === lang.code
                                            ? "text-[#c6f135] bg-[#c6f135]/5"
                                            : "text-white hover:text-[#c6f135]"
                                        }`}
                                >
                                    <span className="text-lg">{lang.flag}</span>
                                    <span className="text-sm font-medium">{lang.label}</span>
                                    {language === lang.code && (
                                        <motion.div
                                            layoutId="activeLang"
                                            className="ml-auto w-1.5 h-1.5 rounded-full bg-[#c6f135]"
                                        />
                                    )}
                                </motion.button>
                            ))}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
