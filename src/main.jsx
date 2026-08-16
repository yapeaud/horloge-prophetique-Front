import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Point d'entrée de l'application React.
// StrictMode active des vérifications supplémentaires en développement
// (double-rendu des composants, détection d'effets non nettoyés).
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
