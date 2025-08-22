import './GameOver.css'

const GameOver = ({ score, highScore, onRestart, onMenu }) => {
  return (
    <div className="game-over">
      <div className="game-over-content">
        <h2>Game Over!</h2>
        
        <div className="score-display">
          <div className="final-score">
            🎯 Your Score: {score}
          </div>
          
          {score === highScore && score > 0 && (
            <div className="new-high-score">
              🏆 New High Score! 🏆
            </div>
          )}
          
          {highScore > 0 && (
            <div className="high-score-display">
              🏆 High Score: {highScore}
            </div>
          )}
        </div>
        
        <div className="game-over-buttons">
          <button 
            className="restart-btn"
            onClick={onRestart}
          >
            Play Again
          </button>
          
          <button 
            className="menu-btn"
            onClick={onMenu}
          >
            Main Menu
          </button>
        </div>
        
        <div className="game-over-message">
          {score === 0 ? (
            <p>Don't give up! Try again! 🐍</p>
          ) : score < 10 ? (
            <p>Good start! Keep practicing! 🌟</p>
          ) : score < 25 ? (
            <p>Great job! You're getting better! 🚀</p>
          ) : (
            <p>Amazing! You're a snake master! 🐍👑</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default GameOver