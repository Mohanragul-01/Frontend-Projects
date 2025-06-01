import React from 'react';
import '../styles/Keyboard.css';

const Keyboard = ({ onLetterSelect, guessedLetters, word }) => {
  const rows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
  ];
  
  const getLetterState = (letter) => {
    const lowerLetter = letter.toLowerCase();
    
    if (!guessedLetters.includes(lowerLetter)) {
      return 'unused';
    }
    
    if (word.toLowerCase().includes(lowerLetter)) {
      return 'correct';
    }
    
    return 'incorrect';
  };
  
  return (
    <div className="keyboard">
      {rows.map((row, rowIndex) => (
        <div key={`row-${rowIndex}`} className="keyboard-row">
          {row.map((letter) => (
            <button
              key={letter}
              className={`keyboard-key ${getLetterState(letter)}`}
              onClick={() => onLetterSelect(letter)}
              disabled={guessedLetters.includes(letter.toLowerCase())}
            >
              {letter}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;