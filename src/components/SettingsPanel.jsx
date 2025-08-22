import './SettingsPanel.css'

const SettingsPanel = ({ currentDifficulty, onDifficultyChange, onBack }) => {
  const difficulties = [
    { value: 'easy', label: 'Easy', description: 'Slow speed, great for beginners' },
    { value: 'medium', label: 'Medium', description: 'Balanced speed and challenge' },
    { value: 'hard', label: 'Hard', description: 'Fast speed, for experts only' }
  ]

  return (
    <div className="settings-panel">
      <div className="settings-content">
        <div className="settings-header">
          <h2>Settings</h2>
          <button 
            className="back-btn"
            onClick={onBack}
            aria-label="Back to menu"
          >
            ←
          </button>
        </div>
        
        <div className="difficulty-section">
          <h3>Difficulty Level</h3>
          <div className="difficulty-options">
            {difficulties.map(diff => (
              <label 
                key={diff.value}
                className={`difficulty-option ${currentDifficulty === diff.value ? 'selected' : ''}`}
              >
                <input
                  type="radio"
                  name="difficulty"
                  value={diff.value}
                  checked={currentDifficulty === diff.value}
                  onChange={() => onDifficultyChange(diff.value)}
                />
                <div className="option-content">
                  <span className="option-label">{diff.label}</span>
                  <span className="option-description">{diff.description}</span>
                </div>
              </label>
            ))}
          </div>
        </div>
        
        <div className="settings-info">
          <h4>Game Features:</h4>
          <ul>
            <li>Mobile-optimized touch controls</li>
            <li>Haptic feedback support</li>
            <li>Responsive design for all devices</li>
            <li>High score tracking</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default SettingsPanel