import AboutShareBar from '../AboutShareBar/AboutShareBar.jsx';
import { Gavel, Handshake, Lightbulb, ShieldCheck, Users } from 'lucide-react';
import './CoreValuesSection.css';

const VALUE_ICONS = {
  lightbulb: Lightbulb,
  gavel: Gavel,
  shield: ShieldCheck,
  handshake: Handshake,
  partnership: Users,
};

export default function CoreValuesSection({ data }) {
  if (!data?.items?.length) return null;

  return (
    <section className="core-values-section" aria-labelledby="core-values-title">
      <div className="core-values-section__inner">
        <div className="core-values-section__panel">
          <header className="core-values-section__header">
            <span className="core-values-section__accent" aria-hidden="true" />
            <h3 id="core-values-title" className="core-values-section__title">
              {data.title}
            </h3>
          </header>

          <div className="core-values-section__cards">
            {data.items.map((item) => {
              const Icon = item.icon ? VALUE_ICONS[item.icon] : null;

              return (
                <article key={item.id} className="core-values-section__card">
                  <span className="core-values-section__icon">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt=""
                        className="core-values-section__icon-image"
                        loading="lazy"
                      />
                    ) : Icon ? (
                      <Icon size={22} strokeWidth={1.75} aria-hidden="true" />
                    ) : null}
                  </span>
                  <p className="core-values-section__label">{item.label}</p>
                </article>
              );
            })}
          </div>
        </div>

        <AboutShareBar className="core-values-section__share" />
      </div>
    </section>
  );
}
