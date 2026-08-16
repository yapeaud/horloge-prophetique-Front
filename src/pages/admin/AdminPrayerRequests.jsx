import { useState, useEffect } from 'react'
import { Trash2, Heart } from 'lucide-react'
import { getPrayerRequests, updatePrayerRequestStatus, deletePrayerRequest } from '../../services/prayerRequest.service.js'
import { Button } from '../../components/ui/Button.jsx'
import { Badge } from '../../components/ui/Badge.jsx'
import { Spinner } from '../../components/ui/Spinner.jsx'

const statusColors = { EN_ATTENTE: 'gold', TRAITE: 'green', ARCHIVE: 'blue' }
const STATUSES = ['EN_ATTENTE', 'TRAITE', 'ARCHIVE']

/**
 * Page admin de gestion des demandes de prière.
 * Affiche chaque demande avec son statut actuel et des boutons de transition
 * vers les autres statuts possibles (filtrés pour exclure le statut courant).
 */
export default function AdminPrayerRequests() {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)

  const load = () => getPrayerRequests().then(setRequests).finally(() => setLoading(false))
  useEffect(() => { load() }, [])

  // Met à jour le statut puis recharge pour refléter le changement.
  const handleStatus = async (id, statut) => {
    await updatePrayerRequestStatus(id, statut)
    load()
  }

  const handleDelete = async (id) => {
    if (!confirm('Supprimer cette demande ?')) return
    await deletePrayerRequest(id)
    load()
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-8">Demandes de prière</h1>

      {loading ? (
        <div className="flex justify-center py-20"><Spinner /></div>
      ) : (
        <div className="flex flex-col gap-3">
          {requests.length === 0
            ? <p className="text-center text-white/40 py-12">Aucune demande.</p>
            : requests.map((r) => (
              <div key={r.prayerRequestId} className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <Heart size={16} className="text-yellow-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-white font-medium">{r.nom}</div>
                      <div className="text-white/40 text-xs">{r.email}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge color={statusColors[r.statut]}>{r.statut.replace('_', ' ')}</Badge>
                    <Button variant="danger" onClick={() => handleDelete(r.prayerRequestId)}><Trash2 size={14} /></Button>
                  </div>
                </div>
                <p className="text-white/60 text-sm mb-3">{r.sujet}</p>
                {/* Boutons de transition : seuls les statuts différents du courant sont affichés */}
                <div className="flex gap-2">
                  {STATUSES.filter((s) => s !== r.statut).map((s) => (
                    <button
                      key={s}
                      onClick={() => handleStatus(r.prayerRequestId, s)}
                      className="text-xs text-white/40 hover:text-yellow-400 transition-colors"
                    >
                      → {s.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>
            ))
          }
        </div>
      )}
    </div>
  )
}
