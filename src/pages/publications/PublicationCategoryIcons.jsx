const CATEGORY_ICON_SRC = {
  plans: '/publications/icons/plans.svg',
  reports: '/publications/icons/reports.svg',
  training: '/publications/icons/training.svg',
  policyBriefs: '/publications/icons/policy-briefs.svg',
  studies: '/publications/icons/studies.svg',
};

export function PublicationCategoryIcon({ name }) {
  const src = CATEGORY_ICON_SRC[name];
  if (!src) return null;

  return (
    <img
      src={src}
      alt=""
      className="publication-category__icon-img"
      width={34}
      height={34}
      decoding="async"
    />
  );
}

export function PublicationArrowIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M4 12L12 4M12 4H6M12 4V10"
        stroke="white"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
