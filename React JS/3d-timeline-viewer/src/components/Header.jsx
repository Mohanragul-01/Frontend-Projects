import { useState, useEffect } from 'react'
import '../styles/Header.css'

function Header({ activeEvent }) {
  const [scrolled, setScrolled] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [scrolled])
  
  return (
    <header className={`app-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-content">
        <h1 className="app-title">3D Interactive Timeline</h1>
        
        <div className="event-info">
          {activeEvent ? (
            <>
              <span className="event-year">{activeEvent.year}</span>
              <h2 className="event-title">{activeEvent.title}</h2>
            </>
          ) : (
            <span className="instructions">Scroll or drag to explore the timeline</span>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header