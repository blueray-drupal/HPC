import { useEffect, useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage.js';

export function useDrupalFetch(fetchFn, deps = []) {
  const { language } = useLanguage();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    setData(null);

    Promise.resolve(fetchFn(language))
      .then((result) => {
        if (!cancelled) {
          setData(result);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setData(null);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [language, ...deps]);

  return { data, loading };
}
