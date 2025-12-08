export const siteConfig = {
    name: "Ludovico Valenzano",
    title: "Full-Stack AI Engineer",
    headline: "Building intelligent systems at the intersection of AI & robotics",
    tagline: "From RAG architectures to voice AI assistants",
    description:
        "Sviluppatore Full Stack e Architetto Software con focus su scalabilità aziendale e integrazione AI. Specializzato nel trasformare stack tecnologici tradizionali in ecosistemi intelligenti tramite architetture RAG e automazione.",
    shortBio: "Full-Stack AI Engineer @MakrShakr. Passionate about voice AI, GraphRAG, and building the future of human-robot interaction.",
    email: "ludovicovalenzano@gmail.com",
    phone: "+39 339 6569492",
    location: "Turin, Italy",
    links: {
        linkedin: "https://www.linkedin.com/in/ludovico-valenzano-693348315/",
        github: "https://github.com/ludofico",
        email: "mailto:ludovicovalenzano@gmail.com",
    },
    // Additional LinkedIn-style info
    openToWork: true,
    currentFocus: ["Voice AI", "GraphRAG", "Robotics Integration", "MCP Servers"],
    interests: ["AI Engineering", "Real-time Systems", "Human-Robot Interaction", "Knowledge Graphs"],
};

export const experiences = [
    {
        id: 1,
        company: "MakrShakr",
        role: "Full-Stack AI Engineer",
        location: "Turin, Italy",
        period: "Sep 2025 - Present",
        description: `Sviluppo soluzioni full-stack per dashboard operative, landing e sistemi interni integrati con l'ecosistema robotico MakrShakr. Implemento microservizi in Node.js, orchestratori basati su MQTT e server MCP per comunicazione tra robot, cloud e interfacce web. Progetto e sviluppo assistenti vocali realtime con turn detection, VAD e pipeline AI agentiche. Integro architetture GraphRAG per knowledge management e automazioni intelligenti.`,
        highlights: [
            "Microservizi Node.js",
            "MQTT Orchestration",
            "Voice AI Assistants",
            "GraphRAG Architecture",
            "MCP Servers",
        ],
        color: "lime",
    },
    {
        id: 2,
        company: "Leo Burnett Company S.r.l",
        role: "Web Developer",
        location: "Italy",
        period: "Feb 2025 - Jun 2025",
        description:
            "Sviluppo full stack, integrazioni AI-RAG, ottimizzazioni SEO/Schemi SGE e automazioni via API e cron-job.",
        highlights: [
            "Full Stack Development",
            "AI-RAG Integration",
            "SEO/SGE Optimization",
            "API Automation",
        ],
        color: "cyan",
    },
];

export const education = [
    {
        id: 1,
        institution: "ITS ICT Piemonte – Torino",
        degree: "Diploma Tecnico Superiore",
        field: "Web Development",
        period: "2023 - 2025",
    },
    {
        id: 2,
        institution: "IIS M. Buniva – Pinerolo (TO)",
        degree: "Diploma",
        field: "Informatica e Telecomunicazioni",
        period: "2019 - 2023",
    },
];

export const skills = {
    "Full Stack Development": {
        color: "lime",
        items: [
            "JavaScript",
            "Node.js",
            "TypeScript",
            "HTML",
            "CSS",
            "Three.js",
            "Framer",
            "Lottie",
            "ACF",
            "GSAP",
            "Lenis.js",
            "SCSS",
            "PHP",
            "SQL",
            "NoSQL",
            "React",
            "Next.js",
            "Laravel",
            "Angular",
            "CodeIgniter",
            "WordPress",
            "Docker",
            "Tailwind",
            "Git",
        ],
    },
    "AI & Machine Learning": {
        color: "cyan",
        items: [
            "RAG Architectures",
            "Python",
            "TensorFlow.js",
            "HuggingFace",
            "LangChain.js",
            "Pinecone",
            "Ollama",
            "XGBoost",
            "TF-IDF",
            "Clustering",
            "Mastra.js",
            "scikit-learn",
            "Transformers.js",
        ],
    },
    "SEO & Marketing Tech": {
        color: "magenta",
        items: [
            "SEO",
            "SEM",
            "SEA",
            "SGE Optimization",
            "Google Analytics",
            "Search Console",
            "Lighthouse",
        ],
    },
    Cybersecurity: {
        color: "orange",
        items: ["Kali Linux", "BlackArch", "Wireshark", "BurpSuite", "Virtual Machines"],
    },
    "Tools & Methodologies": {
        color: "lime",
        items: [
            "Agile",
            "CI/CD",
            "",
            "Jira",
            "Figma",
            "UX/UI Design"
        ],
    },
};

export const certifications = [
    {
        id: 1,
        name: "Building Trustworthy AI Enterprise Solutions",
        issuer: "IBM",
        link: "https://www.credly.com/badges/64bd5700-b3bb-4327-af47-995bfcf0e1e1/linked_in_profile",
        image: "https://images.credly.com/size/340x340/images/7d768f62-91a8-4503-a065-21ad7f22da0e/image.png",
        color: "#052fab",
    },
    {
        id: 2,
        name: "AI for Engineers",
        issuer: "Publicis Groupe",
        image: "/certifications/publicis-ai.svg",
        color: "#f80000",
    },
    {
        id: 3,
        name: "AI for Project Management",
        issuer: "Pendo",
        image: "/certifications/pendo-ai.svg",
        color: "#ff4081",
    },
    {
        id: 4,
        name: "AWS Emerging Talent",
        issuer: "AWS",
        image: "https://images.credly.com/size/340x340/images/9358115e-ead7-47c2-91e2-165b6a650a1b/image.png",
        color: "#ff9900",
    },
    {
        id: 5,
        name: "ISO 9001:2015 Quality Systems Management Standard",
        issuer: "HSE-Q",
        image: "/certifications/iso-9001.svg",
        color: "#1a73e8",
    },
];

export const languages = [
    { name: "Italiano", level: "Madrelingua", percentage: 100 },
    { name: "Inglese", level: "C1", percentage: 85 },
    { name: "Francese", level: "A1", percentage: 25 },
];

export const projects = [
    {
        id: 1,
        title: "Voice AI Pipeline",
        description:
            "Real-time voice assistant with turn detection, VAD, and agentic AI pipelines for robotic ecosystem integration.",
        tags: ["Node.js", "MQTT", "Voice AI", "GraphRAG"],
        color: "lime",
        featured: true,
    },
    {
        id: 2,
        title: "RAG-Powered Search",
        description:
            "Enterprise-grade retrieval-augmented generation system for intelligent document search and knowledge management.",
        tags: ["LangChain", "Pinecone", "Next.js", "Python"],
        color: "cyan",
        featured: true,
    },
    {
        id: 3,
        title: "MCP Server Infrastructure",
        description:
            "Model Context Protocol servers enabling seamless communication between robots, cloud services, and web interfaces.",
        tags: ["MCP", "Node.js", "WebSocket", "Docker"],
        color: "magenta",
        featured: true,
    },
    {
        id: 4,
        title: "SEO Automation Suite",
        description:
            "Automated SEO optimization tools with SGE-ready schema generation and Core Web Vitals monitoring.",
        tags: ["SEO", "API", "Automation", "Analytics"],
        color: "orange",
        featured: false,
    },
];
