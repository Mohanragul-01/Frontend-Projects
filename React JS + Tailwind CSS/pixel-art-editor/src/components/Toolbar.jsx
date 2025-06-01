import { 
  FaPencilAlt, 
  FaEraser, 
  FaEyeDropper, 
  FaFillDrip, 
  FaUndo, 
  FaRedo,
  FaDownload,
  FaCog
} from 'react-icons/fa'
import toast from 'react-hot-toast'

const Toolbar = ({ 
  currentTool, 
  setCurrentTool, 
  undo,
  redo,
  canUndo,
  canRedo,
  setSettingsPanelOpen
}) => {
  const tools = [
    { id: 'pencil', icon: <FaPencilAlt />, label: 'Pencil' },
    { id: 'eraser', icon: <FaEraser />, label: 'Eraser' },
    { id: 'eyedropper', icon: <FaEyeDropper />, label: 'Color Picker' },
    { id: 'fill', icon: <FaFillDrip />, label: 'Fill Tool' }
  ]

  const exportToPNG = () => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    
    // Get grid size from current project
    const gridWidth = document.querySelector('canvas').width / (document.querySelector('canvas').offsetWidth / document.querySelector('canvas').width)
    const gridHeight = document.querySelector('canvas').height / (document.querySelector('canvas').offsetHeight / document.querySelector('canvas').height)
    
    // Set canvas size to match grid dimensions with 1px per pixel
    canvas.width = gridWidth
    canvas.height = gridHeight
    
    // Draw the current canvas to our export canvas
    ctx.drawImage(document.querySelector('canvas'), 0, 0)
    
    // Convert canvas to data URL and trigger download
    try {
      const dataUrl = canvas.toDataURL('image/png')
      const link = document.createElement('a')
      link.download = `pixel-art-${new Date().toISOString().split('T')[0]}.png`
      link.href = dataUrl
      link.click()
      toast.success('PNG exported successfully!')
    } catch (err) {
      toast.error('Failed to export PNG')
      console.error(err)
    }
  }

  return (
    <>
      {tools.map(tool => (
        <button
          key={tool.id}
          className={`tool-btn mb-2 ${currentTool === tool.id ? 'active' : ''}`}
          onClick={() => setCurrentTool(tool.id)}
          title={tool.label}
        >
          {tool.icon}
        </button>
      ))}
      
      <div className="my-2 border-t border-dark-500"></div>
      
      <button
        className={`tool-btn mb-2 ${!canUndo ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={undo}
        disabled={!canUndo}
        title="Undo"
      >
        <FaUndo />
      </button>
      
      <button
        className={`tool-btn mb-2 ${!canRedo ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={redo}
        disabled={!canRedo}
        title="Redo"
      >
        <FaRedo />
      </button>
      
      <div className="my-2 border-t border-dark-500"></div>
      
      <button
        className="tool-btn mb-2"
        onClick={exportToPNG}
        title="Export as PNG"
      >
        <FaDownload />
      </button>
      
      <button
        className="tool-btn mb-2"
        onClick={() => setSettingsPanelOpen(true)}
        title="Settings"
      >
        <FaCog />
      </button>
    </>
  )
}

export default Toolbar