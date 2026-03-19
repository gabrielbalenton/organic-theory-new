import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { Helmet } from 'react-helmet-async'; 
import { RevealSection } from '../components/RevealSection';
import { contactData } from '../data/contactData';

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '', 
    brandUrl: '',
    primaryObjective: '',
    currentBottleneck: ''
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Simulation of brief submission for Vercel environment
    setIsSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <>
      <Helmet>
        <title>Initiate Brief | Contact Organic Theory for Strategic SEO</title>
        <meta name="description" content="Ready to solve operational friction? Submit a project brief to Organic Theory for expert Search Architecture and Workflow Automation consulting." />
        <link rel="canonical" href="https://organictheory.vercel.app/contact" />
      </Helmet>

      <div className="w-full min-h-screen bg-[#09090B] text-[#FAFAFA]">
        <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto pt-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-xs md:text-sm text-[#A1A1AA] mb-8 font-bold tracking-[0.2em] uppercase">
              [ INITIATE BRIEF ]
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl leading-[1.1] mb-8 font-display uppercase">
              LET’S WORK <br />
              <span className="text-[#A1A1AA]">TOGETHER.</span>
            </h1>
            
            <a 
              href={contactData.whatsappLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-4 group border border-[#FAFAFA]/20 px-8 py-4 hover:bg-[#FAFAFA] hover:text-[#09090B] transition-all duration-300"
            >
              <span className="text-xs tracking-[0.2em] uppercase font-bold">Message me on WhatsApp</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </section>

        <RevealSection className="py-20 px-6 md:px-12 border-t border-[#FAFAFA]/10">
          <div className="max-w-3xl mx-auto">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  onSubmit={handleSubmit}
                  className="space-y-8 border border-[#FAFAFA]/10 p-8 md:p-12 bg-[#09090B]"
                >
                  <div className="space-y-2">
                    <label className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] block">Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-[#FAFAFA]/20 py-3 text-sm focus:outline-none focus:border-[#FAFAFA] transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] block">Email</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-[#FAFAFA]/20 py-3 text-sm focus:outline-none focus:border-[#FAFAFA] transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] block">Project Details</label>
                    <textarea
                      name="currentBottleneck"
                      required
                      value={formData.currentBottleneck}
                      onChange={handleChange}
                      rows={4}
                      className="w-full bg-transparent border-b border-[#FAFAFA]/20 py-3 text-sm focus:outline-none focus:border-[#FAFAFA] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-4 group bg-[#FAFAFA] text-[#09090B] px-8 py-4 hover:bg-[#A1A1AA] transition-all duration-300"
                  >
                    <span className="text-xs tracking-[0.2em] uppercase font-bold">Submit Brief</span>
                    <ArrowRight size={16} />
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border border-[#FAFAFA]/10 p-12 text-center flex flex-col items-center justify-center"
                >
                  <Check size={48} className="mb-4 text-[#A1A1AA]" />
                  <h3 className="text-2xl font-display uppercase tracking-widest">Received.</h3>
                  <p className="text-sm opacity-80 mt-4">{contactData.successMessage}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </RevealSection>
      </div>
    </>
  );
}