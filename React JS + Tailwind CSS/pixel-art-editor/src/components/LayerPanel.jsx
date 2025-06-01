import { useState } from 'react'
import { 
  FaPlus, 
  FaTrash, 
  FaEye, 
  FaEyeSlash, 
  FaLock, 
  FaLockOpen,
  FaArrowUp,
  FaArrowDown,
  FaPencilAlt
} from 'react-icons/fa'

const LayerPanel = ({ 
  layers, 
  activeLayerIndex, 
  setActiveLayerIndex, 
  addLayer, 
  deleteLayer, 
  toggleLayerVisibility, 
  toggleLayerLock,
  renameLayer,
  reorderLayer
}) => {
  const [editingLayerIndex, setEditingLayerIndex] = useState(null)
  const [editingName, setEditingName] = useState('')
  
  const startEditing = (index, name) => {
    setEditingLayerIndex(index)
    setEditingName(name)
  }
  
  const saveLayerName = () => {
    if (editingLayerIndex !== null && editingName.trim() !== '') {
      renameLayer(editingLayerIndex, editingName.trim())
      setEditingLayerIndex(null)
      setEditingName('')
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold">Layers</h3>
        <button 
          className="bg-primary-600 hover:bg-primary-700 text-white p-1 rounded"
          onClick={addLayer}
          title="Add new layer"
        >
          <FaPlus />
        </button>
      </div>
      
      <div className="space-y-2 max-h-[calc(100vh-300px)] overflow-y-auto custom-scrollbar">
        {layers.map((layer, index) => (
          <div
            key={layer.id}
            className={`layer-card ${activeLayerIndex === index ? 'border-primary-500' : ''}`}
            onClick={() => setActiveLayerIndex(index)}
          >
            {/* Layer preview */}
            <div 
              className="w-8 h-8 bg-gray-700 mr-2 flex-shrink-0 rounded border border-dark-500"
              style={{ 
                backgroundImage: layer.visible ? `url(${createLayerThumbnail(layer.data)})` : 'none',
                opacity: layer.visible ? 1 : 0.5
              }}
            ></div>
            
            {/* Layer name */}
            <div className="flex-1 min-w-0">
              {editingLayerIndex === index ? (
                <input
                  type="text"
                  className="w-full bg-dark-600 border border-dark-500 rounded px-1 py-0.5 text-sm"
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                  onBlur={saveLayerName}
                  onKeyDown={(e) => e.key === 'Enter' && saveLayerName()}
                  autoFocus
                />
              ) : (
                <div className="text-sm font-medium truncate">
                  {layer.name}
                </div>
              )}
            </div>
            
            {/* Layer controls */}
            <div className="flex space-x-1">
              <button
                className="p-1 text-gray-400 hover:text-white transition-colors"
                onClick={(e) => {
                  e.stopPropagation()
                  startEditing(index, layer.name)
                }}
                title="Rename layer"
              >
                <FaPencilAlt size={12} />
              </button>
              
              <button
                className="p-1 text-gray-400 hover:text-white transition-colors"
                onClick={(e) => {
                  e.stopPropagation()
                  toggleLayerVisibility(index)
                }}
                title={layer.visible ? 'Hide layer' : 'Show layer'}
              >
                {layer.visible ? <FaEye size={12} /> : <FaEyeSlash size={12} />}
              </button>
              
              <button
                className="p-1 text-gray-400 hover:text-white transition-colors"
                onClick={(e) => {
                  e.stopPropagation()
                  toggleLayerLock(index)
                }}
                title={layer.locked ? 'Unlock layer' : 'Lock layer'}
              >
                {layer.locked ? <FaLock size={12} /> : <FaLockOpen size={12} />}
              </button>
              
              <button
                className={`p-1 ${index === 0 ? 'text-gray-600' : 'text-gray-400 hover:text-white'} transition-colors`}
                onClick={(e) => {
                  e.stopPropagation()
                  if (index > 0) {
                    reorderLayer(index, index - 1)
                  }
                }}
                disabled={index === 0}
                title="Move up"
              >
                <FaArrowUp size={12} />
              </button>
              
              <button
                className={`p-1 ${index === layers.length - 1 ? 'text-gray-600' : 'text-gray-400 hover:text-white'} transition-colors`}
                onClick={(e) => {
                  e.stopPropagation()
                  if (index < layers.length - 1) {
                    reorderLayer(index, index + 1)
                  }
                }}
                disabled={index === layers.length - 1}
                title="Move down"
              >
                <FaArrowDown size={12} />
              </button>
              
              <button
                className={`p-1 ${layers.length <= 1 ? 'text-gray-600' : 'text-gray-400 hover:text-red-500'} transition-colors`}
                onClick={(e) => {
                  e.stopPropagation()
                  if (layers.length > 1) {
                    deleteLayer(index)
                  }
                }}
                disabled={layers.length <= 1}
                title="Delete layer"
              >
                <FaTrash size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Helper function to create a thumbnail for the layer
function createLayerThumbnail(pixelData) {
  if (!pixelData || pixelData.length === 0) return ''
  
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  
  const width = pixelData[0].length
  const height = pixelData.length
  
  canvas.width = width
  canvas.height = height
  
  // Draw transparent background
  ctx.fillStyle = 'transparent'
  ctx.fillRect(0, 0, width, height)
  
  // Draw pixel data
  pixelData.forEach((row, y) => {
    row.forEach((color, x) => {
      if (color !== 'transparent') {
        ctx.fillStyle = color
        ctx.fillRect(x, y, 1, 1)
      }
    })
  })
  
  return canvas.toDataURL()
}

export default LayerPanel