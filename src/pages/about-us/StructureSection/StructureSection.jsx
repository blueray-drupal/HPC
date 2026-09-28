import AboutShareBar from '../AboutShareBar/AboutShareBar.jsx';
import './StructureSection.css';

function StructureCard({ member }) {
  return (
    <article className="structure-card">
      <div className="structure-card__flipper">
        <div className="structure-card__face structure-card__face--front">
          <div className="structure-card__media">
            {member.image ? (
              <img src={member.image} alt={member.name} className="structure-card__image" loading="lazy" />
            ) : (
              <div className="structure-card__placeholder" aria-hidden="true" />
            )}
          </div>
          <p className="structure-card__name">{member.name}</p>
        </div>

        <div className="structure-card__face structure-card__face--back">
          <div className="structure-card__back-panel">
            {member.position ? <p className="structure-card__position">{member.position}</p> : null}
            {member.email ? (
              <a href={`mailto:${member.email}`} className="structure-card__email">
                {member.email}
              </a>
            ) : null}
          </div>
          <p className="structure-card__name">{member.name}</p>
        </div>
      </div>
    </article>
  );
}

const MAX_CARDS_PER_ROW = 3;

function chunkMembers(members, size) {
  const rows = [];

  for (let index = 0; index < members.length; index += size) {
    rows.push(members.slice(index, index + size));
  }

  return rows;
}

function StructureLevel({ members }) {
  if (!members?.length) return null;

  const rows = chunkMembers(members, MAX_CARDS_PER_ROW);

  return (
    <div className="structure-level-group">
      {rows.map((rowMembers) => {
        const colsClass = `structure-level--cols-${Math.min(rowMembers.length, MAX_CARDS_PER_ROW)}`;

        return (
          <div
            key={rowMembers.map((member) => member.id).join('-')}
            className={['structure-level', colsClass].join(' ')}
          >
            {rowMembers.map((member) => (
              <StructureCard key={member.id} member={member} />
            ))}
          </div>
        );
      })}
    </div>
  );
}

export default function StructureSection({ orgChart, showShareBar = false }) {
  if (!orgChart?.levels?.length) return null;

  return (
    <div className="structure-section-wrap">
      <div className="structure-section">
        {orgChart.levels.map((members) => (
          <StructureLevel key={members.map((member) => member.id).join('-')} members={members} />
        ))}
      </div>

      {showShareBar ? <AboutShareBar className="structure-section__share" /> : null}
    </div>
  );
}
