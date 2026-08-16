// Variantes de style du bouton. Ajouter une variante ici suffit pour l'utiliser partout.
const variants = {
  primary: 'bg-yellow-500 hover:bg-yellow-400 text-black font-semibold',
  secondary: 'bg-white/10 hover:bg-white/20 text-white border border-white/20',
  danger: 'bg-red-600 hover:bg-red-500 text-white',
  ghost: 'hover:bg-white/10 text-white',
}

// Bouton générique avec support de variantes, état désactivé et classes supplémentaires.
// Toutes les autres props (onClick, type, etc.) sont transmises au <button> natif.
export const Button = ({ children, variant = 'primary', className = '', disabled, ...props }) => (
  <button
    className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
    disabled={disabled}
    {...props}
  >
    {children}
  </button>
)
