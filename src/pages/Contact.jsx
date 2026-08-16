import { Mail, Phone, MapPin } from 'lucide-react'
import { Input, Textarea } from '../components/ui/Input.jsx'
import { Button } from '../components/ui/Button.jsx'

/**
 * Page de contact — formulaire statique (pas encore branché à une API).
 * L'envoi réel (email, webhook…) pourra être ajouté dans handleSubmit ultérieurement.
 */
export default function Contact() {
  // Placeholder : à relier à un service d'envoi d'email (ex: Nodemailer, Resend).
  const handleSubmit = (e) => {
    e.preventDefault()
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
        <div>
          <div className="flex flex-col gap-6">
            {[
              { Icon: Mail, label: 'Email', value: 'contact@horlogeprophetique.com' },
              { Icon: Phone, label: 'Téléphone', value: '+33 1 00 00 00 00' },
              { Icon: MapPin, label: 'Adresse', value: 'France' },
            ].map(({ Icon, label, value }) => (
              <div key={label} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center flex-shrink-0">
                  <Icon size={18} className="text-yellow-400" />
                </div>
                <div>
                  <div className="text-white/40 text-xs uppercase tracking-widest mb-1">{label}</div>
                  <div className="text-white text-sm">{value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Formulaire de message */}
        <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-4">
          <Input label="Nom" placeholder="Votre nom" required />
          <Input label="Email" type="email" placeholder="votre@email.com" required />
          <Input label="Sujet" placeholder="Sujet de votre message" required />
          <Textarea label="Message" placeholder="Votre message..." rows={5} required />
          <Button type="submit" className="w-full">Envoyer le message</Button>
        </form>
      </div>
    </div>
  )
}
