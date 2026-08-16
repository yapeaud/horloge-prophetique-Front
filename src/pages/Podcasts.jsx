import { Headphones } from 'lucide-react'
import { PodcastCard } from '../components/PodcastCard.jsx'
import { Spinner } from '../components/ui/Spinner.jsx'
import { usePodcasts } from '../hooks/usePodcasts.js'

// Liens vers les plateformes d'écoute (à remplacer par les vraies URLs).
const platforms = [
  { name: 'Spotify', url: '#', color: 'text-green-400' },
  { name: 'Apple Podcasts', url: '#', color: 'text-purple-400' },
  { name: 'Amazon Music', url: '#', color: 'text-blue-400' },
]

// Page listant tous les podcasts avec liens vers les plateformes en haut.
export default function Podcasts() {
  const { podcasts, loading, error } = usePodcasts()

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <div className="text-yellow-400 text-sm font-semibold uppercase tracking-widest mb-3">Audio</div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Podcasts</h1>
        <p className="text-white/50 max-w-xl mx-auto">
          Écoutez nos enseignements spirituels sur votre plateforme favorite.
        </p>
        <div className="flex justify-center gap-6 mt-6">
          {platforms.map((p) => (
            <a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noreferrer"
              className={`flex items-center gap-2 text-sm ${p.color} hover:opacity-80 transition-opacity`}
            >
              <Headphones size={16} /> {p.name}
            </a>
          ))}
        </div>
      </div>

      {loading && <div className="flex justify-center py-20"><Spinner /></div>}
      {error && <p className="text-center text-red-400 py-12">Erreur de chargement des podcasts.</p>}

      {!loading && !error && (
        podcasts.length > 0
          ? <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {podcasts.map((p) => <PodcastCard key={p.id} podcast={p} />)}
            </div>
          : <p className="text-center text-white/40 py-20">Aucun podcast disponible pour le moment.</p>
      )}
    </div>
  )
}
