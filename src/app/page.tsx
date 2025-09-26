"use client"

import { ShaderAnimation } from "@/components/ui/shader-animation";
import { NavBar } from "@/components/ui/tubelight-navbar";
import { HoverSlider, TextStaggerHover } from "@/components/ui/animated-slideshow";
import { CircularRevealHeading } from "@/components/ui/circular-reveal-heading";
import { Button } from "@/components/ui/rainbow-borders-button";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [typewriterText, setTypewriterText] = useState("");
  const [showTypewriter, setShowTypewriter] = useState(true);
  // Slideshow section state
  const [showSlideshow, setShowSlideshow] = useState(false);
  // Section 4 state
  const [showSection4, setShowSection4] = useState(false);
  const [circularRevealMoved, setCircularRevealMoved] = useState(false);
  // Section 5 state
  const [showSection5, setShowSection5] = useState(false);
  // Refs to avoid dependency array issues
  const showTypewriterRef = useRef(showTypewriter);
  const currentIndexRef = useRef(0);
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

  const fullText = "Bury bureaucracy. Work easier.";

  // Keep ref updated with latest showTypewriter state
  useEffect(() => {
    showTypewriterRef.current = showTypewriter;
  }, [showTypewriter]);


  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      if (scrollY <= windowHeight * 0.5) {
        // Section 1 - Typewriter
        setShowTypewriter(true);
        setShowSlideshow(false);
        setShowSection4(false);
        setShowSection5(false);
      } else if (scrollY > windowHeight * 0.5 && scrollY < windowHeight * 1.5) {
        // Section 2 - OPEF
        setShowTypewriter(false);
        setShowSlideshow(false);
        setShowSection4(false);
        setShowSection5(false);
      } else if (scrollY > windowHeight * 1.5 && scrollY < windowHeight * 2.5) {
        // Section 3 - Slideshow
        setShowTypewriter(false);
        setShowSlideshow(true);
        setShowSection4(false);
        setShowSection5(false);
      } else if (scrollY > windowHeight * 2.5 && scrollY < windowHeight * 3.5) {
        // Section 4 - Circular Reveal
        setShowTypewriter(false);
        setShowSlideshow(false);
        setShowSection4(true);
        setShowSection5(false);
      } else {
        // Section 5 - CTA
        setShowTypewriter(false);
        setShowSlideshow(false);
        setShowSection4(false);
        setShowSection5(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Typewriter effect - now with stable dependency array
  useEffect(() => {
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
        timeoutIdRef.current = setTimeout(typeText, 100); // Typing speed
      } else {
        // Wait 3 seconds after typing is complete
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
          // Wait only 200ms before starting again
          timeoutIdRef.current = setTimeout(typeText, 200);
        }, 3000);
      }
    };

    // Start typing after initial animation
    const startTyping = setTimeout(() => {
      if (showTypewriterRef.current) {
        typeText();
      }
    }, 2000);
    
    return () => {
      clearTimeout(startTyping);
      if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);
    };
  }, []); // Empty dependency array - stable size

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
      
      {/* Typewriter Text - Top Center */}
      <div className={`relative z-10 flex items-center justify-center min-h-screen transition-all duration-1000 ease-in-out ${showTypewriter ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'}`}>
        <div className="text-center">
          <div className="text-4xl sm:text-5xl lg:text-6xl font-medium text-white font-clash leading-relaxed tracking-wide">
            <span className="inline-block min-h-[1.2em] drop-shadow-md">
              {typewriterText}
              <span className="animate-pulse text-white/90 font-light">|</span>
            </span>
          </div>
        </div>
      </div>

      
      {/* Section 2 - OPEF Section */}
      <div className={`relative z-10 min-h-screen flex items-center justify-center transition-all duration-1000 ease-in-out ${!showTypewriter && !showSlideshow ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'}`}>
        <div className="text-center">
          <h1 className="text-6xl sm:text-8xl lg:text-9xl font-extrabold text-white font-clash leading-none tracking-[0.2em] drop-shadow-2xl transform scale-x-300">
            OPEF
          </h1>
        </div>
      </div>

      {/* Section 3 - Animated Slideshow */}
      <div className={`relative z-10 min-h-screen flex items-start justify-between px-8 sm:px-12 lg:px-16 transition-all duration-1000 ease-in-out ${showSlideshow ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'}`}>
        <HoverSlider className="w-full">
          <div className="flex items-start justify-between w-full h-screen">
            <div className="flex-1 max-w-3xl pr-4 flex flex-col h-full">
              <div className="flex flex-col space-y-8 md:space-y-10 lg:space-y-12 overflow-y-auto flex-1 pr-2 pt-16">
                <TextStaggerHover
                  index={0}
                  className="cursor-pointer text-xl md:text-2xl lg:text-3xl font-semibold uppercase tracking-[0.15em] text-white !text-white font-clash leading-[1.2]"
                  style={{ color: 'white' }}
                  text="$100B Buried in Bureaucracy."
                />
                <TextStaggerHover
                  index={1}
                  className="cursor-pointer text-xl md:text-2xl lg:text-3xl font-semibold uppercase tracking-[0.15em] text-white !text-white font-clash leading-[1.2]"
                  style={{ color: 'white' }}
                  text="Agencies Stuck Without AI."
                />
                <TextStaggerHover
                  index={2}
                  className="cursor-pointer text-xl md:text-2xl lg:text-3xl font-semibold uppercase tracking-[0.15em] text-white !text-white font-clash leading-[1.2]"
                  style={{ color: 'white' }}
                  text="Budgets Slashed. Mandates Rising. Automation Can't Wait."
                />
                <TextStaggerHover
                  index={3}
                  className="cursor-pointer text-xl md:text-2xl lg:text-3xl font-semibold uppercase tracking-[0.15em] text-white !text-white font-clash leading-[1.2]"
                  style={{ color: 'white' }}
                  text="OPEF: Faster. Cheaper. Defensible."
                />
              </div>
            </div>
            
            {/* Static Infographic - Right Side */}
            <div className="flex-1 max-w-md ml-6 lg:ml-8 flex-shrink-0">
              <div className="w-full h-full bg-gradient-to-br from-gray-900/95 to-gray-800/90 backdrop-blur-sm rounded-2xl p-6 flex flex-col justify-between relative shadow-2xl border border-gray-700/30">
                {/* Vertical Accent Line */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-white to-white/70 rounded-l-2xl"></div>
                
                <div className="text-white font-clash space-y-6 pl-4 pt-16">
                  {/* Top Header - Magazine Cover Line */}
                  <div className="text-center space-y-3">
                    <div className="text-sm font-semibold text-white font-clash tracking-normal leading-tight">
                      Billions Buried in Bureaucracy.<br/>
                      OPEF Brings it Back.
                    </div>
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                  </div>

                  {/* Block 1 - The Market */}
                  <div className="space-y-3">
                    <div className="text-3xl font-bold text-white font-clash leading-none">
                      $100B
                    </div>
                    <div className="text-xs font-medium text-white font-clash tracking-normal">
                      Annual government consulting spend
                    </div>
                    <div className="text-xs text-white/80 font-clash leading-relaxed">
                      → Consultants dominate repetitive compliance work.<br/>
                      → $2B+ addressable market in environmental compliance alone.
                    </div>
                    <div className="w-full h-px bg-white/20"></div>
                  </div>

                  {/* Block 2 - The Mandate */}
                  <div className="space-y-3">
                    <div className="text-2xl font-bold text-white font-clash leading-none">
                      UNDER 1 YEAR
                    </div>
                    <div className="text-xs font-medium text-white font-clash tracking-normal">
                      EAs must be completed in less than a year
                    </div>
                    <div className="text-xs text-white/80 font-clash leading-relaxed">
                      → Agencies now face strict deadlines.<br/>
                      → LLMs uniquely suited for drafting, alignment, precedent analysis.<br/>
                      → Current software doesn&apos;t serve this need.
                    </div>
                    <div className="w-full h-px bg-white/20"></div>
                  </div>

                  {/* Block 3 - The Crisis */}
                  <div className="space-y-3">
                    <div className="text-2xl font-bold text-white font-clash leading-none">
                      54% CUT
                    </div>
                    <div className="text-xs font-medium text-white font-clash tracking-normal">
                      EPA budget since 2000
                    </div>
                    <div className="text-xs text-white/80 font-clash leading-relaxed">
                      → Workforce down 23%.<br/>
                      → Federal AI mandate pushes agencies to automate.<br/>
                      → Pressure to do more with less.
                    </div>
                    <div className="w-full h-px bg-white/20"></div>
                  </div>

                  {/* Block 4 - The Solution */}
                  <div className="space-y-3">
                    <div className="text-xl font-bold text-white font-clash leading-none">
                      FASTER. CHEAPER. DEFENSIBLE.
                    </div>
                    <div className="text-xs text-white/80 font-clash leading-relaxed">
                      → OPEF automates analysis, reporting, and citations.<br/>
                      → Cuts timelines from years to days.<br/>
                      → Outputs regulator-ready and litigation-proof.
                    </div>
                  </div>

                  {/* Pull Quote Overlay */}
                  <div className="text-center pt-4">
                    <div className="text-sm font-medium text-white font-clash italic leading-[1.6] border-t border-white/30 pt-4">
                      &ldquo;From documents to defensible outcomes.&rdquo;
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </HoverSlider>
      </div>

      {/* Section 4 - Circular Reveal Heading */}
      <div className={`relative z-10 min-h-screen flex items-center justify-center transition-all duration-1000 ease-in-out ${showSection4 ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'}`}>
        <div className="relative w-full h-screen flex items-center justify-center">
          {/* Circular Reveal Component - Dead Center Initially */}
          <div className={`absolute transition-all duration-1000 ease-in-out ${circularRevealMoved ? 'left-1/4 transform -translate-x-1/2' : 'left-1/2 transform -translate-x-1/2'}`}>
            <CircularRevealHeading
              size="lg"
              items={[
                {
                  text: "COMPLIANCE",
                  image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=500&h=500&fit=crop&crop=center"
                },
                {
                  text: "ANALYSIS",
                  image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&h=500&fit=crop&crop=center"
                },
                {
                  text: "ENVIRONMENTAL",
                  image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop&crop=center"
                },
                {
                  text: "REVIEW",
                  image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=500&h=500&fit=crop&crop=center"
                },
                {
                  text: "REGULATORY",
                  image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=500&h=500&fit=crop&crop=center"
                },
                {
                  text: "GUIDANCE",
                  image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=500&h=500&fit=crop&crop=center"
                }
              ]}
              centerText={
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-gray-700 mb-3 font-clash">THE SOLUTION</h2>
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

      {/* Section 5 - CTA */}
      <div className={`relative z-10 min-h-screen flex items-center justify-center transition-all duration-1000 ease-in-out ${showSection5 ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'}`}>
        <div className="text-center space-y-8 flex flex-col items-center">
          {/* Headline */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white font-clash leading-tight tracking-normal drop-shadow-lg">
            Let&apos;s Fix Compliance Together.
          </h2>
          
          {/* Subtext */}
          <p className="text-xl sm:text-2xl text-white font-clash leading-relaxed drop-shadow-md">
            Get early access to OPEF.
          </p>
          
          {/* Contact Us Button - Perfectly Centered */}
          <div className="pt-4 flex justify-center">
            <Button>
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
