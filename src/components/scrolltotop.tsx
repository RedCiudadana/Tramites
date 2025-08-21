import { useEffect } from 'react';

interface ScrollToTopProps {
  section: string;
}

const ScrollToTop = ({ section }: ScrollToTopProps) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [section]);

  return null;
};

export default ScrollToTop;