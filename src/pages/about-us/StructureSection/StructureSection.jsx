import AboutShareBar from '../AboutShareBar/AboutShareBar.jsx';
import './StructureSection.css';

const CHUNK_SIZE = 4;
const LAST_ROW_SIZE = 5;
/** أول 3 مستويات هرمية تبقى كما هي؛ الباقي يُدمج ويُقسَّم */
const UPPER_LEVEL_COUNT = 3;

function StructureCard({ member }) {
  return (
    <article className="structure-card">
      <div className="structure-card__flipper">
        <div className="structure-card__face structure-card__face--front">
          <div className="structure-card__front-panel">
            <p className="structure-card__name">{member.name}</p>
          </div>
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

function normalizeOrgChartLevel(level) {
  if (Array.isArray(level)) {
    return { weight: null, members: level };
  }

  return {
    weight: level?.weight ?? null,
    members: Array.isArray(level?.members) ? level.members : [],
  };
}

/**
 * صفوف من 4، والصف الأخير حتى 5 كروت (بدل كرت منفرد).
 * مثال 13: 4 + 4 + 5
 */
function chunkWithLastRowOfFive(members, size = CHUNK_SIZE, lastSize = LAST_ROW_SIZE) {
  if (!members.length) return [];
  if (members.length <= lastSize) return [members];

  const rows = [];
  const remaining = [...members];

  while (remaining.length > lastSize) {
    rows.push(remaining.splice(0, size));
  }

  if (remaining.length) rows.push(remaining);
  return rows;
}

function StructureLevelRows({ rows, weight, className = '' }) {
  if (!rows?.length) return null;

  return (
    <div
      className={['structure-level-group', className].filter(Boolean).join(' ')}
      data-structure-weight={weight ?? undefined}
    >
      {rows.map((row) => {
        if (!row?.length) return null;
        const isCompact = row.length >= LAST_ROW_SIZE;

        return (
          <div
            key={row.map((member) => member.id).join('-')}
            className={['structure-level', isCompact ? 'structure-level--compact' : '']
              .filter(Boolean)
              .join(' ')}
            style={{ '--structure-cols': row.length }}
          >
            {row.map((member) => (
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

  const tiers = orgChart.levels
    .map(normalizeOrgChartLevel)
    .filter((tier) => tier.members.length)
    .sort((a, b) => {
      if (a.weight != null && b.weight != null && a.weight !== b.weight) {
        return a.weight - b.weight;
      }
      if (a.weight != null) return -1;
      if (b.weight != null) return 1;
      return 0;
    });

  const upperTiers = tiers.slice(0, UPPER_LEVEL_COUNT);
  const lowerTiers = tiers.slice(UPPER_LEVEL_COUNT);
  const lowerMembers = lowerTiers.flatMap((tier) => tier.members);
  const lowerRows = chunkWithLastRowOfFive(lowerMembers);

  return (
    <div className="structure-section-wrap">
      <div className="structure-section">
        {upperTiers.map((tier, index) => (
          <StructureLevelRows
            key={`upper-${tier.weight ?? 'i'}-${index}`}
            rows={[tier.members]}
            weight={tier.weight ?? index + 1}
          />
        ))}

        {lowerRows.length ? (
          <StructureLevelRows
            key="lower-chunked"
            rows={lowerRows}
            weight={lowerTiers[0]?.weight ?? UPPER_LEVEL_COUNT + 1}
            className="structure-level-group--chunked"
          />
        ) : null}
      </div>

      {showShareBar ? <AboutShareBar className="structure-section__share" /> : null}
    </div>
  );
}
