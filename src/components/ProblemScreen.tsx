'use client';

import { motion } from 'framer-motion';
import { 
  DollarSign, 
  FileText, 
  Trash2, 
  RotateCcw, 
  TrendingDown, 
  UserMinus, 
  Gavel, 
  Layers, 
  Hourglass, 
  Calendar, 
  PenTool, 
  GitBranch, 
  Sparkles, 
  Eye, 
  UserCheck, 
  Building2 
} from 'lucide-react';

export function ProblemScreen() {
  return (
    <section className="relative min-h-screen">
      
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
      </motion.div>

      {/* 4-card grid layout */}
      <motion.div 
        className="mx-auto max-w-7xl px-6 lg:px-10 mt-16 grid grid-cols-1 lg:grid-cols-2 gap-6 pb-24"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, ease: "easeOut", delay: 1.6 }}
      >
        {/* Card 1 - Consulting Is the Product */}
        <ProblemCard
          title="Consulting Is the Product"
          body={[
            { text: "$100B+ spend", icon: DollarSign },
            { text: "Document-heavy workflows", icon: FileText },
            { text: "Billions wasted", icon: Trash2 },
            { text: "Predictable but not automated", icon: RotateCcw }
          ]}
          benefit="Consultants profit from complexity—we eliminate it with AI automation."
          proof="Consulting Firms Sell Repetition. We Sell Automation."
        />
        
        {/* Card 2 - Capacity Collapse */}
        <ProblemCard
          title="Less Money. Fewer People. Same Deadlines."
          body={[
            { text: "–54% budget cut", icon: TrendingDown },
            { text: "–23% staff reduction", icon: UserMinus },
            { text: "Enforcement collapse", icon: Gavel },
            { text: "States inherit backlog", icon: Layers }
          ]}
          benefit="Resource constraints create systemic bottlenecks—AI multiplies capacity without adding headcount."
          proof="Capacity collapse creates systemic delays across environmental review."
        />
        
        {/* Card 3 - Structural Delay */}
        <ProblemCard
          title="Automate or Accumulate Delay."
          body={[
            { text: "6–12 month EA delays", icon: Hourglass },
            { text: "4+ year EIS delays", icon: Calendar },
            { text: "Manual reviews don't scale", icon: PenTool },
            { text: "Compounding pipeline delays", icon: GitBranch }
          ]}
          benefit="Manual processes create exponential delays—automation breaks the bottleneck cycle."
          proof="Structural delays compound across the entire regulatory pipeline."
        />
        
        {/* Card 4 - Solution */}
        <ProblemCard
          title="AI With Audit Trails = Faster, Cheaper, Defensible."
          body={[
            { text: "LLM-powered automation", icon: Sparkles },
            { text: "Transparent outputs", icon: Eye },
            { text: "Human-in-the-loop", icon: UserCheck },
            { text: "OMB AI mandate alignment", icon: Building2 }
          ]}
          benefit="AI delivers speed without sacrificing accountability—every output is traceable and defensible."
          proof="Automation advantage delivers compliance that meets federal mandates."
        />
      </motion.div>
    </section>
  );
}

function ProblemCard({
  title, body, proof, benefit, className = ""
}: { title: string; body: Array<{ text: string; icon: React.ComponentType<{ className?: string }> }>; proof: string; benefit: string; className?: string }) {
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
        `,
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        textRendering: 'optimizeLegibility',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden'
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
        <h3 className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] leading-tight font-clash text-white" style={{ WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale' }}>
          {title}
        </h3>
        
        {/* One-line subhead */}
        <p className="text-base text-white/70 font-clash font-light leading-relaxed" style={{ WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale' }}>
          {benefit}
        </p>
        
        {/* Body / bullets */}
        <div className="space-y-3 flex-1">
          {body.map((b, i) => {
            const IconComponent = b.icon;
            return (
              <div key={i} className="flex items-start gap-3">
                <IconComponent className="w-4 h-4 text-white/15 mt-1 flex-shrink-0" />
                <p className="text-base leading-relaxed text-white/75 font-clash font-light" style={{ WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale' }}>{b.text}</p>
              </div>
            );
          })}
        </div>
        
        {/* Divider line */}
        <div className="w-full h-px bg-white/4" />
        
        {/* Proof / stat line */}
        <div className="text-sm text-white/50 font-clash font-light">
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
