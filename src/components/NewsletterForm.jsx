import { useState } from 'react'
import { Input } from './ui/Input.jsx'
import { Button } from './ui/Button.jsx'
import { subscribeNewsletter } from '../services/newsletter.service.js'
import { CheckCircle } from 'lucide-react'

/**
 * Formulaire d'abonnement à la newsletter.
 * Une fois abonné, le formulaire est remplacé par un message de confirmation
 * (sans bouton de retour — un email ne peut être soumis qu'une fois).
 */
export const NewsletterForm = () => {
  const [form, setForm] = useState({ prenom: '', email: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await subscribeNewsletter(form)
      setSuccess(true)
    } catch (err) {
      // Le serveur retourne 409 si l'email est déjà abonné (contrainte UNIQUE).
      setError(err.response?.data?.message || 'Une erreur est survenue')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="flex items-center gap-3 text-green-400">
        <CheckCircle size={20} />
        <span className="text-sm">Merci ! Vous êtes abonné(e).</span>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <Input
        name="prenom"
        placeholder="Prénom"
        value={form.prenom}
        onChange={handleChange}
        required
        className="flex-1"
      />
      <Input
        name="email"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
        className="flex-1"
      />
      <Button type="submit" disabled={loading}>
        {loading ? '...' : "S'abonner"}
      </Button>
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </form>
  )
}
