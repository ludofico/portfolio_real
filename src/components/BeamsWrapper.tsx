"use client";

import dynamic from "next/dynamic";

const Beams = dynamic(() => import("./Beams"), {
    ssr: false,
    loading: () => null,
});

interface BeamsWrapperProps {
    beamWidth?: number;
    beamHeight?: number;
    beamNumber?: number;
    lightColor?: string;
    speed?: number;
    noiseIntensity?: number;
    scale?: number;
    rotation?: number;
}

export default function BeamsWrapper(props: BeamsWrapperProps) {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none">
            <Beams {...props} />
        </div>
    );
}
