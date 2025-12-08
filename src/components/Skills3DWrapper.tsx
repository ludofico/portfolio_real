"use client";

import dynamic from "next/dynamic";

const Skills3DVisualization = dynamic(() => import("./Skills3DVisualization"), {
    ssr: false,
    loading: () => (
        <div className="w-full h-[400px] lg:h-[500px] flex items-center justify-center glass-card">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-2 border-[#c6f135] border-t-transparent rounded-full animate-spin" />
                <span className="swiss-overline text-[#666]">Loading 3D Visualization...</span>
            </div>
        </div>
    ),
});

interface Skills3DWrapperProps {
    skills: Array<{
        name: string;
        category: string;
        level: number;
    }>;
    categoryColors: Record<string, string>;
}

export default function Skills3DWrapper(props: Skills3DWrapperProps) {
    return <Skills3DVisualization {...props} />;
}
