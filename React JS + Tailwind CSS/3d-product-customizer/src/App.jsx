import { useState, useEffect } from 'react';
import Header from './components/layout/Header';
import ProductConfigurator from './components/product/ProductConfigurator';
import { ConfigurationProvider } from './context/ConfigurationContext';
import { useLocalStorage } from './hooks/useLocalStorage';
import LoadingScreen from './components/ui/LoadingScreen';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [savedConfig, setSavedConfig] = useLocalStorage('productConfig', null);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <ConfigurationProvider initialConfig={savedConfig} onConfigChange={setSavedConfig}>
          <Header />
          <main className="flex-grow">
            <ProductConfigurator />
          </main>
        </ConfigurationProvider>
      )}
    </div>
  );
}

export default App;