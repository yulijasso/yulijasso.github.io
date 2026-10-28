'use client';

import { useEffect, useState } from 'react';

export const MOBILE_QUERY = '(max-width: 768px)';

// True on phone-sized screens. Starts false so the static export renders the desktop layout first.
export default function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(MOBILE_QUERY);
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  return isMobile;
}
