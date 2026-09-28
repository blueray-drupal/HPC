import { ChevronLeft, ChevronRight } from 'lucide-react';
import './PublicationsPagination.css';

export default function PublicationsPagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav className="publications-pagination" aria-label="ترقيم صفحات الإصدارات">
      <button
        type="button"
        className="publications-pagination__btn publications-pagination__btn--arrow"
        aria-label="الصفحة السابقة"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <ChevronRight size={16} aria-hidden="true" />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          type="button"
          className={[
            'publications-pagination__btn',
            page === currentPage ? 'is-active' : '',
          ].join(' ')}
          aria-current={page === currentPage ? 'page' : undefined}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        className="publications-pagination__btn publications-pagination__btn--arrow"
        aria-label="الصفحة التالية"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <ChevronLeft size={16} aria-hidden="true" />
      </button>
    </nav>
  );
}
