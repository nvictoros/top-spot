import { useEffect, useRef, useState } from 'react';
import styles from './Marquee.module.css';

type MarqueeProps = {
  children: string;
  className: string;
  space?: number;
};

export const Marquee = ({ children, className, space = 12 }: MarqueeProps) => {
  const marqueeWrapper = useRef<HTMLDivElement | null>(null);
  const marqueeContent = useRef<HTMLDivElement | null>(null);
  const marqueeTextElement = useRef<HTMLDivElement | null>(null);
  const marqueeContentWithSpaces = useRef<HTMLDivElement | null>(null);
  const [shouldMarqueeText, setShouldMarqueeText] = useState<boolean>(false);

  useEffect(() => {
    const marqueeContentWidth = marqueeContent?.current?.clientWidth || 0;
    const marqueeWrapperWidth = marqueeWrapper?.current?.clientWidth || 0;

    if (marqueeContentWidth > marqueeWrapperWidth) {
      setShouldMarqueeText(true);
    }
  }, [children]);

  useEffect(() => {
    const animationMsPerPx = 40;
    const duration = (marqueeContentWithSpaces?.current?.getBoundingClientRect().width || 0) * animationMsPerPx;
    const initialDelay = 750;
    const delayOffset = initialDelay / duration;

    if (shouldMarqueeText) {
      marqueeTextElement?.current?.animate(
        [
          { transform: 'translate(0, 0)', offset: 0 },
          { transform: 'translate(0, 0)', offset: delayOffset },
          { transform: 'translate(-50%, 0)', offset: 1 },
        ],
        { duration, iterations: Infinity },
      );
    }
  }, [shouldMarqueeText]);

  return (
    <span ref={marqueeWrapper}>
      <p className={`${styles.hidden} ${className}`} ref={marqueeContent}>
        {children}
      </p>
      <p className={`${styles.hidden} ${className}`} ref={marqueeContentWithSpaces}>
        {children}
        {'\u00A0'.repeat(space)}
      </p>
      {shouldMarqueeText ? (
        <div className={styles.wrapper}>
          <div ref={marqueeTextElement} className={styles.marquee}>
            <p className={className}>
              {children}
              {'\u00A0'.repeat(space)}
            </p>
            <p className={className}>
              {children}
              {'\u00A0'.repeat(space)}
            </p>
          </div>
        </div>
      ) : (
        <p className={className}>{children}</p>
      )}
    </span>
  );
};
