"use client";

import { motion } from "framer-motion";
import {
  Check,
  X,
  Zap,
  Star,
  Building2,
  ArrowRight,
  HelpCircle,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { HeroGeometric, ElegantShape } from "@/components/ui/shape-landing-hero";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Explorer",
    price: "$0",
    period: "forever",
    description: "For engineers exploring the engine and taking their first steps.",
    icon: Star,
    color: "from-white/[0.05]",
    border: "border-white/[0.10]",
    cta: "Start Free",
    ctaStyle: "border border-white/[0.15] text-white/70 hover:bg-white/[0.05] hover:text-white",
    highlight: false,
    features: [
      "5 AI job analyses / month",
      "Basic skill gap report",
      "1 portfolio project",
      "Community access",
      "ATS resume check",
      null,
      null,
      null,
    ],
  },
  {
    name: "Operator",
    price: "$49",
    period: "/ month",
    description: "Full agentic pipeline for engineers actively looking to level up or switch roles.",
    icon: Zap,
    color: "from-indigo-500/[0.15]",
    border: "border-indigo-500/40",
    cta: "Start 14-day Trial",
    ctaStyle: "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/30",
    highlight: true,
    badge: "Most Popular",
    features: [
      "Unlimited AI job analyses",
      "Real-time market gap synthesis",
      "Unlimited portfolio projects",
      "Agentic IDE (full access)",
      "Automated portfolio generation",
      "Outcome-based job matching",
      "Personalised learning roadmap",
      "Priority support",
    ],
  },
  {
    name: "Architect",
    price: "$149",
    period: "/ month",
    description: "For senior engineers, team leads, and career coaches managing multiple career tracks.",
    icon: Building2,
    color: "from-violet-500/[0.10]",
    border: "border-violet-500/30",
    cta: "Contact Sales",
    ctaStyle: "border border-violet-400/40 text-violet-300 hover:bg-violet-500/10",
    highlight: false,
    features: [
      "Everything in Operator",
      "Multi-profile management (5 seats)",
      "White-label portfolio export",
      "Team analytics dashboard",
      "API access (beta)",
      "Dedicated success manager",
      "Custom roadmap templates",
      "SLA-backed uptime",
    ],
  },
];

const comparisonFeatures = [
  { name: "AI job analyses / month", explorer: "5", operator: "Unlimited", architect: "Unlimited" },
  { name: "Skill gap reports", explorer: "Basic", operator: "Advanced", architect: "Advanced + Team" },
  { name: "Portfolio projects", explorer: "1", operator: "Unlimited", architect: "Unlimited" },
  { name: "Agentic IDE", explorer: false, operator: true, architect: true },
  { name: "Job matching engine", explorer: false, operator: true, architect: true },
  { name: "Learning roadmaps", explorer: false, operator: true, architect: true },
  { name: "API access", explorer: false, operator: false, architect: true },
  { name: "Team seats", explorer: "1", operator: "1", architect: "5+" },
];

const faqs = [
  {
    q: "Can I cancel anytime?",
    a: "Yes. Cancel from your account settings — no questions asked, no cancellation fees. Your data is exportable at any time.",
  },
  {
    q: "Is the Agentic IDE a full coding environment?",
    a: "It's a cloud-sandboxed environment powered by StackBlitz under the hood, augmented with Meridian's AI agents for architecture guidance, code review, and deployment.",
  },
  {
    q: "What happens to my data if I cancel?",
    a: "Your projects, portfolio, and analyses stay accessible for 30 days post-cancellation. After that, you can download a full export or your data is deleted from our servers.",
  },
  {
    q: "Do you offer student or non-profit discounts?",
    a: "Yes — students get 50% off Operator with a valid .edu email. Non-profits get a custom quote. Reach out to billing@meridian.dev.",
  },
  {
    q: "How is Meridian different from LinkedIn or traditional job boards?",
    a: "Meridian is a career operating system, not a job board. We don't just surface listings — we build your evidence base, close your skill gaps, and present you to employers through demonstrated outcomes rather than keywords.",
  },
];

export default function PricingPage() {
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
        badge="Transparent Pricing"
        title1="Invest in Your"
        title2="Career Trajectory"
      />

      {/* ── Pricing cards ── */}
      <section className="py-28 relative overflow-hidden">
        <ElegantShape
          delay={0}
          width={500}
          height={120}
          rotate={-10}
          gradient="from-indigo-500/[0.07]"
          className="left-[-8%] top-[5%]"
        />
        <ElegantShape
          delay={0.2}
          width={400}
          height={100}
          rotate={15}
          gradient="from-violet-500/[0.07]"
          className="right-[-6%] bottom-[5%]"
        />

        <div className="container mx-auto px-4 md:px-8 max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs text-white/50 tracking-widest uppercase mb-6">
              <Sparkles className="w-3 h-3 text-indigo-400" />
              14-day free trial on all paid plans
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">
              Simple, Honest Pricing
            </h2>
            <p className="text-white/40 mt-4 text-lg max-w-lg mx-auto">
              No seat minimums on Operator. No surprise overages. Cancel whenever.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className={cn(
                  "relative rounded-3xl border p-8 bg-gradient-to-b to-transparent",
                  plan.color,
                  plan.border,
                  plan.highlight && "ring-1 ring-indigo-500/50 shadow-2xl shadow-indigo-500/10 scale-[1.02]"
                )}
              >
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-indigo-600 text-white text-xs font-semibold tracking-wide shadow-lg">
                    {plan.badge}
                  </div>
                )}

                <div className="flex items-center gap-3 mb-6">
                  <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br to-transparent", plan.color)}>
                    <plan.icon className="w-5 h-5 text-white/70" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">{plan.name}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <span className="text-5xl font-bold text-white">{plan.price}</span>
                  <span className="text-white/40 text-sm ml-1">{plan.period}</span>
                </div>
                <p className="text-white/40 text-sm mb-8 leading-relaxed">{plan.description}</p>

                <Link
                  href="/auth"
                  className={cn(
                    "w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 mb-8",
                    plan.ctaStyle
                  )}
                >
                  {plan.cta} <ArrowRight className="w-4 h-4" />
                </Link>

                <ul className="space-y-3">
                  {plan.features.map((f, fi) =>
                    f ? (
                      <li key={fi} className="flex items-start gap-2.5 text-sm text-white/60">
                        <Check className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ) : (
                      <li key={fi} className="flex items-start gap-2.5 text-sm text-white/20">
                        <X className="w-4 h-4 shrink-0 mt-0.5" />
                        Not included
                      </li>
                    )
                  )}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Comparison table ── */}
      <section className="py-20 border-t border-white/[0.06]">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-3">Full Comparison</h2>
            <p className="text-white/40">See exactly what's included in every plan.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-2xl border border-white/[0.08] overflow-hidden"
          >
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.08] bg-white/[0.02]">
                  <th className="text-left px-6 py-5 text-white/40 font-medium">Feature</th>
                  <th className="text-center px-6 py-5 text-white/60 font-medium">Explorer</th>
                  <th className="text-center px-6 py-5 text-indigo-400 font-semibold">Operator</th>
                  <th className="text-center px-6 py-5 text-violet-300 font-medium">Architect</th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((f, i) => (
                  <tr
                    key={f.name}
                    className={cn(
                      "border-b border-white/[0.05] transition-colors hover:bg-white/[0.02]",
                      i % 2 === 0 ? "bg-transparent" : "bg-white/[0.01]"
                    )}
                  >
                    <td className="px-6 py-4 text-white/60">{f.name}</td>
                    {[f.explorer, f.operator, f.architect].map((val, vi) => (
                      <td key={vi} className="text-center px-6 py-4">
                        {typeof val === "boolean" ? (
                          val ? (
                            <Check className="w-4 h-4 text-emerald-400 mx-auto" />
                          ) : (
                            <X className="w-4 h-4 text-white/20 mx-auto" />
                          )
                        ) : (
                          <span className={cn("text-sm", vi === 1 ? "text-indigo-300" : "text-white/60")}>
                            {val}
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 border-t border-white/[0.06]">
        <div className="container mx-auto px-4 md:px-8 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs text-white/50 tracking-widest uppercase mb-6">
              <HelpCircle className="w-3 h-3 text-white/50" />
              FAQs
            </span>
            <h2 className="text-3xl font-bold">Common Questions</h2>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6"
              >
                <h3 className="font-semibold text-white mb-2">{faq.q}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-16 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.08] via-transparent to-violet-500/[0.08]" />
            <Zap className="w-10 h-10 text-indigo-400 mx-auto mb-6 relative z-10" />
            <h2 className="text-4xl font-bold mb-4 relative z-10">Start your trial today</h2>
            <p className="text-white/40 mb-10 text-lg relative z-10">
              No credit card required for the 14-day trial. Downgrade or cancel any time.
            </p>
            <Link
              href="/auth"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-all shadow-lg shadow-indigo-500/20 relative z-10"
            >
              Create your free account <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
