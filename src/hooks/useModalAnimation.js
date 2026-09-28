import { useEffect, useState } from 'react';

export const MODAL_ANIMATION_MS = 300;

export function useModalAnimation(open) {
  const [mounted, setMounted] = useState(open);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (open) {
      setMounted(true);
      const frame = requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true));
      });
      return () => cancelAnimationFrame(frame);
    }

    setVisible(false);
    const timer = window.setTimeout(() => setMounted(false), MODAL_ANIMATION_MS);
    return () => window.clearTimeout(timer);
  }, [open]);

  return { mounted, visible };
}

export function useModalBodyLock(mounted, onClose) {
  useEffect(() => {
    if (!mounted) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mounted, onClose]);
}
