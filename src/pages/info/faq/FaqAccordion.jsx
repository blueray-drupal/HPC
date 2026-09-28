import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import './FaqAccordion.css';

export default function FaqAccordion({ items }) {
  const [openId, setOpenId] = useState(items[0]?.id ?? null);

  const toggleItem = (id) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <div className="faq-accordion">
      {items.map((item) => {
        const isOpen = openId === item.id;

        return (
          <article key={item.id} className={['faq-accordion__item', isOpen ? 'is-open' : ''].join(' ')}>
            <button
              type="button"
              className="faq-accordion__trigger"
              aria-expanded={isOpen}
              onClick={() => toggleItem(item.id)}
            >
              <span className="faq-accordion__question">{item.question}</span>
              <ChevronDown size={18} className="faq-accordion__icon" aria-hidden="true" />
            </button>

            {isOpen ? (
              <div className="faq-accordion__panel">
                {item.answerHtml ? (
                  <div
                    className="faq-accordion__answer"
                    dangerouslySetInnerHTML={{ __html: item.answerHtml }}
                  />
                ) : (
                  <p className="faq-accordion__answer">{item.answer}</p>
                )}
              </div>
            ) : null}
          </article>
        );
      })}
    </div>
  );
}
