'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export function ProblemStatement() {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    // Scroll to the solution section (Section 4)
    const solutionSection = document.getElementById('section-4');
    if (solutionSection) {
      // Get the current scroll position and calculate the target
      const currentScroll = window.scrollY;
      const targetScroll = solutionSection.offsetTop;
      
      // Smooth scroll to the target
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  return (
    <motion.div
      className="relative w-full h-full bg-black/60 backdrop-blur-sm rounded-lg p-8 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      {/* Problem Statement Content */}
      <div className="text-center space-y-6">
        <motion.h2 
          className="text-4xl font-bold text-white font-clash tracking-wide"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          THE PROBLEM
        </motion.h2>
        
        <motion.div 
          className="space-y-4 text-white/90"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p className="text-lg font-clash leading-relaxed">
            Environmental compliance is broken. Agencies spend <span className="text-yellow-400 font-semibold">months</span> on paperwork that should take <span className="text-green-400 font-semibold">minutes</span>.
          </p>
          
          <p className="text-lg font-clash leading-relaxed">
            Manual processes, outdated systems, and regulatory complexity create bottlenecks that delay critical environmental decisions.
          </p>
          
          <p className="text-lg font-clash leading-relaxed">
            The result? <span className="text-red-400 font-semibold">Delayed projects</span>, <span className="text-red-400 font-semibold">skyrocketing costs</span>, and <span className="text-red-400 font-semibold">missed environmental opportunities</span>.
          </p>
        </motion.div>

        {/* Animated Arrow pointing to solution */}
        <motion.div
          className="flex flex-col items-center space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.div
            className="text-white/70 text-sm font-clash"
            animate={{ opacity: isHovered ? 1 : 0.7 }}
            transition={{ duration: 0.3 }}
          >
            Scroll to see the solution ↓
          </motion.div>
          
          <motion.div
            className="w-8 h-8 border-2 border-white/70 rounded-full flex items-center justify-center"
            animate={{ 
              scale: isHovered ? 1.2 : 1,
              borderColor: isHovered ? '#ffffff' : 'rgba(255,255,255,0.7)'
            }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="w-2 h-2 bg-white/70 rounded-full"
              animate={{ 
                y: isHovered ? [0, 4, 0] : [0, 2, 0],
                opacity: isHovered ? 1 : 0.7
              }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </motion.div>

        {/* Pulse effect on hover */}
        <motion.div
          className="absolute inset-0 rounded-lg border-2 border-white/20"
          animate={{
            scale: isHovered ? 1.05 : 1,
            opacity: isHovered ? 0.8 : 0,
          }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
}
