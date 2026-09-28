export default function LegalContent({ paragraphs = [], intro, items = [], bodyHtml }) {
  if (bodyHtml) {
    return (
      <div className="info-page__text">
        <div className="info-page__paragraph" dangerouslySetInnerHTML={{ __html: bodyHtml }} />
      </div>
    );
  }

  if (items.length) {
    return (
      <div className="info-page__text">
        {intro ? <p className="info-page__paragraph">{intro}</p> : null}
        <ol className="info-page__list">
          {items.map((item, index) => (
            <li key={item} className="info-page__list-item">
              <span className="info-page__list-number">{index + 1}.</span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      </div>
    );
  }

  return (
    <div className="info-page__text">
      {paragraphs.map((paragraph) => (
        <p key={paragraph} className="info-page__paragraph">
          {paragraph}
        </p>
      ))}
    </div>
  );
}
