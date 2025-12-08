"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { siteConfig } from "@/lib/data";
import {
    Mail,
    Phone,
    MapPin,
    Linkedin,
    Github,
    Send,
    ArrowUpRight,
    CheckCircle,
} from "lucide-react";
import { SwissContainer, SwissTag, SwissCard } from "@/components/SwissGrid";
import { useLanguage } from "@/context/LanguageContext";

export default function Contact() {
    const { t } = useLanguage();
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setIsSubmitted(true);

        // Reset after showing success
        setTimeout(() => {
            setIsSubmitted(false);
            setFormState({ name: "", email: "", subject: "", message: "" });
        }, 3000);
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormState((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const contactInfo = [
        {
            icon: Mail,
            label: t("contact.email"),
            value: siteConfig.email,
            href: `mailto:${siteConfig.email}`,
            color: "#c6f135",
        },
        {
            icon: Phone,
            label: t("contact.phone"),
            value: siteConfig.phone,
            href: `tel:${siteConfig.phone.replace(/\s/g, "")}`,
            color: "#00f5ff",
        },
        {
            icon: MapPin,
            label: t("contact.location"),
            value: siteConfig.location,
            href: null,
            color: "#ff00ff",
        },
    ];

    const socialLinks = [
        {
            icon: Linkedin,
            label: "LinkedIn",
            href: siteConfig.links.linkedin,
            color: "#0077b5",
        },
        {
            icon: Github,
            label: "GitHub",
            href: siteConfig.links.github,
            color: "#ffffff",
        },
    ];

    return (
        <section id="contact" className="swiss-section relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-linear-to-b from-[#0a0a0a] via-[#0f0f0f] to-[#0a0a0a]" />
            <div className="absolute inset-0 swiss-grid opacity-10" />

            {/* Floating accent */}
            <motion.div
                animate={{
                    y: [0, -30, 0],
                    opacity: [0.1, 0.2, 0.1],
                }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute top-20 right-20 w-64 h-64 rounded-full bg-[#c6f135]/10 blur-3xl"
            />

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
                        <span className="section-number">05</span>
                    </div>
                    <div className="col-span-12 lg:col-span-10">
                        <div className="flex items-center gap-6 mb-6">
                            <h2 className="swiss-headline">Contact</h2>
                            <div className="h-px flex-1 bg-[#2a2a2a]" />
                        </div>
                        <p className="swiss-body-lg text-[#888] max-w-2xl">
                            Have a project in mind or want to discuss opportunities? I&apos;m always open
                            to new challenges and collaborations.
                        </p>
                    </div>
                </motion.div>

                {/* Main Grid */}
                <div className="grid grid-cols-12 gap-6 lg:gap-8">
                    {/* Left Column - Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="col-span-12 lg:col-span-5"
                    >
                        {/* Contact Cards */}
                        <div className="space-y-4 mb-12">
                            {contactInfo.map((item, i) => (
                                <motion.div
                                    key={item.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3 + i * 0.1 }}
                                >
                                    {item.href ? (
                                        <a
                                            href={item.href}
                                            className="group flex items-center gap-4 p-5 bg-[#1a1a1a] border border-[#2a2a2a] hover:border-opacity-100 transition-all hoverable"
                                            style={{ "--hover-color": item.color } as React.CSSProperties}
                                        >
                                            <div
                                                className="p-3 transition-colors"
                                                style={{ backgroundColor: `${item.color}15` }}
                                            >
                                                <item.icon className="w-5 h-5" style={{ color: item.color }} />
                                            </div>
                                            <div className="flex-1">
                                                <p className="swiss-overline text-[#666] mb-1">{item.label}</p>
                                                <p className="swiss-body font-medium text-white group-hover:text-white transition-colors">
                                                    {item.value}
                                                </p>
                                            </div>
                                            <ArrowUpRight
                                                className="w-4 h-4 text-[#888] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                                                style={{ color: item.color }}
                                            />
                                        </a>
                                    ) : (
                                        <div className="flex items-center gap-4 p-5 bg-[#1a1a1a] border border-[#2a2a2a]">
                                            <div className="p-3" style={{ backgroundColor: `${item.color}15` }}>
                                                <item.icon className="w-5 h-5" style={{ color: item.color }} />
                                            </div>
                                            <div>
                                                <p className="swiss-overline text-[#666] mb-1">{item.label}</p>
                                                <p className="swiss-body font-medium text-white">{item.value}</p>
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </div>

                        {/* Social Links */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <SwissTag color="lime">Connect</SwissTag>
                                <div className="h-px flex-1 bg-[#2a2a2a]" />
                            </div>
                            <div className="flex gap-4">
                                {socialLinks.map((social) => (
                                    <motion.a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.05, y: -4 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="p-4 bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#888] transition-colors hoverable"
                                    >
                                        <social.icon className="w-5 h-5" style={{ color: social.color }} />
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>

                        {/* Availability Status */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.6 }}
                            className="mt-12"
                        >
                            <SwissCard bordered className="p-6 border-l-[#c6f135]">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c6f135] opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#c6f135]"></span>
                                    </span>
                                    <span className="swiss-body font-bold text-[#c6f135]">
                                        Available for New Projects
                                    </span>
                                </div>
                                <p className="swiss-caption text-[#666] lowercase">
                                    Response time: Usually within 24 hours
                                </p>
                            </SwissCard>
                        </motion.div>
                    </motion.div>

                    {/* Right Column - Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="col-span-12 lg:col-span-7"
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <SwissTag color="cyan">Send a Message</SwissTag>
                            <div className="h-px flex-1 bg-[#2a2a2a]" />
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Name & Email */}
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block swiss-overline text-[#666] mb-3">
                                        Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formState.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-4 bg-[#1a1a1a] border border-[#2a2a2a] text-white swiss-body placeholder-[#666] focus:border-[#c6f135] focus:outline-none transition-colors"
                                        placeholder="Your name"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block swiss-overline text-[#666] mb-3">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formState.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-4 bg-[#1a1a1a] border border-[#2a2a2a] text-white swiss-body placeholder-[#666] focus:border-[#c6f135] focus:outline-none transition-colors"
                                        placeholder="your@email.com"
                                    />
                                </div>
                            </div>

                            {/* Subject */}
                            <div>
                                <label htmlFor="subject" className="block swiss-overline text-[#666] mb-3">
                                    Subject *
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formState.subject}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-4 bg-[#1a1a1a] border border-[#2a2a2a] text-white swiss-body placeholder-[#666] focus:border-[#c6f135] focus:outline-none transition-colors"
                                    placeholder="Project inquiry, collaboration, etc."
                                />
                            </div>

                            {/* Message */}
                            <div>
                                <label htmlFor="message" className="block swiss-overline text-[#666] mb-3">
                                    Message *
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formState.message}
                                    onChange={handleChange}
                                    required
                                    rows={6}
                                    className="w-full px-4 py-4 bg-[#1a1a1a] border border-[#2a2a2a] text-white swiss-body placeholder-[#666] focus:border-[#c6f135] focus:outline-none transition-colors resize-none"
                                    placeholder="Tell me about your project or idea..."
                                />
                            </div>

                            {/* Submit Button */}
                            <motion.button
                                type="submit"
                                disabled={isSubmitting || isSubmitted}
                                whileHover={{ scale: isSubmitting || isSubmitted ? 1 : 1.02 }}
                                whileTap={{ scale: isSubmitting || isSubmitted ? 1 : 0.98 }}
                                className={`w-full py-4 swiss-overline flex items-center justify-center gap-3 transition-all hoverable ${isSubmitted
                                    ? "bg-green-500 text-white"
                                    : "bg-[#c6f135] text-black hover:bg-[#00f5ff]"
                                    } disabled:opacity-70`}
                            >
                                {isSubmitting ? (
                                    <>
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                            className="w-4 h-4 border-2 border-black border-t-transparent rounded-full"
                                        />
                                        Sending...
                                    </>
                                ) : isSubmitted ? (
                                    <>
                                        <CheckCircle className="w-4 h-4" />
                                        Message Sent!
                                    </>
                                ) : (
                                    <>
                                        Send Message
                                        <Send className="w-4 h-4" />
                                    </>
                                )}
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </SwissContainer>
        </section>
    );
}
