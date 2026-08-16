import { Outlet } from 'react-router-dom'
import { Navbar } from '../components/Navbar.jsx'
import { Footer } from '../components/Footer.jsx'

/**
 * Layout des pages publiques.
 * Toutes les routes imbriquées sous ce layout héritent de la Navbar et du Footer.
 * <Outlet /> est remplacé par le composant de la route active (React Router v6).
 */
export const PublicLayout = () => (
  <div className="min-h-screen bg-gray-950 text-white flex flex-col">
    <Navbar />
    {/* pt-16 compense la Navbar fixed (hauteur 64px) pour éviter que le contenu passe dessous */}
    <main className="flex-1 pt-16">
      <Outlet />
    </main>
    <Footer />
  </div>
)
