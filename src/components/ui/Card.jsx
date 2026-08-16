// Conteneur de carte avec fond semi-transparent et effet de flou (glassmorphism).
// Toutes les props natives <div> (onClick, style…) sont transmises via spread.
export const Card = ({ children, className = '', ...props }) => (
  <div
    className={`bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm ${className}`}
    {...props}
  >
    {children}
  </div>
)
