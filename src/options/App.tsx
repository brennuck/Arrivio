import { PlaceList } from './components/PlaceList'
import { Settings } from './components/Settings'
import logoIcon from '../assets/icons/icon48.png'

export function App() {
  return (
    <div className="options-page">
      {/* Topo background pattern */}
      <svg className="topo-bg" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="topo" width="260" height="260" patternUnits="userSpaceOnUse">
            <path d="M130 30 Q160 60 140 100 Q120 140 150 170 Q180 200 130 230" fill="none" stroke="var(--topo)" strokeWidth="0.7"/>
            <path d="M130 50 Q150 75 135 105 Q120 135 145 160 Q165 185 130 210" fill="none" stroke="var(--topo)" strokeWidth="0.7"/>
            <path d="M40 80 Q70 50 110 70 Q150 90 180 60" fill="none" stroke="var(--topo)" strokeWidth="0.7"/>
            <path d="M20 160 Q60 130 100 150 Q140 170 190 140 Q230 110 250 140" fill="none" stroke="var(--topo)" strokeWidth="0.7"/>
            <circle cx="60" cy="200" r="30" fill="none" stroke="var(--topo)" strokeWidth="0.7"/>
            <circle cx="60" cy="200" r="50" fill="none" stroke="var(--topo)" strokeWidth="0.7"/>
            <circle cx="200" cy="60" r="25" fill="none" stroke="var(--topo)" strokeWidth="0.7"/>
            <circle cx="200" cy="60" r="45" fill="none" stroke="var(--topo)" strokeWidth="0.7"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#topo)" />
      </svg>

      <div className="options-container">
        <header className="options-header">
          <div className="header-brand">
            <img className="options-logo" src={logoIcon} alt="Arrivio" />
            <div>
              <h1 className="options-title">Arrivio</h1>
              <p className="options-subtitle">Your commute, on every listing.</p>
            </div>
          </div>
        </header>

        <main className="options-main">
          <section className="options-section">
            <div className="section-head">
              <div className="section-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
              <div>
                <h2 className="section-title">Your Places</h2>
                <p className="section-desc">
                  Add the places you care about. ETAs appear automatically on listings.
                </p>
              </div>
            </div>
            <PlaceList />
          </section>

          <section className="options-section">
            <div className="section-head">
              <div className="section-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
              </div>
              <div>
                <h2 className="section-title">Settings</h2>
                <p className="section-desc">Configure your transport mode.</p>
              </div>
            </div>
            <Settings />
          </section>
        </main>
      </div>
    </div>
  )
}
