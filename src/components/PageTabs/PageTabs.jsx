import { NavLink } from 'react-router-dom';
import './PageTabs.css';

export default function PageTabs({ tabs, ariaLabel, renderIcon, getLabel = (tab) => tab.label }) {
  return (
    <nav className="about-tabs" aria-label={ariaLabel}>
      <div className="about-tabs__container">
        <div className="about-tabs__tabs-row">
          <div className="about-tabs__inner">
            {tabs.map((tab) => (
              <NavLink
                key={tab.id}
                to={tab.to}
                className={({ isActive }) => ['about-tabs__tab', isActive ? 'is-active' : ''].join(' ')}
              >
                {({ isActive }) => (
                  <>
                    {renderIcon(tab, isActive)}
                    <span className="about-tabs__label">{getLabel(tab)}</span>
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </div>
        <span className="about-tabs__line" aria-hidden="true" />
      </div>
    </nav>
  );
}
