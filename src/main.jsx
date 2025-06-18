import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import '../node_modules/@carbon/styles/css/styles.css'
import './index.css'

import App from './App.jsx'
import { LayoutProvider } from './contexts/LayoutContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LayoutProvider>
      <App />
    </LayoutProvider>
  </StrictMode>,
)
