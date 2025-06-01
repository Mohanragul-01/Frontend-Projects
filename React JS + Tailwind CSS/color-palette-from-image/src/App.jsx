import { useState, useCallback } from 'react'
import ColorThief from 'colorthief'
import { useDropzone } from 'react-dropzone'
import { motion, AnimatePresence } from 'framer-motion'
import tinycolor from 'tinycolor2'
import ImageUploader from './components/ImageUploader'
import ColorPalette from './components/ColorPalette'
import PaletteActions from './components/PaletteActions'

function App() {
  const [colors, setColors] = useState([])
  const [analogousColors, setAnalogousColors] = useState([])
  const [complementaryColors, setComplementaryColors] = useState([])
  const [imageUrl, setImageUrl] = useState('')
  
  const generateAnalogousPalette = (baseColor) => {
    const color = tinycolor(baseColor)
    return color.analogous().map(c => c.toHexString())
  }
  
  const generateComplementaryPalette = (baseColor) => {
    const color = tinycolor(baseColor)
    return [
      color.toHexString(),
      color.complement().toHexString(),
      color.complement().brighten(10).toHexString(),
      color.complement().darken(10).toHexString()
    ]
  }
  
  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0]
    if (!file) return
    
    const reader = new FileReader()
    reader.onload = async () => {
      const img = new Image()
      img.onload = async () => {
        const colorThief = new ColorThief()
        const palette = colorThief.getPalette(img, 6)
        const hexColors = palette.map(color => 
          `#${color[0].toString(16).padStart(2, '0')}${color[1].toString(16).padStart(2, '0')}${color[2].toString(16).padStart(2, '0')}`
        )
        
        setColors(hexColors)
        setAnalogousColors(generateAnalogousPalette(hexColors[0]))
        setComplementaryColors(generateComplementaryPalette(hexColors[0]))
      }
      img.src = reader.result
      setImageUrl(reader.result)
    }
    reader.readAsDataURL(file)
  }, [])
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    }
  })
  
  const savePalette = () => {
    const palettes = JSON.parse(localStorage.getItem('palettes') || '[]')
    const newPalette = {
      id: Date.now(),
      colors,
      analogous: analogousColors,
      complementary: complementaryColors,
      timestamp: new Date().toISOString()
    }
    localStorage.setItem('palettes', JSON.stringify([newPalette, ...palettes]))
  }
  
  const downloadPalette = (format) => {
    let content = ''
    let filename = ''
    let type = ''
    
    switch (format) {
      case 'json':
        content = JSON.stringify({
          dominant: colors,
          analogous: analogousColors,
          complementary: complementaryColors
        }, null, 2)
        filename = 'palette.json'
        type = 'application/json'
        break
      case 'hex':
        content = [
          '/* Dominant Colors */',
          ...colors,
          '',
          '/* Analogous Colors */',
          ...analogousColors,
          '',
          '/* Complementary Colors */',
          ...complementaryColors
        ].join('\n')
        filename = 'palette.txt'
        type = 'text/plain'
        break
    }
    
    const blob = new Blob([content], { type })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
          Color Palette Generator
        </h1>
        
        <ImageUploader
          getRootProps={getRootProps}
          getInputProps={getInputProps}
          isDragActive={isDragActive}
          imageUrl={imageUrl}
        />
        
        <AnimatePresence>
          {colors.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-8 space-y-8"
            >
              <ColorPalette title="Dominant Colors" colors={colors} />
              <ColorPalette title="Analogous Colors" colors={analogousColors} />
              <ColorPalette title="Complementary Colors" colors={complementaryColors} />
              
              <PaletteActions
                onSave={savePalette}
                onDownload={downloadPalette}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default App