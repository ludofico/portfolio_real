"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";

// Types
type ColSpan = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type ColStart = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

interface SwissContainerProps {
    children: ReactNode;
    className?: string;
    as?: "div" | "section" | "article" | "main" | "header" | "footer";
}

interface SwissGridProps {
    children: ReactNode;
    columns?: 4 | 6 | 12;
    gap?: "sm" | "md" | "lg" | "xl";
    className?: string;
}

interface SwissColProps extends Omit<HTMLMotionProps<"div">, "children"> {
    children: ReactNode;
    span?: ColSpan;
    spanMd?: ColSpan;
    spanLg?: ColSpan;
    start?: ColStart;
    startMd?: ColStart;
    startLg?: ColStart;
    className?: string;
}

interface SwissSectionProps {
    children: ReactNode;
    id?: string;
    number?: string;
    title?: string;
    subtitle?: string;
    className?: string;
    dark?: boolean;
}

interface SwissDividerProps {
    variant?: "default" | "accent" | "thick";
    className?: string;
}

// Swiss Container - Max width with proper margins
export function SwissContainer({
    children,
    className = "",
    as: Tag = "div"
}: SwissContainerProps) {
    return (
        <Tag className={`swiss-container ${className}`}>
            {children}
        </Tag>
    );
}

// Swiss Grid - 12-column grid system
export function SwissGrid({
    children,
    columns = 12,
    gap = "md",
    className = ""
}: SwissGridProps) {
    const gapClasses = {
        sm: "gap-4",
        md: "gap-6",
        lg: "gap-8",
        xl: "gap-12"
    };

    return (
        <div
            className={`grid grid-cols-4 md:grid-cols-${columns === 4 ? 4 : 6} lg:grid-cols-${columns} ${gapClasses[gap]} ${className}`}
        >
            {children}
        </div>
    );
}

// Swiss Column - Grid item with responsive spans
export function SwissCol({
    children,
    span = 12,
    spanMd,
    spanLg,
    start,
    startMd,
    startLg,
    className = "",
    ...motionProps
}: SwissColProps) {
    const spanClass = `col-span-${span}`;
    const spanMdClass = spanMd ? `md:col-span-${spanMd}` : "";
    const spanLgClass = spanLg ? `lg:col-span-${spanLg}` : "";
    const startClass = start ? `col-start-${start}` : "";
    const startMdClass = startMd ? `md:col-start-${startMd}` : "";
    const startLgClass = startLg ? `lg:col-start-${startLg}` : "";

    return (
        <motion.div
            className={`${spanClass} ${spanMdClass} ${spanLgClass} ${startClass} ${startMdClass} ${startLgClass} ${className}`}
            {...motionProps}
        >
            {children}
        </motion.div>
    );
}

// Swiss Section - Full section with header
export function SwissSection({
    children,
    id,
    number,
    title,
    subtitle,
    className = "",
    dark = false
}: SwissSectionProps) {
    return (
        <section
            id={id}
            className={`swiss-section relative ${dark ? "bg-[#0f0f0f]" : ""} ${className}`}
        >
            <SwissContainer>
                {(number || title) && (
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-16 lg:mb-24"
                    >
                        <SwissGrid columns={12}>
                            {number && (
                                <SwissCol span={12} spanLg={2} className="mb-4 lg:mb-0">
                                    <span className="section-number">{number}</span>
                                </SwissCol>
                            )}
                            <SwissCol span={12} spanLg={number ? 10 : 12}>
                                {title && (
                                    <h2 className="swiss-headline mb-4">
                                        {title}
                                    </h2>
                                )}
                                {subtitle && (
                                    <p className="swiss-body-lg text-[#888] max-w-2xl">
                                        {subtitle}
                                    </p>
                                )}
                            </SwissCol>
                        </SwissGrid>
                    </motion.div>
                )}
                {children}
            </SwissContainer>
        </section>
    );
}

// Swiss Divider
export function SwissDivider({
    variant = "default",
    className = ""
}: SwissDividerProps) {
    const variantClasses = {
        default: "swiss-divider",
        accent: "swiss-divider-accent",
        thick: "swiss-divider-thick"
    };

    return <div className={`${variantClasses[variant]} ${className}`} />;
}

// Swiss Number (Large outline numbers for sections)
export function SwissNumber({
    children,
    className = ""
}: {
    children: ReactNode;
    className?: string;
}) {
    return (
        <span className={`swiss-number ${className}`}>
            {children}
        </span>
    );
}

// Swiss Tag/Label
export function SwissTag({
    children,
    color = "lime",
    className = ""
}: {
    children: ReactNode;
    color?: "lime" | "cyan" | "magenta" | "orange";
    className?: string;
}) {
    const colorMap = {
        lime: "bg-[#c6f135]/10 text-[#c6f135] border-[#c6f135]/20",
        cyan: "bg-[#00f5ff]/10 text-[#00f5ff] border-[#00f5ff]/20",
        magenta: "bg-[#ff00ff]/10 text-[#ff00ff] border-[#ff00ff]/20",
        orange: "bg-[#ff6b35]/10 text-[#ff6b35] border-[#ff6b35]/20",
    };

    return (
        <span className={`swiss-tag ${colorMap[color]} ${className}`}>
            {children}
        </span>
    );
}

// Swiss Card
export function SwissCard({
    children,
    bordered = false,
    className = "",
    ...motionProps
}: {
    children: ReactNode;
    bordered?: boolean;
    className?: string;
} & Omit<HTMLMotionProps<"div">, "children">) {
    return (
        <motion.div
            className={`swiss-card ${bordered ? "swiss-card-bordered" : ""} ${className}`}
            {...motionProps}
        >
            {children}
        </motion.div>
    );
}

// Swiss Button
export function SwissButton({
    children,
    variant = "primary",
    className = "",
    ...props
}: {
    children: ReactNode;
    variant?: "primary" | "outline";
    className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
    const variantClass = variant === "primary" ? "swiss-btn-primary" : "swiss-btn-outline";

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`swiss-btn ${variantClass} hoverable ${className}`}
            {...props}
        >
            {children}
        </motion.button>
    );
}
