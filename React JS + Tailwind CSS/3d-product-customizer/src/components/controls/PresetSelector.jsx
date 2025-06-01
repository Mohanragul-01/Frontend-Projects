import { useConfiguration } from '../../context/ConfigurationContext';

export default function PresetSelector() {
  const presets = [
    { 
      id: 'classic', 
      name: 'Classic Blue', 
      thumbnail: 'blue',
      description: 'Timeless blue design with white accents',
      config: {
        parts: {
          body: { color: '#3387FF', material: 'plastic', texture: 'smooth' },
          accent: { color: '#FFFFFF', material: 'plastic', texture: 'smooth' }
        }
      }
    },
    { 
      id: 'sunset', 
      name: 'Sunset Orange', 
      thumbnail: 'orange',
      description: 'Vibrant orange with black details',
      config: {
        parts: {
          body: { color: '#FF9500', material: 'plastic', texture: 'smooth' },
          accent: { color: '#000000', material: 'plastic', texture: 'smooth' }
        }
      }
    },
    { 
      id: 'monochrome', 
      name: 'Monochrome', 
      thumbnail: 'black',
      description: 'Sleek black with subtle gray accents',
      config: {
        parts: {
          body: { color: '#000000', material: 'leather', texture: 'smooth' },
          accent: { color: '#444444', material: 'metal', texture: 'smooth' }
        }
      }
    },
    { 
      id: 'nature', 
      name: 'Nature Green', 
      thumbnail: 'green',
      description: 'Fresh green with earthy tones',
      config: {
        parts: {
          body: { color: '#22C55E', material: 'plastic', texture: 'rough' },
          accent: { color: '#92400E', material: 'leather', texture: 'rough' }
        }
      }
    }
  ];
  
  const { updatePartColor, updatePartMaterial, updatePartTexture } = useConfiguration();
  
  const applyPreset = (preset) => {
    const { parts } = preset.config;
    
    // Update body part
    updatePartColor('body', parts.body.color);
    updatePartMaterial('body', parts.body.material);
    updatePartTexture('body', parts.body.texture);
    
    // Update accent part
    updatePartColor('accent', parts.accent.color);
    updatePartMaterial('accent', parts.accent.material);
    updatePartTexture('accent', parts.accent.texture);
  };
  
  return (
    <div>
      <h3 className="text-lg font-medium mb-3">View Presets</h3>
      <p className="text-sm text-gray-600 mb-4">
        Select from our designer presets for quick style options
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {presets.map((preset) => (
          <button
            key={preset.id}
            className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-3 text-left"
            onClick={() => applyPreset(preset)}
          >
            <div 
              className="w-full h-20 rounded-md mb-2"
              style={{ 
                background: `linear-gradient(135deg, ${preset.config.parts.body.color} 0%, ${preset.config.parts.body.color} 60%, ${preset.config.parts.accent.color} 60%, ${preset.config.parts.accent.color} 100%)` 
              }}
            />
            <h4 className="font-medium">{preset.name}</h4>
            <p className="text-xs text-gray-500 mt-1">
              {preset.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}