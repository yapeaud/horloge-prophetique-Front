import { useRoutes } from 'react-router-dom'
import { publicRoutes } from './public.routes.jsx'
import { adminRoutes } from './admin.routes.jsx'

// Fusion des deux configs en un seul tableau.
// Pour ajouter un nouveau groupe de routes, importer et l'ajouter ici.
const routes = [...publicRoutes, ...adminRoutes]

/**
 * Composant racine des routes.
 * useRoutes() est l'équivalent hook de <Routes> + <Route> — il accepte
 * un tableau de config d'objets ce qui permet de les découper par fichier.
 */
export const AppRoutes = () => useRoutes(routes)
