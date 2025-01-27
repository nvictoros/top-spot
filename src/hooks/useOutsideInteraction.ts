'use client';

import { RefObject, useEffect } from 'react';

export const useOutsideInteraction = <T extends HTMLElement>({
  ref,
  events,
  handler,
}: {
  ref: RefObject<T | null>;
  events: string[];
  handler: (event: Event) => void;
}) => {
  useEffect(() => {
    const listener = (event: Event) => {
      if (!ref?.current?.contains(event.target as Node)) {
        handler(event);
      }
    };

    events.forEach((eventName) => {
      document.addEventListener(eventName, listener);
    });

    return () => {
      events.forEach((eventName) => {
        document.removeEventListener(eventName, listener);
      });
    };
  }, [events, handler, ref]);
};
