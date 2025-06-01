import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, HelpCircle, Settings } from 'lucide-react';
import GameBoard from './components/GameBoard';
import Keyboard from './components/Keyboard';
import ScoreBoard from './components/ScoreBoard';
import Modal from './components/Modal';
import { getRandomWord } from './utils/wordUtils';
import './styles/App.css';

const GAME_STATES = {
  MENU: 'menu',
  PLAYING: 'playing',
  WIN: 'win',
  LOSE: 'lose'
};

const DIFFICULTY = {
  EASY: { time: 120, name: 'Easy' },
  MEDIUM: { time: 90, name: 'Medium' },
  HARD: { time: 60, name: 'Hard' }
};

function App() {
  const [gameState, setGameState] = useState(GAME_STATES.MENU);
  const [currentWord, setCurrentWord] = useState('');
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [score, setScore] = useState(0);
  const [difficulty, setDifficulty] = useState(DIFFICULTY.MEDIUM);
  const [timeLeft, setTimeLeft] = useState(difficulty.time);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  
  // Initialize game with a random word
  useEffect(() => {
    if (gameState === GAME_STATES.PLAYING && !currentWord) {
      startNewGame();
    }
  }, [gameState]);
  
  // Timer countdown
  useEffect(() => {
    let timer;
    if (gameState === GAME_STATES.PLAYING && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0 && gameState === GAME_STATES.PLAYING) {
      handleGameOver();
    }
    
    return () => clearTimeout(timer);
  }, [timeLeft, gameState]);
  
  // Check win condition
  useEffect(() => {
    if (gameState === GAME_STATES.PLAYING && currentWord) {
      const uniqueLetters = [...new Set(currentWord.toLowerCase())];
      const correctGuesses = uniqueLetters.filter(letter => 
        guessedLetters.includes(letter)
      );
      
      if (correctGuesses.length === uniqueLetters.length) {
        handleWin();
      }
    }
  }, [guessedLetters, currentWord, gameState]);
  
  const startNewGame = () => {
    const newWord = getRandomWord();
    setCurrentWord(newWord);
    setGuessedLetters([]);
    setWrongGuesses(0);
    setTimeLeft(difficulty.time);
    setGameState(GAME_STATES.PLAYING);
  };
  
  const handleLetterGuess = (letter) => {
    if (gameState !== GAME_STATES.PLAYING || guessedLetters.includes(letter)) {
      return;
    }
    
    const lowerLetter = letter.toLowerCase();
    
    // Add to guessed letters
    setGuessedLetters([...guessedLetters, lowerLetter]);
    
    // Check if letter is in the word
    if (!currentWord.toLowerCase().includes(lowerLetter)) {
      const newWrongGuesses = wrongGuesses + 1;
      setWrongGuesses(newWrongGuesses);
      
      // Play wrong sound
      if (soundEnabled) {
        playSound('wrong');
      }
      
      // Check if max wrong guesses reached (6 for hangman-style game)
      if (newWrongGuesses >= 6) {
        handleGameOver();
      }
    } else if (soundEnabled) {
      playSound('correct');
    }
  };
  
  const handleWin = () => {
    const newScore = score + calculateScore();
    setScore(newScore);
    setGameState(GAME_STATES.WIN);
    
    if (soundEnabled) {
      playSound('win');
    }
    
    // Save high score
    saveHighScore(newScore);
  };
  
  const handleGameOver = () => {
    setGameState(GAME_STATES.LOSE);
    
    if (soundEnabled) {
      playSound('lose');
    }
  };
  
  const calculateScore = () => {
    const baseScore = currentWord.length * 10;
    const timeBonus = Math.floor(timeLeft / 10) * 5;
    const difficultyMultiplier = 
      difficulty === DIFFICULTY.EASY ? 1 : 
      difficulty === DIFFICULTY.MEDIUM ? 1.5 : 2;
    
    return Math.floor((baseScore + timeBonus) * difficultyMultiplier);
  };
  
  const playSound = (soundType) => {
    // Sound effects would be implemented here
    console.log(`Playing ${soundType} sound`);
  };
  
  const saveHighScore = (newScore) => {
    const highScore = localStorage.getItem('wordPuzzleHighScore') || 0;
    if (newScore > highScore) {
      localStorage.setItem('wordPuzzleHighScore', newScore);
    }
  };
  
  const getHighScore = () => {
    return localStorage.getItem('wordPuzzleHighScore') || 0;
  };
  
  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };
  
  const changeDifficulty = (newDifficulty) => {
    setDifficulty(newDifficulty);
  };
  
  return (
    <div className="app-container">
      <header className="game-header">
        <h1>Word Puzzle</h1>
        <div className="header-controls">
          <button onClick={() => setShowHelpModal(true)} className="icon-button">
            <HelpCircle size={24} />
          </button>
          <button onClick={() => setShowSettingsModal(true)} className="icon-button">
            <Settings size={24} />
          </button>
          <button onClick={toggleSound} className="icon-button">
            {soundEnabled ? <Volume2 size={24} /> : <VolumeX size={24} />}
          </button>
        </div>
      </header>
      
      <main className="game-container">
        {gameState === GAME_STATES.MENU && (
          <div className="menu-screen">
            <h2>Word Puzzle Challenge</h2>
            <p>Guess the hidden word before time runs out!</p>
            <div className="difficulty-selector">
              <p>Select Difficulty:</p>
              <div className="difficulty-buttons">
                {Object.entries(DIFFICULTY).map(([key, value]) => (
                  <button
                    key={key}
                    onClick={() => changeDifficulty(value)}
                    className={`difficulty-button ${difficulty === value ? 'active' : ''}`}
                  >
                    {value.name}
                  </button>
                ))}
              </div>
            </div>
            <button onClick={startNewGame} className="start-button">
              Start Game
            </button>
            <div className="high-score">
              High Score: {getHighScore()}
            </div>
          </div>
        )}
        
        {gameState === GAME_STATES.PLAYING && (
          <>
            <ScoreBoard 
              score={score} 
              timeLeft={timeLeft} 
              wrongGuesses={wrongGuesses} 
            />
            <GameBoard 
              word={currentWord} 
              guessedLetters={guessedLetters} 
              wrongGuesses={wrongGuesses}
            />
            <Keyboard 
              onLetterSelect={handleLetterGuess} 
              guessedLetters={guessedLetters} 
              word={currentWord}
            />
          </>
        )}
        
        {gameState === GAME_STATES.WIN && (
          <div className="result-screen win">
            <h2>You Win!</h2>
            <p>Congratulations! You guessed the word:</p>
            <p className="revealed-word">{currentWord}</p>
            <p>You scored: {calculateScore()} points</p>
            <p>Total score: {score}</p>
            <button onClick={startNewGame} className="play-again-button">
              Play Again
            </button>
            <button 
              onClick={() => setGameState(GAME_STATES.MENU)} 
              className="menu-button"
            >
              Main Menu
            </button>
          </div>
        )}
        
        {gameState === GAME_STATES.LOSE && (
          <div className="result-screen lose">
            <h2>Game Over</h2>
            <p>The word was:</p>
            <p className="revealed-word">{currentWord}</p>
            <button onClick={startNewGame} className="play-again-button">
              Play Again
            </button>
            <button 
              onClick={() => setGameState(GAME_STATES.MENU)} 
              className="menu-button"
            >
              Main Menu
            </button>
          </div>
        )}
        
        <Modal 
          isOpen={showHelpModal} 
          onClose={() => setShowHelpModal(false)}
          title="How to Play"
        >
          <div className="help-content">
            <p>Guess the hidden word before time runs out!</p>
            <ul>
              <li>Click on letters to guess</li>
              <li>Correct letters will appear in the word</li>
              <li>You can make up to 6 wrong guesses</li>
              <li>The faster you solve, the higher your score</li>
            </ul>
          </div>
        </Modal>
        
        <Modal 
          isOpen={showSettingsModal} 
          onClose={() => setShowSettingsModal(false)}
          title="Settings"
        >
          <div className="settings-content">
            <div className="setting-item">
              <label>Sound</label>
              <button onClick={toggleSound} className="toggle-button">
                {soundEnabled ? 'On' : 'Off'}
              </button>
            </div>
            <div className="setting-item">
              <label>Difficulty</label>
              <div className="difficulty-buttons">
                {Object.entries(DIFFICULTY).map(([key, value]) => (
                  <button
                    key={key}
                    onClick={() => changeDifficulty(value)}
                    className={`difficulty-button ${difficulty === value ? 'active' : ''}`}
                  >
                    {value.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Modal>
      </main>
    </div>
  );
}

export default App;