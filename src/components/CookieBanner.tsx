import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) setTimeout(() => setShow(true), 3000);
  }, []);

  const accept = () => { localStorage.setItem('cookie_consent', 'accepted'); setShow(false); };
  const decline = () => { localStorage.setItem('cookie_consent', 'declined'); setShow(false); };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-8 md:max-w-sm z-[150] bg-[#111] border border-[#FAFAFA]/10 p-5"
        >
          <p className="text-xs leading-relaxed opacity-70 mb-4">
            This site uses cookies to understand how visitors interact with it. No data is sold.
          </p>
          <div className="flex gap-3">
            <button
              onClick={accept}
              className="text-[10px] tracking-[0.2em] uppercase font-bold bg-[#FAFAFA] text-[#09090B] px-4 py-2 hover:bg-[#A1A1AA] transition-colors duration-200"
            >
              Accept
            </button>
            <button
              onClick={decline}
              className="text-[10px] tracking-[0.2em] uppercase font-bold border border-[#FAFAFA]/20 px-4 py-2 hover:border-[#FAFAFA]/50 transition-colors duration-200 opacity-60"
            >
              Decline
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
