'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export function ProblemScreen() {
  return (
    <section className="relative min-h-screen">
      {/* Smooth black background fade-in */}
      <motion.div 
        className="absolute inset-0 bg-[#0A0A0B]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
      
      {/* THE PROBLEM text - follows marquee expansion from top */}
      <motion.div
        className="absolute top-8 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.8, 
          ease: "easeOut",
          delay: 0.3 // Starts shortly after marquee begins expanding
        }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white font-clash tracking-[0.1em] whitespace-nowrap">
          THE PROBLEM
        </h1>
      </motion.div>
      
      {/* Parallax content with delayed entrance */}
      <motion.div 
        className="relative z-10 text-white"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 1.0, 
          ease: "easeOut",
          delay: 1.4 // Delayed until after black transition completes
        }}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-10 pt-32 pb-10">
        {/* Masthead */}
        <motion.h2 
          className="text-6xl md:text-8xl font-semibold tracking-[-0.01em] font-clash"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Bury Bureaucracy. Work Easier.
        </motion.h2>
        
        {/* Hairline rule */}
        <div className="mt-4 h-px bg-white/10" />
        
        {/* Dek paragraph */}
        <motion.p 
          className="mt-6 max-w-3xl text-lg leading-relaxed text-white/80 font-clash font-light"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          Environmental compliance isn&apos;t slow by law—it&apos;s slow by habit. We replace consulting-heavy
          paperwork with AI-native workflows.
        </motion.p>
        
        {/* Marquee subtext */}
        <motion.p 
          className="mt-4 max-w-3xl text-base text-white/70 italic font-clash font-light"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
        >
          $100B to consultants. Reviews measured in years. Budgets slashed, staff reduced—yet expectations rise.
        </motion.p>
      </div>

      {/* Square layout card grid */}
      <motion.div 
        className="mx-auto max-w-7xl px-6 lg:px-10 mt-16 grid grid-cols-1 lg:grid-cols-2 gap-6 pb-24"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, ease: "easeOut", delay: 1.6 }}
      >
        {/* Top rectangle - spans full width */}
        <div className="lg:col-span-2">
          <motion.article
            className={[
              "relative overflow-hidden rounded-[18px] border border-white/8",
              "bg-gradient-to-br from-[#1A1A1A] via-[#1F1F1F] to-[#1A1A1A]",
              "p-8 lg:p-10 transition-all duration-300",
              "shadow-[0_8px_24px_rgba(0,0,0,0.25)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.35)]",
              "hover:border-white/15 hover:-translate-y-1"
            ].join(" ")}
            style={{
              background: `
                linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.02) 50%, transparent 100%),
                repeating-linear-gradient(0deg, transparent 0px, transparent 22px, rgba(255,255,255,0.03) 22px, rgba(255,255,255,0.03) 24px),
                radial-gradient(400px 150px at 30% 25%, rgba(255,255,255,0.08), transparent),
                linear-gradient(135deg, #1A1A1A 0%, #1F1F1F 55%, #1A1A1A 100%)
              `
            }}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative z-10 flex flex-col lg:flex-row h-full space-y-6 lg:space-y-0 lg:space-x-8">
              {/* Left content */}
              <div className="flex-1 flex flex-col space-y-6">
                {/* Micro-label */}
                <div className="text-[9px] tracking-[0.2em] text-white/45 font-clash font-medium uppercase">
                  PROBLEM
                </div>
                
                {/* Headline */}
                <h3 className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] leading-tight font-clash text-white">
                  Consulting Is the Product
                </h3>
                
                {/* One-line subhead */}
                <p className="text-sm text-white/70 font-clash font-light leading-relaxed">
                  Clear benefit statement or punchline.
                </p>
                
                {/* Body / bullets */}
                <div className="space-y-3 flex-1">
                  <div className="flex items-start gap-3">
                    <div className="w-4 h-px bg-white/30 mt-2 flex-shrink-0"></div>
                    <p className="text-sm leading-relaxed text-white/75 font-clash font-light">
                      Billions go to repetitive drafting, comment collation, and precedent hunting.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-4 h-px bg-white/30 mt-2 flex-shrink-0"></div>
                    <p className="text-sm leading-relaxed text-white/75 font-clash font-light">
                      The process is predictable—just not automated.
                    </p>
                  </div>
                </div>
                
                {/* Divider line */}
                <div className="w-full h-px bg-white/8" />
                
                {/* Proof / stat line */}
                <div className="text-xs text-white/50 font-clash font-light">
                  $100B+ annual gov consulting; largest share is document workflows.
                </div>
                
                {/* Micro-CTA */}
                <motion.a
                  href="#"
                  className="text-xs text-white/60 font-clash font-medium underline underline-offset-2 self-start hover:text-white/80 transition-colors duration-200"
                  whileHover={{ x: 2 }}
                >
                  Learn more →
                </motion.a>
              </div>

              {/* Watermark stats - behind content */}
              <div className="absolute inset-0 pointer-events-none">
                <CyclingStats />
              </div>
            </div>
          </motion.article>
        </div>

        {/* Bottom left square */}
        <ProblemCard
          title="Less Money. Fewer People. Same Deadlines."
          body={[
            "–54% budget / –23% staff; scrutiny up, capacity down.",
            "Manual reviews cannot scale under current constraints."
          ]}
          proof="EPA cuts collapse in-house capacity; states & tribes inherit the backlog."
        />

        {/* Bottom right square */}
        <ProblemCard
          title="Automate or Accumulate Delay"
          body={[
            "AI with audit trails delivers faster, cheaper, defensible outputs.",
            "Agencies keep control with human-in-the-loop review."
          ]}
          proof="LLM workflows cut weeks to minutes for high-volume tasks."
        />
      </motion.div>
      </motion.div>
    </section>
  );
}

const CyclingStats = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const stats = [
    {
      number: "$100B",
      label: "ANNUAL CONSULTING SPEND"
    },
    {
      number: "54%",
      label: "BUDGET REDUCTION"
    },
    {
      number: "23%",
      label: "STAFF REDUCTION"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % stats.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [stats.length]);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -30, scale: 1.05 }}
        transition={{ 
          duration: 0.8, 
          ease: [0.25, 0.46, 0.45, 0.94] // Custom easing curve for flipbook feel
        }}
        className="absolute inset-0 flex flex-col items-center justify-center"
      >
        {/* Watermark stat - oversized design object */}
        <div 
          className="text-[200px] md:text-[240px] font-bold text-white font-clash leading-none"
          style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.1) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '-0.02em', // Tighter kerning for fashion mag energy
            opacity: 0.12
          }}
        >
          {stats[currentIndex].number}
        </div>
        
        {/* Editorial label - positioned above */}
        <div 
          className="absolute top-8 text-sm font-light text-white/40 font-clash uppercase tracking-[0.3em]"
          style={{ letterSpacing: '0.3em' }}
        >
          {stats[currentIndex].label}
        </div>
      </motion.div>
    </div>
  );
};

function ProblemCard({
  title, body, proof, className = ""
}: { title: string; body: string[]; proof: string; className?: string }) {
  return (
    <motion.article
      className={[
        "relative overflow-hidden rounded-[18px] border border-white/8",
        "bg-gradient-to-br from-[#1A1A1A] via-[#1F1F1F] to-[#1A1A1A]",
        "p-8 lg:p-10 transition-all duration-300",
        "shadow-[0_8px_24px_rgba(0,0,0,0.25)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.35)]",
        "hover:border-white/15 hover:-translate-y-1",
        className
      ].join(" ")}
      style={{
        background: `
          linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.02) 50%, transparent 100%),
          repeating-linear-gradient(0deg, transparent 0px, transparent 22px, rgba(255,255,255,0.03) 22px, rgba(255,255,255,0.03) 24px),
          radial-gradient(400px 150px at 30% 25%, rgba(255,255,255,0.08), transparent),
          linear-gradient(135deg, #1A1A1A 0%, #1F1F1F 55%, #1A1A1A 100%)
        `
      }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative z-10 flex flex-col h-full space-y-6">
        {/* Micro-label */}
        <div className="text-[9px] tracking-[0.2em] text-white/45 font-clash font-medium uppercase">
          PROBLEM
        </div>
        
        {/* Headline */}
        <h3 className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] leading-tight font-clash text-white">
          {title}
        </h3>
        
        {/* One-line subhead */}
        <p className="text-sm text-white/70 font-clash font-light leading-relaxed">
          Clear benefit statement or punchline.
        </p>
        
        {/* Body / bullets */}
        <div className="space-y-3 flex-1">
          {body.map((b, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-4 h-px bg-white/30 mt-2 flex-shrink-0"></div>
              <p className="text-sm leading-relaxed text-white/75 font-clash font-light">{b}</p>
            </div>
          ))}
        </div>
        
        {/* Divider line */}
        <div className="w-full h-px bg-white/8" />
        
        {/* Proof / stat line */}
        <div className="text-xs text-white/50 font-clash font-light">
          {proof}
        </div>
        
        {/* Micro-CTA */}
        <motion.a
          href="#"
          className="text-xs text-white/60 font-clash font-medium underline underline-offset-2 self-end hover:text-white/80 transition-colors duration-200"
          whileHover={{ x: 2 }}
        >
          Learn more →
        </motion.a>
      </div>
    </motion.article>
  );
}
