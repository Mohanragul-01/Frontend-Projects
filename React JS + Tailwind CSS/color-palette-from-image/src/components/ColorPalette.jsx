import { motion } from 'framer-motion'
import { useState } from 'react'

const ColorPalette = ({ title, colors }) => {
  const [copiedColor, setCopiedColor] = useState(null)
  
  const copyToClipboard = (color) => {
    navigator.clipboard.writeText(color)
    setCopiedColor(color)
    setTimeout(() => setCopiedColor(null), 1500)
  }
  
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
        {title}
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {colors.map((color, index) => (
          <motion.button
            key={color + index}
            onClick={() => copyToClipboard(color)}
            className="relative group rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div
              className="h-24 w-full"
              style={{ backgroundColor: color }}
            />
            <div className="p-2 bg-white dark:bg-gray-800">
              <p className="text-sm font-mono text-center text-gray-700 dark:text-gray-300">
                {color.toUpperCase()}
              </p>
            </div>
            
            {copiedColor === color && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-sm"
              >
                Copied!
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  )
}

export default ColorPalette