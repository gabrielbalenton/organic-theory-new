import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Loader2, MessageSquare } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const EASE = [0.22, 1, 0.36, 1] as const;

const STARTERS = [
  'My website isn\'t ranking',
  'What does the $400 audit include?',
  'How long does a build take?',
  'Can you help with automation?',
];

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hey — I\'m the Organic Theory assistant. What\'s the biggest problem with your website right now?',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open, messages]);

  const handleOpen = () => {
    setOpen(true);
    setHasOpened(true);
  };

  const send = async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || loading) return;
    setInput('');

    const userMessageCount = messages.filter(m => m.role === 'user').length;
    if (userMessageCount >= 10) {
      setMessages(prev => [...prev, { role: 'user', content }, {
        role: 'assistant',
        content: 'We\'ve covered a lot of ground. To keep going, email gabrielbalenton@gmail.com or book the audit directly — I\'ll give you a full diagnosis.',
      }]);
      return;
    }

    const newMessages: Message[] = [...messages, { role: 'user', content }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
        }),
      });

      if (!res.ok) throw new Error('Request failed');
      const data = await res.json() as { reply?: string };
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply ?? 'Something went wrong. Try again.' }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Something went wrong on my end. Try emailing gabrielbalenton@gmail.com directly.' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  };

  return (
    <>
      {/* Toggle button */}
      <motion.button
        onClick={handleOpen}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 3, ease: EASE }}
        className={`fixed bottom-6 right-6 z-[200] w-14 h-14 bg-[#FAFAFA] text-[#09090B] flex items-center justify-center hover:bg-[#A1A1AA] transition-colors duration-300 shadow-2xl ${open ? 'hidden' : 'flex'}`}
        aria-label="Open chat"
      >
        <MessageSquare size={20} />
        {!hasOpened && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"
          />
        )}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="fixed bottom-6 right-6 z-[200] w-[calc(100vw-3rem)] max-w-sm bg-[#0F0F11] border border-[#FAFAFA]/15 shadow-2xl flex flex-col"
            style={{ height: '480px' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#FAFAFA]/10">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-400 rounded-full" />
                <div>
                  <p className="text-xs font-bold tracking-[0.15em] uppercase text-[#FAFAFA]">Organic Theory</p>
                  <p className="text-[9px] tracking-[0.1em] uppercase opacity-40">Assistant · Online</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-[#FAFAFA]/40 hover:text-[#FAFAFA] transition-colors duration-200"
              >
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] px-4 py-3 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-[#FAFAFA] text-[#09090B] font-medium'
                      : 'bg-[#FAFAFA]/[0.06] text-[#FAFAFA]/80 border border-[#FAFAFA]/8'
                  }`}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="bg-[#FAFAFA]/[0.06] border border-[#FAFAFA]/8 px-4 py-3">
                    <Loader2 size={14} className="text-[#A1A1AA] animate-spin" />
                  </div>
                </div>
              )}

              {/* Starter prompts — only show on first message */}
              {messages.length === 1 && !loading && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {STARTERS.map(s => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="text-[10px] tracking-[0.1em] border border-[#FAFAFA]/15 px-3 py-1.5 text-[#A1A1AA] hover:border-[#FAFAFA]/40 hover:text-[#FAFAFA] transition-all duration-200"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-[#FAFAFA]/10 px-4 py-3 flex items-center gap-3">
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Ask anything…"
                disabled={loading}
                className="flex-1 bg-transparent text-sm text-[#FAFAFA] placeholder:text-[#FAFAFA]/25 focus:outline-none disabled:opacity-40"
              />
              <button
                onClick={() => send()}
                disabled={!input.trim() || loading}
                className="text-[#FAFAFA]/40 hover:text-[#FAFAFA] disabled:opacity-20 transition-colors duration-200 shrink-0"
              >
                <Send size={15} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
