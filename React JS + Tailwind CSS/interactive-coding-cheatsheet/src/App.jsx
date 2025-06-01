import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import SnippetList from './components/SnippetList';
import SnippetDetail from './components/SnippetDetail';
import { ThemeProvider } from './context/ThemeContext';
import { SnippetProvider } from './context/SnippetContext';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedSnippet, setSelectedSnippet] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <ThemeProvider>
      <SnippetProvider>
        <div className="flex flex-col h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-200">
          <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
          
          <div className="flex flex-1 overflow-hidden">
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
            
            <main className="flex-1 flex flex-col overflow-hidden">
              {!selectedSnippet ? (
                <SnippetList setSelectedSnippet={setSelectedSnippet} />
              ) : (
                <SnippetDetail 
                  snippet={selectedSnippet} 
                  onBack={() => setSelectedSnippet(null)} 
                />
              )}
            </main>
          </div>
        </div>
      </SnippetProvider>
    </ThemeProvider>
  );
}

export default App;