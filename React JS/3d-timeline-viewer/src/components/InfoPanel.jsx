import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import '../styles/InfoPanel.css'

function InfoPanel({ event, onClose }) {
  const panelRef = useRef(null)
  
  useEffect(() => {
    if (panelRef.current) {
      // Animate panel in
      gsap.fromTo(
        panelRef.current,
        { 
          x: '100%',
          opacity: 0 
        },
        { 
          x: '0%',
          opacity: 1,
          duration: 0.5,
          ease: 'power3.out'
        }
      )
    }
    
    // Add event listener to close on escape key
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose()
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])
  
  const handleClose = () => {
    if (panelRef.current) {
      // Animate panel out
      gsap.to(panelRef.current, {
        x: '100%',
        opacity: 0,
        duration: 0.3,
        ease: 'power3.in',
        onComplete: onClose
      })
    } else {
      onClose()
    }
  }
  
  const getCategoryClass = () => {
    return `category-${event.category}`
  }
  
  return (
    <div className="info-panel-overlay" onClick={handleClose}>
      <div 
        className={`info-panel ${getCategoryClass()}`} 
        ref={panelRef}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-button" onClick={handleClose}>×</button>
        
        <div className="event-header">
          <div className="event-meta">
            <span className="event-year">{event.year}</span>
            <span className={`event-category ${getCategoryClass()}`}>
              {event.category}
            </span>
          </div>
          <h2 className="event-title">{event.title}</h2>
        </div>
        
        {event.image && (
          <div className="event-image-container">
            <img 
              src={event.image} 
              alt={event.title} 
              className="event-image" 
            />
          </div>
        )}
        
        <div className="event-content">
          <p className="event-description">{event.description}</p>
          
          {event.details && (
            <div className="event-details">
              {event.details.map((detail, index) => (
                <div key={index} className="detail-item">
                  <h3 className="detail-title">{detail.title}</h3>
                  <p className="detail-text">{detail.text}</p>
                </div>
              ))}
            </div>
          )}
          
          {event.links && event.links.length > 0 && (
            <div className="event-links">
              <h3>Learn More</h3>
              <ul className="links-list">
                {event.links.map((link, index) => (
                  <li key={index}>
                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default InfoPanel