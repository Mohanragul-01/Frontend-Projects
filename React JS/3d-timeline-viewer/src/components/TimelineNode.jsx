import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'

function TimelineNode({ event, position, onSelect, isActive }) {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)
  
  useEffect(() => {
    if (meshRef.current) {
      if (isActive) {
        gsap.to(meshRef.current.scale, {
          x: 1.5,
          y: 1.5,
          z: 1.5,
          duration: 0.5,
          ease: 'back.out(1.7)'
        })
        gsap.to(meshRef.current.material, {
          emissiveIntensity: 0.8,
          duration: 0.5
        })
      } else {
        gsap.to(meshRef.current.scale, {
          x: hovered ? 1.2 : 1,
          y: hovered ? 1.2 : 1,
          z: hovered ? 1.2 : 1,
          duration: 0.5,
          ease: 'back.out(1.7)'
        })
        gsap.to(meshRef.current.material, {
          emissiveIntensity: hovered ? 0.5 : 0.2,
          duration: 0.5
        })
      }
    }
  }, [hovered, isActive])
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01
    }
  })
  
  const getNodeColor = () => {
    const categoryColors = {
      'technology': 0x0071e3, // Blue
      'science': 0x34c759,    // Green
      'culture': 0xff9500,    // Orange
      'politics': 0xff3b30,   // Red
      'default': 0x3a3a3c     // Gray
    }
    
    return categoryColors[event.category] || categoryColors.default
  }
  
  return (
    <mesh
      ref={meshRef}
      position={position}
      onClick={onSelect}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <sphereGeometry args={[2, 32, 32]} />
      <meshStandardMaterial
        color={getNodeColor()}
        emissive={getNodeColor()}
        emissiveIntensity={0.2}
        roughness={0.3}
        metalness={0.8}
      />
    </mesh>
  )
}

export default TimelineNode