import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { type Technology, getTechGradient } from "@/components/technologies";

// ─── Types ────────────────────────────────────────────────────────────────────

interface TechDetailProps {
  tech: Technology;
  onClose: () => void;
}

// ─── Empty State ──────────────────────────────────────────────────────────────

interface EmptyStateProps {
  techNames: string[];
}

export function EmptyState({ techNames }: EmptyStateProps) {
  return (
    <motion.div
      key="empty"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="h-full flex flex-col items-center justify-center gap-4 text-center px-8 py-10"
    >
      {/* Dashed icon ring */}
      <div className="w-16 h-16 rounded-full border-2 border-dashed border-white/20 flex items-center justify-center text-white/30 text-3xl">
        ✦
      </div>

      <div className="space-y-1">
        <p className="text-text font-medium">Pick something to inspect</p>
        <p className="text-sm text-text/50 max-w-[220px] leading-relaxed">
          Each bubble is a tech I&apos;ve shipped something with. Tap one.
        </p>
      </div>

      {/* Dynamic pill hints */}
      <div className="flex flex-wrap justify-center gap-2 mt-1">
        {techNames.map((name) => (
          <span
            key={name}
            className="text-xs text-text/40 bg-white/5 border border-white/10 rounded-full px-3 py-1"
          >
            {name} →
          </span>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function CloseButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label="Close detail panel"
      className="
        absolute top-4 right-4 z-20
        w-7 h-7 rounded-full flex items-center justify-center
        bg-white/10 border border-white/10 text-sm text-white/40
        hover:text-white/80 hover:bg-white/15 transition-colors cursor-pointer
      "
    >
      ✕
    </button>
  );
}

function LinkButton({
  href,
  external = false,
  children,
}: {
  href: string;
  external?: boolean;
  children: React.ReactNode;
}) {
  const className = `
    flex-1 flex items-center justify-center gap-2
    px-4 py-2.5 rounded-xl text-sm font-medium
    bg-white/5 border border-white/10 text-text/70
    hover:bg-white/10 hover:text-text hover:border-white/20
    transition-all duration-200
  `;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function TechDetail({ tech, onClose }: TechDetailProps) {
  const gradient = getTechGradient(tech.id);
  // Derive a short display hostname from the link (e.g. "react.dev")
  const hostname = new URL(tech.link).hostname.replace(/^www\./, "");

  return (
    <motion.div
      key={tech.id}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="
        group relative w-full mx-auto
        rounded-3xl bg-white/5 backdrop-blur-md
        border border-white/10 overflow-hidden
      "
    >
      {/* Subtle gradient glow along the top edge */}
      <div className={`absolute inset-x-0 top-0 h-px bg-linear-to-r ${gradient} opacity-60`} />

      <CloseButton onClick={onClose} />

      {/* Header — centered name + icon */}
      <div className="flex flex-col items-center text-center gap-3 pt-10 pb-6 px-8 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="relative w-8 h-8 flex-shrink-0">
            <Image
              src={tech.icon}
              alt={tech.name}
              fill
              sizes="32px"
              className="object-contain"
            />
          </div>
          <h2 className={`text-2xl font-semibold bg-linear-to-r ${gradient} bg-clip-text text-transparent`}>
            {tech.name}
          </h2>
        </div>

        <p className="text-sm text-text/60 leading-relaxed max-w-xs">
          {tech.desc}
        </p>
      </div>

      {/* Footer — two link buttons */}
      <div className="flex flex-row gap-2 px-6 py-5">
        <LinkButton href={tech.link} external>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="opacity-50" aria-hidden="true">
            <path d="M2 12L12 2M12 2H6M12 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {hostname}
        </LinkButton>

        <LinkButton href={tech.projectsLink}>
          Projects
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="opacity-50" aria-hidden="true">
            <path d="M2 7H12M12 7L8 3M12 7L8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </LinkButton>
      </div>
    </motion.div>
  );
}
