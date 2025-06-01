import React, { useContext } from 'react';
import { Search, Sun, Moon, Menu, X } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';
import SearchBar from './SearchBar';

const Header = ({ toggleSidebar, isSidebarOpen }) => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <button 
            onClick={toggleSidebar} 
            className="md:hidden mr-4 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-blue-600 dark:text-blue-500 mr-2">
              CodeSnips
            </h1>
            <span className="hidden sm:inline-block text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full font-medium">
              Beta
            </span>
          </div>
        </div>

        <div className="hidden md:block w-1/3 max-w-md">
          <SearchBar />
        </div>

        <div className="flex items-center">
          <button 
            onClick={toggleTheme} 
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
      <div className="md:hidden border-t border-slate-200 dark:border-slate-700 px-4 py-2">
        <SearchBar />
      </div>
    </header>
  );
};

export default Header;