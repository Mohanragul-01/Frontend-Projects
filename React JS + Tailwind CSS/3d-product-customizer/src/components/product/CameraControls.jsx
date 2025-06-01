import { useConfiguration } from '../../context/ConfigurationContext';

export default function CameraControls() {
  const { config, updateCamera } = useConfiguration();
  
  const handleZoomIn = () => {
    const newZoom = Math.min(config.camera.zoom + 0.25, 2);
    updateCamera({ zoom: newZoom });
  };
  
  const handleZoomOut = () => {
    const newZoom = Math.max(config.camera.zoom - 0.25, 0.5);
    updateCamera({ zoom: newZoom });
  };
  
  const handleReset = () => {
    updateCamera({
      position: { x: 0, y: 0, z: 4 },
      rotation: { x: 0, y: 0, z: 0 },
      zoom: 1
    });
  };
  
  return (
    <div className="absolute top-4 right-4 flex flex-col space-y-2">
      <button 
        onClick={handleZoomIn}
        className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-100 active:scale-95 transition-all text-xl font-bold"
        title="Zoom in"
      >
        +
      </button>
      <button 
        onClick={handleZoomOut}
        className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-100 active:scale-95 transition-all text-xl font-bold"
        title="Zoom out"
      >
        −
      </button>
      <button 
        onClick={handleReset}
        className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-100 active:scale-95 transition-all text-lg"
        title="Reset view"
      >
        ↺
      </button>
    </div>
  );
}
