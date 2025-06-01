import { useState, useEffect } from 'react'
import Canvas from './Canvas'
import Toolbar from './Toolbar'
import ColorPalette from './ColorPalette'
import LayerPanel from './LayerPanel'
import SettingsPanel from './SettingsPanel'
import { loadArtworkFromStorage, saveArtworkToStorage } from '../utils/storageUtils'

const PixelEditor = () => {
  // Canvas state
  const [gridSize, setGridSize] = useState({ width: 16, height: 16 })
  const [pixelSize, setPixelSize] = useState(20)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [showGrid, setShowGrid] = useState(true)

  // Tools state
  const [currentTool, setCurrentTool] = useState('pencil')
  const [currentColor, setCurrentColor] = useState('#000000')
  const [secondaryColor, setSecondaryColor] = useState('#ffffff')
  const [recentColors, setRecentColors] = useState(['#000000', '#ffffff', '#ff0000', '#00ff00', '#0000ff', '#ffff00'])

  // Layers state
  const [layers, setLayers] = useState([])
  const [activeLayerIndex, setActiveLayerIndex] = useState(0)

  // History for undo/redo
  const [history, setHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)

  // Settings Panel
  const [settingsPanelOpen, setSettingsPanelOpen] = useState(false)

  useEffect(() => {
    // Initialize layers or load from localStorage
    const savedData = loadArtworkFromStorage()
    
    if (savedData) {
      setGridSize(savedData.gridSize)
      setLayers(savedData.layers)
      if (savedData.recentColors) {
        setRecentColors(savedData.recentColors)
      }
    } else {
      // Create initial layer
      initializeNewCanvas(gridSize.width, gridSize.height)
    }
  }, [])

  // Auto-save work
  useEffect(() => {
    if (layers.length > 0) {
      saveArtworkToStorage({
        gridSize,
        layers,
        recentColors
      })
    }
  }, [layers, gridSize, recentColors])

  const initializeNewCanvas = (width, height) => {
    // Create a blank pixel grid
    const emptyGrid = Array(height).fill().map(() => 
      Array(width).fill('transparent')
    )
    
    // Create initial layer
    const initialLayer = {
      id: Date.now(),
      name: 'Layer 1',
      visible: true,
      locked: false,
      data: emptyGrid
    }
    
    setLayers([initialLayer])
    setActiveLayerIndex(0)
    setHistory([])
    setHistoryIndex(-1)
  }

  const handleSizeChange = (width, height) => {
    // Reset canvas with new dimensions
    setGridSize({ width, height })
    initializeNewCanvas(width, height)
  }

  const addLayer = () => {
    const emptyGrid = Array(gridSize.height).fill().map(() => 
      Array(gridSize.width).fill('transparent')
    )
    
    const newLayer = {
      id: Date.now(),
      name: `Layer ${layers.length + 1}`,
      visible: true,
      locked: false,
      data: emptyGrid
    }
    
    setLayers([...layers, newLayer])
    setActiveLayerIndex(layers.length)
  }

  const updateLayer = (layerIndex, newData) => {
    const updatedLayers = [...layers]
    updatedLayers[layerIndex] = {
      ...updatedLayers[layerIndex],
      data: newData
    }
    
    // Add to history
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push({
      layers: JSON.parse(JSON.stringify(layers))
    })
    
    setLayers(updatedLayers)
    setHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
  }

  const toggleLayerVisibility = (index) => {
    const updatedLayers = [...layers]
    updatedLayers[index] = {
      ...updatedLayers[index],
      visible: !updatedLayers[index].visible
    }
    setLayers(updatedLayers)
  }

  const toggleLayerLock = (index) => {
    const updatedLayers = [...layers]
    updatedLayers[index] = {
      ...updatedLayers[index],
      locked: !updatedLayers[index].locked
    }
    setLayers(updatedLayers)
  }

  const renameLayer = (index, newName) => {
    const updatedLayers = [...layers]
    updatedLayers[index] = {
      ...updatedLayers[index],
      name: newName
    }
    setLayers(updatedLayers)
  }

  const deleteLayer = (index) => {
    if (layers.length <= 1) return
    
    const updatedLayers = layers.filter((_, i) => i !== index)
    setLayers(updatedLayers)
    
    // Adjust active layer index
    if (activeLayerIndex >= updatedLayers.length) {
      setActiveLayerIndex(updatedLayers.length - 1)
    } else if (index === activeLayerIndex) {
      setActiveLayerIndex(Math.max(0, activeLayerIndex - 1))
    }
  }

  const reorderLayer = (fromIndex, toIndex) => {
    if (fromIndex === toIndex) return
    
    const updatedLayers = [...layers]
    const [movedLayer] = updatedLayers.splice(fromIndex, 1)
    updatedLayers.splice(toIndex, 0, movedLayer)
    
    setLayers(updatedLayers)
    
    // Update active layer index
    if (activeLayerIndex === fromIndex) {
      setActiveLayerIndex(toIndex)
    }
  }

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1)
      setLayers(JSON.parse(JSON.stringify(history[historyIndex - 1].layers)))
    }
  }

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1)
      setLayers(JSON.parse(JSON.stringify(history[historyIndex + 1].layers)))
    }
  }

  const handleColorChange = (color) => {
    setCurrentColor(color)
    
    // Add to recent colors if not already there
    if (!recentColors.includes(color)) {
      setRecentColors([color, ...recentColors.slice(0, 11)])
    }
  }

  return (
    <div className="flex flex-col lg:flex-row gap-4 h-[calc(100vh-120px)]">
      {/* Left Sidebar - Tools */}
      <div className="lg:w-16 flex lg:flex-col flex-row lg:h-full bg-dark-700 p-2 rounded-lg">
        <Toolbar 
          currentTool={currentTool}
          setCurrentTool={setCurrentTool} 
          undo={undo}
          redo={redo}
          canUndo={historyIndex > 0}
          canRedo={historyIndex < history.length - 1}
          setSettingsPanelOpen={setSettingsPanelOpen}
        />
      </div>

      {/* Color Palette (below tools on mobile, above canvas on desktop) */}
      <div className="lg:hidden bg-dark-700 p-2 rounded-lg">
        <ColorPalette 
          currentColor={currentColor}
          secondaryColor={secondaryColor}
          setCurrentColor={handleColorChange}
          setSecondaryColor={setSecondaryColor}
          recentColors={recentColors}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 h-full">
        <div className="hidden lg:block bg-dark-700 p-2 mb-2 rounded-lg">
          <ColorPalette 
            currentColor={currentColor}
            secondaryColor={secondaryColor}
            setCurrentColor={handleColorChange}
            setSecondaryColor={setSecondaryColor}
            recentColors={recentColors}
          />
        </div>

        {/* Canvas */}
        <div className="relative flex-1 bg-dark-700 rounded-lg overflow-hidden">
          <Canvas 
            gridSize={gridSize}
            pixelSize={pixelSize}
            layers={layers}
            activeLayerIndex={activeLayerIndex}
            currentTool={currentTool}
            currentColor={currentColor}
            secondaryColor={secondaryColor}
            updateLayer={updateLayer}
            zoomLevel={zoomLevel}
            setZoomLevel={setZoomLevel}
            pan={pan}
            setPan={setPan}
            showGrid={showGrid}
          />
        </div>
      </div>

      {/* Right Sidebar - Layers */}
      <div className="lg:w-64 bg-dark-700 p-2 rounded-lg overflow-y-auto custom-scrollbar">
        <LayerPanel 
          layers={layers}
          activeLayerIndex={activeLayerIndex}
          setActiveLayerIndex={setActiveLayerIndex}
          addLayer={addLayer}
          deleteLayer={deleteLayer}
          toggleLayerVisibility={toggleLayerVisibility}
          toggleLayerLock={toggleLayerLock}
          renameLayer={renameLayer}
          reorderLayer={reorderLayer}
        />
      </div>

      {/* Settings Panel (Modal) */}
      {settingsPanelOpen && (
        <SettingsPanel 
          gridSize={gridSize}
          onSizeChange={handleSizeChange}
          pixelSize={pixelSize}
          setPixelSize={setPixelSize}
          showGrid={showGrid}
          setShowGrid={setShowGrid}
          zoomLevel={zoomLevel}
          setZoomLevel={setZoomLevel}
          onClose={() => setSettingsPanelOpen(false)}
          layers={layers}
        />
      )}
    </div>
  )
}

export default PixelEditor