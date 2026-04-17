'use client';

import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Star,
  Zap,
  Users,
} from 'lucide-react';
import { GLSLHills } from '@/components/ui/glsl-hills';

/* ─────────────────────── Data ─────────────────────── */
const testimonials = [
  { quote: 'Meridian took me from application to offer in 6 weeks. The job matching alone saved me 40+ hours of manual searching.', name: 'Priya S.', role: 'SWE → SWE at Ripplet' },
  { quote: 'The Agentic IDE let me build and ship two portfolio projects in one weekend. Recruiters noticed immediately.', name: 'Carlos M.', role: 'Self-taught → Research Intern at Zoho' },
  { quote: 'The portfolio distillation feature turned my messy GitHub into a recruiter-ready showcase. 3 interviews in 48 hours.', name: 'Aisha K.', role: 'Bootcamp grad → Fintech SWE' },
];

const pipeline = [
  { emoji: '🧠', phase: '01', title: 'Intelligence', desc: 'Market gap analysis utilizing vector memory to locate high-demand ecosystem opportunities.' },
  { emoji: '📐', phase: '02', title: 'Architect', desc: 'End-to-end blueprinting: functional scope, data schemas, and strict API mockups.' },
  { emoji: '🏗️', phase: '03', title: 'Build Flow', desc: 'Localized CLI integration for scaffolding systems directly onto your edge nodes.' },
  { emoji: '📁', phase: '04', title: 'Synthesis', desc: 'Automated extraction outputting GitHub-ready readmes and matched portfolios.' },
];

/* ─────────────────────── Page ─────────────────────── */
export default function Home() {
  const textControls = useAnimation();
  const buttonControls = useAnimation();

  useEffect(() => {
    textControls.start((i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.04 + 0.5,
        duration: 0.7,
        ease: [0.2, 0.65, 0.3, 0.9] as [number, number, number, number],
      },
    }));
    buttonControls.start({ opacity: 1, transition: { delay: 1.4, duration: 0.7 } });
  }, [textControls, buttonControls]);

  return (
    <div className="relative bg-black text-white font-sans selection:bg-[#6366f1] selection:text-white">

      {/* GLSLHills fills the entire page background */}
      <div className="fixed inset-0 z-0">
        <GLSLHills width="100%" height="100%" cameraZ={125} planeSize={256} speed={0.5} />
      </div>

      {/* Gradient overlay so text is legible */}
      <div className="fixed inset-0 z-[1] bg-gradient-to-b from-black/40 via-black/50 to-black/90 pointer-events-none" />

      {/* Content wrapper */}
      <div className="relative z-10">
        {/* ── Hero ── */}
        <section className="relative flex flex-col items-center justify-center pt-[20vh] pb-16 text-center overflow-hidden">

          {/* Content */}
          <div className="relative flex flex-col items-center px-4 pt-28 pb-16 pointer-events-none">
            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] as [number, number, number, number] }}
            >
              <h1
                className="font-semibold leading-tight"
                style={{ fontSize: 'clamp(2.8rem, 8vw, 6rem)', letterSpacing: '-0.03em' }}
              >
                <span className="italic font-thin text-white/80 block" style={{ fontSize: 'clamp(1.8rem, 5vw, 4rem)' }}>
                  Find the Career that seeks you
                </span>
                Meridian.
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.7 }}
              className="mt-6 max-w-3xl text-white/50 leading-relaxed font-light text-lg sm:text-2xl tracking-wide"
            >
              A high-performance architecture for localized intelligence processing.
              Map opportunities, design workflows, synthesize portfolios.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={buttonControls}
              className="mt-8 flex items-center justify-center gap-3 flex-wrap pointer-events-auto"
            >
              <Link
                href="/auth"
                className="px-12 py-6 bg-white text-black font-semibold text-lg hover:bg-white/90 active:scale-95 transition-all rounded-sm tracking-tight"
              >
                Initialize Session
              </Link>
              <Link
                href="/features"
                className="px-12 py-6 border border-white/20 text-white/70 font-light text-lg hover:border-indigo-500/60 hover:text-white active:scale-95 transition-all rounded-sm tracking-tight flex items-center gap-2"
              >
                Explore Features <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Scroll hint removed */}
          </div>
        </section>

        {/* ── Pipeline Matrix ── */}
        <section className="relative z-10 px-8 py-24 border-t border-white/[0.05]">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col gap-3 mb-16 items-center text-center">
              <span className="text-indigo-400 font-light uppercase tracking-[0.28em] text-xs">
                Execution Sequences
              </span>
              <h2 className="font-semibold tracking-tight text-white mt-2" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)' }}>
                Pipeline Matrix
              </h2>
              <div className="h-px w-24 bg-indigo-500/40 mt-4" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {pipeline.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="flex flex-col p-8 bg-white/[0.025] border border-white/[0.07] hover:bg-white/[0.05] hover:border-indigo-500/30 transition-all duration-300 group rounded-sm"
                >
                  <div className="w-14 h-14 bg-white/[0.05] border border-white/[0.1] flex items-center justify-center mb-6 group-hover:border-indigo-500/30 transition-all">
                    <span className="text-2xl">{item.emoji}</span>
                  </div>
                  <p className="text-white/25 font-light mb-1 uppercase tracking-widest text-xs">Phase {item.phase}</p>
                  <h5 className="font-semibold mb-4 text-white text-base">{item.title}</h5>
                  <p className="text-white/45 leading-relaxed text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Testimonials ── */}
        <section className="relative z-10 py-24 border-t border-white/[0.05]">
          <div className="max-w-6xl mx-auto px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs text-white/40 uppercase tracking-widest mb-5 font-light">
                <Users className="w-3 h-3" /> Social Proof
              </span>
              <h2 className="font-semibold text-white mt-4" style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2.2rem)' }}>
                Engineers Who Shipped
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <motion.div
                  key={t.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="p-8 bg-white/[0.025] border border-white/[0.07] rounded-sm hover:bg-white/[0.04] transition-all"
                >
                  <div className="flex gap-1 mb-5">
                    {Array.from({ length: 5 }).map((_, si) => (
                      <Star key={si} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-white/55 leading-relaxed mb-6 italic text-sm font-light">"{t.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-300 text-xs font-semibold">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">{t.name}</p>
                      <p className="text-white/35 text-xs font-light">{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA Banner ── */}
        <section className="relative z-10 py-16 border-t border-white/[0.05]">
          <div className="max-w-5xl mx-auto px-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative rounded-sm border border-indigo-500/20 bg-indigo-600/5 p-16 text-center overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/8 via-transparent to-violet-600/8" />
              <Zap className="w-10 h-10 text-indigo-400 mx-auto mb-6 relative z-10" />
              <h2
                className="font-semibold text-white mb-5 relative z-10"
                style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)' }}
              >
                Ready to Launch?
              </h2>
              <p className="text-white/45 text-base max-w-xl mx-auto mb-10 relative z-10 font-light leading-relaxed">
                Join 50,000 engineers who cut their job search in half. Your next offer starts here.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                <Link
                  href="/auth"
                  className="inline-flex items-center justify-center gap-2 bg-white text-black font-semibold text-sm hover:bg-white/90 active:scale-95 transition-all px-10 py-4 rounded-sm tracking-tight"
                >
                  Initialize Session
                </Link>
                <Link
                  href="/features"
                  className="inline-flex items-center justify-center gap-2 border border-indigo-500/40 text-indigo-400 hover:bg-indigo-600/10 hover:border-indigo-400 active:scale-95 transition-all px-10 py-4 rounded-sm text-sm font-light tracking-tight"
                >
                  View Features
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="relative z-10 w-full border-t border-white/[0.05] py-10 mt-4">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-8 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-md bg-indigo-600 flex items-center justify-center">
                <Zap className="w-3 h-3 text-white" />
              </div>
              <div>
                <p className="text-white/70 text-xs font-light tracking-wide">Built for the Modern Node.</p>
                <p className="text-indigo-400 text-xs font-light mt-0.5 tracking-wide">Meridian Intelligence Corp</p>
              </div>
            </div>
            <div className="flex gap-8">
              {['Privacy Protocol', 'Terms', 'Status: Nominal'].map((label) => (
                <a
                  key={label}
                  href="#"
                  className="text-white/25 hover:text-indigo-400 transition-colors text-xs font-light uppercase tracking-widest"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
