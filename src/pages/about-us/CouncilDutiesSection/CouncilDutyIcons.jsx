export function CouncilDutyIcon({ name }) {
  const icons = {
    people: (
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <circle cx="18" cy="16" r="5" stroke="white" strokeWidth="2" />
        <path d="M8 36C8 29.3726 12.4772 25 18 25C23.5228 25 28 29.3726 28 36" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <circle cx="32" cy="18" r="4" stroke="white" strokeWidth="2" />
        <path d="M26 36C26 31.5817 28.6863 28 32 28C35.3137 28 38 31.5817 38 36" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    committee: (
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <circle cx="24" cy="14" r="4" stroke="white" strokeWidth="2" />
        <circle cx="12" cy="20" r="3.5" stroke="white" strokeWidth="2" />
        <circle cx="36" cy="20" r="3.5" stroke="white" strokeWidth="2" />
        <path d="M18 36C18 30.4772 20.6863 27 24 27C27.3137 27 30 30.4772 30 36" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <path d="M6 36C6 32.134 8.01472 29 12 29" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <path d="M42 36C42 32.134 39.9853 29 36 29" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    database: (
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <ellipse cx="24" cy="12" rx="12" ry="5" stroke="white" strokeWidth="2" />
        <path d="M12 12V24C12 26.7614 17.3726 29 24 29C30.6274 29 36 26.7614 36 24V12" stroke="white" strokeWidth="2" />
        <path d="M12 24V36C12 38.7614 17.3726 41 24 41C30.6274 41 36 38.7614 36 36V24" stroke="white" strokeWidth="2" />
      </svg>
    ),
    megaphone: (
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <path d="M10 20H18L30 12V36L18 28H10V20Z" stroke="white" strokeWidth="2" strokeLinejoin="round" />
        <path d="M34 18C36.2091 19.7909 37.5 22.2909 37.5 25C37.5 27.7091 36.2091 30.2091 34 32" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    book: (
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <path d="M10 10H22C25.3137 10 28 12.6863 28 16V38C28 34.6863 25.3137 32 22 32H10V10Z" stroke="white" strokeWidth="2" strokeLinejoin="round" />
        <path d="M38 10H26C22.6863 10 20 12.6863 20 16V38C20 34.6863 22.6863 32 26 32H38V10Z" stroke="white" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    ),
    handshake: (
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <path d="M12 24L18 18L24 24L30 18L36 24" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 30H16L20 26L28 34L32 30H38" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    graduation: (
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <path d="M6 18L24 10L42 18L24 26L6 18Z" stroke="white" strokeWidth="2" strokeLinejoin="round" />
        <path d="M14 22V31C14 31 18.4772 35 24 35C29.5228 35 34 31 34 31V22" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <path d="M42 18V30" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    conference: (
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <rect x="8" y="14" width="32" height="22" rx="2" stroke="white" strokeWidth="2" />
        <path d="M16 14V10H32V14" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <path d="M16 22H32M16 28H26" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    globe: (
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <circle cx="24" cy="24" r="14" stroke="white" strokeWidth="2" />
        <path d="M10 24H38" stroke="white" strokeWidth="2" />
        <path d="M24 10C19 14 16 19 16 24C16 29 19 34 24 38C29 34 32 29 32 24C32 19 29 14 24 10Z" stroke="white" strokeWidth="2" />
      </svg>
    ),
    lightbulb: (
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <path d="M24 8C17.3726 8 12 13.3726 12 20C12 24.5 14.5 28.5 18 30.5V34H30V30.5C33.5 28.5 36 24.5 36 20C36 13.3726 30.6274 8 24 8Z" stroke="white" strokeWidth="2" strokeLinejoin="round" />
        <path d="M18 38H30" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  };

  return icons[name] ?? null;
}
