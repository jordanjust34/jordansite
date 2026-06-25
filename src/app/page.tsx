"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence } from "framer-motion";
import { technologies, type Technology } from "@/components/technologies";
import TechDetail, { EmptyState } from "@/components/TechDetail";

// ─── Sub-components ───────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="flex flex-col items-center gap-4">
      <h1 className="text-7xl mb-3 font-semibold bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
        Hello World!
      </h1>

      {/* Gradient-bordered intro card */}
      <div className="mt-3 max-w-md rounded-3xl py-0.5 px-0.5 bg-linear-to-br from-primary to-accent">
        <div className="rounded-[calc(1.5rem-1px)] bg-white p-3">
          <p>This is my website built with React + Tailwind + Next.js.</p>
        </div>
      </div>

      {/* Easter egg diary entries — intentionally invisible */}
      <p className="opacity-0">10/12/02: They watch me... at school, at work, at home.</p>
      <p>I feel like something should go here but I&apos;m not sure what. Besides that, this is my own personal website for whatever I please.</p>
      <p className="opacity-0">07/23/01: It was Joseph&apos;s funeral today. I went but I wasn&apos;t there. His mother wasn&apos;t there. Just like me...</p>
      <p className="opacity-0 text-primary">This is where you&apos;re meant to be. Please, don&apos;t leave me again...</p>
    </section>
  );
}

interface TechBubbleProps {
  tech: Technology;
  isActive: boolean;
  onClick: () => void;
}

function TechBubble({ tech, isActive, onClick }: TechBubbleProps) {
  return (
    <button
      onClick={onClick}
      aria-label={`View details for ${tech.name}`}
      aria-pressed={isActive}
      className={`
        mt-2.5 mb-2.5 relative w-24 h-24 rounded-full overflow-hidden
        flex items-center justify-center
        transition-all duration-300
        ${isActive
          ? "ring-4 ring-primary shadow-lg scale-110"
          : "ring-2 ring-gray-300 hover:ring-primary hover:shadow-md"
        }
      `}
    >
      <Image
        src={tech.icon}
        alt={tech.name}
        sizes="96px"
        fill
        className="object-contain p-2"
      />
    </button>
  );
}

interface TechSectionProps {
  activeTech: number;
  onSelect: (index: number) => void;
  onClose: () => void;
}

function TechSection({ activeTech, onSelect, onClose }: TechSectionProps) {
  const techNames = technologies.map((t) => t.name);

  return (
    <section className="flex flex-col gap-4">
      <h2 className="font-bold text-3xl text-center bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
        Technologies Unlocked!
      </h2>

      {/* Detail panel (left) + icon list (right) */}
      <div className="flex flex-row gap-8 w-full">
        <div className="w-14/20 py-8">
          <AnimatePresence mode="wait">
            {activeTech !== -1 ? (
              <TechDetail
                key={technologies[activeTech].id}
                tech={technologies[activeTech]}
                onClose={onClose}
              />
            ) : (
              <EmptyState key="empty" techNames={techNames} />
            )}
          </AnimatePresence>
        </div>

        <div className="w-7/20 py-8 flex flex-col items-start justify-start ml-5">
          <div className="flex flex-col space-y-4">
            {technologies.map((tech, index) => (
              <TechBubble
                key={tech.id}
                tech={tech}
                isActive={index === activeTech}
                onClick={() => onSelect(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const [activeTech, setActiveTech] = useState(-1);

  return (
    <div className="flex flex-col flex-1 items-center justify-start font-sans text-center bg-background">
      <main className="flex flex-col items-center gap-10 pt-10 w-13/20">
        <HeroSection />
        <TechSection
          activeTech={activeTech}
          onSelect={setActiveTech}
          onClose={() => setActiveTech(-1)}
        />
      </main>
    </div>
  );
}
