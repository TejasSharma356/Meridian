"use client";

import { motion } from "framer-motion";
import {
  Brain,
  Briefcase,
  Code2,
  GitBranch,
  LineChart,
  Sparkles,
  Target,
  Zap,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { HeroGeometric, ElegantShape } from "@/components/ui/shape-landing-hero";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: Brain,
    label: "Intelligence Engine",
    color: "from-indigo-500/[0.15]",
    border: "border-indigo-500/30",
    glow: "shadow-indigo-500/10",
    title: "AI-Powered Market Gap Analysis",
    description:
      "Real-time synthesis of job market signals, skill demand curves, and industry trends. Our intelligence layer continuously scans thousands of postings to surface the highest-leverage skills you should be building.",
    bullets: [
      "Live skill demand heatmaps",
      "Emerging role prediction 6 months ahead",
      "Gap analysis vs your current portfolio",
    ],
  },
  {
    icon: Code2,
    label: "Agentic IDE",
    color: "from-violet-500/[0.15]",
    border: "border-violet-500/30",
    glow: "shadow-violet-500/10",
    title: "Interactive Agentic Coding Environment",
    description:
      "Build production-grade projects inside Meridian's sandboxed IDE. AI agents assist at every step — architecture, code review, testing, and deployment — so you ship faster while learning deeper.",
    bullets: [
      "Zero-setup cloud sandbox",
      "AI pair programmer with context awareness",
      "One-click deploy to Vercel / Railway",
    ],
  },
  {
    icon: Briefcase,
    label: "Portfolio Distillation",
    color: "from-rose-500/[0.15]",
    border: "border-rose-500/30",
    glow: "shadow-rose-500/10",
    title: "Automated Portfolio Generation",
    description:
      "Meridian auto-generates a recruiter-ready portfolio from your project history. Every PR, every deployment, every contribution is distilled into compelling case studies optimised for ATS and human readers.",
    bullets: [
      "Auto-generated case study narratives",
      "ATS-friendly structured export",
      "Role-specific portfolio variants",
    ],
  },
  {
    icon: Target,
    label: "Job Matching",
    color: "from-amber-500/[0.15]",
    border: "border-amber-500/30",
    glow: "shadow-amber-500/10",
    title: "Outcome-Based Job Matching",
    description:
      "Move beyond keyword matching. Meridian's matching engine scores you on demonstrated outcomes — shipped features, measurable impact, and trajectory — not just listed technologies.",
    bullets: [
      "Skill-to-JD semantic similarity scoring",
      "Interview probability estimates",
      "Salary benchmarking by geo + role tier",
    ],
  },
  {
    icon: GitBranch,
    label: "Roadmap Engine",
    color: "from-cyan-500/[0.15]",
    border: "border-cyan-500/30",
    glow: "shadow-cyan-500/10",
    title: "Personalised Learning Roadmaps",
    description:
      "From your target role and current skill snapshot, Meridian generates a day-by-day study roadmap with curated resources, milestones, and accountability checkpoints.",
    bullets: [
      "Adaptive schedules based on free time",
      "Resource curation from 50+ platforms",
      "Progress tracking with streak mechanics",
    ],
  },
  {
    icon: LineChart,
    label: "Analytics",
    color: "from-emerald-500/[0.15]",
    border: "border-emerald-500/30",
    glow: "shadow-emerald-500/10",
    title: "Career Velocity Dashboard",
    description:
      "Track your growth rate across skills, projects, and market position. Set quarterly OKRs, measure momentum, and course-correct before small drifts become big detours.",
    bullets: [
      "Skill growth velocity charts",
      "Quarterly OKR tracking",
      "Peer benchmarking percentiles",
    ],
  },
];

const statCards = [
  { value: "94%", label: "Interview conversion rate for power users" },
  { value: "3×", label: "Faster portfolio readiness vs. solo prep" },
  { value: "50k+", label: "Job signals analysed daily" },
  { value: "12 min", label: "Average time to first AI-generated project brief" },
];

export default function FeaturesPage() {
  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number] },
    }),
  };

  return (
    <div className="bg-[#030303] min-h-screen text-white">
      {/* ── Hero ── */}
      <HeroGeometric
        badge="Core Protocols"
        title1="Everything You Need"
        title2="To Land Your Dream Role"
      />

      {/* ── Stats bar ── */}
      <section className="relative z-10 -mt-24 pb-0">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.06] rounded-2xl overflow-hidden border border-white/[0.08]"
          >
            {statCards.map((s) => (
              <div
                key={s.label}
                className="bg-[#030303] px-6 py-8 flex flex-col items-center text-center"
              >
                <span className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-violet-300">
                  {s.value}
                </span>
                <span className="text-xs text-white/40 mt-2 leading-snug">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Feature cards ── */}
      <section className="py-32 relative overflow-hidden">
        {/* subtle ambient shapes */}
        <ElegantShape
          delay={0}
          width={500}
          height={120}
          rotate={-8}
          gradient="from-violet-500/[0.07]"
          className="right-[-8%] top-[20%]"
        />
        <ElegantShape
          delay={0.2}
          width={400}
          height={100}
          rotate={14}
          gradient="from-indigo-500/[0.07]"
          className="left-[-6%] bottom-[10%]"
        />

        <div className="container mx-auto px-4 md:px-8 max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-20"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs text-white/50 tracking-widest uppercase mb-6">
              <Sparkles className="w-3 h-3 text-indigo-400" />
              Six core systems
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">
              The Meridian Stack
            </h2>
            <p className="text-white/40 mt-4 max-w-xl mx-auto text-lg">
              Six deeply integrated systems that work together to accelerate your career from zero to hired.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.label}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className={cn(
                  "group relative rounded-2xl p-8 border bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300",
                  f.border,
                  `hover:shadow-xl ${f.glow}`
                )}
              >
                {/* floating pill */}
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/[0.08] text-[10px] text-white/50 uppercase tracking-widest mb-6">
                  <f.icon className="w-3 h-3" />
                  {f.label}
                </span>

                {/* large bg icon */}
                <div
                  className={cn(
                    "absolute top-6 right-6 w-16 h-16 rounded-full bg-gradient-to-r to-transparent opacity-20 group-hover:opacity-40 transition-opacity",
                    f.color
                  )}
                />

                <h3 className="text-xl font-semibold text-white mb-3">{f.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed mb-6">{f.description}</p>
                <ul className="space-y-2">
                  {f.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-white/60">
                      <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                      {b}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-16 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.08] via-transparent to-rose-500/[0.08]" />
            <Zap className="w-10 h-10 text-indigo-400 mx-auto mb-6 relative z-10" />
            <h2 className="text-4xl font-bold mb-4 relative z-10">Ready to launch?</h2>
            <p className="text-white/40 mb-10 text-lg relative z-10">
              Join thousands of engineers who cut their job search in half with Meridian.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
              <Link
                href="/auth"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-all duration-200 shadow-lg shadow-indigo-500/20"
              >
                Get Started Free <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/[0.12] hover:bg-white/[0.05] text-white/70 hover:text-white transition-all duration-200"
              >
                View Pricing
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
