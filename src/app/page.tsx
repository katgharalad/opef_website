"use client"

import { ShaderAnimation } from "@/components/ui/shader-animation";
import { NavBar } from "@/components/ui/tubelight-navbar";
import { CircularRevealHeading } from "@/components/ui/circular-reveal-heading";
import { Button } from "@/components/ui/rainbow-borders-button";
import { ZoomParallax } from "@/components/ui/zoom-parallax";
import { ProblemScreen } from "@/components/ProblemScreen";
import { useState, useEffect, useRef } from "react";
import { HorizontalScrollCarousel } from "@/components/ui/horizontal-scroll-carousel";
import Image from "next/image";

export default function Home() {
  const [typewriterText, setTypewriterText] = useState("");
  const [showTypewriter, setShowTypewriter] = useState(true);
  // Slideshow section state
  const [showSlideshow, setShowSlideshow] = useState(false);
  // Section 4 state
  const [showSection4, setShowSection4] = useState(false);
  const [circularRevealMoved, setCircularRevealMoved] = useState(false);
  // Problem Screen state
  const [showProblemScreen, setShowProblemScreen] = useState(false);
  // Scroll resistance for problem screen
  const [problemScreenScrollResistance, setProblemScreenScrollResistance] = useState(false);
  // Scroll resistance for circular reveal section
  const [circularRevealScrollResistance, setCircularRevealScrollResistance] = useState(false);
  // Section 5 state
  const [showSection5, setShowSection5] = useState(false);
  // Center-out blackout transition state
  const [played, setPlayed] = useState(false);
  const [playedReverse, setPlayedReverse] = useState(false);
  const [locking, setLocking] = useState(false);
  const [gapStart, setGapStart] = useState<number>(0);
  const [marqueeVisible, setMarqueeVisible] = useState(true);
  const [marqueeOpacity, setMarqueeOpacity] = useState(1);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const section1Top = useRef<number>(0);
  const section2Top = useRef<number>(0);
  const section3Top = useRef<number>(0);
  // Refs to avoid dependency array issues
  const showTypewriterRef = useRef(showTypewriter);
  const currentIndexRef = useRef(0);
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

  const fullText = "Bury bureaucracy. Work easier.";

  // Keep ref updated with latest showTypewriter state
  useEffect(() => {
    showTypewriterRef.current = showTypewriter;
  }, [showTypewriter]);


  // Set section anchors once layout is known
  useEffect(() => {
    const s1 = document.getElementById('section-1')?.offsetTop ?? 0;
    const s2 = document.getElementById('section-2')?.offsetTop ?? window.innerHeight;
    const s3 = document.getElementById('section-3')?.offsetTop ?? window.innerHeight * 2;
    section1Top.current = s1;
    section2Top.current = s2;
    section3Top.current = s3;
  }, []);

  // Measure marquee height and set initial gap
  useEffect(() => {
    const measure = () => {
      if (!marqueeRef.current) return;
      const h = marqueeRef.current.getBoundingClientRect().height;
      const start = Math.max(0, (window.innerHeight - h) / 2);
      setGapStart(start);
      document.documentElement.style.setProperty('--gap', `${start}px`);
    };
    
    measure();
    const ro = new ResizeObserver(measure);
    if (marqueeRef.current) ro.observe(marqueeRef.current);
    window.addEventListener('resize', measure);
    
    return () => { 
      ro.disconnect(); 
      window.removeEventListener('resize', measure); 
    };
  }, []);

  // Forward transition: Section 2 → Section 3
  useEffect(() => {
    const onScrollForward = () => {
      if (locking || played) return;
      const y = window.scrollY;
      const windowHeight = window.innerHeight;

      // Forward threshold: user has scrolled past Section 2's midpoint
      if (y >= section2Top.current + windowHeight * 0.5) {
        setLocking(true);

        // lock body without jumping
        const scrollY = window.scrollY;
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY}px`;
        document.body.style.left = '0';
        document.body.style.right = '0';
        document.body.style.width = '100%';

        // start center-out expansion
        requestAnimationFrame(() => {
          document.documentElement.style.setProperty('--gap', '0px');
        });

        // after animation completes, unlock and jump to Section 3
        const done = setTimeout(() => {
          // fade out marquee
          setMarqueeVisible(false);
          
          // unlock
          document.body.style.position = '';
          document.body.style.top = '';
          document.body.style.left = '';
          document.body.style.right = '';
          document.body.style.width = '';
          // restore scroll position before programmatic jump
          window.scrollTo(0, scrollY);
          // now jump to section 3 anchor
          window.scrollTo({ top: section3Top.current, behavior: 'instant' as ScrollBehavior });
          setLocking(false);
          setPlayed(true);
        }, 1200); // matches transition

        return () => clearTimeout(done);
      }
    };

    window.addEventListener('scroll', onScrollForward, { passive: true });
    return () => window.removeEventListener('scroll', onScrollForward);
  }, [played, locking, gapStart]);

  // Reverse transition: Section 2 → Section 1
  useEffect(() => {
    const onScrollReverse = () => {
      if (locking || playedReverse) return;
      const y = window.scrollY;
      const windowHeight = window.innerHeight;

      // Reverse threshold: enter upper half of Section 2 while scrolling up
      if (y <= section2Top.current + windowHeight * 0.5 && y > section1Top.current && played) {
        setLocking(true);
        const currentY = window.scrollY;

        // Lock body
        document.body.style.position = 'fixed';
        document.body.style.top = `-${currentY}px`;
        document.body.style.left = '0';
        document.body.style.right = '0';
        document.body.style.width = '100%';

        // Retract black cover from full to center band
        requestAnimationFrame(() => {
          document.documentElement.style.setProperty('--gap', `${gapStart}px`);
        });

        // End after same duration as forward (1.2s)
        const done = setTimeout(() => {
          // Unlock body
          document.body.style.position = '';
          document.body.style.top = '';
          document.body.style.left = '';
          document.body.style.right = '';
          document.body.style.width = '';
          window.scrollTo(0, currentY);

          // Snap to Section 1 and restore initial UI
          window.scrollTo({ top: section1Top.current, behavior: 'instant' as ScrollBehavior });

          // UI visibility resets
          setMarqueeVisible(false); // Hide OPEF marquee
          setShowTypewriter(true);  // Show hero headline

          setLocking(false);
          setPlayedReverse(true);
          setPlayed(false); // Reset for next forward transition
        }, 1200);

        return () => clearTimeout(done);
      }
    };

    window.addEventListener('scroll', onScrollReverse, { passive: true });
    return () => window.removeEventListener('scroll', onScrollReverse);
  }, [playedReverse, locking, gapStart, played]);

  // Section visibility logic
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Scroll resistance logic for problem screen
      if (showProblemScreen && !problemScreenScrollResistance) {
        const problemScreenStart = windowHeight * 2.5;
        const problemScreenEnd = windowHeight * 6.0;
        const scrollProgress = (scrollY - problemScreenStart) / (problemScreenEnd - problemScreenStart);
        
        // Enable resistance when user starts scrolling past 30% of problem screen
        if (scrollProgress > 0.3) {
          setProblemScreenScrollResistance(true);
          // Disable resistance after 5 seconds (longer for reading bottom cards)
          setTimeout(() => {
            setProblemScreenScrollResistance(false);
          }, 5000);
        }
      }

      // Scroll resistance logic for circular reveal section
      if (showSection4 && !circularRevealScrollResistance) {
        const circularRevealStart = windowHeight * 5.5;
        const circularRevealEnd = windowHeight * 6.5;
        const scrollProgress = (scrollY - circularRevealStart) / (circularRevealEnd - circularRevealStart);
        
        // Enable resistance when user starts scrolling past 15% of circular reveal section
        if (scrollProgress > 0.15) {
          setCircularRevealScrollResistance(true);
          // Disable resistance after 4 seconds (longer for reading time)
          setTimeout(() => {
            setCircularRevealScrollResistance(false);
          }, 4000);
        }
      }

      
      if (scrollY <= windowHeight * 0.5) {
        // Section 1 - Typewriter
        setShowTypewriter(true);
        setShowSlideshow(false);
        setShowSection4(false);
        setShowSection5(false);
        setMarqueeVisible(false); // Hide marquee in section 1
        // Reset reverse transition when back in section 1
        if (playedReverse) {
          setPlayedReverse(false);
        }
      } else if (scrollY > windowHeight * 0.5 && scrollY < windowHeight * 1.8) {
        // Section 2 - OPEF (extended for smoother transition)
        setShowTypewriter(false);
        setShowSlideshow(false);
        setShowSection4(false);
        setShowSection5(false);
        setMarqueeVisible(true); // Show marquee in section 2
        setMarqueeOpacity(1); // Reset opacity to full
      } else if (scrollY > windowHeight * 1.5 && scrollY < windowHeight * 3.0) {
        // Section 3 - Zoom Parallax (reduced height for earlier problem screen)
        setShowTypewriter(false);
        setShowSlideshow(false);
        setShowSection4(false);
        setShowSection5(false);
        setShowProblemScreen(false);
        // Gradual marquee fade during transition
        if (scrollY < windowHeight * 2.0) {
          setMarqueeVisible(true); // Keep marquee visible during overlap
          // Calculate fade opacity based on scroll progress
          const fadeStart = windowHeight * 1.5;
          const fadeEnd = windowHeight * 2.0;
          const fadeProgress = Math.max(0, Math.min(1, (scrollY - fadeStart) / (fadeEnd - fadeStart)));
          setMarqueeOpacity(1 - fadeProgress); // Fade from 1 to 0
        } else {
          setMarqueeVisible(false); // Hide marquee after transition
          setMarqueeOpacity(0);
        }
      } else if (scrollY > windowHeight * 3.0 && scrollY < windowHeight * 5.5) {
        // Problem Screen - Extended area, stays visible longer
        setShowTypewriter(false);
        setShowSlideshow(false);
        setShowSection4(false);
        setShowSection5(false);
        setShowProblemScreen(true);
        setMarqueeVisible(false); // Hide marquee
      } else if (scrollY > windowHeight * 5.5 && scrollY < windowHeight * 7.0) {
        // Section 4 - Circular Reveal (Extended area for better reading time)
        // Only transition if scroll resistance is not active
        if (!problemScreenScrollResistance && !circularRevealScrollResistance) {
          setShowTypewriter(false);
          setShowSlideshow(false);
          setShowSection4(true);
          setShowSection5(false);
          setShowProblemScreen(false);
          setMarqueeVisible(false); // Hide marquee
        }
      } else {
        // Section 5 - CTA
        // Only transition if scroll resistance is not active
        if (!problemScreenScrollResistance && !circularRevealScrollResistance) {
          setShowTypewriter(false);
          setShowSlideshow(false);
          setShowSection4(false);
          setShowSection5(true);
          setShowProblemScreen(false);
          setMarqueeVisible(false); // Hide marquee
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showProblemScreen, problemScreenScrollResistance, showSection4, circularRevealScrollResistance, playedReverse]);


  // Typewriter effect - restart when showTypewriter changes
  useEffect(() => {
    // Clear any existing timeouts
    if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);
    
    // Reset typewriter state
    setTypewriterText("");
    currentIndexRef.current = 0;
    
    if (!showTypewriter) return;
    
    const typeText = () => {
      // Check ref instead of state to avoid stale closures
      if (!showTypewriterRef.current) {
        if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);
        setTypewriterText("");
        currentIndexRef.current = 0;
        return;
      }
      
      if (currentIndexRef.current <= fullText.length) {
        setTypewriterText(fullText.slice(0, currentIndexRef.current));
        currentIndexRef.current++;
        timeoutIdRef.current = setTimeout(typeText, 50); // Much faster typing speed
      } else {
        // Wait 1 second after typing is complete
        timeoutIdRef.current = setTimeout(() => {
          if (!showTypewriterRef.current) {
            if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);
            setTypewriterText("");
            currentIndexRef.current = 0;
            return;
          }
          // Clear text quickly
          setTypewriterText("");
          currentIndexRef.current = 0;
          // Wait only 100ms before starting again
          timeoutIdRef.current = setTimeout(typeText, 100);
        }, 1000);
      }
    };

    // Start typing after initial animation
    const startTyping = setTimeout(() => {
      if (showTypewriterRef.current) {
        typeText();
      }
    }, 1000);
    
    return () => {
      clearTimeout(startTyping);
      if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);
    };
  }, [showTypewriter, fullText]); // Restart when showTypewriter changes

  // Section 4 animation - move circular reveal left after 0.5 seconds
  useEffect(() => {
    if (showSection4) {
      const timer = setTimeout(() => {
        setCircularRevealMoved(true);
      }, 500);
      
      return () => clearTimeout(timer);
    } else {
      setCircularRevealMoved(false);
    }
  }, [showSection4]);
  return (
    <div className="relative">
      {/* Shader Animation Background - Full Page */}
      <div className="fixed inset-0 z-0">
        <ShaderAnimation />
      </div>
      
      {/* Center-out Black Cover - Only visible during transition */}
      <div 
        className={`fixed inset-0 bg-black pointer-events-none z-10 transition-opacity duration-500 ${
          locking || played ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          clipPath: `inset(var(--gap, 40vh) 0 var(--gap, 40vh) 0)`,
          transition: 'clip-path 1.2s ease-out'
        }}
      />
      
      {/* Section 1 - Typewriter Text */}
      <section id="section-1" className={`relative z-10 flex items-center justify-center min-h-screen transition-all duration-1000 ease-in-out ${showTypewriter ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'}`}>
        <div className="text-center">
          <div className="text-4xl sm:text-5xl lg:text-6xl font-medium text-white font-clash leading-relaxed tracking-wide">
            <span className="inline-block min-h-[1.2em] drop-shadow-md">
              {typewriterText}
              <span className="animate-pulse text-white/90 font-light">|</span>
            </span>
          </div>
        </div>
      </section>

      
      {/* Section 2 - OPEF Section */}
      <section id="section-2" className="relative min-h-screen">
        {/* Marquee + OPEF centered - Only visible in Section 2 */}
        <div 
          ref={marqueeRef} 
          className={`fixed inset-x-0 top-1/2 -translate-y-1/2 z-30 transition-opacity duration-300 ease-in-out ${
            marqueeVisible && !showTypewriter && !showSlideshow ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ opacity: marqueeVisible && !showTypewriter && !showSlideshow ? marqueeOpacity : 0 }}
        >
          <div className="w-full px-0">
            <div className="bg-black text-white rounded-none py-6 w-full">
              {/* OPEF Text */}
              <h1 className="text-6xl sm:text-8xl lg:text-9xl font-extrabold text-white font-clash leading-none tracking-[0.2em] drop-shadow-2xl transform scale-x-300 text-center">
                <span className="inline-block opacity-0 animate-[reveal_0.8s_ease-out_0.2s_forwards]">O</span>
                <span className="inline-block opacity-0 animate-[reveal_0.8s_ease-out_0.4s_forwards]">P</span>
                <span className="inline-block opacity-0 animate-[reveal_0.8s_ease-out_0.6s_forwards]">E</span>
                <span className="inline-block opacity-0 animate-[reveal_0.8s_ease-out_0.8s_forwards]">F</span>
              </h1>
              
              {/* Expanded Text - Hidden initially with marquee effect */}
              <div className="mt-4 opacity-0 animate-[expand_1.2s_ease-out_2.0s_forwards] overflow-hidden">
                <div className="animate-[marquee_30s_linear_infinite] whitespace-nowrap">
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-medium text-white font-clash leading-tight tracking-[0.15em] drop-shadow-lg transform scale-x-140 inline-block">
                    Open Platform for Environmental Frameworks • Open Platform for Environmental Frameworks • Open Platform for Environmental Frameworks • Open Platform for Environmental Frameworks • Open Platform for Environmental Frameworks • Open Platform for Environmental Frameworks • Open Platform for Environmental Frameworks • Open Platform for Environmental Frameworks • Open Platform for Environmental Frameworks • Open Platform for Environmental Frameworks • Open Platform for Environmental Frameworks • Open Platform for Environmental Frameworks • Open Platform for Environmental Frameworks • Open Platform for Environmental Frameworks • Open Platform for Environmental Frameworks • Open Platform for Environmental Frameworks • Open Platform for Environmental Frameworks • Open Platform for Environmental Frameworks • Open Platform for Environmental Frameworks • Open Platform for Environmental Frameworks • 
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 - Zoom Parallax */}
      <section id="section-3" className="relative z-20">
        <ZoomParallax 
          images={[
            {
              src: "",
              alt: "Problem statement",
              text: "THE PROBLEM"
            },
            {
              src: "",
              alt: "Problem statement",
              text: "THE PROBLEM"
            },
            {
              src: "",
              alt: "Problem statement",
              text: "THE PROBLEM"
            },
            {
              src: "",
              alt: "Empty center space",
              isCenter: true
            },
            {
              src: "",
              alt: "Problem statement",
              text: "THE PROBLEM"
            },
            {
              src: "",
              alt: "Problem statement",
              text: "THE PROBLEM"
            },
            {
              src: "",
              alt: "Problem statement",
              text: "THE PROBLEM"
            }
          ]}
        />
      </section>

      {/* Problem Screen - Between Parallax and Solution */}
      <div className={`relative z-20 min-h-screen flex items-center justify-center transition-all duration-1000 ease-in-out ${showProblemScreen ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'}`}>
        <ProblemScreen />
      </div>

      {/* Section 4 - Circular Reveal Heading */}
      <div id="section-4" className={`relative z-50 min-h-screen flex items-center justify-center transition-all duration-300 ease-in-out ${showSection4 ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'}`}>
        {/* Background overlay to ensure visibility */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/80 backdrop-blur-sm"></div>
        <div className="relative w-full h-screen flex items-center justify-center">
          {/* Circular Reveal Component - Dead Center Initially */}
          <div className={`absolute transition-all duration-1000 ease-in-out ${circularRevealMoved ? 'left-1/4 transform -translate-x-1/2' : 'left-1/2 transform -translate-x-1/2'}`}>
            <CircularRevealHeading
              size="lg"
              items={[
                {
                  text: "COMPLIANCE"
                },
                {
                  text: "ANALYSIS"
                },
                {
                  text: "ENVIRONMENTAL"
                },
                {
                  text: "REVIEW"
                },
                {
                  text: "REGULATORY"
                },
                {
                  text: "GUIDANCE"
                }
              ]}
              centerText={
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-gray-700 mb-3 font-clash">The Solution</h2>
                  <p className="text-sm text-gray-600 font-clash leading-relaxed">Open Platform for Environmental Frameworks</p>
                </div>
              }
            />
          </div>
          
          {/* Solution Statement - Right Side */}
          <div className={`absolute right-8 sm:right-12 lg:right-16 w-1/2 transition-all duration-1000 ease-in-out ${circularRevealMoved ? 'opacity-100 transform translate-x-0' : 'opacity-0 transform translate-x-8'}`}>
            <div className="max-w-2xl space-y-8">
              {/* Solution 1 */}
              <div className="space-y-3">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white font-clash leading-tight tracking-normal drop-shadow-lg">
                  Months of Compliance. Done in Minutes.
                </h3>
                <p className="text-lg text-white font-clash leading-relaxed drop-shadow-md">
                  OPEF automates analysis, reporting, and regulatory guidance with AI — cutting timelines from years to days while keeping every output defensible.
                </p>
              </div>

              {/* Solution 2 */}
              <div className="space-y-3">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white font-clash leading-tight tracking-normal drop-shadow-lg">
                  AI That Does the Paperwork.
                </h3>
                <p className="text-lg text-white font-clash leading-relaxed drop-shadow-md">
                  From drafting environmental reviews to mapping citations, OPEF handles the grind so agencies can focus on decisions, not documents.
                </p>
              </div>

              {/* Solution 3 */}
              <div className="space-y-3">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white font-clash leading-tight tracking-normal drop-shadow-lg">
                  Faster. Cheaper. Defensible.
                </h3>
                <p className="text-lg text-white font-clash leading-relaxed drop-shadow-md">
                  OPEF delivers compliance that meets federal mandates, slashes consultant costs, and generates regulator-ready outputs automatically.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section - Horizontal Scroll Carousel */}
      <div id="section-5" className="relative z-20">
        <HorizontalScrollCarousel />
      </div>

      {/* Section 6 - CTA */}
      <div id="section-6" className={`relative z-20 min-h-screen flex items-center justify-center transition-all duration-[800ms] ease-out ${showSection5 ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'}`}>
        {/* Background overlay to ensure visibility */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/80 backdrop-blur-sm"></div>
        
        {/* Logo Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <Image
            src="/opef-logo-final.svg"
            alt="OPEF Logo"
            width={1500}
            height={1500}
            className="opacity-15 object-contain"
            style={{
              imageRendering: 'auto',
              filter: 'blur(0.5px)',
              transform: 'scale(1.02)'
            }}
            priority
          />
        </div>
        
        <div className="text-center space-y-8 flex flex-col items-center relative z-10 pt-32">
          {/* Headline */}
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-medium text-white font-clash leading-tight tracking-wide drop-shadow-lg">
            Don&apos;t Adapt. Define.
          </h2>
          
          {/* Subtext */}
          <p className="text-xl sm:text-2xl text-white font-clash leading-relaxed drop-shadow-md">
            Get early access to OPEF.
          </p>
          
          {/* Contact Us Button - Perfectly Centered */}
          <div className="pt-4 flex justify-center">
            <Button 
              onClick={() => window.open('https://docs.google.com/forms/d/1E09Q1MtvyZspaC1ZT68c5R7J5Pie3slqXzDH89fWp7s/viewform', '_blank', 'noopener,noreferrer')}
            >
              Contact Us
            </Button>
          </div>
        </div>
      </div>

      {/* Tubelight Navigation */}
      <NavBar />
      
    </div>
  );
}
