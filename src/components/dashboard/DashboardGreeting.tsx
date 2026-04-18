'use client';

import { motion } from 'framer-motion';
import {
  DashboardPageTitle,
  DASHBOARD_PAGE_SUBTITLE_CLASSES,
} from '@/components/dashboard/DashboardPageTitle';

type Props = {
  greeting: string;
  firstName: string;
  dreamRole: string;
};

export function DashboardGreeting({ greeting, firstName, dreamRole }: Props) {
  const title = `${greeting}, ${firstName}`;

  return (
    <div className="flex flex-col gap-5 md:gap-6 max-w-4xl">
      <DashboardPageTitle title={title} />
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className={DASHBOARD_PAGE_SUBTITLE_CLASSES}
      >
        Your career trajectory is currently outperforming{' '}
        <span className="text-white font-bold">85%</span> of your peer group. AI recommends focusing on the{' '}
        <span className="text-[#6366f1] font-bold">"{dreamRole}"</span> logic today.
      </motion.p>
    </div>
  );
}
