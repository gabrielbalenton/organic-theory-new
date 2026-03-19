import { useEffect, useState } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Monogram from './Monogram';

export default function Layout() {
  const location = useLocation();
  const isDark = location.pathname === '/' || location.pathname === '/contact';
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Force scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Set theme class on body
  useEffect(() => {
    document.body.className = isDark ? 'dark-theme' : 'light-theme';
  }, [isDark]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden">
      <Monogram />
      
      <header className="w-full py-8 px-6 md:px-12 flex justify-between items-center fixed top-0 z-50 mix-blend-difference text-[#FAFAFA]">
        <Link 
          to="/" 
          className="flex items-center gap-4 group z-50" 
          onClick={() => setIsMenuOpen(false)}
          aria-label="Organic Theory Home"
        >
          {/* PERFORMANCE: Static tracking avoids JS-forced reflows */}
          <div className="flex items-center font-display font-bold text-xl tracking-[0.3em]">
            <span>O</span>
            <span className="text-[#A1A1AA] mx-1">+</span>
            <span>X</span>
          </div>
          <span className="hidden md:block font-sans text-[10px] tracking-[0.2em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Organic Theory
          </span>
        </Link>
        
        <nav className="hidden md:flex gap-8 font-sans text-[10px] tracking-[0.2em] uppercase z-50">
          <Link to="/services" className="hover:opacity-70 transition-opacity">Services</Link>
          <Link to="/vault" className="hover:opacity-70 transition-opacity">The Vault</Link>
          <Link to="/contact" className="hover:opacity-70 transition-opacity">Contact</Link>
        </nav>
        
        <button 
          className="md:hidden z-50 p-2" 
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-[#09090B] text-[#FAFAFA] flex flex-col items-center justify-center gap-12 font-display text-2xl tracking-[0.368em] uppercase"
          >
            <Link to="/" onClick={toggleMenu} className="hover:text-[#A1A1AA]">Home</Link>
            <Link to="/services" onClick={toggleMenu} className="hover:text-[#A1A1AA]">Services</Link>
            <Link to="/vault" onClick={toggleMenu} className="hover:text-[#A1A1AA]">The Vault</Link>
            <Link to="/contact" onClick={toggleMenu} className="hover:text-[#A1A1AA]">Contact</Link>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-grow w-full pt-24">
        <Outlet />
      </main>
      
      <footer className={`py-12 px-6 md:px-12 border-t ${isDark ? 'border-[#FAFAFA]/10' : 'border-[#09090B]/10'} flex flex-col md:flex-row justify-between items-center gap-6 font-sans text-[10px] tracking-[0.2em] uppercase mt-24 opacity-60`}>
        <div className="text-center md:text-left w-full">
          &copy; {new Date().getFullYear()} Organic Theory // Gabriel Balenton
        </div>
      </footer>
    </div>
  );
}