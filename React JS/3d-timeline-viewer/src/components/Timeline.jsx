import { useRef, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera, OrbitControls } from '@react-three/drei'
import TimelineControls from './TimelineControls'
import TimelineEvents from './TimelineEvents'
import gsap from 'gsap'
import '../styles/Timeline.css'

function Timeline({ events, onEventSelect, activeEvent }) {
  const containerRef = useRef(null)
  const [timelinePosition, setTimelinePosition] = useState(0)
  const [currentEventIndex, setCurrentEventIndex] = useState(0)
  const animationRef = useRef(null)
  const [isAnimating, setIsAnimating] = useState(false)

  const sortedEvents = [...events].sort((a, b) => a.year - b.year)

  const animateToEvent = (index) => {
    if (animationRef.current) {
      animationRef.current.kill()
    }
    setIsAnimating(true)
    const targetPosition = -index * 50

    animationRef.current = gsap.to({ val: timelinePosition }, {
      val: targetPosition,
      duration: 0.8,
      ease: "power3.out",
      onUpdate: function () {
        setTimelinePosition(this.targets()[0].val)
      },
      onComplete: () => {
        setTimelinePosition(targetPosition)
        setCurrentEventIndex(index)
        onEventSelect(sortedEvents[index])
        setIsAnimating(false)
      }
    })
  }

  const handlePrevEvent = () => {
    if (isAnimating || currentEventIndex === 0) return
    animateToEvent(currentEventIndex - 1)
  }

  const handleNextEvent = () => {
    if (isAnimating || currentEventIndex >= sortedEvents.length - 1) return
    animateToEvent(currentEventIndex + 1)
  }

  useEffect(() => {
    if (activeEvent) {
      const eventIndex = sortedEvents.findIndex(e => e.id === activeEvent.id)
      if (eventIndex !== -1 && eventIndex !== currentEventIndex) {
        animateToEvent(eventIndex)
      }
    }
  }, [activeEvent])

  return (
    <div className="timeline-container" ref={containerRef}>
      <Canvas className="timeline-canvas">
        <PerspectiveCamera makeDefault position={[0, 0, 50]} fov={50} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <TimelineEvents
          events={sortedEvents}
          position={[timelinePosition, 0, 0]}
          onEventSelect={(e) => {
            const index = sortedEvents.findIndex(ev => ev.id === e.id)
            animateToEvent(index)
          }}
          activeEvent={activeEvent}
        />
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>

      <button
        className={`nav-button prev ${currentEventIndex === 0 ? 'disabled' : ''}`}
        onClick={handlePrevEvent}
        disabled={currentEventIndex === 0 || isAnimating}
      >
        ←
      </button>

      <button
        className={`nav-button next ${currentEventIndex === sortedEvents.length - 1 ? 'disabled' : ''}`}
        onClick={handleNextEvent}
        disabled={currentEventIndex === sortedEvents.length - 1 || isAnimating}
      >
        →
      </button>

      <TimelineControls
        events={sortedEvents}
        onEventSelect={(event) => {
          const eventIndex = sortedEvents.findIndex(e => e.id === event.id)
          animateToEvent(eventIndex)
        }}
        activeEvent={activeEvent}
        showDecadeMarkers={false}
      />
    </div>
  )
}

export default Timeline
