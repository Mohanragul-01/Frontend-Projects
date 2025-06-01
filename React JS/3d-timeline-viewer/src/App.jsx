import { useState, useEffect } from 'react'
import Timeline from './components/Timeline'
import Header from './components/Header'
import LoadingScreen from './components/LoadingScreen'
import InfoPanel from './components/InfoPanel'
import { timelineEvents } from './data/timelineData'
import './styles/App.css'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeEvent, setActiveEvent] = useState(null)
  const [showInfoPanel, setShowInfoPanel] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)
    
    return () => clearTimeout(timer)
  }, [])

  const handleEventSelect = (event) => {
    setActiveEvent(event)
    setShowInfoPanel(true)
  }

  const handleCloseInfoPanel = () => {
    setShowInfoPanel(false)
  }

  return (
    <div className="app">
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <Header activeEvent={activeEvent} />
          <Timeline 
            events={timelineEvents} 
            onEventSelect={handleEventSelect} 
            activeEvent={activeEvent}
          />
          {showInfoPanel && activeEvent && (
            <InfoPanel 
              event={activeEvent} 
              onClose={handleCloseInfoPanel} 
            />
          )}
        </>
      )}
    </div>
  )
}

export default App