import { useState, useEffect } from 'react';
import './App.css';

const GRID_SIZE = 9;

function App() {
  const [theme, setTheme] = useState('light');
  const [board, setBoard] = useState(Array(GRID_SIZE).fill().map(() => Array(GRID_SIZE).fill('')));
  const [initialBoard, setInitialBoard] = useState([]);
  const [isSolving, setIsSolving] = useState(false);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleCellChange = (row, col, value) => {
    const newBoard = [...board];
    newBoard[row][col] = value === '' ? '' : Math.max(1, Math.min(9, parseInt(value))) || '';
    setBoard(newBoard);
  };

  const solveSudoku = async () => {
    setIsSolving(true);
    const sudokuArray = board.map(row => 
      row.map(cell => cell === '' ? 0 : parseInt(cell))
    );

    // Save initial values
    const initial = sudokuArray.map(row => [...row]);
    setInitialBoard(initial);

    if (solveSudokuHelper(sudokuArray)) {
      const newBoard = [...board];
      for (let row = 0; row < GRID_SIZE; row++) {
        for (let col = 0; col < GRID_SIZE; col++) {
          if (initial[row][col] === 0) {
            newBoard[row][col] = sudokuArray[row][col];
            setBoard([...newBoard]);
            await sleep(20);
          }
        }
      }
    } else {
      alert("No solution exists for the given Sudoku Puzzle!");
    }
    setIsSolving(false);
  };

  const solveSudokuHelper = (board) => {
    for (let row = 0; row < GRID_SIZE; row++) {
      for (let col = 0; col < GRID_SIZE; col++) {
        if (board[row][col] === 0) {
          for (let num = 1; num <= 9; num++) {
            if (isValid(board, row, col, num)) {
              board[row][col] = num;
              if (solveSudokuHelper(board)) {
                return true;
              }
              board[row][col] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  };

  const isValid = (board, row, col, num) => {
    // Check row and column
    for (let i = 0; i < GRID_SIZE; i++) {
      if (board[row][i] === num || board[i][col] === num) {
        return false;
      }
    }

    // Check 3x3 box
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let i = boxRow; i < boxRow + 3; i++) {
      for (let j = boxCol; j < boxCol + 3; j++) {
        if (board[i][j] === num) {
          return false;
        }
      }
    }
    return true;
  };

  const resetBoard = () => {
    setBoard(Array(GRID_SIZE).fill().map(() => Array(GRID_SIZE).fill('')));
    setInitialBoard([]);
  };

  const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  const isInitialValue = (row, col) => {
    return initialBoard.length > 0 && initialBoard[row][col] !== 0;
  };

  return (
    <div className={`app ${theme}`}>
      <div className="header">
        <h1>Sudoku Solver</h1>
        <button onClick={toggleTheme} className="theme-toggle">
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>

      <div className="sudoku-container">
        <table>
          <tbody>
            {board.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, colIndex) => (
                  <td key={colIndex}>
                    <input
                      type="number"
                      className={`cell ${isInitialValue(rowIndex, colIndex) ? 'initial' : ''} ${cell && !isInitialValue(rowIndex, colIndex) ? 'solved' : ''}`}
                      value={cell}
                      onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
                      min="1"
                      max="9"
                      disabled={isSolving}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="buttons">
        <button onClick={solveSudoku} disabled={isSolving}>
          {isSolving ? 'Solving...' : 'Solve Puzzle'}
        </button>
        <button onClick={resetBoard} disabled={isSolving}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default App;
