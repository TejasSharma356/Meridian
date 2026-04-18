"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, LogIn, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
];

export function FloatingNavbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isPortfolio = pathname === '/portfolio';
  const [isHovered, setIsHovered] = useState(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 20);
  });

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.23, 0.86, 0.39, 0.96] }}
        className="fixed top-4 left-0 right-0 z-[70] flex justify-center px-4 pointer-events-none"
      >
        <div
          className={cn(
            "pointer-events-auto w-full max-w-4xl rounded-3xl border transition-all duration-500",
            scrolled
              ? "bg-black/75 backdrop-blur-2xl border-white/[0.14] shadow-2xl shadow-black/50"
              : "bg-white/[0.04] backdrop-blur-lg border-white/[0.08]"
          )}
        >
        <div className="flex items-center justify-between px-6 py-3.5">
          {/* Logo — single instance */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-7 h-7 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:scale-110 transition-transform duration-200">
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-bold text-white tracking-tight text-sm">
              Meridian<span className="text-indigo-400">OS</span>
            </span>
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-1">
            {isPortfolio ? (
              <Link
                href="/dashboard"
                className="relative px-4 py-2 rounded-2xl text-sm font-medium text-white/50 hover:text-white transition-all duration-200 flex items-center gap-2"
              >
                 <span>← Back to Dashboard</span>
              </Link>
            ) : (
              navLinks.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "relative px-4 py-2 rounded-2xl text-sm font-medium transition-all duration-200",
                      active ? "text-white" : "text-white/50 hover:text-white/80"
                    )}
                  >
                    {active && (
                      <motion.span
                        layoutId="navbar-pill"
                        className="absolute inset-0 rounded-2xl bg-white/[0.09] border border-white/[0.12]"
                        transition={{ type: "spring", bounce: 0.25, duration: 0.4 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </Link>
                );
              })
            )}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            {!['/auth', '/initialize', '/dashboard', '/portfolio', '/architect', '/intelligence', '/apply'].some(r => pathname.startsWith(r)) && (
              <Link
                href="/auth"
                className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-all duration-200 shadow-lg shadow-indigo-500/25"
              >
                Access Console
                <span className="text-indigo-200 text-xs">→</span>
              </Link>
            )}
          </div>

          {/* Mobile burger */}
          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="md:hidden p-2 rounded-2xl border border-white/[0.08] text-white/60 hover:text-white hover:bg-white/[0.06] transition-all"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

        {/* Mobile drawer */}
        <motion.div
          initial={false}
          animate={mobileOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="overflow-hidden md:hidden"
        >
          <div className="px-5 pb-5 pt-1 border-t border-white/[0.07] flex flex-col gap-1">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "px-4 py-3 rounded-2xl text-sm font-medium transition-all",
                    active
                      ? "bg-white/[0.08] text-white border border-white/[0.10]"
                      : "text-white/50 hover:text-white hover:bg-white/[0.04]"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="mt-2 flex flex-col gap-2">
              {!['/auth', '/initialize', '/dashboard', '/portfolio', '/architect', '/intelligence', '/apply'].some(r => pathname.startsWith(r)) && (
                <Link
                  href="/auth"
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold text-center transition-all"
                >
                  Access Console
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.header>
    </>
  );
}
