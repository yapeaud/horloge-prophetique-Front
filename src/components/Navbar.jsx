import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, Clock } from 'lucide-react'

// Liens de navigation principale — même pattern pour tous les nœuds.
// Les sous-pages (projets, équipe, etc.) sont accessibles depuis leur hub respectif.
const links = [
  { to: '/', label: 'Accueil' },
  { to: '/a-propos', label: 'À propos' },
  { to: '/podcasts', label: 'Podcasts' },
  { to: '/h-inter', label: 'H-Inter' },
  { to: '/horlolivre', label: 'Horlolivre' },
  { to: '/h-realisations', label: 'H-Réalisations' },
  { to: '/contact', label: 'Contact' },
  { to: '/donation', label: 'Donner' },
]

export const Navbar = () => {
  // Contrôle l'ouverture du menu mobile.
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-md border-b border-white/10">
      <nav className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg text-yellow-400">
          <Clock size={22} />
          Horloge Prophétique
        </Link>

        {/* Menu desktop : masqué sur mobile */}
        <ul className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <li key={l.to}>
              {/* NavLink colore automatiquement le lien actif */}
              <NavLink
                to={l.to}
                className={({ isActive }) =>
                  `text-sm transition-colors ${isActive ? 'text-yellow-400' : 'text-white/70 hover:text-white'}`
                }
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Bouton hamburger — visible sur mobile uniquement */}
        <button
          className="md:hidden text-white/70 hover:text-white"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Panneau mobile déroulant */}
      {open && (
        <div className="md:hidden bg-black/95 border-t border-white/10 px-4 py-4 flex flex-col gap-3">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)} // Ferme le menu au clic
              className={({ isActive }) =>
                `text-sm py-1 ${isActive ? 'text-yellow-400' : 'text-white/70'}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  )
}
