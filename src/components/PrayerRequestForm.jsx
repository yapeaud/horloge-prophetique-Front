import { useState } from 'react'
import { Input, Textarea } from './ui/Input.jsx'
import { Button } from './ui/Button.jsx'
import { submitPrayerRequest } from '../services/prayerRequest.service.js'
import { CheckCircle } from 'lucide-react'

/**
 * Formulaire de soumission de demande de prière.
 * Après envoi réussi, affiche un message de confirmation à la place du formulaire.
 * Le bouton "Nouvelle demande" réinitialise l'affichage.
 */
export const PrayerRequestForm = () => {
  const [form, setForm] = useState({ nom: '', email: '', sujet: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)

  // Mise à jour générique du state formulaire par nom de champ.
  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await submitPrayerRequest(form)
      setSuccess(true)
      setForm({ nom: '', email: '', sujet: '' }) // Réinitialise pour une éventuelle nouvelle demande
    } catch (err) {
      setError(err.response?.data?.message || 'Une erreur est survenue')
    } finally {
      setLoading(false)
    }
  }

  // Écran de confirmation — remplace le formulaire après succès.
  if (success) {
    return (
      <div className="flex flex-col items-center gap-3 py-8 text-center">
        <CheckCircle size={40} className="text-green-400" />
        <p className="text-white font-semibold">Votre demande a été reçue.</p>
        <p className="text-white/50 text-sm">Nous prions avec vous.</p>
        <Button variant="ghost" onClick={() => setSuccess(false)}>Nouvelle demande</Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        label="Nom"
        name="nom"
        placeholder="Votre nom"
        value={form.nom}
        onChange={handleChange}
        required
      />
      <Input
        label="Email"
        name="email"
        type="email"
        placeholder="votre@email.com"
        value={form.email}
        onChange={handleChange}
        required
      />
      <Textarea
        label="Sujet de prière"
        name="sujet"
        placeholder="Partagez votre sujet de prière..."
        value={form.sujet}
        onChange={handleChange}
        rows={4}
        required
      />
      {error && <p className="text-red-400 text-sm">{error}</p>}
      <Button type="submit" disabled={loading}>
        {loading ? 'Envoi...' : 'Soumettre ma demande'}
      </Button>
    </form>
  )
}
