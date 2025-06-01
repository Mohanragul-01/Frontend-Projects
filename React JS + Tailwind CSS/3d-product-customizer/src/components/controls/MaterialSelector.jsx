import { useConfiguration } from '../../context/ConfigurationContext';

export default function MaterialSelector({ part, material }) {
  const { updatePartMaterial } = useConfiguration();
  
  const materials = [
    { id: 'plastic', name: 'Plastic', description: 'Smooth, lightweight plastic' },
    { id: 'leather', name: 'Leather', description: 'Premium textured leather' },
    { id: 'metal', name: 'Metal', description: 'Sleek, reflective metal' },
  ];
  
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Material
      </label>
      
      <div className="grid grid-cols-3 gap-2">
        {materials.map((mat) => (
          <button
            key={mat.id}
            className={`p-3 rounded-lg border transition-all ${
              material === mat.id
                ? 'border-primary-500 bg-primary-50 text-primary-700'
                : 'border-gray-200 hover:bg-gray-50'
            }`}
            onClick={() => updatePartMaterial(part, mat.id)}
          >
            <div className="text-center">
              <div className="font-medium">{mat.name}</div>
              <div className="text-xs text-gray-500 mt-1 hidden md:block">{mat.description}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}