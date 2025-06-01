import { useRef, useEffect } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { useConfiguration } from '../../../context/ConfigurationContext';

export default function SneakerModel() {
  const { config } = useConfiguration();
  const groupRef = useRef();
  const logoTexture = useRef(null);
  
  // Load logo texture when image changes
  useEffect(() => {
    if (config.parts.logo.image) {
      const textureLoader = new TextureLoader();
      textureLoader.load(config.parts.logo.image, (texture) => {
        logoTexture.current = texture;
      });
    }
  }, [config.parts.logo.image]);
  
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
    }
  });
  
  const createMaterial = (partConfig) => {
    let material;
    
    switch (partConfig.material) {
      case 'metal':
        material = <meshStandardMaterial 
          color={partConfig.color} 
          metalness={0.9} 
          roughness={0.1} 
        />;
        break;
      case 'leather':
        material = <meshStandardMaterial 
          color={partConfig.color} 
          roughness={0.7} 
          metalness={0.1}
        />;
        break;
      default: // plastic
        material = <meshStandardMaterial 
          color={partConfig.color} 
          roughness={0.3} 
          metalness={0.1}
        />;
    }
    
    return material;
  };
  
  return (
    <group ref={groupRef} position={[0, -0.5, 0]} dispose={null}>
      {/* Main body */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[1.5, 0.5, 0.8]} />
        {createMaterial(config.parts.body)}
      </mesh>
      
      {/* Sole */}
      <mesh castShadow receiveShadow position={[0, -0.3, 0]} scale={[1.6, 0.1, 1]}>
        <boxGeometry args={[1, 1, 1]} />
        {createMaterial(config.parts.accent)}
      </mesh>
      
      {/* Laces */}
      <mesh castShadow receiveShadow position={[0, 0.3, 0.2]} rotation={[0.4, 0, 0]} scale={[0.8, 0.1, 0.4]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="white" roughness={0.5} />
      </mesh>
      
      {/* Logo */}
      {config.parts.logo.visible && (
        <mesh 
          castShadow 
          position={[
            config.parts.logo.position.x * 0.75,
            config.parts.logo.position.y * 0.25,
            0.41 + config.parts.logo.position.z * 0.1
          ]} 
          rotation={[0, 0, 0]} 
          scale={[0.2 * config.parts.logo.scale, 0.2 * config.parts.logo.scale, 0.01]}
        >
          <planeGeometry args={[1, 1]} />
          <meshStandardMaterial 
            color={config.parts.accent.color}
            map={logoTexture.current}
            transparent={true}
            roughness={0.3}
          />
        </mesh>
      )}
    </group>
  );
}
