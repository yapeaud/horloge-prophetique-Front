import { useState } from 'react'
import { Heart, CheckCircle } from 'lucide-react'
import { Input } from '../components/ui/Input.jsx'
import { Button } from '../components/ui/Button.jsx'
import { createDonation } from '../services/donation.service.js'

// Montants suggérés (raccourcis de saisie).
const amounts = [5, 10, 25, 50, 100]
const methods = ['STRIPE', 'PAYPAL', 'MOBILE_MONEY']
const methodLabels = { STRIPE: 'Carte bancaire', PAYPAL: 'PayPal', MOBILE_MONEY: 'Mobile Money' }

/**
 * Page de don — permet de choisir un montant (prédéfini ou libre),
 * un moyen de paiement et de saisir un email.
 * Le paiement réel est géré côté passerelle ; ici on enregistre uniquement la trace.
 */
export default function Donation() {
  const [form, setForm] = useState({ montant: '', moyenPaiement: 'STRIPE', donorEmail: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      // montant est une chaîne dans le state — on le convertit en Float avant l'envoi.
      await createDonation({ ...form, montant: parseFloat(form.montant) })
      setSuccess(true)
    } catch (err) {
      setError(err.response?.data?.message || 'Une erreur est survenue')
    } finally {
      setLoading(false)
    }
  }

  // Écran de confirmation — remplace le formulaire.
  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <CheckCircle size={48} className="text-green-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Merci pour votre don !</h2>
          <p className="text-white/50">Que Dieu bénisse votre générosité.</p>
          <Button onClick={() => setSuccess(false)} className="mt-6">Faire un autre don</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <div className="text-yellow-400 text-sm font-semibold uppercase tracking-widest mb-3">Soutien</div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Faire un don</h1>
        <p className="text-white/50 max-w-lg mx-auto">
          Contribuez à l’avancement de l’œuvre en y investissant dès aujourd’hui !
        </p>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Boutons de montant rapide — sélectionne le montant dans le state */}
          <div>
            <label className="text-sm text-white/70 mb-3 block">Montant suggéré</label>
            <div className="flex flex-wrap gap-2">
              {amounts.map((a) => (
                <button
                  key={a}
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, montant: String(a) }))}
                  className={`px-4 py-2 rounded-lg text-sm border transition-all ${
                    form.montant === String(a)
                      ? 'bg-yellow-500 border-yellow-500 text-black font-semibold'
                      : 'bg-white/5 border-white/10 text-white/70 hover:border-yellow-500/40'
                  }`}
                >
                  {a}€
                </button>
              ))}
            </div>
          </div>

          {/* Champ libre pour un montant personnalisé */}
          <Input
            label="Montant personnalisé (€)"
            type="number"
            min="1"
            step="0.01"
            placeholder="Ex: 20"
            value={form.montant}
            onChange={(e) => setForm((f) => ({ ...f, montant: e.target.value }))}
            required
          />

          {/* Sélection du moyen de paiement via boutons radio stylisés */}
          <div>
            <label className="text-sm text-white/70 mb-3 block">Moyen de paiement</label>
            <div className="flex flex-col gap-2">
              {methods.map((m) => (
                <label
                  key={m}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg border cursor-pointer transition-all ${
                    form.moyenPaiement === m
                      ? 'border-yellow-500/50 bg-yellow-500/5'
                      : 'border-white/10 bg-white/5 hover:border-white/20'
                  }`}
                >
                  <input
                    type="radio"
                    name="moyenPaiement"
                    value={m}
                    checked={form.moyenPaiement === m}
                    onChange={(e) => setForm((f) => ({ ...f, moyenPaiement: e.target.value }))}
                    className="accent-yellow-500"
                  />
                  <span className="text-white text-sm">{methodLabels[m]}</span>
                </label>
              ))}
            </div>
          </div>

          <Input
            label="Email"
            type="email"
            placeholder="votre@email.com"
            value={form.donorEmail}
            onChange={(e) => setForm((f) => ({ ...f, donorEmail: e.target.value }))}
            required
          />

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <Button type="submit" disabled={loading} className="w-full">
            <Heart size={16} />
            {loading ? 'Traitement...' : 'Confirmer le don'}
          </Button>
        </form>
      </div>
    </div>
  )
}
