import { createContext, useContext, useState, useEffect } from 'react'

// Crea il context
const LayoutContext = createContext()

// Hook personalizzato per usare il context
export const useLayout = () => {
  const context = useContext(LayoutContext)
  if (!context) throw new Error('useLayout should be used within a LayoutProvider')
  return context
}

// Provider component
export const LayoutProvider = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false)
  const [theme, setTheme] = useState('dark')

  // Ascolto gli eventi di resize per definire se il layout è mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1056) // Considera mobile se la larghezza è inferiore a 768px
    }

    handleResize() // Imposta lo stato iniziale
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Valori del context
  const value = {
    headerHeight: 47,
    isMobile,
    theme,
    setTheme
  }

  return (
    <LayoutContext.Provider value={value}>
      {children}
    </LayoutContext.Provider>
  )
}

export default LayoutContext