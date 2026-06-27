import React, { useState, useEffect } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ChevronDown, CheckCircle, Download, ArrowLeft, Lock, X, ArrowRight, BookOpen, Lightbulb, AlertTriangle, Info } from 'lucide-react';
import { courses } from '../data/coursesData';
import { lessonContent, type Block } from '../data/lessonContent';

const EASE = [0.22, 1, 0.36, 1] as const;

const TAG_COLORS: Record<string, string> = {
  SEO: 'text-blue-400',
  Automation: 'text-amber-400',
  AEO: 'text-purple-400',
};

const CALLOUT_STYLES = {
  tip: { border: 'border-green-400/20', bg: 'bg-green-400/[0.04]', icon: Lightbulb, iconColor: 'text-green-400', titleColor: 'text-green-400' },
  warning: { border: 'border-amber-400/20', bg: 'bg-amber-400/[0.04]', icon: AlertTriangle, iconColor: 'text-amber-400', titleColor: 'text-amber-400' },
  info: { border: 'border-blue-400/20', bg: 'bg-blue-400/[0.04]', icon: Info, iconColor: 'text-blue-400', titleColor: 'text-blue-400' },
  success: { border: 'border-emerald-400/20', bg: 'bg-emerald-400/[0.04]', icon: CheckCircle, iconColor: 'text-emerald-400', titleColor: 'text-emerald-400' },
};

function ContentRenderer({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-5">
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'paragraph':
            return <p key={i} className="text-[#FAFAFA]/70 leading-relaxed text-[15px]">{block.text}</p>;

          case 'heading':
            return <h2 key={i} className="text-lg font-display uppercase tracking-wide text-[#FAFAFA] mt-8 mb-3 pt-4 border-t border-[#FAFAFA]/8 first:mt-0 first:pt-0 first:border-t-0">{block.text}</h2>;

          case 'subheading':
            return <h3 key={i} className="text-sm font-bold tracking-[0.1em] uppercase text-[#A1A1AA] mt-5 mb-2">{block.text}</h3>;

          case 'bullets':
            return (
              <ul key={i} className="space-y-2.5">
                {block.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-[#FAFAFA]/30 rounded-full shrink-0 mt-2" />
                    <span className="text-[#FAFAFA]/65 text-[15px] leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            );

          case 'numbered':
            return (
              <ol key={i} className="space-y-3">
                {block.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-4">
                    <span className="text-[10px] font-bold tracking-[0.2em] text-[#A1A1AA]/40 w-5 shrink-0 mt-1 text-right">{j + 1}</span>
                    <span className="text-[#FAFAFA]/65 text-[15px] leading-relaxed">{item}</span>
                  </li>
                ))}
              </ol>
            );

          case 'callout': {
            const style = CALLOUT_STYLES[block.variant];
            const Icon = style.icon;
            return (
              <div key={i} className={`border ${style.border} ${style.bg} p-5 rounded-sm`}>
                <div className="flex items-start gap-3">
                  <Icon size={15} className={`${style.iconColor} shrink-0 mt-0.5`} />
                  <div>
                    <p className={`text-[10px] font-bold tracking-[0.15em] uppercase ${style.titleColor} mb-1.5`}>{block.title}</p>
                    <p className="text-[#FAFAFA]/60 text-[14px] leading-relaxed whitespace-pre-line">{block.text}</p>
                  </div>
                </div>
              </div>
            );
          }

          case 'table':
            return (
              <div key={i} className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-[#FAFAFA]/15">
                      {block.headers.map((h, j) => (
                        <th key={j} className="text-left text-[10px] font-bold tracking-[0.2em] uppercase text-[#A1A1AA]/50 pb-3 pr-6">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, j) => (
                      <tr key={j} className="border-b border-[#FAFAFA]/5">
                        {row.map((cell, k) => (
                          <td key={k} className={`py-3 pr-6 text-[14px] leading-snug ${k === 0 ? 'text-[#FAFAFA]/80 font-medium' : 'text-[#FAFAFA]/50'}`}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );

          case 'divider':
            return <hr key={i} className="border-[#FAFAFA]/10" />;

          default:
            return null;
        }
      })}
    </div>
  );
}

function AccessGate({ courseId, onUnlock }: { courseId: string; onUnlock: () => void }) {
  const [key, setKey] = useState('');
  const [error, setError] = useState(false);
  const course = courses.find(c => c.id === courseId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (key.trim().toLowerCase() === course?.accessKey) {
      localStorage.setItem(`course_access_${courseId}`, 'true');
      onUnlock();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090B] text-[#FAFAFA] flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="w-full max-w-md"
      >
        <Link to="/courses" className="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-[#A1A1AA]/50 hover:text-[#A1A1AA] transition-colors mb-12">
          <ArrowLeft size={12} />
          Back to courses
        </Link>
        <div className="border border-[#FAFAFA]/10 p-10">
          <div className="w-12 h-12 border border-[#FAFAFA]/15 flex items-center justify-center mb-8">
            <Lock size={18} className="text-[#A1A1AA]/50" />
          </div>
          <h1 className="text-2xl font-display uppercase tracking-tight mb-2">{course?.title}</h1>
          <p className="text-sm opacity-40 mb-8 leading-relaxed">Enter the access key from your purchase confirmation email to unlock your course.</p>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              placeholder="Access key"
              value={key}
              onChange={e => { setKey(e.target.value); setError(false); }}
              className={`w-full bg-transparent border px-4 py-3 text-sm text-[#FAFAFA] placeholder:text-[#FAFAFA]/20 focus:outline-none transition-colors ${error ? 'border-red-400/50' : 'border-[#FAFAFA]/15 focus:border-[#FAFAFA]/40'}`}
            />
            {error && <p className="text-xs text-red-400">Incorrect access key. Check your purchase email.</p>}
            <button type="submit" className="w-full bg-[#FAFAFA] text-[#09090B] py-3 text-[10px] tracking-[0.2em] uppercase font-bold hover:bg-[#A1A1AA] transition-colors duration-300">
              Unlock Course
            </button>
          </form>
          <div className="mt-6 pt-6 border-t border-[#FAFAFA]/8">
            <p className="text-[10px] opacity-30 leading-relaxed">
              Don't have a key?{' '}
              <a href={course?.checkoutUrl} target="_blank" rel="noopener noreferrer" className="underline hover:opacity-60 transition-opacity">Purchase the course</a>{' '}
              to get instant access.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function CoursePlayer() {
  const { courseId } = useParams<{ courseId: string }>();
  const [searchParams] = useSearchParams();
  const course = courses.find(c => c.id === courseId);

  const [hasAccess, setHasAccess] = useState(false);
  const [activeModule, setActiveModule] = useState(0);
  const [activeLesson, setActiveLesson] = useState(0);
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [openModule, setOpenModule] = useState<number | null>(0);

  useEffect(() => {
    if (!course) return;
    const urlKey = searchParams.get('access');
    if (urlKey && urlKey === course.accessKey) {
      localStorage.setItem(`course_access_${course.id}`, 'true');
      setHasAccess(true);
      return;
    }
    if (localStorage.getItem(`course_access_${course.id}`) === 'true') {
      setHasAccess(true);
    }
  }, [course, searchParams]);

  useEffect(() => {
    if (!course) return;
    const saved = localStorage.getItem(`course_completed_${course.id}`);
    if (saved) setCompleted(new Set(JSON.parse(saved)));
  }, [course]);

  // Scroll to top when lesson changes
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [activeModule, activeLesson]);

  if (!course) {
    return (
      <div className="min-h-screen bg-[#09090B] text-[#FAFAFA] flex items-center justify-center">
        <div className="text-center">
          <p className="text-sm opacity-40 mb-4">Course not found.</p>
          <Link to="/courses" className="text-[10px] tracking-[0.2em] uppercase underline opacity-40 hover:opacity-80">Back to courses</Link>
        </div>
      </div>
    );
  }

  if (!hasAccess) return <AccessGate courseId={course.id} onUnlock={() => setHasAccess(true)} />;

  const currentLesson = course.modules[activeModule]?.lessons[activeLesson];
  const lessonKey = `${activeModule}-${activeLesson}`;
  const contentKey = `${course.id}__${activeModule}__${activeLesson}`;
  const content = lessonContent[contentKey];
  const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const completedCount = completed.size;

  const markComplete = () => {
    const next = new Set(completed);
    next.add(lessonKey);
    setCompleted(next);
    localStorage.setItem(`course_completed_${course.id}`, JSON.stringify([...next]));
    const mod = course.modules[activeModule];
    if (activeLesson < mod.lessons.length - 1) {
      setActiveLesson(l => l + 1);
    } else if (activeModule < course.modules.length - 1) {
      setActiveModule(m => m + 1);
      setActiveLesson(0);
      setOpenModule(activeModule + 1);
    }
  };

  const goToLesson = (modIdx: number, lessonIdx: number) => {
    setActiveModule(modIdx);
    setActiveLesson(lessonIdx);
  };

  return (
    <>
      <Helmet>
        <title>{course.title} | Organic Theory</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="min-h-screen bg-[#09090B] text-[#FAFAFA] flex flex-col">

        {/* Top bar */}
        <header className="fixed top-0 left-0 right-0 z-50 h-14 bg-[#09090B]/95 backdrop-blur border-b border-[#FAFAFA]/10 flex items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-4">
            <Link to="/courses" className="text-[#A1A1AA]/50 hover:text-[#A1A1AA] transition-colors">
              <ArrowLeft size={16} />
            </Link>
            <div className="hidden md:block w-px h-4 bg-[#FAFAFA]/15" />
            <div className="hidden md:flex items-center gap-3">
              <span className={`text-[9px] font-bold tracking-[0.25em] uppercase ${TAG_COLORS[course.tag]}`}>{course.tag}</span>
              <span className="text-xs opacity-40 font-display uppercase tracking-wide">{course.title}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-3">
              <div className="w-28 h-0.5 bg-[#FAFAFA]/10 relative overflow-hidden">
                <motion.div
                  className="absolute left-0 top-0 h-full bg-[#FAFAFA]/60"
                  style={{ width: `${(completedCount / totalLessons) * 100}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
              <span className="text-[10px] tracking-[0.1em] text-[#A1A1AA]/40">{completedCount}/{totalLessons}</span>
            </div>
            <a
              href={course.pdfPath}
              download
              className="flex items-center gap-2 border border-[#FAFAFA]/15 px-3 py-1.5 text-[10px] tracking-[0.15em] uppercase text-[#A1A1AA]/60 hover:border-[#FAFAFA]/30 hover:text-[#FAFAFA] transition-all duration-200"
            >
              <Download size={12} />
              <span className="hidden sm:inline">PDF</span>
            </a>
            <button
              onClick={() => setSidebarOpen(o => !o)}
              className="flex items-center gap-2 border border-[#FAFAFA]/15 px-3 py-1.5 text-[10px] tracking-[0.15em] uppercase text-[#A1A1AA]/60 hover:border-[#FAFAFA]/30 hover:text-[#FAFAFA] transition-all duration-200"
            >
              {sidebarOpen ? <X size={12} /> : <BookOpen size={12} />}
              <span className="hidden sm:inline">{sidebarOpen ? 'Hide' : 'Lessons'}</span>
            </button>
          </div>
        </header>

        {/* Main layout */}
        <div className="flex flex-1 pt-14">

          {/* Sidebar */}
          <AnimatePresence>
            {sidebarOpen && (
              <motion.aside
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 300, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="hidden md:flex flex-col border-r border-[#FAFAFA]/10 overflow-hidden shrink-0 sticky top-14 h-[calc(100vh-3.5rem)]"
                style={{ minWidth: 0 }}
              >
                <div className="p-5 border-b border-[#FAFAFA]/10 shrink-0">
                  <p className="text-[9px] tracking-[0.3em] uppercase text-[#A1A1AA]/40 mb-2">Progress</p>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-0.5 bg-[#FAFAFA]/10 relative overflow-hidden">
                      <motion.div className="absolute left-0 top-0 h-full bg-[#FAFAFA]/60" style={{ width: `${(completedCount / totalLessons) * 100}%` }} />
                    </div>
                    <span className="text-[10px] text-[#A1A1AA]/40 shrink-0">{completedCount}/{totalLessons}</span>
                  </div>
                </div>

                <nav className="flex-1 overflow-y-auto py-3">
                  {course.modules.map((mod, modIdx) => (
                    <div key={modIdx}>
                      <button
                        onClick={() => setOpenModule(openModule === modIdx ? null : modIdx)}
                        className="w-full flex items-center justify-between px-5 py-3 hover:bg-[#FAFAFA]/[0.03] transition-colors"
                      >
                        <div className="flex items-center gap-3 text-left min-w-0">
                          <span className="text-[10px] text-[#A1A1AA]/30 font-bold shrink-0">0{modIdx + 1}</span>
                          <span className="text-[11px] font-bold tracking-wide uppercase truncate">{mod.title}</span>
                        </div>
                        <ChevronDown size={11} className={`text-[#A1A1AA]/30 transition-transform duration-200 shrink-0 ml-2 ${openModule === modIdx ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {openModule === modIdx && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: 'auto' }}
                            exit={{ height: 0 }}
                            transition={{ duration: 0.25, ease: EASE }}
                            className="overflow-hidden"
                          >
                            {mod.lessons.map((lesson, lessonIdx) => {
                              const lKey = `${modIdx}-${lessonIdx}`;
                              const isActive = activeModule === modIdx && activeLesson === lessonIdx;
                              const isDone = completed.has(lKey);
                              return (
                                <button
                                  key={lessonIdx}
                                  onClick={() => goToLesson(modIdx, lessonIdx)}
                                  className={`w-full flex items-start gap-3 px-5 py-2.5 text-left transition-colors ${isActive ? 'bg-[#FAFAFA]/[0.07]' : 'hover:bg-[#FAFAFA]/[0.03]'}`}
                                >
                                  <div className="shrink-0 mt-0.5 w-4 h-4 flex items-center justify-center">
                                    {isDone ? <CheckCircle size={12} className="text-green-400" /> : isActive ? <div className="w-2 h-2 bg-[#FAFAFA] rounded-full" /> : <div className="w-2 h-2 border border-[#FAFAFA]/20 rounded-full" />}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className={`text-[11px] leading-snug ${isActive ? 'text-[#FAFAFA]' : 'text-[#FAFAFA]/45'}`}>{lesson.title}</p>
                                    {lesson.duration && <p className="text-[10px] text-[#A1A1AA]/25 mt-0.5">{lesson.duration}</p>}
                                  </div>
                                </button>
                              );
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </nav>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* Main content */}
          <main className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeModule}-${activeLesson}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="max-w-3xl mx-auto px-6 md:px-12 py-12"
              >
                {/* Lesson header */}
                <div className="mb-10">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[10px] tracking-[0.25em] uppercase text-[#A1A1AA]/30">
                      Module {activeModule + 1} · Lesson {activeLesson + 1}
                    </span>
                    {content && (
                      <>
                        <span className="text-[#FAFAFA]/10">·</span>
                        <span className="text-[10px] tracking-[0.15em] uppercase text-[#A1A1AA]/30">{content.readTime} read</span>
                      </>
                    )}
                  </div>
                  <h1 className="text-2xl md:text-3xl font-display uppercase tracking-tight leading-tight">
                    {currentLesson?.title}
                  </h1>
                </div>

                {/* Lesson content */}
                {content ? (
                  <ContentRenderer blocks={content.blocks} />
                ) : (
                  <div className="border border-[#FAFAFA]/10 p-8 text-center">
                    <BookOpen size={24} className="text-[#A1A1AA]/20 mx-auto mb-3" />
                    <p className="text-sm opacity-30">Content for this lesson is being added shortly.</p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-3 mt-12 pt-8 border-t border-[#FAFAFA]/10">
                  <button
                    onClick={markComplete}
                    disabled={completed.has(lessonKey)}
                    className={`inline-flex items-center gap-2.5 px-6 py-3 text-[10px] tracking-[0.2em] uppercase font-bold transition-all duration-300 ${
                      completed.has(lessonKey)
                        ? 'bg-green-400/10 border border-green-400/20 text-green-400 cursor-default'
                        : 'bg-[#FAFAFA] text-[#09090B] hover:bg-[#A1A1AA]'
                    }`}
                  >
                    <CheckCircle size={13} />
                    <span>{completed.has(lessonKey) ? 'Completed' : 'Mark complete & continue'}</span>
                  </button>

                  <a
                    href={course.pdfPath}
                    download
                    className="inline-flex items-center gap-2 border border-[#FAFAFA]/15 px-5 py-3 text-[10px] tracking-[0.15em] uppercase text-[#A1A1AA]/60 hover:border-[#FAFAFA]/30 hover:text-[#FAFAFA] transition-all duration-200"
                  >
                    <Download size={12} />
                    Download PDF Workbook
                  </a>
                </div>

                {/* Next lesson */}
                {(() => {
                  const mod = course.modules[activeModule];
                  const hasNextLesson = activeLesson < mod.lessons.length - 1;
                  const hasNextModule = activeModule < course.modules.length - 1;
                  if (!hasNextLesson && !hasNextModule) return null;
                  const nextMod = hasNextLesson ? activeModule : activeModule + 1;
                  const nextLesson = hasNextLesson ? activeLesson + 1 : 0;
                  const nextLessonData = course.modules[nextMod]?.lessons[nextLesson];
                  return (
                    <div className="border-t border-[#FAFAFA]/10 pt-8 mt-8">
                      <p className="text-[10px] tracking-[0.25em] uppercase text-[#A1A1AA]/30 mb-3">Up next</p>
                      <button
                        onClick={() => { goToLesson(nextMod, nextLesson); setOpenModule(nextMod); }}
                        className="flex items-center justify-between w-full border border-[#FAFAFA]/10 bg-[#FAFAFA]/[0.02] px-6 py-4 hover:border-[#FAFAFA]/20 hover:bg-[#FAFAFA]/[0.04] transition-all duration-300 group text-left"
                      >
                        <div>
                          <p className="text-[10px] tracking-[0.15em] uppercase text-[#A1A1AA]/30 mb-1">
                            Module {nextMod + 1} · Lesson {nextLesson + 1}
                          </p>
                          <p className="text-sm font-bold">{nextLessonData?.title}</p>
                        </div>
                        <ArrowRight size={16} className="text-[#A1A1AA]/30 group-hover:text-[#FAFAFA] group-hover:translate-x-1 transition-all duration-300 shrink-0 ml-4" />
                      </button>
                    </div>
                  );
                })()}
              </motion.div>
            </AnimatePresence>

            {/* Mobile lesson list */}
            <div className="md:hidden border-t border-[#FAFAFA]/10 px-6 py-6">
              <p className="text-[10px] tracking-[0.3em] uppercase text-[#A1A1AA]/40 mb-4">Course content</p>
              {course.modules.map((mod, modIdx) => (
                <div key={modIdx} className="mb-2">
                  <button
                    onClick={() => setOpenModule(openModule === modIdx ? null : modIdx)}
                    className="w-full flex items-center justify-between py-3 text-left"
                  >
                    <span className="text-xs font-bold uppercase tracking-wide">{mod.title}</span>
                    <ChevronDown size={12} className={`text-[#A1A1AA]/30 transition-transform ${openModule === modIdx ? 'rotate-180' : ''}`} />
                  </button>
                  {openModule === modIdx && (
                    <div className="space-y-1 pl-2 mb-2">
                      {mod.lessons.map((lesson, lessonIdx) => {
                        const lKey = `${modIdx}-${lessonIdx}`;
                        const isActive = activeModule === modIdx && activeLesson === lessonIdx;
                        const isDone = completed.has(lKey);
                        return (
                          <button
                            key={lessonIdx}
                            onClick={() => { goToLesson(modIdx, lessonIdx); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                            className={`w-full flex items-center gap-3 py-2.5 px-3 text-left ${isActive ? 'bg-[#FAFAFA]/[0.07]' : ''}`}
                          >
                            {isDone ? <CheckCircle size={12} className="text-green-400 shrink-0" /> : <div className={`w-2 h-2 rounded-full shrink-0 ${isActive ? 'bg-[#FAFAFA]' : 'border border-[#FAFAFA]/20'}`} />}
                            <span className="text-xs opacity-60">{lesson.title}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
