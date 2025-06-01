import React from 'react';
import { Play, AlertCircle } from 'lucide-react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const CodeInput = ({ code, onChange, onParse, error }) => {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold text-gray-800">Code Input</h2>
        <button
          onClick={onParse}
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md flex items-center space-x-2 transition-colors duration-200 text-sm sm:text-base sm:px-4 sm:py-2"
        >
          <Play size={16} />
          <span>Parse Code</span>
        </button>
      </div>

      <div className="relative flex-grow bg-gray-900 rounded-md overflow-hidden shadow-inner border border-gray-700 min-h-[200px] sm:min-h-[300px]">
        <div className="absolute inset-0 overflow-auto">
          <textarea
            value={code}
            onChange={handleChange}
            className="w-full h-full bg-transparent text-transparent caret-white p-2 sm:p-4 resize-none font-mono text-sm sm:text-base"
            spellCheck="false"
          />
          <div className="absolute inset-0 pointer-events-none p-2 sm:p-4">
            <SyntaxHighlighter
              language="jsx"
              style={vs2015}
              customStyle={{
                margin: 0,
                padding: 0,
                background: 'transparent',
                fontSize: 'inherit',
              }}
              wrapLongLines={true}
            >
              {code || '// Paste your React component here...'}
            </SyntaxHighlighter>
          </div>
        </div>
      </div>

      {error && (
        <div className="mt-2 bg-red-50 text-red-700 p-2 sm:p-3 rounded-md flex items-start space-x-2 text-sm border border-red-200 animate-appear">
          <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium">Error</p>
            <p className="break-words">{error}</p>
          </div>
        </div>
      )}

      <div className="mt-2 text-xs text-gray-500">
        <p>Try pasting a React component to visualize its structure</p>
      </div>
    </div>
  );
};

export default CodeInput;
