import React, { useState, useEffect } from 'react';
import { Play, AlertCircle } from 'lucide-react';

const LivePreview = ({ code, language }) => {
  const [output, setOutput] = useState('');
  const [error, setError] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  const runCode = () => {
    setIsRunning(true);
    setError(null);
    
    try {
      if (language === 'javascript' || language === 'js') {
        // For JavaScript, we can use eval in a controlled way
        // In a production app, you'd want a sandboxed solution
        const originalConsoleLog = console.log;
        const logs = [];
        
        // Override console.log to capture output
        console.log = (...args) => {
          logs.push(args.map(arg => 
            typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
          ).join(' '));
        };
        
        try {
          // Execute the code
          eval(code);
          setOutput(logs.join('\n'));
        } catch (err) {
          setError(err.toString());
        } finally {
          // Restore original console.log
          console.log = originalConsoleLog;
        }
      } else if (language === 'css') {
        // For CSS, show a preview with the applied styles
        setOutput('<CSS preview would appear here>');
      } else if (language === 'html' || language === 'markup') {
        // For HTML, show rendered output
        setOutput('<HTML preview would appear here>');
      } else {
        setOutput(`Preview not available for ${language}`);
      }
    } catch (err) {
      setError(err.toString());
    } finally {
      setIsRunning(false);
    }
  };

  useEffect(() => {
    // Auto-run code when it changes, with debounce
    const timer = setTimeout(() => {
      runCode();
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [code, language]);

  return (
    <div className="rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 h-full min-h-[200px] flex flex-col">
      <div className="bg-slate-100 dark:bg-slate-800 px-4 py-2 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
        <span className="text-sm font-medium">Output</span>
        <button
          onClick={runCode}
          disabled={isRunning}
          className="inline-flex items-center px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded text-xs font-medium hover:bg-blue-100 dark:hover:bg-blue-800/30 transition-colors duration-150"
        >
          <Play size={12} className="mr-1" />
          {isRunning ? 'Running...' : 'Run'}
        </button>
      </div>
      
      <div className="p-4 font-mono text-sm overflow-auto flex-1">
        {error ? (
          <div className="text-red-500 dark:text-red-400 flex items-start">
            <AlertCircle size={16} className="mr-2 mt-0.5 flex-shrink-0" />
            <pre className="whitespace-pre-wrap">{error}</pre>
          </div>
        ) : output ? (
          <pre className="whitespace-pre-wrap">{output}</pre>
        ) : (
          <div className="text-slate-400 dark:text-slate-500 italic">
            Output will appear here after running the code
          </div>
        )}
      </div>
    </div>
  );
};

export default LivePreview;