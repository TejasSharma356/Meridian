"use client";

import { motion } from "framer-motion";
import {
  Rocket,
  Users,
  Globe,
  Heart,
  ShieldCheck,
  Lightbulb,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { HeroGeometric, ElegantShape } from "@/components/ui/shape-landing-hero";
import { cn } from "@/lib/utils";

const values = [
  {
    icon: Lightbulb,
    title: "Radical Transparency",
    description:
      "We surface exactly why you were matched (or not matched) to a role. No black-box scoring, no mystery — just honest, actionable signal.",
    gradient: "from-amber-500/[0.15]",
    border: "border-amber-500/20",
  },
  {
    icon: Heart,
    title: "Outcome First",
    description:
      "Our only metric that matters: did you land the role? We optimise every feature toward the moment you accept an offer, not engagement loops.",
    gradient: "from-rose-500/[0.15]",
    border: "border-rose-500/20",
  },
  {
    icon: ShieldCheck,
    title: "Privacy by Design",
    description:
      "Your data is yours. We never sell profile information. All AI inference runs in isolated environments. You can delete everything, instantly.",
    gradient: "from-indigo-500/[0.15]",
    border: "border-indigo-500/20",
  },
  {
    icon: Globe,
    title: "Borderless Access",
    description:
      "Career acceleration shouldn't be geography-gated. Meridian is built for engineers in Lagos, Karachi, Bogotá, and Berlin equally.",
    gradient: "from-cyan-500/[0.15]",
    border: "border-cyan-500/20",
  },
];

const team = [
  {
    name: "Vighnesh Singh Dhanai ",
    role: "Co-founder & CEO",
    bio: "SRMITE.Obsessed with shrinking the gap between talent and opportunity, Hates linkedin so founded an alternative.",
    initial: "VS",
    color: "bg-indigo-500/20 text-indigo-300",
  },
  {
    name: "Tejas Sharma",
    role: "Co-founder & CTO",
    bio: "SRMITE. Architect of Meridian's intelligence engine and job-matching semantic layer. Basically made the frontend what it looks like that is beautiful",
    initial: "TS",
    color: "bg-violet-500/20 text-violet-300",
  },
  {
    name: "Satvik Sharma",
    role: "Head of Marketing and Design",
    bio: "SRMITE. Crafts designs that feel inevitable — the kind where users wonder why everything else feels clunky.",
    initial: "SS",
    color: "bg-rose-500/20 text-rose-300",
  },
];

const milestones = [
  { year: "2026", event: "Founded in SRM with a mission to fix the broken hiring system." },
  { year: "Q1 27", event: "Shipped v1 Intelligence Engine — 500 beta users onboarded in 48 hours." },
  { year: "Q3 27", event: "Raised seed. Expanded to EU and APAC markets." },
  { year: "Q1 28", event: "Crossed 40,000 active users. Launched Agentic IDE beta." },
  { year: "2028", event: "50k+ engineers. 94% interview conversion. Growing every day." },
];

export default function AboutPage() {
  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.12, ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number] },
    }),
  };

  return (
    <div className="bg-[#030303] min-h-screen text-white">
      {/* ── Hero ── */}
      <HeroGeometric
        badge="Our Story"
        title1="Built for Engineers"
        title2="Who Refuse to Wait"
      />

      {/* ── Mission statement ── */}
      <section className="py-28 relative overflow-hidden">
        <ElegantShape
          delay={0}
          width={450}
          height={110}
          rotate={10}
          gradient="from-indigo-500/[0.07]"
          className="right-[-6%] top-[10%]"
        />
        <div className="container mx-auto px-4 md:px-8 max-w-5xl relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs text-white/50 tracking-widest uppercase mb-6">
                <Rocket className="w-3 h-3 text-indigo-400" />
                Our Mission
              </span>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">
                Compress the path from learning to earning.
              </h2>
              <p className="text-white/40 text-lg leading-relaxed">
                The gap between "I have the skills" and "I have the offer" is filled with noise — poorly structured portfolios, keyword-gamed resumes, and opaque ATS filters. Meridian eliminates every one of those friction points.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="space-y-6"
            >
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
                <p className="text-white/60 text-sm leading-relaxed italic">
                  "The average engineer spends 6 months applying before landing a senior role. With Meridian, our median user does it in less."
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-xs text-indigo-300 font-bold">AV</div>
                  <div>
                    <p className="text-white text-sm font-medium">Vighnesh Singh Dhanai </p>
                    <p className="text-white/40 text-xs">CEO, Meridian</p>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
                <p className="text-white/60 text-sm leading-relaxed italic">
                  "We built the tool we desperately needed when we were hunting internships. Then we made it 10× better."
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center text-xs text-violet-300 font-bold">RM</div>
                  <div>
                    <p className="text-white text-sm font-medium">Tejas Sharma</p>
                    <p className="text-white/40 text-xs">CTO, Meridian</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="py-24 border-t border-white/[0.06]">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-white/40 text-lg max-w-xl mx-auto">
              The principles that shape every feature, every design decision, and every hire.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className={cn(
                  "rounded-2xl border p-8 bg-white/[0.02] hover:bg-white/[0.04] transition-all group",
                  v.border
                )}
              >
                <div className={cn("w-12 h-12 rounded-2xl bg-gradient-to-br to-transparent flex items-center justify-center mb-5", v.gradient)}>
                  <v.icon className="w-6 h-6 text-white/70" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{v.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{v.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="py-24 border-t border-white/[0.06]">
        <div className="container mx-auto px-4 md:px-8 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Milestones we want to achieve</h2>
            <p className="text-white/40 text-lg">From 3 to an Empire.</p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-white/[0.08]" />
            <div className="space-y-10">
              {milestones.map((m, i) => (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative flex gap-8 items-start"
                >
                  <div className="w-16 h-16 rounded-full border border-indigo-500/30 bg-indigo-500/10 flex items-center justify-center text-indigo-300 text-xs font-bold shrink-0 z-10">
                    {m.year}
                  </div>
                  <div className="pt-4">
                    <p className="text-white/70 leading-relaxed">{m.event}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="py-24 border-t border-white/[0.06]">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs text-white/50 tracking-widest uppercase mb-6">
              <Users className="w-3 h-3 text-rose-400" />
              The Team
            </span>
            <h2 className="text-4xl font-bold mb-4">Who's Building Meridian</h2>
            <p className="text-white/40 text-lg max-w-xl mx-auto">
              SRMITE ALL TOGETHER united by one conviction: hiring is broken and we can fix it.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 text-center hover:bg-white/[0.04] transition-all"
              >
                <div className={cn("w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4", member.color)}>
                  {member.initial}
                </div>
                <h3 className="text-white font-semibold">{member.name}</h3>
                <p className="text-indigo-400 text-xs mb-3 tracking-wide">{member.role}</p>
                <p className="text-white/40 text-sm leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl font-bold mb-4">Join the mission</h2>
            <p className="text-white/40 mb-10 text-lg">
              Whether you're a job seeker or a builder who wants to work with us — we'd love to talk.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/auth"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-all shadow-lg shadow-indigo-500/20"
              >
                Start for Free <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/features"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/[0.12] hover:bg-white/[0.05] text-white/70 hover:text-white transition-all"
              >
                See Features
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
