import React from 'react';
import '../styles/GameBoard.css';

const GameBoard = ({ word, guessedLetters, wrongGuesses }) => {
  const wordLetters = word.toUpperCase().split('');
  const maxWrongGuesses = 6;
  
  // Get hangman parts to show based on wrong guesses
  const getHangmanFigure = () => {
    const parts = [
      <circle key="head" cx="150" cy="80" r="20" className="hangman-part" />,
      <line key="body" x1="150" y1="100" x2="150" y2="150" className="hangman-part" />,
      <line key="arm-left" x1="150" y1="120" x2="120" y2="140" className="hangman-part" />,
      <line key="arm-right" x1="150" y1="120" x2="180" y2="140" className="hangman-part" />,
      <line key="leg-left" x1="150" y1="150" x2="130" y2="180" className="hangman-part" />,
      <line key="leg-right" x1="150" y1="150" x2="170" y2="180" className="hangman-part" />
    ];
    
    return parts.slice(0, wrongGuesses);
  };
  
  return (
    <div className="game-board">
      <div className="hangman-container">
        <svg height="200" width="220" className="hangman-svg">
          {/* Gallows structure */}
          <line x1="40" y1="180" x2="180" y2="180" className="hangman-gallows" />
          <line x1="60" y1="180" x2="60" y2="20" className="hangman-gallows" />
          <line x1="60" y1="20" x2="150" y2="20" className="hangman-gallows" />
          <line x1="150" y1="20" x2="150" y2="60" className="hangman-gallows" />
          
          {/* Hangman figure - show parts based on wrong guesses */}
          {getHangmanFigure()}
        </svg>
        <div className="wrong-counter">
          Wrong: {wrongGuesses}/{maxWrongGuesses}
        </div>
      </div>
      
      <div className="word-container">
        {wordLetters.map((letter, index) => (
          <div 
            key={index} 
            className={`letter-box ${guessedLetters.includes(letter.toLowerCase()) ? 'revealed' : ''}`}
          >
            {guessedLetters.includes(letter.toLowerCase()) ? letter : ''}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameBoard;