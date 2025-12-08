"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion } from "framer-motion";

interface ASCIITextProps {
    text: string;
    className?: string;
    scrambleChars?: string;
    speed?: number;
    revealDuration?: number;
    delay?: number;
    onComplete?: () => void;
}

const defaultScrambleChars = "!<>-_\\/[]{}—=+*^?#________";

export default function ASCIIText({
    text,
    className = "",
    scrambleChars = defaultScrambleChars,
    speed = 30,
    revealDuration = 80,
    delay = 0,
    onComplete,
}: ASCIITextProps) {
    const [displayText, setDisplayText] = useState("");
    const [isComplete, setIsComplete] = useState(false);
    const frameRef = useRef(0);
    const startTimeRef = useRef<number | null>(null);

    const getRandomChar = useCallback(() => {
        return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
    }, [scrambleChars]);

    useEffect(() => {
        let animationId: number;
        const totalChars = text.length;

        const animate = (timestamp: number) => {
            if (!startTimeRef.current) {
                startTimeRef.current = timestamp + delay;
            }

            const elapsed = timestamp - startTimeRef.current;

            if (elapsed < 0) {
                animationId = requestAnimationFrame(animate);
                return;
            }

            const progress = Math.min(elapsed / (totalChars * revealDuration), 1);
            const revealedChars = Math.floor(progress * totalChars);

            let result = "";
            for (let i = 0; i < totalChars; i++) {
                if (i < revealedChars) {
                    result += text[i];
                } else if (i === revealedChars && progress < 1) {
                    // Scramble effect on current character
                    if (frameRef.current % 2 === 0) {
                        result += getRandomChar();
                    } else {
                        result += text[i];
                    }
                } else {
                    // Upcoming characters show as scrambled
                    result += getRandomChar();
                }
            }

            setDisplayText(result);
            frameRef.current++;

            if (progress >= 1) {
                setDisplayText(text);
                setIsComplete(true);
                onComplete?.();
                return;
            }

            animationId = requestAnimationFrame(animate);
        };

        // Start with scrambled text
        setDisplayText(Array.from({ length: text.length }, () => getRandomChar()).join(""));
        animationId = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animationId);
        };
    }, [text, scrambleChars, speed, revealDuration, delay, getRandomChar, onComplete]);

    return (
        <motion.span
            className={`${className} font-mono`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
        >
            {displayText.split("").map((char, i) => (
                <span
                    key={i}
                    className={`${i < text.length && displayText[i] === text[i] && isComplete
                            ? ""
                            : "text-[#c6f135]"
                        } transition-colors duration-100`}
                    style={{
                        animationDelay: `${i * 20}ms`,
                    }}
                >
                    {char === " " ? "\u00A0" : char}
                </span>
            ))}
        </motion.span>
    );
}

// Glitch effect variant
interface GlitchTextProps {
    text: string;
    className?: string;
    intensity?: number;
}

export function GlitchText({ text, className = "", intensity = 1 }: GlitchTextProps) {
    const [glitchText, setGlitchText] = useState(text);
    const glitchChars = "!@#$%^&*()_+-=[]{}|;:,.<>?/~`";

    useEffect(() => {
        const glitch = () => {
            if (Math.random() > 0.95 * (2 - intensity)) {
                const chars = text.split("");
                const numGlitches = Math.floor(Math.random() * 3 * intensity) + 1;

                for (let i = 0; i < numGlitches; i++) {
                    const idx = Math.floor(Math.random() * chars.length);
                    chars[idx] = glitchChars[Math.floor(Math.random() * glitchChars.length)];
                }

                setGlitchText(chars.join(""));

                setTimeout(() => setGlitchText(text), 50 + Math.random() * 100);
            }
        };

        const interval = setInterval(glitch, 100);
        return () => clearInterval(interval);
    }, [text, intensity]);

    return (
        <span className={`${className} relative inline-block`}>
            <span className="relative z-10">{glitchText}</span>
            {/* Glitch layers */}
            <span
                className="absolute inset-0 text-[#00f5ff] opacity-70 z-0"
                style={{
                    clipPath: "polygon(0 0, 100% 0, 100% 45%, 0 45%)",
                    transform: "translate(-2px, -1px)",
                }}
                aria-hidden
            >
                {glitchText}
            </span>
            <span
                className="absolute inset-0 text-[#ff00ff] opacity-70 z-0"
                style={{
                    clipPath: "polygon(0 55%, 100% 55%, 100% 100%, 0 100%)",
                    transform: "translate(2px, 1px)",
                }}
                aria-hidden
            >
                {glitchText}
            </span>
        </span>
    );
}

// Matrix rain effect
interface MatrixTextProps {
    text: string;
    className?: string;
    color?: string;
}

export function MatrixText({ text, className = "", color = "#c6f135" }: MatrixTextProps) {
    const [displayText, setDisplayText] = useState(text);
    const matrixChars = "ァアィイゥウェエォオカガキギクグケゲコゴサザシジスズセゼソゾタダチヂッツヅテデトドナニヌネノ";

    useEffect(() => {
        const chars = text.split("");
        const revealed = new Array(chars.length).fill(false);
        let frame = 0;

        const animate = () => {
            const newText = chars.map((char, i) => {
                if (revealed[i]) return char;

                // Gradually reveal characters
                if (frame > i * 3 && Math.random() > 0.7) {
                    revealed[i] = true;
                    return char;
                }

                return matrixChars[Math.floor(Math.random() * matrixChars.length)];
            }).join("");

            setDisplayText(newText);
            frame++;

            if (revealed.every(Boolean)) {
                setDisplayText(text);
                return;
            }

            requestAnimationFrame(animate);
        };

        animate();
    }, [text]);

    return (
        <span
            className={`${className} font-mono`}
            style={{ color }}
        >
            {displayText}
        </span>
    );
}

// Typewriter with cursor
interface TypewriterTextProps {
    text: string;
    className?: string;
    speed?: number;
    delay?: number;
    showCursor?: boolean;
}

export function TypewriterText({
    text,
    className = "",
    speed = 50,
    delay = 0,
    showCursor = true
}: TypewriterTextProps) {
    const [displayText, setDisplayText] = useState("");
    const [cursorVisible, setCursorVisible] = useState(true);

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        let charIndex = 0;

        const type = () => {
            if (charIndex < text.length) {
                setDisplayText(text.slice(0, charIndex + 1));
                charIndex++;
                timeout = setTimeout(type, speed);
            }
        };

        timeout = setTimeout(type, delay);

        return () => clearTimeout(timeout);
    }, [text, speed, delay]);

    useEffect(() => {
        if (!showCursor) return;
        const interval = setInterval(() => {
            setCursorVisible(v => !v);
        }, 530);
        return () => clearInterval(interval);
    }, [showCursor]);

    return (
        <span className={className}>
            {displayText}
            {showCursor && (
                <span
                    className={`${cursorVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}
                    style={{ color: '#c6f135' }}
                >
                    |
                </span>
            )}
        </span>
    );
}
