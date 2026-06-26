import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import emailjs from '@emailjs/browser';
import { RevealSection } from '../components/RevealSection';

const EASE = [0.22, 1, 0.36, 1] as const;

const SERVICES = [
  { value: '', label: 'Select a service' },
  { value: 'Search & Systems Audit — $400', label: 'Search & Systems Audit — $400' },
  { value: 'Search Architecture — from $1,500', label: 'Search Architecture — from $1,500' },
  { value: 'AI Automation — from $1,800', label: 'AI Automation — from $1,800' },
  { value: 'Workflow Engineering — from $1,500', label: 'Workflow Engineering — from $1,500' },
  { value: 'Interface Design & Dev — from $2,000', label: 'Interface Design & Dev — from $2,000' },
  { value: 'Content Strategy — from $1,200/mo', label: 'Content Strategy — from $1,200/mo' },
  { value: 'Email & Automation — from $800/mo', label: 'Email & Automation — from $800/mo' },
  { value: 'Not sure yet', label: "Not sure yet — let's talk" },
];

type Status = 'idle' | 'sending' | 'success' | 'error';
interface FormData { name: string; email: string; service: string; message: string; }

export default function Contact() {
  const [form, setForm] = useState<FormData>({ name: '', email: '', service: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await emailjs.send(
        'service_dm59y3r',
        'template_y412fxo',
        {
          from_name: form.name,
          from_email: form.email,
          service: form.service || 'Not specified',
          message: form.message,
        },
        'vql7w-WVn4lGK2Up_'
      );
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const reset = () => { setForm({ name: '', email: '', service: '', message: '' }); setStatus('idle'); };

  const inputClass = 'w-full bg-transparent border-b border-[#FAFAFA]/15 py-3 text-sm text-[#FAFAFA] focus:outline-none focus:border-[#FAFAFA]/60 transition-colors duration-200 placeholder:text-[#FAFAFA]/30';
  const labelClass = 'text-[10px] tracking-[0.25em] uppercase text-[#A1A1AA] block mb-2 font-bold';

  const schemaContact = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Organic Theory',
    url: 'https://organictheory.vercel.app/contact',
    description: 'Start a project with Organic Theory. Book an audit or brief a full system build.',
  };

  return (
    <>
      <Helmet>
        <title>Start a Conversation | Contact Organic Theory</title>
        <meta name="description" content="Ready to build something? Book a $400 audit or brief a full project. Organic Theory responds within 24 hours." />
        <meta property="og:title" content="Contact Organic Theory" />
        <meta property="og:url" content="https://organictheory.vercel.app/contact" />
        <link rel="canonical" href="https://organictheory.vercel.app/contact" />
        <script type="application/ld+json">{JSON.stringify(schemaContact)}</script>
      </Helmet>

      <div className="w-full min-h-screen bg-[#09090B] text-[#FAFAFA]">

        {/* Header */}
        <section className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }}>
            <p className="text-[10px] text-[#A1A1AA] mb-6 font-bold tracking-[0.3em] uppercase">[ INITIATE BRIEF ]</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl leading-[1.0] mb-8 font-display uppercase tracking-tight">
              Let&rsquo;s build<br />
              <span className="text-[#A1A1AA]">something.</span>
            </h1>
            <p className="text-sm md:text-base opacity-50 max-w-md leading-relaxed">
              Describe the problem. I&rsquo;ll review it and respond within 24 hours.
            </p>
          </motion.div>
        </section>

        <RevealSection className="pb-28 px-6 md:px-12 border-t border-[#FAFAFA]/10">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">

            {/* Left — info */}
            <div className="pt-12 space-y-10">
              {[
                { label: 'Start here', value: 'Book the $400 audit to see exactly what to fix first.' },
                { label: 'Email', value: 'gabrielbalenton@gmail.com' },
                { label: 'LinkedIn', value: 'linkedin.com/in/gabrielbalenton' },
                { label: 'Response time', value: 'Within 24 hours.' },
                { label: 'Based', value: 'Worldwide — fully remote.' },
              ].map(({ label, value }) => (
                <div key={label} className="flex flex-col gap-1">
                  <span className="text-[10px] tracking-[0.3em] uppercase text-[#A1A1AA] font-bold">{label}</span>
                  <span className="text-sm opacity-60">{value}</span>
                </div>
              ))}
            </div>

            {/* Right — form */}
            <div className="pt-12">
              <AnimatePresence mode="wait">

                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="border border-[#FAFAFA]/10 p-12 flex flex-col items-start gap-6"
                  >
                    <CheckCircle size={32} className="text-[#A1A1AA]" />
                    <div>
                      <h3 className="text-xl font-display uppercase tracking-widest mb-3">Received.</h3>
                      <p className="text-sm opacity-50 leading-relaxed">
                        Your brief has been sent. I&rsquo;ll review it and get back to you within 24 hours.
                      </p>
                    </div>
                    <button onClick={reset} className="text-[10px] tracking-[0.2em] uppercase font-bold opacity-40 hover:opacity-100 transition-opacity duration-200">
                      Send another &rarr;
                    </button>
                  </motion.div>

                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-8"
                  >
                    {[
                      { name: 'name', label: 'Your name', type: 'text', placeholder: 'Gabriel Balenton' },
                      { name: 'email', label: 'Email address', type: 'email', placeholder: 'hello@yoursite.com' },
                    ].map(field => (
                      <div key={field.name}>
                        <label className={labelClass}>{field.label}</label>
                        <input
                          type={field.type}
                          name={field.name}
                          required
                          placeholder={field.placeholder}
                          value={form[field.name as keyof FormData]}
                          onChange={handleChange}
                          className={inputClass}
                        />
                      </div>
                    ))}

                    <div>
                      <label className={labelClass}>Service interest</label>
                      <select
                        name="service"
                        value={form.service}
                        onChange={handleChange}
                        className={`${inputClass} appearance-none`}
                        style={{ background: 'transparent' }}
                      >
                        {SERVICES.map(s => (
                          <option key={s.value} value={s.value} className="bg-[#09090B] text-[#FAFAFA]">
                            {s.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className={labelClass}>Tell me about the problem</label>
                      <textarea
                        name="message"
                        required
                        placeholder="What's the friction? What are you trying to build or fix?"
                        value={form.message}
                        onChange={handleChange}
                        rows={5}
                        className={`${inputClass} resize-none`}
                      />
                    </div>

                    {status === 'error' && (
                      <div className="flex items-center gap-3 text-sm opacity-60">
                        <AlertCircle size={16} />
                        Something went wrong. Try again or email gabrielbalenton@gmail.com directly.
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="w-full flex items-center justify-center gap-4 group bg-[#FAFAFA] text-[#09090B] px-8 py-4 hover:bg-[#A1A1AA] transition-colors duration-300 disabled:opacity-50"
                    >
                      {status === 'sending' ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          <span className="text-[10px] tracking-[0.2em] uppercase font-bold">Sending&hellip;</span>
                        </>
                      ) : (
                        <>
                          <span className="text-[10px] tracking-[0.2em] uppercase font-bold">Send Brief</span>
                          <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform duration-300" />
                        </>
                      )}
                    </button>
                  </motion.form>
                )}

              </AnimatePresence>
            </div>
          </div>
        </RevealSection>
      </div>
    </>
  );
}
