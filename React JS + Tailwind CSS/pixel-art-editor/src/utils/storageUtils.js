const STORAGE_KEY = 'pixel-editor-artwork'

export const saveArtworkToStorage = (artworkData) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(artworkData))
    return true
  } catch (error) {
    console.error('Error saving artwork to localStorage:', error)
    return false
  }
}

export const loadArtworkFromStorage = () => {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY)
    if (savedData) {
      return JSON.parse(savedData)
    }
    return null
  } catch (error) {
    console.error('Error loading artwork from localStorage:', error)
    return null
  }
}

export const clearArtworkFromStorage = () => {
  try {
    localStorage.removeItem(STORAGE_KEY)
    return true
  } catch (error) {
    console.error('Error clearing artwork from localStorage:', error)
    return false
  }
}

export const exportArtworkAsJSON = (artworkData) => {
  try {
    const dataStr = JSON.stringify(artworkData, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr)
    
    const exportFileName = `pixel-artwork-${new Date().toISOString().slice(0, 10)}.json`
    
    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileName)
    linkElement.click()
    
    return true
  } catch (error) {
    console.error('Error exporting artwork as JSON:', error)
    return false
  }
}

export const importArtworkFromJSON = (jsonString) => {
  try {
    const artworkData = JSON.parse(jsonString)
    
    // Validate required data structure
    if (!artworkData.gridSize || !artworkData.layers || !Array.isArray(artworkData.layers)) {
      throw new Error('Invalid artwork data format')
    }
    
    // Save to localStorage
    saveArtworkToStorage(artworkData)
    
    return artworkData
  } catch (error) {
    console.error('Error importing artwork from JSON:', error)
    return null
  }
}