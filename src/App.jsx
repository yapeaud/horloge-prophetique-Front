import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import { AppRoutes } from './routes/index.jsx'

/**
 * Racine de l'application.
 * App.jsx est volontairement minimal : il configure uniquement le routeur
 * et le fournisseur d'authentification. Toutes les routes sont dans src/routes/.
 */
export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}
