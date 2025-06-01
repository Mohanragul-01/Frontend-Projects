import { useState, useEffect } from 'react'
import '../styles/TimelineControls.css'

function TimelineControls({ events, onEventSelect, activeEvent, showDecadeMarkers = false }) {
  const [categories, setCategories] = useState([])
  const [activeCategory, setActiveCategory] = useState('all')
  
  useEffect(() => {
    const uniqueCategories = [...new Set(events.map(event => event.category))]
    setCategories(uniqueCategories)
  }, [events])
  
  const handleCategoryFilter = (category) => {
    setActiveCategory(category)
  }
  
  const filteredEvents = activeCategory === 'all'
    ? events
    : events.filter(event => event.category === activeCategory)
  
  const calculateEventPosition = (event) => {
    const eventIndex = events.findIndex(e => e.id === event.id)
    return (eventIndex / (events.length - 1)) * 100
  }
  
  return (
    <div className="timeline-controls">
      <div className="timeline-categories">
        <button 
          className={`category-button ${activeCategory === 'all' ? 'active' : ''}`}
          onClick={() => handleCategoryFilter('all')}
        >
          All
        </button>
        {categories.map(category => (
          <button 
            key={category}
            className={`category-button ${activeCategory === category ? 'active' : ''} category-${category}`}
            onClick={() => handleCategoryFilter(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>
      
      <div className="timeline-navigation">
        <div className="event-markers">
          {filteredEvents.map(event => (
            <button
              key={event.id}
              className={`event-marker category-${event.category} ${activeEvent?.id === event.id ? 'active' : ''}`}
              onClick={() => onEventSelect(event)}
              style={{ left: `${calculateEventPosition(event)}%` }}
              aria-label={`${event.year}: ${event.title}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default TimelineControls
