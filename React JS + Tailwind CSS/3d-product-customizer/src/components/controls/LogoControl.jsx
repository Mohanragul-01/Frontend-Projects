import { useConfiguration } from '../../context/ConfigurationContext';

export default function LogoControl({ logoConfig }) {
  const { updateLogo } = useConfiguration();
  
  const handleVisibilityChange = (e) => {
    updateLogo({ visible: e.target.checked });
  };
  
  const handleScaleChange = (e) => {
    updateLogo({ scale: parseFloat(e.target.value) });
  };
  
  const handlePositionChange = (axis, value) => {
    updateLogo({ 
      position: { 
        ...logoConfig.position, 
        [axis]: parseFloat(value) 
      } 
    });
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label htmlFor="logo-visibility" className="text-sm font-medium text-gray-700">
          Show Logo
        </label>
        <div className="relative inline-block w-10 mr-2 align-middle select-none">
          <input
            id="logo-visibility"
            type="checkbox"
            className="sr-only"
            checked={logoConfig.visible}
            onChange={handleVisibilityChange}
          />
          <div
            className={`block h-6 rounded-full w-10 ${
              logoConfig.visible ? 'bg-primary-500' : 'bg-gray-300'
            }`}
          ></div>
          <div
            className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${
              logoConfig.visible ? 'transform translate-x-4' : ''
            }`}
          ></div>
        </div>
      </div>
      
      {logoConfig.visible && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Logo Size
            </label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={logoConfig.scale}
              onChange={handleScaleChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Small</span>
              <span>Large</span>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Logo Position
            </label>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-xs text-gray-500 mb-1">X</label>
                <input
                  type="range"
                  min="-1"
                  max="1"
                  step="0.1"
                  value={logoConfig.position.x}
                  onChange={(e) => handlePositionChange('x', e.target.value)}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Y</label>
                <input
                  type="range"
                  min="-1"
                  max="1"
                  step="0.1"
                  value={logoConfig.position.y}
                  onChange={(e) => handlePositionChange('y', e.target.value)}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Z</label>
                <input
                  type="range"
                  min="-1"
                  max="1"
                  step="0.1"
                  value={logoConfig.position.z}
                  onChange={(e) => handlePositionChange('z', e.target.value)}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
