import React from 'react';
import { Code, Copy, FileCode, Palette, ExternalLink } from 'lucide-react';

const getCategoryIcon = (category) => {
  switch (category) {
    case 'react':
      return <Code className="text-blue-500" size={18} />;
    case 'javascript':
      return <FileCode className="text-yellow-500" size={18} />;
    case 'css':
      return <Palette className="text-purple-500" size={18} />;
    default:
      return <Code size={18} />;
  }
};

const getCategoryColor = (category) => {
  switch (category) {
    case 'react':
      return 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400';
    case 'javascript':
      return 'bg-yellow-50 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400';
    case 'css':
      return 'bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400';
    default:
      return 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400';
  }
};

const SnippetCard = ({ snippet, onClick }) => {
  return (
    <div 
      className="bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md border border-slate-200 dark:border-slate-700 transition-all duration-200 overflow-hidden cursor-pointer group"
      onClick={onClick}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className={`px-2 py-1 rounded-full text-xs font-medium flex items-center ${getCategoryColor(snippet.category)}`}>
            {getCategoryIcon(snippet.category)}
            <span className="ml-1">{snippet.categoryName}</span>
          </div>
          <button 
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => {
              e.stopPropagation();
              // Copy snippet URL to clipboard
            }}
            aria-label="Copy link"
          >
            <ExternalLink size={16} />
          </button>
        </div>
        
        <h3 className="font-medium mb-1 text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-150">{snippet.title}</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-3">{snippet.description}</p>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {snippet.tags.slice(0, 3).map(tag => (
            <span 
              key={tag} 
              className="px-2 py-0.5 bg-slate-100 dark:bg-slate-700 rounded-full text-xs font-medium text-slate-600 dark:text-slate-300"
            >
              {tag}
            </span>
          ))}
          {snippet.tags.length > 3 && (
            <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-700 rounded-full text-xs font-medium text-slate-600 dark:text-slate-300">
              +{snippet.tags.length - 3}
            </span>
          )}
        </div>
      </div>
      
      <div className="border-t border-slate-100 dark:border-slate-700 p-3 bg-slate-50 dark:bg-slate-800/50 flex justify-between items-center">
        <div className="text-xs text-slate-500 dark:text-slate-400">
          {snippet.codePreview || "Click to view"}
        </div>
        <button 
          className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
          onClick={(e) => {
            e.stopPropagation();
            // Copy snippet code to clipboard
          }}
          aria-label="Copy code"
        >
          <Copy size={16} />
        </button>
      </div>
    </div>
  );
};

export default SnippetCard;