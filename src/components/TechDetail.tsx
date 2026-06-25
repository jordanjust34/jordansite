import React from "react";
import { motion } from "framer-motion";
import { type Technology, getTechGradient } from "@/components/technologies";

// ─── Types ────────────────────────────────────────────────────────────────────

interface TechDetailProps {
  tech: Technology;
  onClose: () => void;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function CloseButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label="Close detail panel"
      className="
        absolute top-4 right-4 z-20
        p-2 text-2xl rounded-full
        bg-white/80 backdrop-blur-md border border-slate-200
        opacity-60 hover:opacity-100 transition-opacity cursor-pointer
      "
    >
      ✕
    </button>
  );
}

function CompetencyTag({ label }: { label: string }) {
  return (
    <span className="px-4 py-2 rounded-2xl text-sm font-medium bg-slate-50 border border-slate-200 text-slate-800 shadow-sm">
      {label}
    </span>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function TechDetail({ tech, onClose }: TechDetailProps) {
  const gradient = getTechGradient(tech.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -8 }}
      className="
        group relative w-full max-w-3xl mx-auto
        rounded-[2rem] bg-white border border-white/20
        shadow-xl p-1
        transition-all duration-300 ease-out
        hover:shadow-[0_50px_80px_-20px_rgba(0,0,0,0.3)]
      "
    >
      {/* Glow layer */}
      <div
        className={`
          absolute -inset-[4px] rounded-[2rem] blur
          bg-linear-to-r ${gradient}
          opacity-30 group-hover:opacity-60 transition duration-1000
        `}
      />

      {/* Card body */}
      <div className="relative rounded-[1.75rem] bg-white/50 border border-white/10 px-8 py-8">
        <CloseButton onClick={onClose} />

        <div className="flex flex-col items-center text-center gap-6">
          {/* Header */}
          <div className="space-y-3">
            <h2
              className={`
                text-4xl md:text-5xl font-black
                bg-clip-text text-transparent bg-linear-to-r ${gradient}
              `}
            >
              {tech.name}
            </h2>
            <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-[0.2em] border border-slate-200">
              Deployed
            </span>
          </div>

          {/* Description */}
          <p className="text-slate-800 text-base md:text-lg leading-relaxed max-w-2xl">
            {tech.desc}
          </p>

          {/* Competencies + Link */}
          <div className="w-full grid gap-6 lg:grid-cols-[1.4fr_0.6fr] items-start">
            <div className="space-y-4">
              <h4 className="font-semibold text-sm uppercase tracking-[0.25em] text-slate-600">
                Core Competencies
              </h4>
              <div className="flex flex-wrap gap-3">
                {tech.det.map((label) => (
                  <CompetencyTag key={label} label={label} />
                ))}
              </div>
            </div>

            <div className="flex items-center justify-center">
              <a
                href={tech.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`
                  inline-flex items-center justify-center gap-2
                  px-6 py-3 rounded-full
                  bg-linear-to-r ${gradient} text-white
                  text-sm font-bold shadow-lg
                  hover:scale-105 transition-transform
                `}
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
