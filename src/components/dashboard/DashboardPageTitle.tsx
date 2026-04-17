'use client';

import { motion } from 'framer-motion';
import SplitText from '@/components/ui/SplitText';

/** Shared hero typography for all dashboard-family routes (matches initialize / intelligence scale). */
export const DASHBOARD_PAGE_TITLE_CLASSES =
  'text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white uppercase';

export const DASHBOARD_PAGE_SUBTITLE_CLASSES =
  'text-zinc-500 text-lg md:text-xl lg:text-2xl max-w-3xl leading-relaxed';

type Props = {
  title: string;
  tag?: 'h1' | 'h2' | 'h3';
  textAlign?: 'left' | 'center' | 'right';
  className?: string;
};

export function DashboardPageTitle({
  title,
  tag = 'h1',
  textAlign = 'left',
  className = '',
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="w-full"
    >
      <SplitText
        text={title}
        tag={tag}
        className={`${DASHBOARD_PAGE_TITLE_CLASSES} w-full max-w-full leading-[1.05] ${className}`}
        delay={70}
        duration={0.75}
        textAlign={textAlign}
        splitType="words"
      />
    </motion.div>
  );
}
