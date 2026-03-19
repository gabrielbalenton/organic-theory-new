import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { addPropertyControls, ControlType } from "framer";

// --- PROPS INTERFACE ---
export interface OrganicTheorySiteProps {
  headline?: string;
  founderName?: string;
}

// --- MAIN COMPONENT ---
export default function OrganicTheorySite({
  headline = "STRATEGIC LOGIC.\nMEASURABLE GROWTH.",
  founderName = "Gabriel Balenton",
}: OrganicTheorySiteProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    brandUrl: "",
    primaryObjective: "",
    currentBottleneck: "",
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`System Brief Request from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nBrand URL: ${formData.brandUrl}\nObjective: ${formData.primaryObjective}\n\nCurrent Bottleneck:\n${formData.currentBottleneck}`
    );
    window.location.href = `mailto:gabrielbalenton@gmail.com?subject=${subject}&body=${body}`;
    setIsSubmitted(true);
  };

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="ot-wrapper">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@700&family=Montserrat:wght@400;500;700&display=swap');

          .ot-wrapper {
              font-family: 'Montserrat', sans-serif;
              background-color: #09090B;
              color: #FAFAFA;
              width: 100%;
              overflow-x: hidden;
              -webkit-font-smoothing: antialiased;
          }

          .ot-dark { background-color: #09090B; color: #FAFAFA; }
          .ot-light { background-color: #F4F4F5; color: #09090B; }
          .ot-border-top { border-top: 1px solid rgba(250, 250, 250, 0.1); }
          .ot-border-top-dark { border-top: 1px solid rgba(9, 9, 11, 0.1); }

          .ot-nav {
              position: fixed;
              top: 0; left: 0; right: 0;
              z-index: 50;
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 2rem 1.5rem;
              mix-blend-mode: difference;
              color: #FAFAFA;
          }
          @media (min-width: 768px) { .ot-nav { padding: 2rem 3rem; } }

          .ot-nav-logo {
              font-family: 'Inter', sans-serif;
              font-size: 1.25rem;
              letter-spacing: 0.368em;
              text-transform: uppercase;
              font-weight: 700;
              cursor: pointer;
          }

          .ot-nav-links {
              display: none;
              gap: 2rem;
              font-size: 0.75rem;
              letter-spacing: 0.2em;
              text-transform: uppercase;
          }
          @media (min-width: 768px) { .ot-nav-links { display: flex; } }
          .ot-nav-link { cursor: pointer; transition: opacity 0.3s; }
          .ot-nav-link:hover { opacity: 0.7; }

          .ot-anchor {
              position: fixed;
              bottom: 2rem; right: 2rem;
              z-index: 40;
              pointer-events: none;
              mix-blend-mode: difference;
              color: #FAFAFA;
          }

          .ot-section {
              padding: 5rem 1.5rem;
              width: 100%;
              position: relative;
          }
          @media (min-width: 768px) { .ot-section { padding: 8rem 3rem; } }

          .ot-container {
              max-width: 80rem;
              margin: 0 auto;
              width: 100%;
          }

          .ot-h1 {
              font-family: 'Inter', sans-serif;
              font-weight: 700;
              text-transform: uppercase;
              letter-spacing: 0.368em;
              line-height: 1.1;
              font-size: 2.25rem;
              margin-bottom: 2rem;
          }
          @media (min-width: 768px) { .ot-h1 { font-size: 4.5rem; } }

          .ot-h2 {
              font-family: 'Inter', sans-serif;
              font-weight: 700;
              text-transform: uppercase;
              letter-spacing: 0.368em;
              line-height: 1.1;
              font-size: 2.25rem;
              margin-bottom: 2rem;
          }

          .ot-p {
              font-size: 0.875rem;
              line-height: 1.8;
              opacity: 0.8;
              margin-bottom: 3rem;
              max-width: 36rem;
          }

          .ot-grid-hero { display: grid; grid-template-columns: 1fr; gap: 4rem; align-items: center; }
          @media (min-width: 1024px) { .ot-grid-hero { grid-template-columns: 1fr 1fr; } }

          .ot-btn {
              display: inline-flex;
              align-items: center;
              gap: 1rem;
              background-color: transparent;
              color: #FAFAFA;
              border: 1px solid rgba(250, 250, 250, 0.2);
              padding: 1rem 2rem;
              font-size: 0.75rem;
              letter-spacing: 0.2em;
              text-transform: uppercase;
              font-weight: 700;
              cursor: pointer;
              transition: all 0.3s;
          }
          .ot-btn:hover { background-color: #FAFAFA; color: #09090B; }

          .ot-logic-card {
              border: 1px solid rgba(9, 9, 11, 0.1);
              padding: 2rem;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              aspect-ratio: 1 / 1;
              position: relative;
              overflow: hidden;
          }
          .ot-logic-symbol { font-family: 'Inter', sans-serif; font-size: 2.25rem; font-weight: 700; }

          .ot-vault-item { display: grid; grid-template-columns: 1fr; gap: 3rem; align-items: center; margin-bottom: 8rem; }
          @media (min-width: 1024px) { .ot-vault-item { grid-template-columns: 5fr 7fr; } }

          .ot-form {
              display: flex;
              flex-direction: column;
              gap: 2rem;
              border: 1px solid rgba(250, 250, 250, 0.1);
              padding: 2rem;
              background-color: #09090B;
              max-width: 48rem;
              margin: 0 auto;
          }

          .ot-input {
              background: transparent;
              border: none;
              border-bottom: 1px solid rgba(250, 250, 250, 0.2);
              padding: 0.75rem 0;
              color: #FAFAFA;
              width: 100%;
          }

          .ot-footer {
              padding: 3rem;
              display: flex;
              justify-content: space-between;
              font-size: 0.75rem;
              letter-spacing: 0.2em;
              text-transform: uppercase;
          }
        `}
      </style>

      <nav className="ot-nav">
        <div className="ot-nav-logo" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          O<span style={{ color: "#A1A1AA" }}>+</span>X
        </div>
        <div className="ot-nav-links">
          <span className="ot-nav-link" onClick={() => scrollTo("services")}>Services</span>
          <span className="ot-nav-link" onClick={() => scrollTo("vault")}>The Vault</span>
          <span className="ot-nav-link" onClick={() => scrollTo("contact")}>Contact</span>
        </div>
      </nav>

      <AnimatePresence>
        {isScrolled && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} exit={{ opacity: 0 }} className="ot-anchor">
            <SimpleMonogram size={64} />
          </motion.div>
        )}
      </AnimatePresence>

      <section id="home" className="ot-section ot-dark">
        <div className="ot-container ot-grid-hero">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="ot-h1">
              {headline.split("\n").map((line, i) => (
                <span key={i} style={{ display: "block", color: i > 0 ? "#A1A1AA" : "inherit" }}>{line}</span>
              ))}
            </h1>
            <p className="ot-p">
              Organic Theory is a specialized digital consultancy founded by {founderName}. I build high-integrity search systems and automated workflows.
            </p>
            <button className="ot-btn" onClick={() => scrollTo("contact")}>
              <span>Request System Brief</span>
              <ArrowRight />
            </button>
          </motion.div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <SimpleMonogram size={400} color="rgba(250,250,250,0.8)" />
          </div>
        </div>
      </section>

      <RevealSection className="ot-section ot-light ot-border-top-dark" id="services">
        <div className="ot-container">
          <h2 className="ot-h2">The O+X Logic</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", marginTop: "4rem" }}>
            <div className="ot-logic-card"><span className="ot-logic-symbol">O</span><span>Foundation</span></div>
            <div className="ot-logic-card"><span className="ot-logic-symbol" style={{ color: "#71717A" }}>X</span><span>The Solve</span></div>
          </div>
        </div>
      </RevealSection>

      <RevealSection className="ot-section ot-light ot-border-top-dark" id="vault">
        <div className="ot-container">
          <h1 className="ot-h1">THE VAULT</h1>
          <div className="ot-vault-item">
            <div>
              <h2 className="ot-h2" style={{ fontSize: "1.875rem" }}>FPX Calibration</h2>
              <p className="ot-p">Optimized site structure and performance.</p>
            </div>
            <div style={{ background: "#eee", aspectRatio: "16/9" }}></div>
          </div>
        </div>
      </RevealSection>

      <RevealSection className="ot-section ot-dark ot-border-top" id="contact">
        <div className="ot-container">
          <h1 className="ot-h1">SYSTEM <span style={{ color: "#A1A1AA" }}>CALIBRATION.</span></h1>
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form key="form" onSubmit={handleSubmit} className="ot-form">
                <input required name="name" onChange={handleFormChange} className="ot-input" placeholder="Name" />
                <input required name="brandUrl" type="url" onChange={handleFormChange} className="ot-input" placeholder="Brand URL" />
                <textarea required name="currentBottleneck" onChange={handleFormChange} rows={4} className="ot-input" placeholder="Bottleneck..." />
                <button type="submit" className="ot-submit-btn">Submit Brief <ArrowRight /></button>
              </motion.form>
            ) : (
              <div style={{ textAlign: "center", padding: "4rem" }}><h3>Brief Received.</h3></div>
            )}
          </AnimatePresence>
        </div>
      </RevealSection>

      <footer className="ot-footer">
        <div>&copy; {new Date().getFullYear()} Organic Theory</div>
        <div className="ot-footer-links">
          <a href="mailto:gabrielbalenton@gmail.com" className="ot-footer-link">Email</a>
        </div>
      </footer>
    </div>
  );
}

function SimpleMonogram({ color = "currentColor", size }: { color?: string; size: number }) {
  return (
    <motion.div animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }} style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" fill="none"><circle cx="50" cy="50" r="42" stroke={color} strokeWidth="1.5" /><path d="M20.3 20.3L79.7 79.7M79.7 20.3L20.3 79.7" stroke={color} strokeWidth="1.5" /></svg>
    </motion.div>
  );
}

function ArrowRight() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>;
}

function RevealSection({ children, className, id }: { children: React.ReactNode; className: string; id: string }) {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

addPropertyControls(OrganicTheorySite, {
  headline: { type: ControlType.String, title: "Headline", defaultValue: "STRATEGIC LOGIC.\nMEASURABLE GROWTH.", displayTextArea: true },
  founderName: { type: ControlType.String, title: "Founder Name", defaultValue: "Gabriel Balenton" },
});