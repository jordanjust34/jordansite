import React from "react";
import { motion } from "framer-motion";

interface Tech {
  id: string;
  name: string;
  desc: string;
  icon: string | React.ReactNode;
  det: string[];
  link: string;
}

interface TechDetailProps {
  tech: Tech | null;
  onClose: () => void;
}

const TECH_COLORS: Record<string, string> = {
   react: "from-primary to-accent",
   nextjs: "from-primary to-accent",
};

export default function TechDetail({ tech, onClose }: TechDetailProps) {
  if (!tech) {
    return (
      <div className="h-full flex items-center justify-center text-gray-700 bg-white/80 backdrop-blur-2xl rounded-3xl border border-white/20">
        <p className="text-center max-w-md p-6">
          Click on a technology to see its full details and showcase it in all glory! ✨
        </p>
      </div>
    );
  }

  const colorClass = TECH_COLORS[tech.id] || "from-primary to-secondary";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -8 }}
      className="relative w-full max-w-3xl mx-auto rounded-[2rem] bg-gradient-to-br from-primary via-accent to-fuchsia-400 shadow-xl p-1 transition-all duration-300 ease-out hover:shadow-[0_50px_80px_-20px_rgba(0,0,0,0.4)] hover:from-amber-300 hover:via-orange-300 hover:to-fuchsia-500"
      >
      <div className="relative rounded-[1.75rem] bg-[var(--color-background)] border border-white/10 px-8 py-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl opacity-60 hover:opacity-100 transition-opacity cursor-pointer z-20 p-2 bg-white/80 backdrop-blur-md rounded-full border border-slate-200"
        >
          ✕
        </button>

        <div className="flex flex-col items-center text-center gap-6">
        <div className="space-y-3">
          <h2 className={`text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-linear-to-r ${colorClass}`}>
            {tech.name}
          </h2>
          <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-[0.2em] border border-slate-200">
            Deployed
          </span>
        </div>

        <p className="text-slate-800 text-base md:text-lg leading-relaxed max-w-2xl">
          {tech.desc}
        </p>

        <div className="w-full grid gap-6 lg:grid-cols-[1.4fr_0.6fr] items-start">
          <div className="space-y-4">
            <h4 className="font-semibold text-sm uppercase tracking-[0.25em] text-slate-600">
              Core Competencies
            </h4>
            <div className="flex flex-wrap gap-3">
              {tech.det.map((detail, index) => (
                <span
                  key={index}
                  className="px-4 py-2 rounded-2xl text-sm font-medium bg-slate-50 border border-slate-200 text-slate-800 shadow-sm"
                >
                  {detail}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center">
            <a
              href={tech.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center justify-center gap-2 px-6 py-3 bg-linear-to-r ${colorClass} text-white rounded-full text-sm font-bold shadow-lg hover:scale-105 transition-transform`}
            >
              Explore Ecosystem →
            </a>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
  );
}