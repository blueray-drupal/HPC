import { BarChart3, FileText, Handshake, Settings } from 'lucide-react';
import AboutShareBar from '../AboutShareBar/AboutShareBar.jsx';
import StrategyDownload from './StrategyDownload.jsx';
import { useTranslation } from '@/i18n/useTranslation.js';
import { SUB_GOAL_ICONS } from './StrategyIcons.jsx';
import './StrategySection.css';

const MAIN_ICONS = {
  document: FileText,
  chart: BarChart3,
  partnership: Handshake,
  settings: Settings,
};

function normalizeSubGoal(subGoal) {
  if (typeof subGoal === 'string') {
    return { id: subGoal, text: subGoal, iconUrl: null };
  }

  return {
    id: subGoal.id,
    text: subGoal.text,
    iconUrl: subGoal.iconUrl || null,
  };
}

function StrategySubGoalIcon({ iconUrl, FallbackIcon }) {
  if (iconUrl) {
    return <img src={iconUrl} alt="" className="strategy-sub-goal__icon-img" />;
  }

  if (FallbackIcon) {
    return <FallbackIcon />;
  }

  return null;
}

export default function StrategySection({ goals, download, showShareBar = false }) {
  const { t } = useTranslation();

  if (!goals?.length) return null;

  return (
    <div className="strategy-section">
      <div className="strategy-section__grid">
        {goals.map((goal) => {
          const GoalIcon = MAIN_ICONS[goal.mainIcon];
          const SubGoalIcon = SUB_GOAL_ICONS[goal.subIcon];
          const panelIconUrl =
            goal.image || goal.subGoals.map(normalizeSubGoal).find((item) => item.iconUrl)?.iconUrl;

          return (
            <article key={goal.id} className="strategy-goal">
              <header className="strategy-goal__header">
                <span className={`strategy-goal__main-icon strategy-goal__main-icon--${goal.theme}`}>
                  {GoalIcon ? (
                    <GoalIcon
                      size={24}
                      strokeWidth={1.75}
                      color={goal.theme === 'orange' ? '#874E00' : '#006182'}
                      aria-hidden="true"
                    />
                  ) : null}
                </span>

                <div className="strategy-goal__heading">
                  <h3 className="strategy-goal__title">
                    {t('about.strategicGoal')} {goal.number}:
                  </h3>
                  <p className="strategy-goal__description">{goal.description}</p>
                </div>
              </header>

              <div className="strategy-goal__panel">
                <div className="strategy-goal__panel-label">
                  {panelIconUrl || SubGoalIcon ? (
                    <span className="strategy-goal__panel-label-icon">
                      <StrategySubGoalIcon iconUrl={panelIconUrl} FallbackIcon={SubGoalIcon} />
                    </span>
                  ) : null}
                  <span>{t('about.subGoalsLabel')}</span>
                </div>

                <ul className="strategy-goal__subgoals">
                  {goal.subGoals.map((subGoal) => {
                    const item = normalizeSubGoal(subGoal);

                    return (
                      <li key={item.id} className="strategy-sub-goal">
                        <span className="strategy-sub-goal__icon">
                          <StrategySubGoalIcon iconUrl={item.iconUrl} FallbackIcon={SubGoalIcon} />
                        </span>
                        <p className="strategy-sub-goal__text hpc-paragraph">{item.text}</p>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </article>
          );
        })}
      </div>

      {download ? <StrategyDownload data={download} /> : null}

      {showShareBar ? <AboutShareBar className="strategy-section__share" /> : null}
    </div>
  );
}
