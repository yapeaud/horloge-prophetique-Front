import { PrayerTopicCard } from '../../components/PrayerTopicCard.jsx'
import { Spinner } from '../../components/ui/Spinner.jsx'
import { usePrayerTopics } from '../../hooks/usePrayerTopics.js'

// Page des sujets de prière mensuels — filtre fixé à 'MENSUEL'.
export default function PrayerTopics() {
  const { topics, loading, error } = usePrayerTopics('MENSUEL')

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <div className="text-yellow-400 text-sm font-semibold uppercase tracking-widest mb-3">Mensuel</div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Sujets de prière</h1>
        <p className="text-white/50 max-w-xl mx-auto">Intercédez avec nous pour ces sujets du mois.</p>
      </div>

      {loading && <div className="flex justify-center py-20"><Spinner /></div>}
      {error && <p className="text-center text-red-400 py-12">Erreur de chargement.</p>}

      {!loading && !error && (
        topics.length > 0
          ? <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {topics.map((t) => <PrayerTopicCard key={t.id} topic={t} />)}
            </div>
          : <p className="text-center text-white/40 py-20">Aucun sujet disponible pour le moment.</p>
      )}
    </div>
  )
}
