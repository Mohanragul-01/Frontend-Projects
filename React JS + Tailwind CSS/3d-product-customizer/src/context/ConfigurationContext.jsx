import { createContext, useContext, useState, useEffect } from 'react';

// Default configuration
const defaultConfig = {
  parts: {
    body: {
      color: '#3387FF',
      material: 'plastic',
      texture: 'smooth'
    },
    accent: {
      color: '#FF9500',
      material: 'plastic',
      texture: 'smooth'
    },
    logo: {
      visible: true,
      position: { x: 0, y: 0, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
      scale: 1,
      image: null
    }
  },
  camera: {
    position: { x: 0, y: 0, z: 5 },
    rotation: { x: 0, y: 0, z: 0 },
    zoom: 1
  },
  lighting: {
    intensity: 1,
    color: '#FFFFFF',
    ambient: 0.5
  }
};

const ConfigurationContext = createContext();

export function useConfiguration() {
  return useContext(ConfigurationContext);
}

export function ConfigurationProvider({ children, initialConfig = null, onConfigChange }) {
  const [config, setConfig] = useState(initialConfig || defaultConfig);
  
  // Update part color
  const updatePartColor = (partName, color) => {
    setConfig(prev => ({
      ...prev,
      parts: {
        ...prev.parts,
        [partName]: {
          ...prev.parts[partName],
          color
        }
      }
    }));
  };
  
  // Update part material
  const updatePartMaterial = (partName, material) => {
    setConfig(prev => ({
      ...prev,
      parts: {
        ...prev.parts,
        [partName]: {
          ...prev.parts[partName],
          material
        }
      }
    }));
  };
  
  // Update part texture
  const updatePartTexture = (partName, texture) => {
    setConfig(prev => ({
      ...prev,
      parts: {
        ...prev.parts,
        [partName]: {
          ...prev.parts[partName],
          texture
        }
      }
    }));
  };
  
  // Update logo
  const updateLogo = (logoConfig) => {
    setConfig(prev => ({
      ...prev,
      parts: {
        ...prev.parts,
        logo: {
          ...prev.parts.logo,
          ...logoConfig
        }
      }
    }));
  };
  
  // Update camera
  const updateCamera = (cameraConfig) => {
    setConfig(prev => ({
      ...prev,
      camera: {
        ...prev.camera,
        ...cameraConfig
      }
    }));
  };
  
  // Update lighting
  const updateLighting = (lightingConfig) => {
    setConfig(prev => ({
      ...prev,
      lighting: {
        ...prev.lighting,
        ...lightingConfig
      }
    }));
  };
  
  // Reset to default
  const resetToDefault = () => {
    setConfig(defaultConfig);
  };
  
  // Call onConfigChange callback when config changes
  useEffect(() => {
    if (onConfigChange) {
      onConfigChange(config);
    }
  }, [config, onConfigChange]);
  
  const value = {
    config,
    updatePartColor,
    updatePartMaterial,
    updatePartTexture,
    updateLogo,
    updateCamera,
    updateLighting,
    resetToDefault
  };
  
  return (
    <ConfigurationContext.Provider value={value}>
      {children}
    </ConfigurationContext.Provider>
  );
}