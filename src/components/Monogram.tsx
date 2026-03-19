import { motion } from 'motion/react';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Monogram() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [isHeroVisible, setIsHeroVisible] = useState(isHome);

  useEffect(() => {
    if (!isHome) {
      setIsHeroVisible(false);
      return;
    }

    const handleScroll = () => {
      // Hero section is min-h-[90vh], so we hide it until user scrolls past 80vh
      const heroHeight = window.innerHeight * 0.8;
      setIsHeroVisible(window.scrollY < heroHeight);
    };

    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]);

  return (
    <div 
      className={`fixed bottom-8 right-8 z-40 pointer-events-none mix-blend-difference text-[#FAFAFA] transition-opacity duration-500 ${isHeroVisible ? 'opacity-0' : 'opacity-50'}`}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="relative w-16 h-16 flex items-center justify-center"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="1.5" />
          <path d="M20 20L80 80M80 20L20 80" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </motion.div>
    </div>
  );
}
