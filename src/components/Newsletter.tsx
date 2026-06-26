import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

const EASE = [0.22, 1, 0.36, 1] as const;

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus('sending');
    try {
      await emailjs.send(
        'service_dm59y3r',
        'template_y412fxo',
        { from_name: 'Newsletter Signup', from_email: email, service: 'Newsletter', message: `New newsletter signup: ${email}` },
        'vql7w-WVn4lGK2Up_'
      );
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="bg-[#09090B] border-t border-[#FAFAFA]/10 py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#A1A1AA] mb-3">[ INSIGHTS ]</p>
          <h3 className="text-xl md:text-2xl font-display uppercase tracking-wide text-[#FAFAFA] mb-2">
            Stay sharp.
          </h3>
          <p className="text-sm opacity-40 leading-relaxed max-w-sm">
            Monthly insights on search, automation, and systems. No fluff. Unsubscribe anytime.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="flex items-center gap-3"
            >
              <CheckCircle size={18} className="text-green-400 shrink-0" />
              <p className="text-sm text-[#FAFAFA]/70">You're in. First issue lands next month.</p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className="flex gap-0 border border-[#FAFAFA]/20 focus-within:border-[#FAFAFA]/50 transition-colors duration-300"
            >
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                disabled={status === 'sending'}
                className="flex-1 bg-transparent px-5 py-3.5 text-sm text-[#FAFAFA] placeholder:text-[#FAFAFA]/25 focus:outline-none disabled:opacity-40"
              />
              <button
                type="submit"
                disabled={status === 'sending' || !email.trim()}
                className="px-5 border-l border-[#FAFAFA]/20 text-[#FAFAFA]/50 hover:text-[#FAFAFA] hover:bg-[#FAFAFA]/[0.04] disabled:opacity-30 transition-all duration-200"
              >
                <ArrowRight size={16} />
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        {status === 'error' && (
          <p className="text-xs text-red-400 md:col-start-2">Something went wrong. Try again.</p>
        )}
      </div>
    </div>
  );
}
