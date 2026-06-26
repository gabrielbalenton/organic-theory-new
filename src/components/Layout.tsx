import { useEffect, useRef, useState } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Monogram from './Monogram';
import Intro from './Intro';
import Cursor from './Cursor';
import FloatingCTA from './FloatingCTA';
import CookieBanner from './CookieBanner';
import { ScrollProgress } from './ScrollProgress';
import { MagneticButton } from './MagneticButton';

const NAV_LINKS = [
  { to: '/services', label: 'Services' },
  { to: '/vault', label: 'The Vault' },
  { to: '/tools', label: 'Tools' },
  { to: '/contact', label: 'Contact' },
];

export default function Layout() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [showIntro, setShowIntro] = useState(() => !sessionStorage.getItem('intro_shown'));
  const [introDone, setIntrosDone] = useState(() => !!sessionStorage.getItem('intro_shown'));

  const headerRef = useRef<HTMLElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  const lastScrollY = useRef(0);
  const rafId = useRef<number>();

  // Measure header height dynamically
  useEffect(() => {
    const measure = () => {
      if (headerRef.current) setHeaderHeight(headerRef.current.offsetHeight);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [scrolled]);

  // Scroll behaviour
  useEffect(() => {
    const onScroll = () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        const y = window.scrollY;
        const down = y > lastScrollY.current;
        setScrolled(y > 40);
        setHidden(down && y > 120);
        lastScrollY.current = y;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  // Close menu + scroll top on route change
  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleIntroComplete = () => {
    sessionStorage.setItem('intro_shown', 'true');
    setShowIntro(false);
    setIntrosDone(true);
  };

  return (
    <>
      <Cursor />
      <ScrollProgress />
      {showIntro && <Intro onComplete={handleIntroComplete} />}

      {/* Page transition overlay */}
      <AnimatePresence>
        <motion.div
          key={location.pathname + '_overlay'}
          initial={{ scaleY: 1, transformOrigin: 'top' }}
          animate={{ scaleY: 0, transformOrigin: 'top' }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
          className="fixed inset-0 z-[250] bg-[#09090B] pointer-events-none"
        />
      </AnimatePresence>

      <motion.div
        initial={introDone ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen flex flex-col relative overflow-x-hidden"
      >
        <Monogram />

        {/* Navbar */}
        <motion.header
          ref={headerRef}
          animate={{ y: hidden ? '-100%' : '0%' }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className={`w-full fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 md:px-12 transition-all duration-300 ${
            scrolled
              ? 'py-4 bg-[#09090B]/85 backdrop-blur-md border-b border-[#FAFAFA]/[0.06]'
              : 'py-6 bg-transparent'
          }`}
        >
          <Link
            to="/"
            className="flex items-center gap-4 group z-50"
            aria-label="Organic Theory Home"
          >
            <div className="flex items-center font-display font-bold text-xl tracking-[0.3em] text-[#FAFAFA]">
              <span>O</span>
              <span className="text-[#A1A1AA] mx-1">+</span>
              <span>X</span>
            </div>
            <span className="hidden md:block font-sans text-[10px] tracking-[0.2em] uppercase opacity-0 group-hover:opacity-40 transition-opacity duration-300 text-[#FAFAFA]">
              Organic Theory
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex gap-8 font-sans text-[10px] tracking-[0.2em] uppercase z-50">
            {NAV_LINKS.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`transition-opacity duration-200 text-[#FAFAFA] ${
                  location.pathname === to ? 'opacity-100' : 'opacity-50 hover:opacity-100'
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden z-50 p-2 text-[#FAFAFA]"
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </motion.header>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
              animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
              exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-0 z-40 bg-[#09090B] flex flex-col items-center justify-center gap-10"
            >
              {[{ to: '/', label: 'Home' }, ...NAV_LINKS].map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setMenuOpen(false)}
                  className="font-display text-3xl tracking-[0.3em] uppercase text-[#FAFAFA] hover:text-[#A1A1AA] transition-colors duration-200"
                >
                  {label}
                </Link>
              ))}
              <a
                href="https://www.linkedin.com/in/gabrielbalenton/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] tracking-[0.3em] uppercase text-[#A1A1AA] mt-6 hover:opacity-60 transition-opacity"
              >
                LinkedIn
              </a>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Page content — padding driven by measured header height */}
        <main className="flex-grow w-full" style={{ paddingTop: headerHeight }}>
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="border-t border-[#FAFAFA]/10 px-6 md:px-12 py-12">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
            <div>
              <div className="font-display font-bold text-lg tracking-[0.3em] text-[#FAFAFA] mb-2">
                O<span className="text-[#A1A1AA] mx-1">+</span>X
              </div>
              <p className="text-[10px] tracking-[0.2em] uppercase opacity-30">Organic Theory</p>
              <p className="text-xs opacity-40 mt-3 leading-relaxed max-w-xs">
                Search, automation, and systems for global brands that want to scale without friction.
              </p>
            </div>
            <nav className="flex flex-col gap-3">
              {NAV_LINKS.map(({ to, label }) => (
                <Link key={to} to={to} className="text-[10px] tracking-[0.2em] uppercase opacity-40 hover:opacity-100 transition-opacity duration-200">
                  {label}
                </Link>
              ))}
            </nav>
            <div className="flex flex-col gap-3">
              <a
                href="https://www.linkedin.com/in/gabrielbalenton/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] tracking-[0.2em] uppercase opacity-40 hover:opacity-100 transition-opacity duration-200"
              >
                LinkedIn
              </a>
              <Link to="/contact" className="text-[10px] tracking-[0.2em] uppercase opacity-40 hover:opacity-100 transition-opacity duration-200">
                gabrielbalenton@gmail.com
              </Link>
            </div>
          </div>
          <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-[#FAFAFA]/5 flex flex-col md:flex-row justify-between gap-2">
            <p className="text-[10px] tracking-[0.15em] uppercase opacity-20">
              &copy; {new Date().getFullYear()} Organic Theory // Gabriel Balenton
            </p>
            <p className="text-[10px] tracking-[0.15em] uppercase opacity-20">Worldwide</p>
          </div>
        </footer>

        <FloatingCTA />
        <CookieBanner />
      </motion.div>
    </>
  );
}
