import { Music2, ExternalLink } from 'lucide-react'
import { Card } from './ui/Card.jsx'
import { Badge } from './ui/Badge.jsx'

// Correspondance plateforme → couleur de badge.
const platformColors = { SPOTIFY: 'green', APPLE: 'purple', AMAZON: 'blue', INTERNE: 'gold' }

// Carte d'un podcast : affiche la miniature (ou une icône par défaut),
// la plateforme, le titre et un lien vers l'épisode.
export const PodcastCard = ({ podcast }) => (
  <Card className="p-5 flex flex-col gap-3 hover:border-yellow-500/30 transition-all group">
    <div className="flex items-start gap-3">
      <div className="w-14 h-14 rounded-xl bg-yellow-500/10 flex items-center justify-center flex-shrink-0 overflow-hidden">
        {/* Miniature si disponible, sinon icône de substitution */}
        {podcast.image
          ? <img src={podcast.image} alt={podcast.titre} className="w-full h-full object-cover rounded-xl" />
          : <Music2 size={24} className="text-yellow-400" />}
      </div>
      <div className="flex-1 min-w-0">
        <Badge color={platformColors[podcast.plateforme] || 'gold'} className="mb-1">
          {podcast.plateforme}
        </Badge>
        <h3 className="text-white font-semibold truncate">{podcast.titre}</h3>
      </div>
    </div>

    {podcast.description && (
      <p className="text-white/50 text-sm line-clamp-2">{podcast.description}</p>
    )}

    {/* Lien externe vers la plateforme d'écoute */}
    <a
      href={podcast.urlAudio}
      target="_blank"
      rel="noreferrer"
      className="flex items-center gap-1.5 text-yellow-400 text-sm hover:text-yellow-300 transition-colors mt-auto"
    >
      Écouter <ExternalLink size={14} />
    </a>
  </Card>
)
