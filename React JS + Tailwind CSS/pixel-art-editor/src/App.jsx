import { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import PixelEditor from './components/PixelEditor'

function App() {
  const [theme] = useState('dark')

  return (
    <div className={`min-h-screen bg-dark-800 text-white ${theme}`}>
      <div className="container mx-auto px-4 py-6">
        <header className="mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-400 to-secondary-400 text-transparent bg-clip-text">
            Pixel Art Editor
          </h1>
        </header>
        
        <PixelEditor />
      </div>
      <Toaster 
        position="bottom-center"
        toastOptions={{
          style: {
            background: '#1f2937',
            color: '#fff',
          },
        }}
      />
    </div>
  )
}

export default App