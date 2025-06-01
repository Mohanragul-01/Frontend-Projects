import React from 'react';
import { Timer, Award } from 'lucide-react';
import '../styles/ScoreBoard.css';

const ScoreBoard = ({ score, timeLeft, wrongGuesses }) => {
  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Determine time color based on remaining time
  const getTimeColor = () => {
    if (timeLeft <= 10) return 'time-critical';
    if (timeLeft <= 30) return 'time-warning';
    return '';
  };
  
  return (
    <div className="score-board">
      <div className="score-item">
        <Award size={20} />
        <span>Score: {score}</span>
      </div>
      
      <div className={`score-item ${getTimeColor()}`}>
        <Timer size={20} />
        <span>{formatTime(timeLeft)}</span>
      </div>
    </div>
  );
};

export default ScoreBoard;