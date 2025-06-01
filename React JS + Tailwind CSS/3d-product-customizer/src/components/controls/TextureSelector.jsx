import { useConfiguration } from '../../context/ConfigurationContext';

export default function TextureSelector({ part, texture }) {
  const { updatePartTexture } = useConfiguration();
  
  const textures = [
    { id: 'smooth', name: 'Smooth' },
    { id: 'rough', name: 'Rough' },
    { id: 'bumpy', name: 'Bumpy' },
  ];
  
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Texture
      </label>
      
      <div className="flex space-x-2">
        {textures.map((tex) => (
          <button
            key={tex.id}
            className={`flex-1 py-2 rounded-lg border transition-all ${
              texture === tex.id
                ? 'border-primary-500 bg-primary-50 text-primary-700'
                : 'border-gray-200 hover:bg-gray-50'
            }`}
            onClick={() => updatePartTexture(part, tex.id)}
          >
            {tex.name}
          </button>
        ))}
      </div>
    </div>
  );
}