"use client";

import dynamic from "next/dynamic";

const GeometricBackground = dynamic(
    () => import("@/components/GeometricBackground"),
    { ssr: false }
);

export default function GeometricBackgroundWrapper() {
    return <GeometricBackground />;
}
