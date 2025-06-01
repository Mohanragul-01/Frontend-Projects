import { useConfiguration } from '../../context/ConfigurationContext';

export default function LightingControl({ lighting }) {
  const { updateLighting } = useConfiguration();
  
  const handleIntensityChange = (e) => {
    updateLighting({ intensity: parseFloat(e.target.value) });
  };
  
  const handleAmbientChange = (e) => {
    updateLighting({ ambient: parseFloat(e.target.value) });
  };
  
  return (
    <div>
      <h3 className="text-lg font-medium mb-3">Lighting</h3>
      
      <div className="space-y-4">
        <div>
          <div className="flex justify-between">
            <label htmlFor="light-intensity" className="block text-sm font-medium text-gray-700 mb-1">
              Light Intensity
            </label>
            <span className="text-sm text-gray-500">{lighting.intensity.toFixed(1)}</span>
          </div>
          <input
            id="light-intensity"
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={lighting.intensity}
            onChange={handleIntensityChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
        
        <div>
          <div className="flex justify-between">
            <label htmlFor="ambient-light" className="block text-sm font-medium text-gray-700 mb-1">
              Ambient Light
            </label>
            <span className="text-sm text-gray-500">{lighting.ambient.toFixed(1)}</span>
          </div>
          <input
            id="ambient-light"
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={lighting.ambient}
            onChange={handleAmbientChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}