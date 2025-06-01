import React, { useContext, useState, useEffect } from 'react';
import { SnippetContext } from '../context/SnippetContext';
import SnippetCard from './SnippetCard';
import { Search, Filter } from 'lucide-react';

const SnippetList = ({ setSelectedSnippet }) => {
  const { filteredSnippets, searchQuery, selectedCategory, selectedTags } = useContext(SnippetContext);
  const [isFiltering, setIsFiltering] = useState(false);

  useEffect(() => {
    setIsFiltering(selectedCategory !== null || selectedTags.length > 0);
  }, [selectedCategory, selectedTags]);

  if (filteredSnippets.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
        <Search size={48} className="text-slate-300 dark:text-slate-600 mb-4" />
        <h2 className="text-xl font-semibold mb-2">No snippets found</h2>
        <p className="text-slate-500 dark:text-slate-400 max-w-md">
          {searchQuery 
            ? `No results for "${searchQuery}". Try adjusting your search or filters.`
            : "No snippets match your current filters. Try changing your filter criteria."}
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto">
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold">
              {isFiltering ? 'Filtered Snippets' : 'All Snippets'}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {filteredSnippets.length} {filteredSnippets.length === 1 ? 'snippet' : 'snippets'} found
            </p>
          </div>
          {isFiltering && (
            <div className="flex items-center text-sm text-blue-600 dark:text-blue-400">
              <Filter size={16} className="mr-1" />
              <span>Filters applied</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {filteredSnippets.map(snippet => (
            <SnippetCard 
              key={snippet.id} 
              snippet={snippet} 
              onClick={() => setSelectedSnippet(snippet)} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SnippetList;