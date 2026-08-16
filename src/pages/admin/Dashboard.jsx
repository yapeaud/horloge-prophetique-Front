import { useState, useEffect } from 'react'
import { Music2, HandHelping, BookOpen, Mail, DollarSign, MessageCircleQuestionMark, Users, Tv } from 'lucide-react'
import { getStats } from '../../services/admin.service.js'
import { Spinner } from '../../components/ui/Spinner.jsx'

// Configuration des cartes de statistiques : clé API → icône + libellé + couleur.
// Ajouter une nouvelle entité ici suffit pour l'afficher sur le Dashboard.
const statCards = [
  { key: 'podcasts', label: 'Podcasts', Icon: Music2, color: 'text-green-400' },
  { key: 'prayerRequests', label: 'Demandes de prière', Icon: MessageCircleQuestionMark, color: 'text-red-400' },
  { key: 'prayerTopics', label: 'Sujets de prière', Icon: HandHelping, color: 'text-yellow-400' },
  { key: 'subscribers', label: 'Abonnés newsletter', Icon: Mail, color: 'text-blue-400' },
  { key: 'books', label: 'Livres', Icon: BookOpen, color: 'text-purple-400' },
  { key: 'donations', label: 'Dons', Icon: DollarSign, color: 'text-emerald-400' },
  { key: 'teamMembers', label: 'Membres équipe', Icon: Users, color: 'text-pink-400' },
  { key: 'medias', label: 'H-Médias', Icon: Tv, color: 'text-orange-400' },
]

export default function Dashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  // Chargement des statistiques au montage du composant.
  useEffect(() => {
    getStats()
      .then(setStats)
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-8">Dashboard</h1>

      {loading && <div className="flex justify-center py-20"><Spinner /></div>}

      {stats && (
        // Grille responsive : 2 colonnes sur mobile, 3 sur grand écran.
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
          {statCards.map(({ key, label, Icon, color }) => (
            <div key={key} className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-white/50 text-sm">{label}</span>
                <Icon size={20} className={color} />
              </div>
              {/* ?? 0 affiche 0 si la clé est absente (future entité non encore comptée) */}
              <div className="text-3xl font-bold text-white">{stats[key] ?? 0}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
