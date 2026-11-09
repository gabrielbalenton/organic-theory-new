import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Intro from './Intro';
import Cursor from './Cursor';
import FloatingCTA from './FloatingCTA';
import CookieBanner from './CookieBanner';
import { ScrollProgress } from './ScrollProgress';
import { Chatbot } from './Chatbot';
import { Newsletter } from './Newsletter';

const NAV_LINKS = [
  { to: '/case-studies', label: 'Work' },
  { to: '/services', label: 'Expertise' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function Layout() {
  const location = useLocation();
  const reduceMotion = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [introDone, setIntroDone] = useState(true);

  const headerRef = useRef<HTMLElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  const lastScrollY = useRef(0);
  const rafId = useRef<number>();

  useEffect(() => {
    const measure = () => {
      if (headerRef.current) setHeaderHeight(headerRef.current.offsetHeight);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [scrolled]);

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

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleIntroComplete = () => {
    sessionStorage.setItem('intro_shown_componentry_v2', 'true');
    setShowIntro(false);
    setIntroDone(true);
  };

  return (
    <>
      {showIntro && <Intro onComplete={handleIntroComplete} />}

      <AnimatePresence>
        <motion.div
          key={location.pathname + '_overlay'}
          initial={{ scaleY: 1, transformOrigin: 'top' }}
          animate={{ scaleY: 0, transformOrigin: 'top' }}
          transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1], delay: 0.04 }}
          className="pointer-events-none fixed inset-0 z-[250] bg-[#FAF9F4]"
        />
      </AnimatePresence>

      <motion.div
        initial={introDone ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45 }}
        className="relative flex min-h-screen flex-col overflow-x-clip bg-[#F5F3EE] text-[#292B2A]"
      >
        <motion.header
          ref={headerRef}
          animate={{ y: hidden ? '-100%' : '0%' }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className={`fixed left-0 right-0 top-0 z-50 flex w-full items-center justify-between px-6 transition-all duration-300 md:px-12 ${
            scrolled
              ? 'border-b border-[#292B2A]/10 bg-[#F5F3EE]/95 py-4 backdrop-blur-md'
              : 'bg-[#F5F3EE] py-6'
          }`}
        >
          <Link to="/" className="group z-50 flex items-center gap-3" aria-label="Organic Theory Home">
            <div className="flex items-center font-display text-lg font-bold tracking-[0.12em] text-[#292B2A]">
              <span>O</span>
              <span className="mx-1 text-[#738475]">+</span>
              <span>X</span>
            </div>
            <span className="hidden text-xs font-medium tracking-normal text-[#555B56] md:block">
              Organic Theory
            </span>
          </Link>

          <nav className="z-50 hidden items-center gap-8 text-sm tracking-normal md:flex">
            <Link to="/contact" className="order-last border-b border-[#292B2A] pb-1 text-sm font-medium tracking-normal text-[#292B2A]">Let's talk ↗</Link>
            {NAV_LINKS.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`transition-colors duration-200 ${location.pathname === to ? 'text-[#292B2A]' : 'text-[#555B56] hover:text-[#292B2A]'}`}
              >
                {label}
              </Link>
            ))}
          </nav>

          <button
            className="z-50 p-2 text-[#2F3A45] md:hidden"
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </motion.header>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: reduceMotion ? 0 : 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-[#E8E2DB] px-6"
            >
              {[{ to: '/', label: 'Home' }, ...NAV_LINKS].map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setMenuOpen(false)}
                  className="font-editorial text-4xl tracking-[-0.02em] text-[#292B2A] transition-colors duration-200 hover:text-[#738475]"
                >
                  {label}
                </Link>
              ))}
              <a href="https://www.linkedin.com/in/gabrielbalenton/" target="_blank" rel="noopener noreferrer" className="mt-5 text-[10px] uppercase tracking-[0.28em] text-[#2F3A45]/70 hover:text-[#2F3A45]">
                LinkedIn
              </a>
            </motion.div>
          )}
        </AnimatePresence>

        <main className="w-full flex-grow" style={{ paddingTop: headerHeight }}>
          <Outlet />
        </main>

        <Newsletter />

        <footer className="ot-contrast border-t border-[#FAF9F4]/10 bg-[#2F3A45] px-6 py-16 text-[#FAF9F4] md:px-12 md:py-20">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-4">
            <div>
              <div className="mb-3 font-display text-lg font-bold tracking-[0.3em] text-[#FAF9F4]">O<span className="mx-1 text-[#8DA5B7]">+</span>X</div>
              <p className="mb-4 text-[10px] uppercase tracking-[0.2em] text-[#FAF9F4]/70">Organic Theory</p>
              <p className="max-w-xs text-xs leading-6 text-[#FAF9F4]/80">Search, automation, and systems for brands that want to scale without unnecessary friction.</p>
            </div>

            <FooterColumn title="Work" links={[["/services", "Services"], ["/case-studies", "Case Studies"], ["/process", "Process"]]} />
            <FooterColumn title="Learn" links={[["/insights", "Insights"], ["/courses", "Courses"], ["/tools", "Free Tools"]]} />

            <div>
              <p className="mb-4 text-[9px] font-bold uppercase tracking-[0.28em] text-[#FAF9F4]/65">Connect</p>
              <div className="flex flex-col gap-3">
                <FooterLink to="/about">About</FooterLink>
                <FooterLink to="/contact">Contact</FooterLink>
                <a href="https://www.linkedin.com/in/gabrielbalenton/" target="_blank" rel="noopener noreferrer" className="text-[10px] uppercase tracking-[0.18em] text-[#FAF9F4]/78 transition-colors hover:text-[#FAF9F4]">LinkedIn</a>
                <a href="mailto:gabrielbalenton@gmail.com" className="text-[10px] tracking-[0.12em] text-[#FAF9F4]/55 transition-colors hover:text-[#FAF9F4]">gabrielbalenton@gmail.com</a>
              </div>
            </div>
          </div>
          <div className="mx-auto mt-14 flex max-w-7xl flex-col justify-between gap-3 border-t border-[#FAF9F4]/10 pt-6 md:flex-row">
            <p className="text-[9px] uppercase tracking-[0.16em] text-[#FAF9F4]/32">© {new Date().getFullYear()} Organic Theory · Gabriel Balenton</p>
            <p className="text-[9px] uppercase tracking-[0.16em] text-[#FAF9F4]/32">Worldwide</p>
          </div>
        </footer>

        <FloatingCTA />
        <CookieBanner />
        <Chatbot />
      </motion.div>
    </>
  );
}

function FooterColumn({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <p className="mb-4 text-[9px] font-bold uppercase tracking-[0.28em] text-[#FAF9F4]/35">{title}</p>
      <nav className="flex flex-col gap-3">
        {links.map(([to, label]) => <FooterLink key={to} to={to}>{label}</FooterLink>)}
      </nav>
    </div>
  );
}

function FooterLink({ to, children }: { to: string; children: ReactNode }) {
  return <Link to={to} className="text-[10px] uppercase tracking-[0.18em] text-[#FAF9F4]/55 transition-colors hover:text-[#FAF9F4]">{children}</Link>;
}
