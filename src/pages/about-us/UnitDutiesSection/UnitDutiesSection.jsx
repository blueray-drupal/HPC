import { useState } from 'react';
import AboutShareBar from '../AboutShareBar/AboutShareBar.jsx';
import { UnitDutyTabIcon } from './UnitDutyIcons.jsx';
import './UnitDutiesSection.css';

export default function UnitDutiesSection({ data, showShareBar = false }) {
  const [activeTabId, setActiveTabId] = useState(data?.tabs?.[0]?.id ?? null);

  if (!data?.tabs?.length) return null;

  const activeTab = data.tabs.find((tab) => tab.id === activeTabId) ?? data.tabs[0];

  return (
    <div className="unit-duties-wrap">
      <div className="unit-duties">
        <div className="unit-duties__tabs" role="tablist" aria-label="مهام الوحدات">
          {data.tabs.map((tab) => {
            const isActive = tab.id === activeTab.id;

            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                id={`unit-duty-tab-${tab.id}`}
                aria-selected={isActive}
                aria-controls={`unit-duty-panel-${tab.id}`}
                className={['unit-duties__tab', isActive ? 'is-active' : ''].filter(Boolean).join(' ')}
                onClick={() => setActiveTabId(tab.id)}
              >
                <UnitDutyTabIcon name={tab.icon} isActive={isActive} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div
          className="unit-duties__panel"
          role="tabpanel"
          id={`unit-duty-panel-${activeTab.id}`}
          aria-labelledby={`unit-duty-tab-${activeTab.id}`}
        >
          <header className="unit-duties__panel-header">
            <span className="unit-duties__panel-icon" aria-hidden="true">
              <UnitDutyTabIcon name={activeTab.icon} isActive />
            </span>
            <h3 className="unit-duties__panel-title">{activeTab.label}</h3>
          </header>

          <div className="unit-duties__panel-body">
            {activeTab.bodyHtml ? (
              <div
                className="unit-duties__html hpc-paragraph"
                dangerouslySetInnerHTML={{ __html: activeTab.bodyHtml }}
              />
            ) : (
              activeTab.paragraphs?.map((paragraph) => (
                <p key={paragraph} className="unit-duties__paragraph hpc-paragraph">
                  {paragraph}
                </p>
              ))
            )}
          </div>
        </div>
      </div>

      {showShareBar ? <AboutShareBar className="unit-duties__share" /> : null}
    </div>
  );
}
