import { useState, useEffect } from 'react'
import { getDonations, updateDonationStatus } from '../../services/donation.service.js'
import { Badge } from '../../components/ui/Badge.jsx'
import { Spinner } from '../../components/ui/Spinner.jsx'

const statusColors = { EN_ATTENTE: 'gold', COMPLETE: 'green', ECHOUE: 'red' }
const STATUSES = ['EN_ATTENTE', 'COMPLETE', 'ECHOUE']
const methodLabels = { STRIPE: 'Carte', PAYPAL: 'PayPal', MOBILE_MONEY: 'Mobile' }

/**
 * Page admin de suivi des dons.
 * Calcule le total des dons confirmés (COMPLETE) pour l'afficher en en-tête.
 * L'admin peut changer le statut de chaque don via les boutons de transition.
 */
export default function AdminDonations() {
  const [donations, setDonations] = useState([])
  const [loading, setLoading] = useState(true)

  const load = () => getDonations().then(setDonations).finally(() => setLoading(false))
  useEffect(() => { load() }, [])

  const handleStatus = async (id, statut) => {
    await updateDonationStatus(id, statut)
    load()
  }

  // Total calculé côté client : somme des montants des dons COMPLETE uniquement.
  const total = donations.filter((d) => d.statut === 'COMPLETE').reduce((s, d) => s + d.montant, 0)

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-white">Dons</h1>
        <div className="bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-2 text-green-400 text-sm font-semibold">
          Total reçu : {total.toFixed(2)} €
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Spinner /></div>
      ) : (
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          {donations.length === 0
            ? <p className="text-center text-white/40 py-12">Aucun don.</p>
            : donations.map((d) => (
              <div key={d.donationId} className="flex items-center gap-4 px-5 py-4 border-b border-white/5 last:border-0">
                <div className="flex-1">
                  <div className="text-white font-semibold">{d.montant} €</div>
                  <div className="text-white/40 text-xs">{d.donorEmail} • {methodLabels[d.moyenPaiement]}</div>
                </div>
                <Badge color={statusColors[d.statut]}>{d.statut.replace('_', ' ')}</Badge>
                {/* Boutons de transition vers les autres statuts */}
                <div className="flex gap-2">
                  {STATUSES.filter((s) => s !== d.statut).map((s) => (
                    <button
                      key={s}
                      onClick={() => handleStatus(d.donationId, s)}
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
