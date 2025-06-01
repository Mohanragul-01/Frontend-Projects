import { Suspense, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import { useConfiguration } from '../../context/ConfigurationContext';
import CameraControls from './CameraControls';
import Loader from '../ui/Loader';
import SneakerModel from './models/SneakerModel';

export default function ProductViewer() {
  const { config, updateCamera } = useConfiguration();
  const controlsRef = useRef();
  const [activeView, setActiveView] = useState('front');

  const handleViewChange = (view) => {
    if (!controlsRef.current) return;
    setActiveView(view);

    switch (view) {
      case 'front':
        controlsRef.current.reset();
        controlsRef.current.setAzimuthalAngle(0);
        controlsRef.current.setPolarAngle(Math.PI / 2);
        break;
      case 'side':
        controlsRef.current.reset();
        controlsRef.current.setAzimuthalAngle(Math.PI / 2);
        controlsRef.current.setPolarAngle(Math.PI / 2);
        break;
      case 'top':
        controlsRef.current.reset();
        controlsRef.current.setPolarAngle(0);
        break;
      case 'bottom':
        controlsRef.current.reset();
        controlsRef.current.setPolarAngle(Math.PI);
        break;
    }
  };
  
  return (
    <div className="w-full h-full relative">
      <Canvas 
        shadows 
        camera={{ position: [0, 0, 4], fov: 50 }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={config.lighting.ambient} />
          <spotLight 
            position={[10, 10, 10]} 
            angle={0.15} 
            penumbra={1} 
            intensity={config.lighting.intensity}
            castShadow 
          />
          <Environment preset="studio" />
          
          <SneakerModel />
          
          <ContactShadows 
            position={[0, -1, 0]} 
            opacity={0.4} 
            scale={10} 
            blur={2} 
            far={4} 
          />
          
          <OrbitControls 
            ref={controlsRef}
            enablePan={false}
            enableZoom={true}
            minPolarAngle={0}
            maxPolarAngle={Math.PI}
            minDistance={2}
            maxDistance={6}
            zoomSpeed={0.5}
          />
        </Suspense>
      </Canvas>
      
      <CameraControls />
      
      <Loader />
      
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/80 backdrop-blur-sm rounded-full px-2 py-1 flex space-x-1 shadow-md">
        <button 
          onClick={() => handleViewChange('front')}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
            activeView === 'front' 
              ? 'bg-primary-500 text-white' 
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
          title="Front view"
        >
          F
        </button>
        <button 
          onClick={() => handleViewChange('side')}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
            activeView === 'side' 
              ? 'bg-primary-500 text-white' 
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
          title="Side view"
        >
          S
        </button>
        <button 
          onClick={() => handleViewChange('top')}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
            activeView === 'top' 
              ? 'bg-primary-500 text-white' 
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
          title="Top view"
        >
          T
        </button>
        <button 
          onClick={() => handleViewChange('bottom')}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
            activeView === 'bottom' 
              ? 'bg-primary-500 text-white' 
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
          title="Bottom view"
        >
          B
        </button>
      </div>
    </div>
  );
}
