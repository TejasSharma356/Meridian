'use client';

import { useRef, useEffect, useState, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  splitType?: 'chars' | 'words' | 'lines';
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  threshold?: number;
  rootMargin?: string;
  textAlign?: 'left' | 'center' | 'right';
  tag?: React.ElementType;
  /** When true, keeps the segment on one line (overrides default wrapping). */
  nowrap?: boolean;
  onLetterAnimationComplete?: () => void;
}

export default function SplitText({
  text,
  className = '',
  delay = 50,
  duration = 1.25,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  textAlign = 'center',
  tag: Tag = 'p',
  nowrap = false,
  onLetterAnimationComplete
}: SplitTextProps) {
  const containerRef = useRef<HTMLElement>(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const onCompleteRef = useRef(onLetterAnimationComplete);

  useEffect(() => {
    onCompleteRef.current = onLetterAnimationComplete;
  }, [onLetterAnimationComplete]);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (document.fonts.status === 'loaded') {
        setFontsLoaded(true);
      } else {
        document.fonts.ready.then(() => setFontsLoaded(true));
      }
    }
  }, []);

  // Manual split logic to avoid premium SplitText dependency
  const elements = useMemo(() => {
    if (splitType === 'words') {
      return text
        .split(/\s+/)
        .filter(Boolean)
        .map((word, i) => ({
          content: word,
          key: i,
        }));
    }
    if (splitType === 'chars') {
      return text.split('').map((char, i) => ({
        content: char === ' ' ? '\u00A0' : char,
        key: i
      }));
    }
    return [{ content: text, key: 0 }];
  }, [text, splitType]);

  useGSAP(() => {
    if (!containerRef.current || !fontsLoaded) return;

    const items = containerRef.current.children;
    if (items.length === 0) return;

    const startPct = (1 - threshold) * 100;
    const start = `top ${startPct}%${rootMargin === '0px' ? '' : `+=${rootMargin}`}`;

    gsap.fromTo(
      Array.from(items),
      { ...from },
      {
        ...to,
        duration,
        ease,
        stagger: delay / 1000,
        scrollTrigger: {
          trigger: containerRef.current,
          start,
          once: true,
        },
        onComplete: () => {
          onCompleteRef.current?.();
        }
      }
    );
  }, {
    dependencies: [fontsLoaded, text, delay, duration, ease, JSON.stringify(from), JSON.stringify(to), threshold, rootMargin],
    scope: containerRef
  });

  return (
    // @ts-ignore
    <Tag
      ref={containerRef}
      className={cn(
        splitType === 'words'
          ? 'inline-flex flex-wrap items-baseline gap-x-[0.28em] gap-y-0.5 overflow-visible'
          : 'inline-block overflow-hidden',
        className
      )}
      style={{
        textAlign,
        whiteSpace: nowrap ? 'nowrap' : 'normal',
        wordBreak: splitType === 'words' ? 'normal' : undefined,
        overflowWrap: splitType === 'words' ? 'normal' : undefined,
        wordWrap: nowrap ? 'normal' : splitType === 'words' ? 'normal' : 'break-word',
      }}
    >
      {elements.map((el) => (
        <span
          key={el.key}
          className={cn(
            'inline-block will-change-transform',
            splitType === 'words' && 'whitespace-nowrap'
          )}
        >
          {el.content}
        </span>
      ))}
    </Tag>
  );
}
