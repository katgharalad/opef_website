import { motion, useTransform, useScroll } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { 
  Search, 
  Archive, 
  Quote, 
  TriangleAlert, 
  Shield, 
  Network, 
  MapPin, 
  CheckSquare, 
  Table, 
  Zap, 
  FileText, 
  Sparkles, 
  Link, 
  Users, 
  Gauge, 
  Inbox, 
  Smile, 
  Reply, 
  UserCheck, 
  Rocket, 
  FolderOpen, 
  Lock, 
  ClipboardList, 
  BarChart3, 
  Award, 
  Cloud, 
  Globe, 
  Shield as ShieldIcon, 
  RefreshCw 
} from "lucide-react";

// Text component for the new message
const PlatformMessage = () => {
  const [typewriterText, setTypewriterText] = useState("");
  const [isVisible] = useState(true);
  const currentIndexRef = useRef(0);
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);
  const isVisibleRef = useRef(true);

  const fullText = "One platform. Every step. Zero wasted motion.";

  useEffect(() => {
    isVisibleRef.current = isVisible;
  }, [isVisible]);

  useEffect(() => {
    const typeText = () => {
      if (!isVisibleRef.current) {
        if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);
        setTypewriterText("");
        currentIndexRef.current = 0;
        return;
      }
      
      if (currentIndexRef.current <= fullText.length) {
        setTypewriterText(fullText.slice(0, currentIndexRef.current));
        currentIndexRef.current++;
        timeoutIdRef.current = setTimeout(typeText, 60);
      } else {
        // Wait 3 seconds after typing is complete
        timeoutIdRef.current = setTimeout(() => {
          if (!isVisibleRef.current) {
            if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);
            setTypewriterText("");
            currentIndexRef.current = 0;
            return;
          }
          // Clear text quickly
          setTypewriterText("");
          currentIndexRef.current = 0;
          // Wait 500ms before starting again
          timeoutIdRef.current = setTimeout(typeText, 500);
        }, 3000);
      }
    };

    // Start typing immediately
    const startTyping = setTimeout(() => {
      if (isVisibleRef.current) {
        typeText();
      }
    }, 500);
    
    return () => {
      clearTimeout(startTyping);
      if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);
    };
  }, [isVisible]);

  return (
    <div className="flex items-center justify-center min-h-[22rem] w-[28rem] pt-8">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-white font-clash leading-tight tracking-wide text-center whitespace-nowrap">
        {typewriterText}
        <span className="text-white/60 text-lg font-normal animate-pulse" style={{ fontWeight: '100', width: '0.1em' }}>|</span>
      </h1>
    </div>
  );
};

export const HorizontalScrollCarousel = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-70%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-gradient-to-br from-black/80 via-black/60 to-black/80">
      {/* Section Heading */}
      <div className="absolute top-20 left-12 z-30">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white font-clash leading-tight tracking-wide drop-shadow-lg transform scale-x-110">
          The Features
        </h2>
      </div>
      
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-10 pt-30">
          {cards.map((card) => {
            return <Card card={card} key={card.id} />;
          })}
          {/* Platform Message - positioned further right to eliminate overlap */}
          <div className="ml-[20rem]">
            <PlatformMessage />
          </div>
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
  bullets: Array<{ text: string; icon: React.ComponentType<{ className?: string }> }>;
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
        `,
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        textRendering: 'optimizeLegibility',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden'
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
        <h3 className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] leading-tight font-clash text-white" style={{ WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale' }}>
          {card.title}
        </h3>

        {/* One-line subhead */}
        <p className="text-base text-white/70 font-clash font-light leading-relaxed" style={{ WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale' }}>
          {card.subline}
        </p>

        {/* Body / bullets */}
        <div className="space-y-3 flex-1">
          {card.bullets.map((bullet, index) => {
            const IconComponent = bullet.icon;
            return (
              <div key={index} className="flex items-start gap-3">
                <IconComponent className="w-4 h-4 text-white/15 mt-1 flex-shrink-0" />
                <p className="text-base leading-relaxed text-white/75 font-clash font-light" style={{ WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale' }}>{bullet.text}</p>
              </div>
            );
          })}
        </div>

        {/* Divider line */}
        <div className="w-full h-px bg-white/4" />

        {/* Proof / stat line */}
        <div className="text-sm text-white/50 font-clash font-light">
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
      { text: "Find the right case language", icon: Search },
      { text: "Contextual retrieval", icon: Archive },
      { text: "One-click quote insertion", icon: Quote },
      { text: "Risk flags", icon: TriangleAlert },
      { text: "95% provenance", icon: Shield }
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
      { text: "Obligations in one view", icon: Network },
      { text: "Auto-mapping triggers", icon: MapPin },
      { text: "Gap analysis", icon: CheckSquare },
      { text: "Exportable matrix", icon: Table },
      { text: "Zero-to-matrix fast", icon: Zap }
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
      { text: "Generate assessments fast", icon: FileText },
      { text: "AI-powered generation", icon: Sparkles },
      { text: "Real-time citation validation", icon: Link },
      { text: "Collaborative editing", icon: Users },
      { text: "80% faster", icon: Gauge }
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
      { text: "Process thousands", icon: Inbox },
      { text: "Sentiment analysis", icon: Smile },
      { text: "Response templates", icon: Reply },
      { text: "Stakeholder tracking", icon: UserCheck },
      { text: "10k+ in 2 hrs", icon: Rocket }
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
      { text: "Documentation trail", icon: FolderOpen },
      { text: "Immutable logs", icon: Lock },
      { text: "Decision rationale", icon: ClipboardList },
      { text: "Compliance reporting", icon: BarChart3 },
      { text: "100% audit compliance", icon: Award }
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
      { text: "Cloud/on-prem", icon: Cloud },
      { text: "Multi-cloud sovereignty", icon: Globe },
      { text: "Air-gapped on-prem", icon: ShieldIcon },
      { text: "Hybrid sync", icon: RefreshCw },
      { text: "Deploy in 24 hrs", icon: Rocket }
    ],
    "proof": "Deploy anywhere in under 24 hours",
    "cta": "Choose deployment"
  }
];