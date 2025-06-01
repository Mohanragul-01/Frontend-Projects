import React, { useState, useEffect } from 'react';
import CodeEditor from './CodeEditor';
import LivePreview from './LivePreview';
import { Copy, Twitter, ArrowLeft, ExternalLink, Code, Info } from 'lucide-react';
import { copyToClipboard } from '../utils/clipboard';

const SnippetDetail = ({ snippet, onBack }) => {
  const [code, setCode] = useState(snippet.code);
  const [copied, setCopied] = useState(false);
  const [showPreview, setShowPreview] = useState(snippet.previewEnabled);

  useEffect(() => {
    setCode(snippet.code);
    setShowPreview(snippet.previewEnabled);
  }, [snippet]);

  const handleCopyCode = () => {
    copyToClipboard(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTweetSnippet = () => {
    const tweetText = `Check out this ${snippet.categoryName} snippet: ${snippet.title}`;
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
    window.open(tweetUrl, '_blank');
  };

  return (
    <div className="flex-1 overflow-auto">
      <div className="container mx-auto p-4">
        <button 
          onClick={onBack}
          className="inline-flex items-center mb-6 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to snippets
        </button>

        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden mb-8">
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 space-y-4 md:space-y-0">
              <div>
                <div className="flex items-center mb-2">
                  <span className={`
                    px-2 py-1 rounded-full text-xs font-medium mr-2
                    ${snippet.category === 'react' ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 
                      snippet.category === 'javascript' ? 'bg-yellow-50 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400' : 
                      'bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'}
                  `}>
                    {snippet.categoryName}
                  </span>
                  
                  <div className="flex flex-wrap gap-1">
                    {snippet.tags.map(tag => (
                      <span 
                        key={tag} 
                        className="px-2 py-0.5 bg-slate-100 dark:bg-slate-700 rounded-full text-xs font-medium text-slate-600 dark:text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <h1 className="text-2xl font-bold mb-1">{snippet.title}</h1>
                <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base">{snippet.description}</p>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={handleCopyCode}
                  className={`
                    inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium
                    ${copied 
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' 
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'}
                    transition-colors duration-150
                  `}
                >
                  {copied ? 'Copied!' : (
                    <>
                      <Copy size={16} className="mr-1" />
                      Copy
                    </>
                  )}
                </button>
                
                <button
                  onClick={handleTweetSnippet}
                  className="inline-flex items-center px-3 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg text-sm font-medium hover:bg-blue-100 dark:hover:bg-blue-800/30 transition-colors duration-150"
                >
                  <Twitter size={16} className="mr-1" />
                  Tweet
                </button>
              </div>
            </div>
            
            {snippet.note && (
              <div className="mb-6 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800/30 rounded-lg text-sm text-amber-800 dark:text-amber-300 flex items-start">
                <Info size={16} className="mr-2 mt-0.5 flex-shrink-0" />
                <div dangerouslySetInnerHTML={{ __html: snippet.note }} />
              </div>
            )}

            <div className="flex flex-col lg:flex-row gap-6">
              <div className={`lg:flex-1 ${showPreview ? 'lg:w-1/2' : 'w-full'}`}>
                <div className="mb-2 flex justify-between items-center">
                  <h2 className="text-sm font-medium text-slate-500 dark:text-slate-400 flex items-center">
                    <Code size={16} className="mr-1" />
                    Code
                  </h2>
                  {snippet.previewEnabled && (
                    <button
                      onClick={() => setShowPreview(!showPreview)}
                      className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {showPreview ? 'Hide Preview' : 'Show Preview'}
                    </button>
                  )}
                </div>
                <CodeEditor 
                  value={code} 
                  onChange={setCode} 
                  language={snippet.language || 'javascript'} 
                />
              </div>
              
              {showPreview && (
                <div className="lg:flex-1 lg:w-1/2">
                  <h2 className="mb-2 text-sm font-medium text-slate-500 dark:text-slate-400 flex items-center">
                    <ExternalLink size={16} className="mr-1" />
                    Preview
                  </h2>
                  <LivePreview code={code} language={snippet.language || 'javascript'} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SnippetDetail;