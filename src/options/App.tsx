import { PlaceList } from './components/PlaceList'
import { Settings } from './components/Settings'
import logoIcon from '../assets/icons/icon48.png'

export function App() {
  return (
    <div className="options-container">
      <header className="options-header">
        <img className="options-logo" src={logoIcon} alt="Arrivio" />
        <h1 className="options-title">Arrivio</h1>
      </header>

      <main className="options-main">
        <section className="options-section">
          <h2 className="section-title">Your Places</h2>
          <p className="section-desc">
            Add the places you care about. ETAs will appear automatically when
            you browse real estate listings.
          </p>
          <PlaceList />
        </section>

        <section className="options-section">
          <h2 className="section-title">Settings</h2>
          <Settings />
        </section>
      </main>
    </div>
  )
}
