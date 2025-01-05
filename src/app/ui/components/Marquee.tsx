import { useEffect, useRef, useState } from 'react';
import styles from './Marquee.module.css';

type MarqueeProps = {
  children: string;
  className: string;
};

export const Marquee = ({ children, className }: MarqueeProps) => {
  const marqueeWrapper = useRef<HTMLDivElement | null>(null);
  const marqueeContent = useRef<HTMLDivElement | null>(null);
  const [marqueeText, setMarqueeText] = useState<boolean>(false);

  useEffect(() => {
    const marqueeContentWidth = marqueeContent?.current?.scrollWidth || 0;
    const marqueeWrapperWidth = marqueeWrapper?.current?.clientWidth || 0;

    if (marqueeContentWidth > marqueeWrapperWidth) {
      setMarqueeText(true);
    }
  }, [children]);

  return (
    <span ref={marqueeWrapper}>
      <p className={`${styles.hidden} ${className}`} ref={marqueeContent}>
        {children}
      </p>
      {marqueeText ? (
        <div className={styles.wrapper}>
          <div className={styles.marquee}>
            <p className={className}>{children}&nbsp;&nbsp;&nbsp;&nbsp;</p>
            <p className={className}>{children}&nbsp;&nbsp;&nbsp;&nbsp;</p>
          </div>
        </div>
      ) : (
        <p className={className}>{children}</p>
      )}
    </span>
  );
};
