"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    return (
        <>
            {/* Top progress bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-[2px] bg-[var(--accent-lime)] origin-left z-[100]"
                style={{ scaleX }}
            />

            {/* Side progress indicator */}
            <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center gap-2">
                <motion.div
                    className="w-[2px] h-32 bg-[var(--border)] relative overflow-hidden"
                    style={{ opacity: 0.5 }}
                >
                    <motion.div
                        className="absolute top-0 left-0 w-full bg-[var(--accent-lime)]"
                        style={{ height: scrollYProgress.get() * 100 + "%", scaleY: scrollYProgress }}
                    />
                </motion.div>
                <motion.span
                    className="text-xs font-mono text-[var(--muted-foreground)] writing-mode-vertical"
                    style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
                >
                    SCROLL
                </motion.span>
            </div>
        </>
    );
}
