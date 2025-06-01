import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import TimelineNode from './TimelineNode'
import * as THREE from 'three'
import gsap from 'gsap'

function TimelineEvents({ events, position, onEventSelect, activeEvent }) {
  const groupRef = useRef()
  const lineRef = useRef()
  
  useEffect(() => {
    if (groupRef.current) {
      gsap.to(groupRef.current.position, {
        x: position[0],
        duration: 1,
        ease: 'power2.out'
      })
    }
  }, [position])
  
  useFrame(() => {
    if (lineRef.current) {
      lineRef.current.material.dashOffset -= 0.01
    }
  })
  
  // Create the timeline line
  const createTimelineLine = () => {
    const length = events.length * 50
    const points = []
    points.push(new THREE.Vector3(-20, 0, 0))
    points.push(new THREE.Vector3(length, 0, 0))
    
    const lineGeometry = new THREE.BufferGeometry().setFromPoints(points)
    const lineMaterial = new THREE.LineDashedMaterial({
      color: 0x0071e3,
      linewidth: 2,
      scale: 1,
      dashSize: 3,
      gapSize: 1,
    })
    
    return (
      <line 
        ref={lineRef}
        geometry={lineGeometry}
        material={lineMaterial}
        computeLineDistances
      />
    )
  }
  
  return (
    <group ref={groupRef} position={position}>
      {createTimelineLine()}
      
      {events.map((event, index) => (
        <group key={event.id} position={[index * 50, 0, 0]}>
          <TimelineNode 
            event={event}
            position={[0, 0, 0]}
            onSelect={() => onEventSelect(event)}
            isActive={activeEvent && activeEvent.id === event.id}
          />
          <Text
            position={[0, -8, 0]}
            fontSize={1.5}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
          >
            {event.year}
          </Text>
          <Text
            position={[0, -11, 0]}
            fontSize={1}
            color="#cccccc"
            anchorX="center"
            anchorY="middle"
            maxWidth={40}
          >
            {event.title}
          </Text>
        </group>
      ))}
    </group>
  )
}

export default TimelineEvents