import { motion } from 'framer-motion'

const PaletteActions = ({ onSave, onDownload }) => {
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      <motion.button
        onClick={onSave}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Save to Local Storage
      </motion.button>
      
      <motion.button
        onClick={() => onDownload('json')}
        className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Download JSON
      </motion.button>
      
      <motion.button
        onClick={() => onDownload('hex')}
        className="px-4 py-2 bg-purple-500 text-white rounded-lg shadow hover:bg-purple-600 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Download HEX
      </motion.button>
    </div>
  )
}

export default PaletteActions