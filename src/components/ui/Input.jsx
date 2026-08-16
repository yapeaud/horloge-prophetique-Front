// Champ de saisie avec label optionnel et message d'erreur inline.
// Toutes les props natives <input> (name, type, value, onChange…) sont transmises via spread.
export const Input = ({ label, error, className = '', ...props }) => (
  <div className="flex flex-col gap-1">
    {label && <label className="text-sm text-white/70">{label}</label>}
    <input
      className={`bg-white/5 border border-white/10 focus:border-yellow-500 focus:outline-none rounded-lg px-4 py-2.5 text-white placeholder-white/30 transition-colors ${className}`}
      {...props}
    />
    {error && <span className="text-red-400 text-xs">{error}</span>}
  </div>
)

// Zone de texte multilignes — même contrat que Input (label, error, className, ...props).
export const Textarea = ({ label, error, className = '', ...props }) => (
  <div className="flex flex-col gap-1">
    {label && <label className="text-sm text-white/70">{label}</label>}
    <textarea
      className={`bg-white/5 border border-white/10 focus:border-yellow-500 focus:outline-none rounded-lg px-4 py-2.5 text-white placeholder-white/30 transition-colors resize-none ${className}`}
      {...props}
    />
    {error && <span className="text-red-400 text-xs">{error}</span>}
  </div>
)
