'use client';

import { motion, useAnimation } from 'framer-motion';
import { useRef, useEffect } from 'react';
import Link from 'next/link';

function SpaceCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -999, y: -999 });
  const rocketRef = useRef({ x: -999, y: -999 });
  const trailRef = useRef<any[]>([]);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const genStars = () => Array.from({ length: 550 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.6 + 0.2,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.7 + 0.2,
    }));
    let stars = genStars();
    window.addEventListener('resize', () => { stars = genStars(); });

    const PIXEL = 6;
    const BODY = [
      [0,-5], [-1,-4],[0,-4],[1,-4], [-1,-3],[0,-3],[1,-3], [-1,-2],[0,-2],[1,-2],
      [-2,-1],[-1,-1],[0,-1],[1,-1],[2,-1], [-2,0],[-1,0],[0,0],[1,0],[2,0],
      [-3,1],[-2,1],[-1,1],[0,1],[1,1],[2,1],[3,1], [-2,2],[-1,2],[0,2],[1,2],[2,2],
    ];
    const NOZZLE = [[-1,3],[0,3],[1,3]];
    const COCKPIT = [[0,-2]];

    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      trailRef.current.push({ x: e.clientX, y: e.clientY, t: performance.now() });
      if (trailRef.current.length > 32) trailRef.current.shift();
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    const draw = (time: number) => {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      for (const s of stars) {
        const alpha = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(time * 0.001 * s.speed + s.phase));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${alpha.toFixed(2)})`;
        ctx.fill();
      }

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      if (mx > -900) {
        if (rocketRef.current.x < -900) {
          rocketRef.current.x = mx;
          rocketRef.current.y = my;
        } else {
          rocketRef.current.x += (mx - rocketRef.current.x) * 0.18;
          rocketRef.current.y += (my - rocketRef.current.y) * 0.18;
        }
      }

      const rx = rocketRef.current.x;
      const ry = rocketRef.current.y;

      const now = performance.now();
      const DURATION = 500;
      const trail = trailRef.current.filter(p => now - p.t < DURATION);
      trailRef.current = trail;

      for (let i = 0; i < trail.length; i++) {
        const p = trail[i];
        const age = now - p.t;
        const progress = 1 - age / DURATION;
        const radius = progress * 5;
        const alpha = progress * 0.9;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99,102,241,${alpha.toFixed(2)})`;
        ctx.fill();
      }

      if (trail.length > 0) {
        const last = trail[trail.length - 1];
        const grad = ctx.createLinearGradient(last.x, last.y, rx, ry);
        grad.addColorStop(0, 'rgba(99,102,241,0.6)');
        grad.addColorStop(1, 'rgba(99,102,241,0)');
        ctx.beginPath();
        ctx.moveTo(last.x, last.y);
        ctx.lineTo(rx, ry);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      if (rx > -900) {
        const glowY = ry + 4 * PIXEL;
        const grd = ctx.createRadialGradient(rx, glowY, 0, rx, glowY, PIXEL * 6);
        grd.addColorStop(0, 'rgba(99,102,241,0.9)');
        grd.addColorStop(0.4, 'rgba(6,182,212,0.45)');
        grd.addColorStop(1, 'rgba(6,182,212,0)');
        ctx.beginPath();
        ctx.arc(rx, glowY, PIXEL * 6, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        const flameH = (2.5 + Math.sin(time * 0.04) * 1.8) * PIXEL;
        const fgrd = ctx.createLinearGradient(rx, ry + 3 * PIXEL, rx, ry + 3 * PIXEL + flameH);
        fgrd.addColorStop(0, 'rgba(99,102,241,1)');
        fgrd.addColorStop(0.5, 'rgba(79,70,229,0.85)');
        fgrd.addColorStop(1, 'rgba(99,102,241,0)');
        ctx.fillStyle = fgrd;
        ctx.fillRect(rx - PIXEL * 0.6, ry + 3 * PIXEL, PIXEL * 1.2, flameH);

        ctx.fillStyle = '#6366f1';
        for (const [cx, cy] of BODY) {
          ctx.fillRect(rx + cx * PIXEL - PIXEL / 2, ry + cy * PIXEL - PIXEL / 2, PIXEL - 1, PIXEL - 1);
        }
        ctx.fillStyle = '#4f46e5';
        for (const [cx, cy] of NOZZLE) {
          ctx.fillRect(rx + cx * PIXEL - PIXEL / 2, ry + cy * PIXEL - PIXEL / 2, PIXEL - 1, PIXEL - 1);
        }
        ctx.fillStyle = '#818cf8';
        for (const [cx, cy] of COCKPIT) {
          ctx.fillRect(rx + cx * PIXEL - PIXEL / 2, ry + cy * PIXEL - PIXEL / 2, PIXEL - 1, PIXEL - 1);
        }
      }

      frameRef.current = requestAnimationFrame(draw);
    };

    frameRef.current = requestAnimationFrame(draw);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
}

export default function Home() {
  const textControls = useAnimation();
  const buttonControls = useAnimation();

  useEffect(() => {
    textControls.start(i => ({
      opacity: 1, y: 0,
      transition: { delay: i * 0.04 + 0.5, duration: 0.7, ease: [0.2, 0.65, 0.3, 0.9] }
    }));
    buttonControls.start({ opacity: 1, transition: { delay: 1.4, duration: 0.7 } });
  }, [textControls, buttonControls]);

  const headline = "Meredian OS";

  return (
    <div className="relative bg-black text-white font-sans selection:bg-[#d856b8] selection:text-white">
      <SpaceCanvas />

      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.2, duration: 0.6 } }}
        className="sticky top-0 z-20 px-10 py-5 bg-black/55 backdrop-blur-md border-b border-white/[0.05]"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🚀</span>
            <span className="text-xl font-bold text-white tracking-tight" style={{ fontFamily: 'var(--font-press-start)', fontSize: '14px' }}>Meredian</span>
          </div>
          <div className="flex items-center gap-10">
            {['about', 'features', 'pricing'].map(p => (
              <Link key={p} href={`/${p}`}
                className="text-white/50 hover:text-[#6366f1] transition-colors font-semibold hidden md:block uppercase"
                style={{ fontFamily: 'var(--font-press-start)', fontSize: '10px', letterSpacing: '0.12em' }}>
                {p}
              </Link>
            ))}
            <Link href="/auth"
              className="px-6 py-3 border-2 border-white text-white transition-all hover:bg-white hover:text-black active:scale-[0.98]"
              style={{ fontFamily: 'var(--font-press-start)', fontSize: '9px' }}>
              Access Console
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Hero */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-[78vh] text-center px-4 py-10">
        <h1
          className="font-bold leading-tight"
          style={{
            fontFamily: 'var(--font-press-start)',
            textShadow: '5px 5px 0px #6366f1',
            fontSize: 'clamp(2rem, 8vw, 6rem)',
          }}
        >
          {headline.split("").map((char, i) => (
            <motion.span
              key={i}
              custom={i}
              initial={{ opacity: 0, y: 50 }}
              animate={textControls}
              style={{ display: 'inline-block', marginRight: char === ' ' ? '0.35em' : '0.02em' }}
            >
              {char}
            </motion.span>
          ))}
        </h1>

        <motion.p
          custom={headline.length}
          initial={{ opacity: 0, y: 30 }}
          animate={textControls}
          className="mx-auto mt-8 max-w-2xl text-white/65 leading-loose"
          style={{ fontFamily: 'var(--font-press-start)', fontSize: 'clamp(8px, 1.2vw, 11px)' }}
        >
          A high-performance architecture for localized intelligence processing.
          Map opportunities, design workflows, synthesize portfolios.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={buttonControls}
          className="mt-10 flex items-center justify-center gap-6 flex-wrap"
        >
          <Link
            href="/auth"
            className="border-2 border-white bg-transparent text-white transition-all hover:bg-white hover:text-black active:scale-95 px-10 py-5"
            style={{ fontFamily: 'var(--font-press-start)', fontSize: '11px' }}
          >
            Initialize Session
          </Link>
          <Link
            href="/auth"
            className="border-2 border-[#6366f1] bg-transparent text-[#6366f1] transition-all hover:bg-[#6366f1] hover:text-white active:scale-95 px-10 py-5"
            style={{ fontFamily: 'var(--font-press-start)', fontSize: '11px' }}
          >
            Deploy Offline
          </Link>
        </motion.div>
      </section>

      {/* Pipeline Section */}
      <section className="relative z-10 px-8 py-14">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col gap-3 mb-12 items-center text-center">
            <span
              className="text-[#6366f1] font-bold uppercase tracking-[0.28em]"
              style={{ fontFamily: 'var(--font-press-start)', fontSize: '10px' }}
            >Execution Sequences</span>
            <h3
              className="font-bold tracking-tight text-white mt-2"
              style={{ fontFamily: 'var(--font-press-start)', fontSize: 'clamp(1rem, 3vw, 1.8rem)', textShadow: '3px 3px 0px #6366f1' }}
            >Pipeline Matrix</h3>
            <div className="h-px w-20 bg-[#6366f1]/40 mt-3"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: 'psychology',     phase: '01', title: 'Intelligence', desc: 'Market gap analysis utilizing vector memory to locate high-demand ecosystem opportunities.' },
              { icon: 'architecture',   phase: '02', title: 'Architect',    desc: 'End-to-end blueprinting: functional scope, data schemas, and strict API mockups.' },
              { icon: 'construction',   phase: '03', title: 'Build Flow',   desc: 'Localized CLI integration for scaffolding systems directly onto your edge nodes.' },
              { icon: 'folder_managed', phase: '04', title: 'Synthesis',    desc: 'Automated extraction outputting GitHub-ready readmes and matched portfolios.' },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: idx * 0.08, duration: 0.5 }}
                className="flex flex-col p-8 bg-white/[0.025] border border-white/[0.07] hover:bg-white/[0.06] hover:border-[#6366f1]/50 transition-all duration-300 group"
                style={{ clipPath: 'polygon(0 0,calc(100% - 14px) 0,100% 14px,100% 100%,14px 100%,0 calc(100% - 14px))' }}
              >
                <div className="w-14 h-14 bg-white/[0.05] border border-white/[0.1] flex items-center justify-center mb-6 text-[#6366f1] group-hover:border-[#6366f1]/50 transition-all">
                   <span className="text-[30px]">{item.icon === 'psychology' ? '🧠' : item.icon === 'architecture' ? '📐' : item.icon === 'construction' ? '🏗️' : '📁'}</span>
                </div>
                <h4
                  className="text-white/30 font-bold mb-2 uppercase tracking-widest"
                  style={{ fontFamily: 'var(--font-press-start)', fontSize: '8px' }}
                >Phase {item.phase}</h4>
                <h5
                  className="font-bold mb-4 text-white"
                  style={{ fontFamily: 'var(--font-press-start)', fontSize: '13px', textShadow: '1px 1px 0px #6366f1', lineHeight: 1.6 }}
                >{item.title}</h5>
                <p className="text-white/50 leading-relaxed text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 w-full border-t border-white/[0.05] py-7 mt-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-8 gap-5">
          <div className="flex items-center gap-4">
            <span className="text-2xl">🚀</span>
            <div>
              <p className="text-white/80" style={{ fontFamily: 'var(--font-press-start)', fontSize: '9px' }}>Built for the Modern Node.</p>
              <p className="text-[#6366f1] mt-1.5" style={{ fontFamily: 'var(--font-press-start)', fontSize: '8px' }}>Meredian Intelligence Corp</p>
            </div>
          </div>
          <div className="flex gap-8">
            {['Privacy Protocol', 'Terms', 'Status: Nominal'].map(label => (
              <a key={label} href="#" className="text-white/25 hover:text-[#6366f1] transition-colors"
                style={{ fontFamily: 'var(--font-press-start)', fontSize: '7px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                {label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
