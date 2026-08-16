// Indicateur de chargement circulaire animé.
// className permet d'ajuster la taille ou les marges selon le contexte.
export const Spinner = ({ className = '' }) => (
  <div
    className={`inline-block w-6 h-6 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin ${className}`}
  />
)
