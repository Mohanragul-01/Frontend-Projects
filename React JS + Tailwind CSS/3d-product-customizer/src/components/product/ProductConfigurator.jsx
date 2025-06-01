import { useState } from 'react';
import ProductViewer from './ProductViewer';
import ControlPanel from '../controls/ControlPanel';
import PresetSelector from '../controls/PresetSelector';

export default function ProductConfigurator() {
  const [activeTab, setActiveTab] = useState('customize');
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3 h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl bg-gradient-to-b from-gray-100 to-gray-200 overflow-hidden shadow-inner">
          <ProductViewer />
        </div>
        
        <div className="lg:w-1/3">
          <div className="mb-6 bg-white rounded-xl shadow-md">
            <div className="flex border-b border-gray-200">
              <button 
                className={`flex-1 py-3 text-center font-medium transition-colors ${
                  activeTab === 'customize' 
                    ? 'text-primary-500 border-b-2 border-primary-500' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('customize')}
              >
                Customize
              </button>
              <button 
                className={`flex-1 py-3 text-center font-medium transition-colors ${
                  activeTab === 'view' 
                    ? 'text-primary-500 border-b-2 border-primary-500' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('view')}
              >
                View
              </button>
            </div>
            
            <div className="p-4 md:p-6">
              {activeTab === 'customize' && <ControlPanel />}
              {activeTab === 'view' && <PresetSelector />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}