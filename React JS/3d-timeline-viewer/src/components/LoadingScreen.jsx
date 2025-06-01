import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import '../styles/LoadingScreen.css'

function LoadingScreen() {
  const loadingRef = useRef(null)
  const progressRef = useRef(null)
  
  useEffect(() => {
    if (progressRef.current) {
      gsap.to(progressRef.current, {
        width: '100%',
        duration: 2,
        ease: 'power2.inOut'
      })
    }
    
    const timeline = gsap.timeline()
    
    // Animate loading elements
    timeline.to('.loading-dot', {
      y: -20,
      stagger: 0.1,
      duration: 0.4,
      repeat: 4,
      yoyo: true,
      ease: 'power2.inOut'
    })
  }, [])
  
  return (
    <div className="loading-screen" ref={loadingRef}>
      <div className="loading-content">
        <h1 className="loading-title">3D Interactive Timeline</h1>
        
        <div className="loading-animation">
          <div className="loading-dot"></div>
          <div className="loading-dot"></div>
          <div className="loading-dot"></div>
        </div>
        
        <div className="loading-progress-container">
          <div className="loading-progress" ref={progressRef}></div>
        </div>
        
        <p className="loading-text">Loading timeline data...</p>
      </div>
    </div>
  )
}

export default LoadingScreen