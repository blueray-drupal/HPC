import { useEffect, useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage.js';
import {
  fetchPublicationsByCategory,
  peekPublicationsCache,
} from '@/services/api/publications.js';

export function useCategoryPublications(categoryId) {
  const { language } = useLanguage();
  const [data, setData] = useState(() => peekPublicationsCache(language, categoryId) ?? null);
  const [loading, setLoading] = useState(() => peekPublicationsCache(language, categoryId) == null);

  useEffect(() => {
    let cancelled = false;
    const cached = peekPublicationsCache(language, categoryId);

    if (cached) {
      setData(cached);
      setLoading(false);
      return undefined;
    }

    setLoading(true);

    fetchPublicationsByCategory(language, categoryId)
      .then((result) => {
        if (!cancelled) {
          setData(Array.isArray(result) ? result : []);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setData([]);
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
  }, [language, categoryId]);

  const publications = Array.isArray(data) ? data : [];

  return { publications, loading };
}
