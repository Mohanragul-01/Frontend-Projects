import React from 'react';
import { RefreshCw, Code, GitBranch } from 'lucide-react';

const Header = ({ onReset }) => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Code size={28} className="text-white" />
          <h1 className="text-2xl font-bold">Code Mindmap</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={onReset}
            className="flex items-center space-x-1 bg-white/10 hover:bg-white/20 rounded-md px-3 py-1.5 transition-colors duration-200"
            title="Reset"
          >
            <RefreshCw size={16} />
            <span>Reset</span>
          </button>
        </div>
      </div>
      
      <div className="container mx-auto px-4 pb-5">
        <p className="text-white/80 text-sm">
          Visualize your React components as interactive mindmaps
        </p>
      </div>
    </header>
  );
};

export default Header;