import { useState } from 'react'
import { Mail, Phone, MapPin, CheckCircle } from 'lucide-react'
import { Input, Textarea } from '../components/ui/Input.jsx'
import { Button } from '../components/ui/Button.jsx'
import { sendContactMessage } from '../services/contact.service.js'

const coordonnees = [
  {
    Icon: Mail,
    label: 'Email',
    value: 'horlogeprophetique@gmail.com',
  },
  {
    Icon: Phone,
    label: 'Téléphones',
    value: ['+225 05 84 28 47 11', '+225 01 02 28 30 46', '+1(226) 582-5918'],
  },
  {
    Icon: MapPin,
    label: 'Adresse',
    value: 'France',
  },
]

const EMPTY = { nom: '', email: '', sujet: '', message: '' }

export default function Contact() {
  const [form, setForm]       = useState(EMPTY)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError]     = useState(null)

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await sendContactMessage(form)
      setSuccess(true)
      setForm(EMPTY)
    } catch (err) {
      setError(err.response?.data?.message || "Une erreur s'est produite. Réessayez.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <div className="text-yellow-400 text-sm font-semibold uppercase tracking-widest mb-3">Contact</div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Nous contacter</h1>
        <p className="text-white/50 max-w-xl mx-auto">
          Une question, une demande ? Nous sommes là pour vous.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Coordonnées */}
        <div className="flex flex-col gap-6">
          {coordonnees.map(({ Icon, label, value }) => (
            <div key={label} className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center flex-shrink-0">
                <Icon size={18} className="text-yellow-400" />
              </div>
              <div>
                <div className="text-white/40 text-xs uppercase tracking-widest mb-1">{label}</div>
                {Array.isArray(value) ? (
                  <div className="text-white text-sm space-y-1">
                    {value.map((v) => <div key={v}>{v}</div>)}
                  </div>
                ) : (
                  <div className="text-white text-sm">{value}</div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Formulaire */}
        {success ? (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center gap-4 text-center">
            <CheckCircle size={48} className="text-green-400" />
            <h3 className="text-white font-bold text-xl">Message envoyé !</h3>
            <p className="text-white/50 text-sm">
              Merci pour votre message. Notre équipe vous répondra dans les meilleurs délais.
            </p>
            <button
              onClick={() => setSuccess(false)}
              className="text-yellow-400 text-sm hover:text-yellow-300 transition-colors underline mt-2"
            >
              Envoyer un autre message
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-4"
          >
            <Input
              label="Nom"
              placeholder="Votre nom"
              value={form.nom}
              onChange={set('nom')}
              required
            />
            <Input
              label="Email"
              type="email"
              placeholder="votre@email.com"
              value={form.email}
              onChange={set('email')}
              required
            />
            <Input
              label="Sujet"
              placeholder="Sujet de votre message"
              value={form.sujet}
              onChange={set('sujet')}
              required
            />
            <Textarea
              label="Message"
              placeholder="Votre message..."
              rows={5}
              value={form.message}
              onChange={set('message')}
              required
            />

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Envoi en cours...' : 'Envoyer le message'}
            </Button>
          </form>
        )}
      </div>
    </div>
  )
}
