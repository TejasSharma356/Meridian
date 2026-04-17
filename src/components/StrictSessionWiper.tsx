'use client';

import { useEffect } from 'react';
import { logoutUser } from '@/app/auth/actions';

export default function StrictSessionWiper() {
  useEffect(() => {
    // Check if the current navigation type is a 'reload' (e.g. F5, Cmd+R)
    const navEntries = window.performance.getEntriesByType('navigation');
    
    if (navEntries.length > 0) {
      const navType = (navEntries[0] as PerformanceNavigationTiming).type;
      if (navType === 'reload') {
        // Clear the HTTP-only cookie and force redirect
        logoutUser();
      }
    }
  }, []);

  return null;
}
