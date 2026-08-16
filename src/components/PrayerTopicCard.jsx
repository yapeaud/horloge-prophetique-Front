import { Heart } from 'lucide-react'
import { Card } from './ui/Card.jsx'
import { Badge } from './ui/Badge.jsx'

// Correspondances type → couleur de badge et libellé court.
const typeColors = { HEBDOMADAIRE: 'gold', MENSUEL: 'blue', CONTINENTAL: 'purple' }
const typeLabels = { HEBDOMADAIRE: 'Hebdo', MENSUEL: 'Mensuel', CONTINENTAL: 'Continental' }

// Carte d'un sujet de prière : image optionnelle, badge de type, titre et extrait du contenu.
export const PrayerTopicCard = ({ topic }) => (
  <Card className="p-5 flex flex-col gap-3 hover:border-yellow-500/30 transition-all">
    {topic.image && (
      <img
        src={topic.image}
        alt={topic.titre}
        className="w-full h-36 object-cover rounded-xl"
      />
    )}
    <Badge color={typeColors[topic.type] || 'gold'}>{typeLabels[topic.type] || topic.type}</Badge>
    <h3 className="text-white font-semibold">{topic.titre}</h3>
    {/* line-clamp-3 tronque le texte long pour uniformiser la hauteur des cartes */}
    <p className="text-white/50 text-sm line-clamp-3 flex-1">{topic.contenu}</p>
    <div className="flex items-center gap-1.5 text-yellow-400/70 text-xs">
      <Heart size={12} />
      <span>Prions ensemble</span>
    </div>
  </Card>
)
