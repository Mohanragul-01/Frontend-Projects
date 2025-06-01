import { useRef, useEffect, useState } from 'react'
import { FiZoomIn, FiZoomOut } from 'react-icons/fi'

const Canvas = ({ 
  gridSize, 
  pixelSize, 
  layers, 
  activeLayerIndex, 
  currentTool, 
  currentColor, 
  secondaryColor,
  updateLayer,
  zoomLevel,
  setZoomLevel,
  pan,
  setPan,
  showGrid
}) => {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [lastPosition, setLastPosition] = useState(null)
  const [isPanning, setIsPanning] = useState(false)
  const [panStart, setPanStart] = useState({ x: 0, y: 0 })

  // Render canvas with all visible layers
  useEffect(() => {
    if (!canvasRef.current) return
    
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    
    // Calculate the scaled dimensions
    const scaledWidth = gridSize.width * pixelSize * zoomLevel
    const scaledHeight = gridSize.height * pixelSize * zoomLevel
    
    // Set canvas size
    canvas.width = scaledWidth
    canvas.height = scaledHeight
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    // Draw background (checkerboard for transparency)
    drawCheckerboard(ctx, scaledWidth, scaledHeight)
    
    // Draw each visible layer from bottom to top
    layers.forEach(layer => {
      if (layer.visible) {
        drawLayer(ctx, layer.data, pixelSize * zoomLevel)
      }
    })
    
    // Draw grid lines if enabled
    if (showGrid && zoomLevel >= 0.5) {
      drawGrid(ctx, gridSize.width, gridSize.height, pixelSize * zoomLevel)
    }
  }, [layers, gridSize, pixelSize, zoomLevel, showGrid, pan])

  const drawCheckerboard = (ctx, width, height) => {
    const tileSize = 10 * zoomLevel
    ctx.fillStyle = '#e5e5e5'
    ctx.fillRect(0, 0, width, height)
    
    ctx.fillStyle = '#cccccc'
    for (let y = 0; y < height; y += tileSize * 2) {
      for (let x = 0; x < width; x += tileSize * 2) {
        ctx.fillRect(x, y, tileSize, tileSize)
        ctx.fillRect(x + tileSize, y + tileSize, tileSize, tileSize)
      }
    }
  }

  const drawLayer = (ctx, pixelData, pixelSizeScaled) => {
    if (!pixelData) return
    
    pixelData.forEach((row, y) => {
      row.forEach((color, x) => {
        if (color !== 'transparent') {
          ctx.fillStyle = color
          ctx.fillRect(
            x * pixelSizeScaled, 
            y * pixelSizeScaled, 
            pixelSizeScaled, 
            pixelSizeScaled
          )
        }
      })
    })
  }

  const drawGrid = (ctx, width, height, pixelSizeScaled) => {
    ctx.strokeStyle = 'rgba(150, 150, 150, 0.5)'
    ctx.lineWidth = 1
    
    // Vertical lines
    for (let x = 0; x <= width; x++) {
      ctx.beginPath()
      ctx.moveTo(x * pixelSizeScaled, 0)
      ctx.lineTo(x * pixelSizeScaled, height * pixelSizeScaled)
      ctx.stroke()
    }
    
    // Horizontal lines
    for (let y = 0; y <= height; y++) {
      ctx.beginPath()
      ctx.moveTo(0, y * pixelSizeScaled)
      ctx.lineTo(width * pixelSizeScaled, y * pixelSizeScaled)
      ctx.stroke()
    }
  }

  const getPixelCoordinates = (e) => {
    if (!canvasRef.current) return null
    
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    
    // Calculate mouse position relative to canvas
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    // Convert to grid coordinates
    const pixelSizeScaled = pixelSize * zoomLevel
    const pixelX = Math.floor(x / pixelSizeScaled)
    const pixelY = Math.floor(y / pixelSizeScaled)
    
    // Check if within bounds
    if (pixelX >= 0 && pixelX < gridSize.width && pixelY >= 0 && pixelY < gridSize.height) {
      return { x: pixelX, y: pixelY }
    }
    
    return null
  }

  const drawPixel = (x, y, color) => {
    if (activeLayerIndex < 0 || activeLayerIndex >= layers.length) return
    if (layers[activeLayerIndex].locked) return
    
    const activeLayer = layers[activeLayerIndex]
    const newLayerData = [...activeLayer.data]
    
    // Set the color at the specified coordinates
    if (newLayerData[y] && newLayerData[y][x] !== undefined) {
      newLayerData[y] = [...newLayerData[y]]
      newLayerData[y][x] = color
      
      updateLayer(activeLayerIndex, newLayerData)
    }
  }

  const drawLine = (fromX, fromY, toX, toY, color) => {
    const dx = Math.abs(toX - fromX)
    const dy = Math.abs(toY - fromY)
    const sx = fromX < toX ? 1 : -1
    const sy = fromY < toY ? 1 : -1
    let err = dx - dy
    
    while (true) {
      drawPixel(fromX, fromY, color)
      
      if (fromX === toX && fromY === toY) break
      
      const e2 = 2 * err
      if (e2 > -dy) {
        if (fromX === toX) break
        err -= dy
        fromX += sx
      }
      if (e2 < dx) {
        if (fromY === toY) break
        err += dx
        fromY += sy
      }
    }
  }
  
  const handleMouseDown = (e) => {
    if (e.button === 1 || e.button === 2 || (e.button === 0 && e.altKey)) {
      // Middle click or right click or Alt+left click for panning
      setIsPanning(true)
      setPanStart({ x: e.clientX - pan.x, y: e.clientY - pan.y })
      return
    }
    
    if (e.button === 0) { // Left click
      const pixelCoords = getPixelCoordinates(e)
      if (!pixelCoords) return
      
      setIsDrawing(true)
      setLastPosition(pixelCoords)
      
      const color = e.shiftKey ? secondaryColor : currentColor
      
      if (currentTool === 'pencil') {
        drawPixel(pixelCoords.x, pixelCoords.y, color)
      } else if (currentTool === 'eraser') {
        drawPixel(pixelCoords.x, pixelCoords.y, 'transparent')
      } else if (currentTool === 'eyedropper') {
        const layerData = layers[activeLayerIndex].data
        if (layerData[pixelCoords.y] && layerData[pixelCoords.y][pixelCoords.x]) {
          const pickedColor = layerData[pixelCoords.y][pixelCoords.x]
          if (pickedColor !== 'transparent') {
            // Use a callback to update the color in parent component
            if (e.shiftKey) {
              // onSecondaryColorChange(pickedColor)
            } else {
              // onColorChange(pickedColor)
            }
          }
        }
      } else if (currentTool === 'fill') {
        // Implement fill tool (flood fill)
        fillArea(pixelCoords.x, pixelCoords.y, color)
      }
    }
  }
  
  const handleMouseMove = (e) => {
    if (isPanning) {
      const newPan = {
        x: e.clientX - panStart.x,
        y: e.clientY - panStart.y
      }
      setPan(newPan)
      return
    }
    
    if (!isDrawing) return
    
    const pixelCoords = getPixelCoordinates(e)
    if (!pixelCoords) return
    
    const color = e.shiftKey ? secondaryColor : currentColor
    
    if (currentTool === 'pencil' && lastPosition) {
      drawLine(lastPosition.x, lastPosition.y, pixelCoords.x, pixelCoords.y, color)
    } else if (currentTool === 'eraser' && lastPosition) {
      drawLine(lastPosition.x, lastPosition.y, pixelCoords.x, pixelCoords.y, 'transparent')
    }
    
    setLastPosition(pixelCoords)
  }
  
  const handleMouseUp = () => {
    setIsDrawing(false)
    setIsPanning(false)
    setLastPosition(null)
  }

  const fillArea = (startX, startY, newColor) => {
    if (activeLayerIndex < 0 || activeLayerIndex >= layers.length) return
    if (layers[activeLayerIndex].locked) return
    
    const activeLayer = layers[activeLayerIndex]
    const layerData = activeLayer.data
    const targetColor = layerData[startY][startX]
    
    // Don't fill if the colors are the same
    if (targetColor === newColor) return
    
    // Create a copy of the layer data
    const newLayerData = layerData.map(row => [...row])
    
    // Queue for flood fill algorithm
    const queue = [{ x: startX, y: startY }]
    
    // Process queue
    while (queue.length > 0) {
      const { x, y } = queue.shift()
      
      // Check if this pixel should be filled
      if (
        x >= 0 && x < gridSize.width && 
        y >= 0 && y < gridSize.height &&
        newLayerData[y][x] === targetColor
      ) {
        // Fill this pixel
        newLayerData[y][x] = newColor
        
        // Add adjacent pixels to queue
        queue.push({ x: x + 1, y })
        queue.push({ x: x - 1, y })
        queue.push({ x, y: y + 1 })
        queue.push({ x, y: y - 1 })
      }
    }
    
    updateLayer(activeLayerIndex, newLayerData)
  }

  const handleWheel = (e) => {
    e.preventDefault()
    
    // Zoom in/out with mouse wheel
    if (e.ctrlKey || e.metaKey) {
      const delta = e.deltaY > 0 ? -0.1 : 0.1
      const newZoom = Math.max(0.1, Math.min(10, zoomLevel + delta))
      setZoomLevel(newZoom)
    } else {
      // Pan with mouse wheel
      setPan({
        x: pan.x - e.deltaX,
        y: pan.y - e.deltaY
      })
    }
  }
  
  const handleContextMenu = (e) => {
    e.preventDefault() // Prevent default context menu
  }

  const zoomIn = () => {
    setZoomLevel(Math.min(10, zoomLevel + 0.2))
  }

  const zoomOut = () => {
    setZoomLevel(Math.max(0.1, zoomLevel - 0.2))
  }

  return (
    <div 
      className="relative h-full flex items-center justify-center overflow-hidden prevent-select"
      ref={containerRef}
      onWheel={handleWheel}
    >
      <div 
        className="absolute"
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px)`
        }}
      >
        <canvas 
          ref={canvasRef}
          className="pixel-grid shadow-lg"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onContextMenu={handleContextMenu}
        />
      </div>
      
      {/* Zoom controls */}
      <div className="absolute bottom-4 right-4 flex gap-2">
        <button 
          className="bg-dark-600 hover:bg-dark-500 p-2 rounded-lg text-white transition-colors"
          onClick={zoomOut}
        >
          <FiZoomOut size={20} />
        </button>
        <div className="bg-dark-600 px-3 py-2 rounded-lg text-white">
          {Math.round(zoomLevel * 100)}%
        </div>
        <button 
          className="bg-dark-600 hover:bg-dark-500 p-2 rounded-lg text-white transition-colors"
          onClick={zoomIn}
        >
          <FiZoomIn size={20} />
        </button>
      </div>
    </div>
  )
}

export default Canvas