import { useState } from 'react';
import { useConfiguration } from '../../context/ConfigurationContext';
import ColorPicker from './ColorPicker';
import MaterialSelector from './MaterialSelector';
import TextureSelector from './TextureSelector';
import LogoControl from './LogoControl';
import LightingControl from './LightingControl';

export default function ControlPanel() {
  const { config } = useConfiguration();
  const [activePart, setActivePart] = useState('body');
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-3">Customize Your Product</h3>
        
        {/* Part selector */}
        <div className="flex space-x-2 mb-4">
          <button
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
              activePart === 'body'
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setActivePart('body')}
          >
            Main Body
          </button>
          <button
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
              activePart === 'accent'
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setActivePart('accent')}
          >
            Accents
          </button>
          <button
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
              activePart === 'logo'
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setActivePart('logo')}
          >
            Logo
          </button>
        </div>
        
        {/* Active part customization */}
        {activePart !== 'logo' ? (
          <div className="space-y-4 animate-fade-in">
            <ColorPicker 
              part={activePart} 
              color={config.parts[activePart].color} 
            />
            
            <MaterialSelector 
              part={activePart} 
              material={config.parts[activePart].material} 
            />
            
            <TextureSelector 
              part={activePart} 
              texture={config.parts[activePart].texture} 
            />
          </div>
        ) : (
          <LogoControl 
            logoConfig={config.parts.logo} 
          />
        )}
      </div>
      
      <div className="pt-4 border-t border-gray-200">
        <LightingControl 
          lighting={config.lighting} 
        />
      </div>
    </div>
  );
}