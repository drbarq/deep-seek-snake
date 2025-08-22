import './IntroScreen.css'

const IntroScreen = ({ onStart, onSettings, highScore }) => {
  return (
    <div className="intro-screen">
      <div className="intro-content">
        <h1 className="title">🐍 Snake Game</h1>
        <p className="subtitle">Classic mobile snake experience</p>
        
        {highScore > 0 && (
          <div className="high-score">
            🏆 High Score: {highScore}
          </div>
        )}
        
        <div className="button-group">
          <button 
            className="start-btn"
            onClick={onStart}
          >
            Start Game
          </button>
          
          <button 
            className="settings-btn"
            onClick={onSettings}
          >
            Settings
          </button>
        </div>
        
        <div className="instructions">
          <h3>How to Play:</h3>
          <ul>
            <li>Use arrow keys or touch controls to move</li>
            <li>Eat the red food to grow longer</li>
            <li>Avoid walls and yourself</li>
            <li>Get the highest score!</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default IntroScreen