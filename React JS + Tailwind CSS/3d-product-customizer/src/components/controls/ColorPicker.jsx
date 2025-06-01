import { HexColorPicker } from 'react-colorful';
import { useConfiguration } from '../../context/ConfigurationContext';

export default function ColorPicker({ part, color }) {
  const { updatePartColor } = useConfiguration();
  
  // Predefined colors
  const presetColors = [
    '#3387FF', // Primary blue
    '#FF9500', // Accent orange
    '#22C55E', // Success green
    '#F59E0B', // Warning yellow
    '#EF4444', // Error red
    '#8B5CF6', // Purple
    '#EC4899', // Pink
    '#FFFFFF', // White
    '#000000', // Black
  ];
  
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Color
      </label>
      
      <div className="grid grid-cols-3 gap-2 mb-3">
        {presetColors.map((presetColor) => (
          <button
            key={presetColor}
            className={`w-full aspect-square rounded-md transition-transform ${
              color === presetColor ? 'ring-2 ring-primary-500 ring-offset-2 scale-110' : ''
            }`}
            style={{ backgroundColor: presetColor }}
            onClick={() => updatePartColor(part, presetColor)}
            aria-label={`Select color ${presetColor}`}
          />
        ))}
      </div>
      
      <div className="mt-4">
        <HexColorPicker 
          color={color} 
          onChange={(newColor) => updatePartColor(part, newColor)}
          className="w-full" 
        />
        <div className="flex items-center mt-2">
          <div 
            className="w-8 h-8 rounded-md mr-2"
            style={{ backgroundColor: color }}
          />
          <input
            type="text"
            value={color}
            onChange={(e) => updatePartColor(part, e.target.value)}
            className="flex-1 px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
      </div>
    </div>
  );
}