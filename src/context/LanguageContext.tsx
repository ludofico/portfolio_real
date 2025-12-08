"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "en" | "it";

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const translations = {
    en: {
        // Navigation
        "nav.home": "Home",
        "nav.about": "About",
        "nav.experience": "Experience",
        "nav.skills": "Skills",
        "nav.projects": "Projects",
        "nav.contact": "Contact",

        // Hero
        "hero.available": "Available for Work",
        "hero.index": "Index 01",
        "hero.viewProjects": "View Projects",
        "hero.getInTouch": "Get In Touch",
        "hero.location": "Location",
        "hero.year": "Year",
        "hero.yearsExp": "Years Exp",
        "hero.technologies": "Technologies",
        "hero.certifications": "Certifications",
        "hero.passion": "Passion",
        "hero.scroll": "Scroll",
        "hero.description": "Full Stack Developer and Software Architect with a focus on business scalability and AI integration. Specialized in transforming traditional technology stacks into intelligent ecosystems through RAG architectures and advanced automation.",

        // About
        "about.title": "About",
        "about.subtitle": "Crafting intelligent digital solutions with a focus on AI integration and scalable architecture.",
        "about.bio1": "I'm a",
        "about.bio1Role1": "Full-Stack Developer",
        "about.bio1And": "and",
        "about.bio1Role2": "Software Architect",
        "about.bio1End": "with a particular focus on business scalability and AI solution integration.",
        "about.bio2": "My specialization lies in transforming traditional technology stacks (React, Node.js, WordPress) into",
        "about.bio2Highlight": "intelligent ecosystems",
        "about.bio2End": "through RAG architectures and advanced automation.",
        "about.bio3": "Expert in",
        "about.bio3Highlight": "Technical SEO Strategy",
        "about.bio3End": "and SGE (Search Generative Experience) to maximize organic visibility and Core Web Vitals.",
        "about.location": "Location",
        "about.email": "Email",
        "about.phone": "Phone",
        "about.status": "Status",
        "about.openToWork": "Open to Work",
        "about.languages": "Languages",
        "about.philosophy": "Philosophy",
        "about.philosophyQuote": "I believe in an ownership-oriented and reliability-focused approach. Every line of code must have a purpose, every system must be scalable, and every solution must bring real value to the business.",
        "about.focus": "Focus",
        "about.aiIntegration": "AI Integration",
        "about.approach": "Approach",
        "about.modularDesign": "Modular Design",
        "about.strength": "Strength",
        "about.problemSolving": "Problem Solving",
        "about.goal": "Goal",
        "about.innovation": "Innovation",

        // Experience
        "experience.title": "Experience",
        "experience.subtitle": "Professional journey through software development and AI integration.",
        "experience.work": "Work",
        "experience.education": "Education",
        "experience.certifications": "Certifications",
        "experience.makrshakr.description": "Developing full-stack solutions for operational dashboards, landing pages, and internal systems integrated with the MakrShakr robotic ecosystem. Implementing Node.js microservices, MQTT-based orchestrators, and MCP servers for robot-cloud-web interface communication. Designing and developing real-time voice assistants with turn detection, VAD, and agentic AI pipelines. Integrating GraphRAG architectures for knowledge management and intelligent automation.",
        "experience.leoburnett.description": "Full stack development, AI-RAG integrations, SEO/SGE Schema optimizations, and API and cron-job automations.",

        // Skills
        "skills.title": "Skills",
        "skills.subtitle": "A comprehensive toolkit spanning frontend, backend, AI, and DevOps technologies.",
        "skills.filter": "Filter",
        "skills.distribution": "Distribution",
        "skills.3dView": "3D View",
        "skills.gridView": "Grid View",
        "skills.categories": "Categories",

        // Projects
        "projects.title": "Projects",
        "projects.subtitle": "A showcase of projects where I've applied AI integration, full-stack development, and innovative architecture.",
        "projects.view": "View",
        "projects.all": "All",
        "projects.featured": "Featured",
        "projects.viewDetails": "View Details",
        "projects.interested": "Interested in seeing more of my work?",
        "projects.discuss": "Let's Discuss Your Project",
        "projects.voiceai.description": "Real-time voice assistant with turn detection, VAD, and agentic AI pipelines for robotic ecosystem integration.",
        "projects.rag.description": "Enterprise-grade retrieval-augmented generation system for intelligent document search and knowledge management.",
        "projects.mcp.description": "Model Context Protocol servers enabling seamless communication between robots, cloud services, and web interfaces.",
        "projects.seo.description": "Automated SEO optimization tools with SGE-ready schema generation and Core Web Vitals monitoring.",

        // Contact
        "contact.title": "Contact",
        "contact.subtitle": "Have a project in mind or want to discuss opportunities? I'm always open to new challenges and collaborations.",
        "contact.connect": "Connect",
        "contact.available": "Available for New Projects",
        "contact.responseTime": "Response time: Usually within 24 hours",
        "contact.sendMessage": "Send a Message",
        "contact.name": "Name",
        "contact.email": "Email",
        "contact.subject": "Subject",
        "contact.message": "Message",
        "contact.send": "Send Message",
        "contact.sending": "Sending...",
        "contact.sent": "Message Sent!",
        "contact.namePlaceholder": "Your name",
        "contact.emailPlaceholder": "your@email.com",
        "contact.subjectPlaceholder": "Project inquiry, collaboration, etc.",
        "contact.messagePlaceholder": "Tell me about your project or idea...",

        // Footer
        "footer.navigation": "Navigation",
        "footer.getInTouch": "Get In Touch",
        "footer.builtWith": "Built with",
        "footer.using": "using Next.js & Tailwind",
        "footer.rights": "All rights reserved.",

        // Language names
        "lang.italian": "Italian",
        "lang.english": "English",
        "lang.french": "French",
        "lang.native": "Native",
    },
    it: {
        // Navigation
        "nav.home": "Home",
        "nav.about": "Chi Sono",
        "nav.experience": "Esperienza",
        "nav.skills": "Competenze",
        "nav.projects": "Progetti",
        "nav.contact": "Contatti",

        // Hero
        "hero.available": "Disponibile per Lavoro",
        "hero.index": "Indice 01",
        "hero.viewProjects": "Vedi Progetti",
        "hero.getInTouch": "Contattami",
        "hero.location": "Località",
        "hero.year": "Anno",
        "hero.yearsExp": "Anni Exp",
        "hero.technologies": "Tecnologie",
        "hero.certifications": "Certificazioni",
        "hero.passion": "Passione",
        "hero.scroll": "Scorri",
        "hero.description": "Sviluppatore Full Stack e Architetto Software con focus su scalabilità aziendale e integrazione AI. Specializzato nel trasformare stack tecnologici tradizionali in ecosistemi intelligenti tramite architetture RAG e automazione.",

        // About
        "about.title": "Chi Sono",
        "about.subtitle": "Creo soluzioni digitali intelligenti con focus su integrazione AI e architetture scalabili.",
        "about.bio1": "Sono un",
        "about.bio1Role1": "Full-Stack Developer",
        "about.bio1And": "e",
        "about.bio1Role2": "Software Architect",
        "about.bio1End": "con un focus particolare sulla scalabilità aziendale e l'integrazione di soluzioni AI.",
        "about.bio2": "La mia specializzazione consiste nel trasformare stack tecnologici tradizionali (React, Node.js, WordPress) in",
        "about.bio2Highlight": "ecosistemi intelligenti",
        "about.bio2End": "tramite architetture RAG e automazione avanzata.",
        "about.bio3": "Esperto in",
        "about.bio3Highlight": "Strategia SEO Tecnica",
        "about.bio3End": "e SGE (Search Generative Experience) per massimizzare la visibilità organica e i Core Web Vitals.",
        "about.location": "Località",
        "about.email": "Email",
        "about.phone": "Telefono",
        "about.status": "Stato",
        "about.openToWork": "Aperto a Opportunità",
        "about.languages": "Lingue",
        "about.philosophy": "Filosofia",
        "about.philosophyQuote": "Credo nell'approccio orientato all'ownership e all'affidabilità. Ogni riga di codice deve avere uno scopo, ogni sistema deve essere scalabile, e ogni soluzione deve portare valore reale al business.",
        "about.focus": "Focus",
        "about.aiIntegration": "Integrazione AI",
        "about.approach": "Approccio",
        "about.modularDesign": "Design Modulare",
        "about.strength": "Punto di Forza",
        "about.problemSolving": "Problem Solving",
        "about.goal": "Obiettivo",
        "about.innovation": "Innovazione",

        // Experience
        "experience.title": "Esperienza",
        "experience.subtitle": "Percorso professionale attraverso sviluppo software e integrazione AI.",
        "experience.work": "Lavoro",
        "experience.education": "Formazione",
        "experience.certifications": "Certificazioni",
        "experience.makrshakr.description": "Sviluppo soluzioni full-stack per dashboard operative, landing e sistemi interni integrati con l'ecosistema robotico MakrShakr. Implemento microservizi in Node.js, orchestratori basati su MQTT e server MCP per comunicazione tra robot, cloud e interfacce web. Progetto e sviluppo assistenti vocali realtime con turn detection, VAD e pipeline AI agentiche. Integro architetture GraphRAG per knowledge management e automazioni intelligenti.",
        "experience.leoburnett.description": "Sviluppo full stack, integrazioni AI-RAG, ottimizzazioni SEO/Schemi SGE e automazioni via API e cron-job.",

        // Skills
        "skills.title": "Competenze",
        "skills.subtitle": "Un toolkit completo che spazia da frontend, backend, AI e tecnologie DevOps.",
        "skills.filter": "Filtra",
        "skills.distribution": "Distribuzione",
        "skills.3dView": "Vista 3D",
        "skills.gridView": "Vista Griglia",
        "skills.categories": "Categorie",

        // Projects
        "projects.title": "Progetti",
        "projects.subtitle": "Una vetrina di progetti dove ho applicato integrazione AI, sviluppo full-stack e architetture innovative.",
        "projects.view": "Vista",
        "projects.all": "Tutti",
        "projects.featured": "In Evidenza",
        "projects.viewDetails": "Dettagli",
        "projects.interested": "Interessato a vedere altri miei lavori?",
        "projects.discuss": "Discutiamo del Tuo Progetto",
        "projects.voiceai.description": "Assistente vocale real-time con turn detection, VAD e pipeline AI agentiche per integrazione con ecosistema robotico.",
        "projects.rag.description": "Sistema RAG enterprise-grade per ricerca intelligente di documenti e gestione della conoscenza.",
        "projects.mcp.description": "Server Model Context Protocol per comunicazione seamless tra robot, servizi cloud e interfacce web.",
        "projects.seo.description": "Strumenti automatizzati per ottimizzazione SEO con generazione schema SGE-ready e monitoraggio Core Web Vitals.",

        // Contact
        "contact.title": "Contatti",
        "contact.subtitle": "Hai un progetto in mente o vuoi discutere opportunità? Sono sempre aperto a nuove sfide e collaborazioni.",
        "contact.connect": "Connetti",
        "contact.available": "Disponibile per Nuovi Progetti",
        "contact.responseTime": "Tempo di risposta: Solitamente entro 24 ore",
        "contact.sendMessage": "Invia un Messaggio",
        "contact.name": "Nome",
        "contact.email": "Email",
        "contact.subject": "Oggetto",
        "contact.message": "Messaggio",
        "contact.send": "Invia Messaggio",
        "contact.sending": "Invio in corso...",
        "contact.sent": "Messaggio Inviato!",
        "contact.namePlaceholder": "Il tuo nome",
        "contact.emailPlaceholder": "tua@email.com",
        "contact.subjectPlaceholder": "Richiesta progetto, collaborazione, ecc.",
        "contact.messagePlaceholder": "Raccontami del tuo progetto o idea...",

        // Footer
        "footer.navigation": "Navigazione",
        "footer.getInTouch": "Contattami",
        "footer.builtWith": "Realizzato con",
        "footer.using": "usando Next.js & Tailwind",
        "footer.rights": "Tutti i diritti riservati.",

        // Language names
        "lang.italian": "Italiano",
        "lang.english": "Inglese",
        "lang.french": "Francese",
        "lang.native": "Madrelingua",
    },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>("en");

    // Load saved language preference
    useEffect(() => {
        const savedLang = localStorage.getItem("portfolio-language") as Language;
        if (savedLang && (savedLang === "en" || savedLang === "it")) {
            setLanguage(savedLang);
        }
    }, []);

    // Save language preference
    const handleSetLanguage = (lang: Language) => {
        setLanguage(lang);
        localStorage.setItem("portfolio-language", lang);
    };

    // Translation function
    const t = (key: string): string => {
        return translations[language][key as keyof typeof translations.en] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
