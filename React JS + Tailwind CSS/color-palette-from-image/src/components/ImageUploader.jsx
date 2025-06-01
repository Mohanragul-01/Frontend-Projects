import { motion } from 'framer-motion'

const ImageUploader = ({ getRootProps, getInputProps, isDragActive, imageUrl }) => {
  return (
    <div
      {...getRootProps()}
      className="relative border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center cursor-pointer transition-colors hover:border-gray-400 dark:hover:border-gray-600"
    >
      <input {...getInputProps()} />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-4"
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Uploaded"
            className="max-h-64 mx-auto rounded-lg shadow-lg"
          />
        ) : (
          <>
            <div className="text-4xl text-gray-400 dark:text-gray-600">
              📷
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              {isDragActive
                ? "Drop the image here"
                : "Drag & drop an image, or click to select"}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              Supports JPG, PNG, GIF
            </p>
          </>
        )}
      </motion.div>
    </div>
  )
}

export default ImageUploader