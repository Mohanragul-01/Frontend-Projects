import { useState, useEffect } from 'react';
import { useConfiguration } from '../../context/ConfigurationContext';

export default function Header() {
  const { resetToDefault, config } = useConfiguration();
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSave = () => {
    // Create a blob with the configuration data
    const configData = JSON.stringify(config, null, 2);
    const blob = new Blob([configData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    // Create a temporary link and trigger download
    const link = document.createElement('a');
    link.href = url;
    link.download = 'product-configuration.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  
  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-sm' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
            <span className="text-white font-bold text-xl">3D</span>
          </div>
          <h1 className="text-xl md:text-2xl font-display font-medium">
            <span className="font-semibold text-primary-500">3D</span> Customizer
          </h1>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={resetToDefault}
            className="btn btn-secondary text-sm"
          >
            Reset
          </button>
          <button 
            onClick={handleSave}
            className="btn btn-primary text-sm"
          >
            Save Design
          </button>
        </div>
      </div>
    </header>
  );
}