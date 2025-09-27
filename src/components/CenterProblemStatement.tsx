'use client';

import { motion } from 'framer-motion';

interface CenterProblemStatementProps {
  isFullyZoomed: boolean;
}

export function CenterProblemStatement({ isFullyZoomed }: CenterProblemStatementProps) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {isFullyZoomed && (
        <motion.div 
          className="text-center space-y-8 max-w-4xl px-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Main Problem Statement */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold text-white font-clash tracking-wide leading-none">
              THE PROBLEM
            </h1>
            
            <div className="w-24 h-1 bg-gradient-to-r from-white/60 to-white/20 mx-auto"></div>
          </motion.div>

          {/* Problem Description */}
          <motion.div
            className="space-y-6 text-white/90"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p className="text-xl sm:text-2xl font-clash leading-relaxed">
              Environmental compliance is broken. Agencies spend <span className="text-yellow-400 font-semibold">months</span> on paperwork that should take <span className="text-green-400 font-semibold">minutes</span>.
            </p>
            
            <p className="text-lg sm:text-xl font-clash leading-relaxed text-white/80">
              Manual processes, outdated systems, and regulatory complexity create bottlenecks that delay critical environmental decisions.
            </p>
            
            <p className="text-lg sm:text-xl font-clash leading-relaxed text-white/80">
              The result? <span className="text-red-400 font-semibold">Delayed projects</span>, <span className="text-red-400 font-semibold">skyrocketing costs</span>, and <span className="text-red-400 font-semibold">missed environmental opportunities</span>.
            </p>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            className="pt-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="flex flex-col items-center space-y-4">
              <motion.div
                className="text-white/70 text-sm font-clash"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Scroll to discover the solution ↓
              </motion.div>
              
              <motion.div
                className="w-8 h-8 border-2 border-white/70 rounded-full flex items-center justify-center"
                animate={{ 
                  scale: [1, 1.1, 1],
                  borderColor: ['rgba(255,255,255,0.7)', '#ffffff', 'rgba(255,255,255,0.7)']
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <motion.div
                  className="w-2 h-2 bg-white/70 rounded-full"
                  animate={{ 
                    y: [0, 4, 0],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{ 
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
