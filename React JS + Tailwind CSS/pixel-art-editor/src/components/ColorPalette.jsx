import { useState } from 'react'
import { HexColorPicker } from 'react-colorful'
import { FaExchangeAlt } from 'react-icons/fa'

const defaultPalette = [
  '#000000', '#ffffff', '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#00ffff', '#ff00ff',
  '#ff9900', '#9900ff', '#00cc99', '#cc0000', '#666666', '#cccccc'
]

const ColorPalette = ({ 
  currentColor, 
  secondaryColor, 
  setCurrentColor, 
  setSecondaryColor,
  recentColors 
}) => {
  const [showColorPicker, setShowColorPicker] = useState(false)
  
  const swapColors = () => {
    const temp = currentColor
    setCurrentColor(secondaryColor)
    setSecondaryColor(temp)
  }

  return (
    <div>
      <div className="flex items-center mb-3">
        <div className="text-sm font-medium mb-1 text-gray-300">Colors</div>
        <div className="flex-1"></div>
        <button 
          className="p-1 text-sm bg-dark-600 rounded hover:bg-dark-500 transition-colors"
          onClick={() => setShowColorPicker(!showColorPicker)}
        >
          {showColorPicker ? 'Hide Picker' : 'Custom Color'}
        </button>
      </div>
      
      <div className="flex items-center space-x-2 mb-3">
        {/* Current color */}
        <div 
          className="w-10 h-10 rounded-md border-2 border-white shadow-sm"
          style={{ backgroundColor: currentColor }}
          onClick={() => setShowColorPicker(true)}
        ></div>
        
        {/* Swap button */}
        <button 
          className="p-1 bg-dark-600 rounded hover:bg-dark-500 transition-colors"
          onClick={swapColors}
          title="Swap primary and secondary colors"
        >
          <FaExchangeAlt />
        </button>
        
        {/* Secondary color */}
        <div 
          className="w-10 h-10 rounded-md border-2 border-gray-500 shadow-sm"
          style={{ backgroundColor: secondaryColor }}
          onClick={() => {
            setCurrentColor(secondaryColor)
            setSecondaryColor(currentColor)
          }}
        ></div>
        
        <div className="text-xs text-gray-400">
          <div>Primary (Left Click)</div>
          <div>Secondary (Shift+Click)</div>
        </div>
      </div>
      
      {showColorPicker && (
        <div className="mb-3">
          <HexColorPicker 
            color={currentColor}
            onChange={setCurrentColor}
            className="w-full"
          />
          <div className="mt-2 flex justify-between items-center">
            <div className="text-sm">{currentColor}</div>
            <button 
              className="bg-primary-600 text-white px-2 py-1 rounded text-sm hover:bg-primary-700 transition-colors"
              onClick={() => setShowColorPicker(false)}
            >
              Apply
            </button>
          </div>
        </div>
      )}
      
      <div>
        <div className="text-sm font-medium mb-1 text-gray-300">Recent</div>
        <div className="flex flex-wrap gap-1 mb-3">
          {recentColors.map((color, index) => (
            <div
              key={`recent-${index}-${color}`}
              className="color-swatch"
              style={{ backgroundColor: color }}
              onClick={() => setCurrentColor(color)}
              onContextMenu={(e) => {
                e.preventDefault()
                setSecondaryColor(color)
              }}
              title={color}
            />
          ))}
        </div>
        
        <div className="text-sm font-medium mb-1 text-gray-300">Palette</div>
        <div className="flex flex-wrap gap-1">
          {defaultPalette.map((color, index) => (
            <div
              key={`default-${index}`}
              className="color-swatch"
              style={{ backgroundColor: color }}
              onClick={() => setCurrentColor(color)}
              onContextMenu={(e) => {
                e.preventDefault()
                setSecondaryColor(color)
              }}
              title={color}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ColorPalette