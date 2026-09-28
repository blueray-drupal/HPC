import './UsefulLinksGrid.css';

export default function UsefulLinksGrid({ items }) {
  if (!items.length) {
    return <p className="useful-links-grid__empty">لا توجد روابط متاحة حالياً.</p>;
  }

  return (
    <div className="useful-links-grid">
      {items.map((item) => (
        <a
          key={item.id}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="useful-links-grid__card"
          aria-label={item.title}
        >
          {item.image ? (
            <img src={item.image} alt={item.title} className="useful-links-grid__logo" loading="lazy" />
          ) : (
            <span className="useful-links-grid__label">{item.title}</span>
          )}
        </a>
      ))}
    </div>
  );
}
