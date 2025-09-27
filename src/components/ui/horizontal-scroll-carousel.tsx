import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";

export const HorizontalScrollCarousel = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-gradient-to-br from-black/80 via-black/60 to-black/80">
      {/* Section Heading */}
      <div className="absolute top-20 left-12 z-30">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white font-clash leading-tight tracking-wide drop-shadow-lg transform scale-x-110">
          The Features
        </h2>
      </div>
      
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-10">
          {cards.map((card) => {
            return <Card card={card} key={card.id} />;
          })}
        </motion.div>
      </div>
    </section>
  );
};

interface CardData {
  id: number;
  kicker: string;
  title: string;
  subline: string;
  bullets: string[];
  proof: string;
  cta: string;
}

const Card = ({ card }: { card: CardData }) => {
  return (
    <motion.div
      key={card.id}
      className="group relative min-h-[22rem] w-[28rem] overflow-hidden rounded-[18px] border border-white/8 bg-gradient-to-br from-[#1A1A1A] via-[#1F1F1F] to-[#1A1A1A] p-8 lg:p-10 shadow-[0_8px_24px_rgba(0,0,0,0.25)] transition-all duration-300 hover:shadow-[0_12px_32px_rgba(0,0,0,0.35)] hover:border-white/15 hover:-translate-y-1"
      style={{
        background: `
          linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.02) 50%, transparent 100%),
          repeating-linear-gradient(0deg, transparent 0px, transparent 22px, rgba(255,255,255,0.03) 22px, rgba(255,255,255,0.03) 24px),
          radial-gradient(400px 150px at 30% 25%, rgba(255,255,255,0.08), transparent),
          linear-gradient(135deg, #1A1A1A 0%, #1F1F1F 55%, #1A1A1A 100%)
        `
      }}
    >
      <div className="relative z-10 flex flex-col h-full space-y-6">
        {/* Micro-label */}
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-white/40"></div>
          <span className="text-[9px] tracking-[0.2em] text-white/45 font-clash font-medium uppercase">
            {card.kicker}
          </span>
        </div>

        {/* Headline */}
        <h3 className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] leading-tight font-clash text-white">
          {card.title}
        </h3>

        {/* One-line subhead */}
        <p className="text-sm text-white/70 font-clash font-light leading-relaxed">
          {card.subline}
        </p>

        {/* Body / bullets */}
        <div className="space-y-3 flex-1">
          {card.bullets.map((bullet, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="w-4 h-px bg-white/30 mt-2 flex-shrink-0"></div>
              <p className="text-sm leading-relaxed text-white/75 font-clash font-light">{bullet}</p>
            </div>
          ))}
        </div>

        {/* Divider line */}
        <div className="w-full h-px bg-white/8" />

        {/* Proof / stat line */}
        <div className="text-xs text-white/50 font-clash font-light">
          {card.proof}
        </div>

        {/* Micro-CTA */}
        <motion.a
          href="#"
          className="text-xs text-white/60 font-clash font-medium underline underline-offset-2 self-end hover:text-white/80 transition-colors duration-200"
          whileHover={{ x: 2 }}
        >
          {card.cta} →
        </motion.a>
      </div>
    </motion.div>
  );
};

const cards = [
  {
    "id": 1,
    "kicker": "PRECEDENT ENGINE",
    "title": "Semantic Precedent Search",
    "subline": "Find the right case language in seconds, not days.",
    "bullets": [
      "Contextual retrieval across decades of filings & rulings.",
      "One-click quote insertion into active drafts.",
      "Risk flags for overlapping regulatory obligations."
    ],
    "proof": "95% of cited passages sourced with provenance",
    "cta": "Try a precedent query"
  },
  {
    "id": 2,
    "kicker": "REG MAPPING",
    "title": "Cross-Regulation Compliance Mapping",
    "subline": "See NEPA, CWA, CAA, ESA, NHPA obligations in one view.",
    "bullets": [
      "Auto-mapping of triggers, thresholds, dependencies.",
      "Gap analysis with \"what's missing\" checklist.",
      "Exportable matrix for reviewers and counsel."
    ],
    "proof": "Zero-to-matrix in under 60 seconds",
    "cta": "Open compliance matrix"
  },
  {
    "id": 3,
    "kicker": "AUTO DRAFT",
    "title": "Automated EA/EIS Drafting",
    "subline": "Generate compliant environmental assessments in hours, not months.",
    "bullets": [
      "AI-powered section generation with regulatory compliance.",
      "Real-time citation validation and formatting.",
      "Collaborative editing with version control."
    ],
    "proof": "80% faster than traditional drafting",
    "cta": "Start EA draft"
  },
  {
    "id": 4,
    "kicker": "COMMENT AI",
    "title": "Public Comment Summarization & Response",
    "subline": "Process thousands of comments with intelligent categorization and response generation.",
    "bullets": [
      "Automated sentiment analysis and theme extraction.",
      "Response templates with legal precedent integration.",
      "Stakeholder communication tracking and reporting."
    ],
    "proof": "Process 10,000+ comments in under 2 hours",
    "cta": "Analyze comments"
  },
  {
    "id": 5,
    "kicker": "AUDIT TRAIL",
    "title": "Audit-Ready Transparency",
    "subline": "Complete documentation trail for every decision and recommendation.",
    "bullets": [
      "Immutable audit logs with cryptographic verification.",
      "Decision rationale tracking with source attribution.",
      "Compliance reporting with regulatory standards."
    ],
    "proof": "100% audit trail compliance",
    "cta": "View audit logs"
  },
  {
    "id": 6,
    "kicker": "DEPLOYMENT",
    "title": "Deployment Flexibility",
    "subline": "Cloud, on-premise, or hybrid deployment options for any security requirement.",
    "bullets": [
      "Multi-cloud support with data sovereignty controls.",
      "On-premise installation with air-gapped capabilities.",
      "Hybrid workflows with seamless data synchronization."
    ],
    "proof": "Deploy anywhere in under 24 hours",
    "cta": "Choose deployment"
  }
];