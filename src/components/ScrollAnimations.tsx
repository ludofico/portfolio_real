"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ScrollSectionProps {
    children: React.ReactNode;
    className?: string;
}

export function ScrollSection({ children, className = "" }: ScrollSectionProps) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);

    return (
        <motion.div
            ref={ref}
            style={{ opacity, y }}
            className={`relative ${className}`}
        >
            {children}
        </motion.div>
    );
}

export function ParallaxElement({
    children,
    speed = 0.5,
    className = "",
}: {
    children: React.ReactNode;
    speed?: number;
    className?: string;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], [-100 * speed, 100 * speed]);

    return (
        <motion.div ref={ref} style={{ y }} className={className}>
            {children}
        </motion.div>
    );
}

export function RevealOnScroll({
    children,
    direction = "up",
    delay = 0,
    className = "",
}: {
    children: React.ReactNode;
    direction?: "up" | "down" | "left" | "right";
    delay?: number;
    className?: string;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "center center"],
    });

    const directionMap = {
        up: { initial: { y: 80, opacity: 0 }, animate: { y: 0, opacity: 1 } },
        down: { initial: { y: -80, opacity: 0 }, animate: { y: 0, opacity: 1 } },
        left: { initial: { x: 80, opacity: 0 }, animate: { x: 0, opacity: 1 } },
        right: { initial: { x: -80, opacity: 0 }, animate: { x: 0, opacity: 1 } },
    };

    const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

    return (
        <motion.div
            ref={ref}
            initial={directionMap[direction].initial}
            whileInView={directionMap[direction].animate}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ opacity }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export function TextReveal({ text, className = "" }: { text: string; className?: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const words = text.split(" ");

    return (
        <div ref={ref} className={`flex flex-wrap gap-x-2 ${className}`}>
            {words.map((word, i) => {
                const start = i / words.length;
                const end = start + 1 / words.length;

                return (
                    <Word key={i} progress={scrollYProgress} range={[start, end]}>
                        {word}
                    </Word>
                );
            })}
        </div>
    );
}

function Word({
    children,
    progress,
    range,
}: {
    children: string;
    progress: ReturnType<typeof useScroll>["scrollYProgress"];
    range: [number, number];
}) {
    const opacity = useTransform(progress, range, [0.2, 1]);
    const y = useTransform(progress, range, [20, 0]);

    return (
        <motion.span style={{ opacity, y }} className="inline-block">
            {children}
        </motion.span>
    );
}

export function StaggerContainer({
    children,
    className = "",
    staggerDelay = 0.1,
}: {
    children: React.ReactNode;
    className?: string;
    staggerDelay?: number;
}) {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
                visible: {
                    transition: {
                        staggerChildren: staggerDelay,
                    },
                },
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export function StaggerItem({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
