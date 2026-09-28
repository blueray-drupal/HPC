export function safeText(value, fallback = '') {
  if (value === null || value === undefined) return fallback;
  const text = String(value).trim();
  if (!text || text === 'undefined' || text === 'null') return fallback;
  return text;
}
