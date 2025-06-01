import { useState } from 'react'
import toast from 'react-hot-toast'

const SettingsPanel = ({ 
  gridSize, 
  onSizeChange, 
  pixelSize, 
  setPixelSize, 
  showGrid, 
  setShowGrid, 
  zoomLevel, 
  setZoomLevel, 
  onClose,
  layers
}) => {
  const [width, setWidth] = useState(gridSize.width)
  const [height, setHeight] = useState(gridSize.height)
  
  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validate size
    const newWidth = Math.min(64, Math.max(1, parseInt(width) || 16))
    const newHeight = Math.min(64, Math.max(1, parseInt(height) || 16))
    
    // Show warning if dimensions are changing and we have content
    if ((newWidth !== gridSize.width || newHeight !== gridSize.height) && layers.length > 0) {
      if (window.confirm('Changing canvas size will reset your artwork. Are you sure?')) {
        onSizeChange(newWidth, newHeight)
        toast.success('Canvas size updated')
      }
    } else {
      onSizeChange(newWidth, newHeight)
      toast.success('Settings updated')
    }
    
    onClose()
  }
  
  const handleCancel = () => {
    setWidth(gridSize.width)
    setHeight(gridSize.height)
    onClose()
  }
  
  const resetZoom = () => {
    setZoomLevel(1)
  }
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-dark-700 rounded-lg shadow-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Canvas Settings</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Canvas Size</label>
            <div className="flex gap-2">
              <div>
                <label className="text-xs text-gray-400">Width</label>
                <input
                  type="number"
                  min="1"
                  max="64"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  className="block w-full bg-dark-600 border border-dark-500 rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="text-xs text-gray-400">Height</label>
                <input
                  type="number"
                  min="1"
                  max="64"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="block w-full bg-dark-600 border border-dark-500 rounded px-3 py-2"
                />
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-1">Max size: 64×64 pixels</p>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Pixel Size</label>
            <input
              type="range"
              min="5"
              max="40"
              value={pixelSize}
              onChange={(e) => setPixelSize(parseInt(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-400">
              <span>Small</span>
              <span>{pixelSize}px</span>
              <span>Large</span>
            </div>
          </div>
          
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={showGrid}
                onChange={() => setShowGrid(!showGrid)}
                className="mr-2"
              />
              <span>Show Grid</span>
            </label>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">Zoom Level</label>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="0.1"
                max="5"
                step="0.1"
                value={zoomLevel}
                onChange={(e) => setZoomLevel(parseFloat(e.target.value))}
                className="flex-1"
              />
              <button 
                type="button" 
                onClick={resetZoom}
                className="px-2 py-1 bg-dark-600 hover:bg-dark-500 rounded text-sm"
              >
                Reset
              </button>
              <span className="w-16 text-center">{Math.round(zoomLevel * 100)}%</span>
            </div>
          </div>
          
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 bg-dark-600 hover:bg-dark-500 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded"
            >
              Apply
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SettingsPanel