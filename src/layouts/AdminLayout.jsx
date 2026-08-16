import { Outlet, NavLink, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import {
  LayoutDashboard, Music2, HandHelping, BookOpen, Mail, DollarSign,
  LogOut, Clock, MessageCircleQuestionMark, Users, Tv,
} from 'lucide-react'

// Éléments de navigation de la sidebar admin.
// end: true sur Dashboard évite que la route "/" active aussi les sous-routes "/admin/xxx".
const navItems = [
  { to: '/admin', Icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/admin/podcasts', Icon: Music2, label: 'Podcasts' },
  { to: '/admin/prayer-requests', Icon: MessageCircleQuestionMark, label: 'Demandes' },
  { to: '/admin/prayer-topics', Icon: HandHelping, label: 'Sujets prière' },
  { to: '/admin/books', Icon: BookOpen, label: 'Livres' },
  { to: '/admin/newsletter', Icon: Mail, label: 'Newsletter' },
  { to: '/admin/donations', Icon: DollarSign, label: 'Dons' },
  { to: '/admin/team', Icon: Users, label: 'Équipe' },
  { to: '/admin/medias', Icon: Tv, label: 'H-Médias' },
]

/**
 * Layout de l'espace d'administration.
 * Redirige vers /login si l'utilisateur n'est pas connecté ou n'a pas le rôle ADMIN.
 * La sidebar est fixe (position fixed) ; le contenu principal est décalé de 240px (ml-60).
 */
export const AdminLayout = () => {
  const { user, logout } = useAuth()

  // Garde de route : redirige les visiteurs non autorisés sans afficher le layout.
  if (!user || user.role !== 'ADMIN') return <Navigate to="/login" replace />

  return (
    <div className="min-h-screen bg-gray-950 text-white flex">
      {/* Sidebar fixe */}
      <aside className="w-60 bg-black/60 border-r border-white/10 flex flex-col fixed h-full">
        <div className="px-5 py-5 border-b border-white/10 flex items-center gap-2 text-yellow-400 font-bold">
          <Clock size={18} />
          Admin HP
        </div>
        <nav className="flex-1 p-3 flex flex-col gap-1">
          {navItems.map(({ to, Icon, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  isActive
                    ? 'bg-yellow-500/10 text-yellow-400'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`
              }
            >
              <Icon size={16} />
              {label}
            </NavLink>
          ))}
        </nav>
        {/* Bouton de déconnexion en bas de la sidebar */}
        <div className="p-3 border-t border-white/10">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/60 hover:text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut size={16} />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Zone de contenu principale — ml-60 aligne avec la largeur de la sidebar */}
      <main className="flex-1 ml-60 p-8">
        <Outlet />
      </main>
    </div>
  )
}
