import { X } from 'lucide-react'
import { useEffect } from 'react'

/**
 * Modale accessible avec fermeture par touche Escape, clic sur l'overlay
 * ou bouton X. Le contenu est isolé avec stopPropagation pour éviter
 * que le clic sur le panneau ne remonte à l'overlay.
 */
export const Modal = ({ isOpen, onClose, title, children }) => {
  // Fermeture au clavier : Escape. L'écouteur est retiré si la modale se ferme
  // ou si le composant est démonté (retour de useEffect).
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    if (isOpen) document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      {/* stopPropagation empêche le clic dans le panneau de déclencher onClose */}
      <div
        className="bg-gray-900 border border-white/10 rounded-2xl w-full max-w-lg p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
