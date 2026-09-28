import AboutShareBar from '../AboutShareBar/AboutShareBar.jsx';
import { CouncilDutyIcon } from './CouncilDutyIcons.jsx';
import './CouncilDutiesSection.css';

export default function CouncilDutiesSection({ data, showShareBar = false }) {
  if (!data?.items?.length) return null;

  return (
    <div className="council-duties">
      {data.intro ? <p className="council-duties__intro hpc-paragraph">{data.intro}</p> : null}

      <div className="council-duties__grid">
        {data.items.map((item) => (
          <article key={item.id} className="council-duty-card">
            <div
              className={[
                'council-duty-card__header',
                !item.headerColor && item.theme ? `council-duty-card__header--${item.theme}` : '',
              ]
                .filter(Boolean)
                .join(' ')}
              style={item.headerColor ? { background: item.headerColor } : undefined}
            >
              {item.image ? (
                <img
                  src={item.image}
                  alt=""
                  className="council-duty-card__header-image"
                  loading="lazy"
                />
              ) : (
                <CouncilDutyIcon name={item.icon} />
              )}
            </div>
            <div className="council-duty-card__body">
              <p className="council-duty-card__text hpc-paragraph">
                <span className="council-duty-card__number">{item.number}.</span> {item.text}
              </p>
            </div>
          </article>
        ))}
      </div>

      {showShareBar ? <AboutShareBar className="council-duties__share" /> : null}
    </div>
  );
}
