import './VisionSection.css';

const VISION_ICONS = {
  vision: (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="19" viewBox="0 0 28 19" fill="none" aria-hidden="true">
      <path
        d="M13.75 15C15.3125 15 16.6406 14.4531 17.7344 13.3594C18.8281 12.2656 19.375 10.9375 19.375 9.375C19.375 7.8125 18.8281 6.48438 17.7344 5.39062C16.6406 4.29688 15.3125 3.75 13.75 3.75C12.1875 3.75 10.8594 4.29688 9.76562 5.39062C8.67188 6.48438 8.125 7.8125 8.125 9.375C8.125 10.9375 8.67188 12.2656 9.76562 13.3594C10.8594 14.4531 12.1875 15 13.75 15ZM13.75 12.75C12.8125 12.75 12.0156 12.4219 11.3594 11.7656C10.7031 11.1094 10.375 10.3125 10.375 9.375C10.375 8.4375 10.7031 7.64062 11.3594 6.98438C12.0156 6.32812 12.8125 6 13.75 6C14.6875 6 15.4844 6.32812 16.1406 6.98438C16.7969 7.64062 17.125 8.4375 17.125 9.375C17.125 10.3125 16.7969 11.1094 16.1406 11.7656C15.4844 12.4219 14.6875 12.75 13.75 12.75ZM13.75 18.75C10.7083 18.75 7.9375 17.901 5.4375 16.2031C2.9375 14.5052 1.125 12.2292 0 9.375C1.125 6.52083 2.9375 4.24479 5.4375 2.54688C7.9375 0.848958 10.7083 0 13.75 0C16.7917 0 19.5625 0.848958 22.0625 2.54688C24.5625 4.24479 26.375 6.52083 27.5 9.375C26.375 12.2292 24.5625 14.5052 22.0625 16.2031C19.5625 17.901 16.7917 18.75 13.75 18.75ZM13.75 16.25C16.1042 16.25 18.2656 15.6302 20.2344 14.3906C22.2031 13.151 23.7083 11.4792 24.75 9.375C23.7083 7.27083 22.2031 5.59896 20.2344 4.35938C18.2656 3.11979 16.1042 2.5 13.75 2.5C11.3958 2.5 9.23438 3.11979 7.26562 4.35938C5.29688 5.59896 3.79167 7.27083 2.75 9.375C3.79167 11.4792 5.29688 13.151 7.26562 14.3906C9.23438 15.6302 11.3958 16.25 13.75 16.25Z"
        fill="#2B667E"
      />
    </svg>
  ),
  mission: (
    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="22" viewBox="0 0 19 22" fill="none" aria-hidden="true">
      <path
        d="M0 21.25V0H11.25L11.75 2.5H18.75V15H10L9.5 12.5H2.5V21.25H0ZM12.0625 12.5H16.25V5H9.6875L9.1875 2.5H2.5V10H11.5625L12.0625 12.5Z"
        fill="#006182"
      />
    </svg>
  ),
};

export default function VisionSection({ cards }) {
  if (!cards?.length) return null;

  return (
    <div className="vision-section">
      <div className="vision-section__cards">
        {cards.map((card) => (
          <article key={card.id} className="vision-section__card">
            {card.image ? (
              <img
                src={card.image}
                alt={card.heading}
                className="vision-section__image"
                loading="lazy"
              />
            ) : (
              <span className="vision-section__icon">{VISION_ICONS[card.icon]}</span>
            )}
            <h3 className="vision-section__title">{card.heading}</h3>
            {card.bodyHtml ? (
              <div
                className="vision-section__html hpc-paragraph"
                dangerouslySetInnerHTML={{ __html: card.bodyHtml }}
              />
            ) : (
              <p className="vision-section__text hpc-paragraph">{card.text}</p>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
