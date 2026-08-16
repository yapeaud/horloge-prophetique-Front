// Palette de couleurs disponibles pour les badges (statuts, types, plateformes…).
const colors = {
  gold: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  blue: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  green: 'bg-green-500/20 text-green-300 border-green-500/30',
  red: 'bg-red-500/20 text-red-300 border-red-500/30',
  purple: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
}

// Pastille de label colorée. Utilisée pour afficher les statuts, types ou plateformes.
export const Badge = ({ children, color = 'gold', className = '' }) => (
  <span
    className={`inline-block text-xs px-2.5 py-1 rounded-full border font-medium ${colors[color]} ${className}`}
  >
    {children}
  </span>
)
