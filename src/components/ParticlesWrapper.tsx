"use client";

import dynamic from "next/dynamic";

const Particles = dynamic(() => import("./Particles"), {
    ssr: false,
    loading: () => null,
});

interface ParticlesWrapperProps {
    particleCount?: number;
    particleSpread?: number;
    speed?: number;
    particleColors?: string[];
    moveParticlesOnHover?: boolean;
    particleHoverFactor?: number;
    alphaParticles?: boolean;
    particleBaseSize?: number;
    sizeRandomness?: number;
    cameraDistance?: number;
    disableRotation?: boolean;
    pixelRatio?: number;
}

export default function ParticlesWrapper(props: ParticlesWrapperProps) {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none">
            <Particles {...props} />
        </div>
    );
}
