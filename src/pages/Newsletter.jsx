import { NewsletterForm } from '../components/NewsletterForm.jsx'
import { Mail } from 'lucide-react'

// Page dédiée à l'abonnement newsletter — encapsule simplement le composant NewsletterForm.
export default function Newsletter() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <Mail size={48} className="text-yellow-400 mx-auto mb-4" />
        <div className="text-yellow-400 text-sm font-semibold uppercase tracking-widest mb-3">Abonnement</div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Newsletter</h1>
        <p className="text-white/50 max-w-lg mx-auto">
          Abonnez-vous à notre newsletter pour recevoir nos sujets de prière, enseignements et actualités du ministère.
        </p>
      </div>
      <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
        <NewsletterForm />
      </div>
    </div>
  )
}
