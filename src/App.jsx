import { useState, useEffect, useCallback } from 'react'
import GameBoard from './components/GameBoard'
import IntroScreen from './components/IntroScreen'
import SettingsPanel from './components/SettingsPanel'
import GameOver from './components/GameOver'
import './App.css'

const GRID_SIZE = { width: 15, height: 17 }
const DIFFICULTY_SPEEDS = {
  easy: 150,
  medium: 100,
  hard: 70
}

function App() {
  const [gameState, setGameState] = useState('intro')
  const [difficulty, setDifficulty] = useState('medium')
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)

  const startGame = useCallback(() => {
    setGameState('playing')
    setScore(0)
  }, [])

  const endGame = useCallback((finalScore) => {
    setGameState('gameOver')
    if (finalScore > highScore) {
      setHighScore(finalScore)
    }
  }, [highScore])

  const restartGame = useCallback(() => {
    startGame()
  }, [startGame])

  const showSettings = useCallback(() => {
    setGameState('settings')
  }, [])

  const updateDifficulty = useCallback((newDifficulty) => {
    setDifficulty(newDifficulty)
    setGameState('intro')
  }, [])

  return (
    <div className="app">
      {gameState === 'intro' && (
        <IntroScreen 
          onStart={startGame}
          onSettings={showSettings}
          highScore={highScore}
        />
      )}
      
      {gameState === 'playing' && (
        <GameBoard
          gridSize={GRID_SIZE}
          speed={DIFFICULTY_SPEEDS[difficulty]}
          onGameOver={endGame}
          onScoreUpdate={setScore}
          onSettings={showSettings}
        />
      )}
      
      {gameState === 'gameOver' && (
        <GameOver
          score={score}
          highScore={highScore}
          onRestart={restartGame}
          onMenu={() => setGameState('intro')}
        />
      )}
      
      {gameState === 'settings' && (
        <SettingsPanel
          currentDifficulty={difficulty}
          onDifficultyChange={updateDifficulty}
          onBack={() => setGameState('intro')}
        />
      )}
    </div>
  )
}

export default App