import React, { useContext } from 'react';
import { SnippetContext } from '../context/SnippetContext';
import { Code, FileCode, Palette, X } from 'lucide-react';

const CategoryIcon = ({ category }) => {
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

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { categories, selectedCategory, setSelectedCategory, tags, selectedTags, toggleTag } = useContext(SnippetContext);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      <aside className={`
        fixed md:relative inset-y-0 left-0 z-20 
        w-64 md:w-72 
        transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 
        transition-transform duration-200 ease-in-out
        bg-white dark:bg-slate-800 
        border-r border-slate-200 dark:border-slate-700
        overflow-y-auto
      `}>
        <div className="p-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Filters</h2>
            <button 
              className="md:hidden p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700"
              onClick={() => setIsOpen(false)}
            >
              <X size={18} />
            </button>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Categories</h3>
            <div className="space-y-1">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  className={`
                    w-full flex items-center px-3 py-2 rounded-lg text-left
                    ${selectedCategory === category.id 
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                      : 'hover:bg-slate-100 dark:hover:bg-slate-700/50'}
                    transition-colors duration-150
                  `}
                >
                  <CategoryIcon category={category.id} />
                  <span className="ml-2">{category.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {tags.map(tag => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`
                    px-2 py-1 rounded-full text-xs font-medium
                    ${selectedTags.includes(tag) 
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200' 
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'}
                    transition-colors duration-150
                  `}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;