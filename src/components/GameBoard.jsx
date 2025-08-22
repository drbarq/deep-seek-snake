import { useState, useEffect, useCallback, useRef } from 'react'
import './GameBoard.css'

const DIRECTIONS = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 }
}

const GameBoard = ({ gridSize, speed, onGameOver, onScoreUpdate, onSettings }) => {
  const [snake, setSnake] = useState([{ x: 7, y: 8 }])
  const [food, setFood] = useState({ x: 5, y: 5 })
  const [direction, setDirection] = useState(DIRECTIONS.RIGHT)
  const [nextDirection, setNextDirection] = useState(DIRECTIONS.RIGHT)
  const [isPaused, setIsPaused] = useState(false)
  const gameLoopRef = useRef(null)

  const generateFood = useCallback(() => {
    const newFood = {
      x: Math.floor(Math.random() * gridSize.width),
      y: Math.floor(Math.random() * gridSize.height)
    }
    
    const isOnSnake = snake.some(segment => 
      segment.x === newFood.x && segment.y === newFood.y
    )
    
    if (isOnSnake) {
      return generateFood()
    }
    
    return newFood
  }, [snake, gridSize])

  const checkCollision = useCallback((head) => {
    if (
      head.x < 0 || head.x >= gridSize.width ||
      head.y < 0 || head.y >= gridSize.height
    ) {
      return true
    }
    
    return snake.some((segment, index) => 
      index > 0 && segment.x === head.x && segment.y === head.y
    )
  }, [snake, gridSize])

  const moveSnake = useCallback(() => {
    setDirection(nextDirection)
    
    setSnake(prevSnake => {
      const head = { ...prevSnake[0] }
      head.x += nextDirection.x
      head.y += nextDirection.y
      
      if (checkCollision(head)) {
        onGameOver(prevSnake.length - 1)
        return prevSnake
      }
      
      const newSnake = [head, ...prevSnake]
      
      if (head.x === food.x && head.y === food.y) {
        setFood(generateFood())
        onScoreUpdate(newSnake.length - 1)
        
        if ('vibrate' in navigator) {
          navigator.vibrate(50)
        }
      } else {
        newSnake.pop()
      }
      
      return newSnake
    })
  }, [nextDirection, food, checkCollision, generateFood, onGameOver, onScoreUpdate])

  const changeDirection = useCallback((newDirection) => {
    if (
      (newDirection === DIRECTIONS.UP && direction !== DIRECTIONS.DOWN) ||
      (newDirection === DIRECTIONS.DOWN && direction !== DIRECTIONS.UP) ||
      (newDirection === DIRECTIONS.LEFT && direction !== DIRECTIONS.RIGHT) ||
      (newDirection === DIRECTIONS.RIGHT && direction !== DIRECTIONS.LEFT)
    ) {
      setNextDirection(newDirection)
    }
  }, [direction])

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (isPaused) return
      
      switch(e.key) {
        case 'ArrowUp':
          changeDirection(DIRECTIONS.UP)
          break
        case 'ArrowDown':
          changeDirection(DIRECTIONS.DOWN)
          break
        case 'ArrowLeft':
          changeDirection(DIRECTIONS.LEFT)
          break
        case 'ArrowRight':
          changeDirection(DIRECTIONS.RIGHT)
          break
        case 'Escape':
          setIsPaused(prev => !prev)
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [changeDirection, isPaused])

  useEffect(() => {
    if (isPaused) return
    
    gameLoopRef.current = setInterval(moveSnake, speed)
    return () => clearInterval(gameLoopRef.current)
  }, [moveSnake, speed, isPaused])

  const handleSwipe = useCallback((dx, dy) => {
    if (Math.abs(dx) > Math.abs(dy)) {
      changeDirection(dx > 0 ? DIRECTIONS.RIGHT : DIRECTIONS.LEFT)
    } else {
      changeDirection(dy > 0 ? DIRECTIONS.DOWN : DIRECTIONS.UP)
    }
  }, [changeDirection])

  return (
    <div className="game-board">
      <div className="game-header">
        <button 
          className="settings-btn"
          onClick={onSettings}
          aria-label="Settings"
        >
          ⚙️
        </button>
        <div className="score">Score: {snake.length - 1}</div>
        <button 
          className="pause-btn"
          onClick={() => setIsPaused(prev => !prev)}
          aria-label={isPaused ? 'Resume' : 'Pause'}
        >
          {isPaused ? '▶️' : '⏸️'}
        </button>
      </div>
      
      <div 
        className="grid-container"
        style={{
          '--grid-width': gridSize.width,
          '--grid-height': gridSize.height
        }}
      >
        <div className="grid">
          {Array.from({ length: gridSize.height }, (_, y) => (
            Array.from({ length: gridSize.width }, (_, x) => {
              const isSnake = snake.some(segment => segment.x === x && segment.y === y)
              const isHead = snake[0].x === x && snake[0].y === y
              const isFood = food.x === x && food.y === y
              
              return (
                <div
                  key={`${x}-${y}`}
                  className={`cell ${isHead ? 'head' : ''} ${isSnake ? 'snake' : ''} ${isFood ? 'food' : ''}`}
                />
              )
            })
          ))}
        </div>
      </div>
      
      <div className="touch-controls">
        <button 
          className="control-btn up"
          onClick={() => changeDirection(DIRECTIONS.UP)}
          aria-label="Move up"
        >
          ↑
        </button>
        <div className="horizontal-controls">
          <button 
            className="control-btn left"
            onClick={() => changeDirection(DIRECTIONS.LEFT)}
            aria-label="Move left"
          >
            ←
          </button>
          <button 
            className="control-btn right"
            onClick={() => changeDirection(DIRECTIONS.RIGHT)}
            aria-label="Move right"
          >
            →
          </button>
        </div>
        <button 
          className="control-btn down"
          onClick={() => changeDirection(DIRECTIONS.DOWN)}
          aria-label="Move down"
        >
          ↓
        </button>
      </div>
      
      {isPaused && (
        <div className="pause-overlay">
          <div className="pause-text">PAUSED</div>
        </div>
      )}
    </div>
  )
}

export default GameBoard