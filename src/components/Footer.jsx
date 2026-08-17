import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Clock, Share2, Camera, Play, Send, Phone, Mail, MapPin } from 'lucide-react'
import { subscribeNewsletter } from '../services/newsletter.service.js'

export const Footer = () => {
  const [prenom, setPrenom] = useState('')
  const [email, setEmail]   = useState('')
  const [status, setStatus] = useState(null) // 'ok' | 'error' | null

  const handleSubscribe = async (e) => {
    e.preventDefault()
    try {
      await subscribeNewsletter({ prenom, email })
      setStatus('ok')
      setPrenom('')
      setEmail('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <footer className="bg-black border-t border-white/10 py-14 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Colonne 1 : identité */}
        <div>
          <div className="flex items-center gap-2 text-yellow-400 font-bold text-lg mb-3">
            <Clock size={20} />
            Horloge Prophétique
          </div>
          <p className="text-white/40 text-sm leading-relaxed">
            Un ministère chrétien dédié à la prière, l'intercession et la diffusion spirituelle pour les nations.
          </p>
        </div>

        {/* Colonne 2 : contacts */}
        <div>
          <h4 className="text-white font-semibold mb-4">Contacts</h4>
          <ul className="flex flex-col gap-3 text-sm text-white/50">
            <li className="flex items-center gap-2">
              <Phone size={14} className="text-yellow-400 flex-shrink-0" />
              <a href="tel:+12265825918" className="hover:text-yellow-400 transition-colors">+1(226) 582-5918</a>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={14} className="text-yellow-400 flex-shrink-0" />
              <a href="mailto:horlogeprophetique@gmail.com" className="hover:text-yellow-400 transition-colors">
                horlogeprophetique@gmail.com
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin size={14} className="text-yellow-400 flex-shrink-0 mt-0.5" />
              <a href="https://www.google.com/maps/place/Montr%C3%A9al,+QC+H2Y+2A8,+Canada" target="_blank" rel="noreferrer" className="hover:text-yellow-400 transition-colors">
                Montréal, Canada
              </a>
            </li>
          </ul>
        </div>

        {/* Colonne 3 : navigation + réseaux */}
        <div>
          <h4 className="text-white font-semibold mb-4">Navigation</h4>
          <ul className="space-y-2 text-sm text-white/50 mb-6">
            {[['/', 'Accueil'], ['/a-propos', 'À propos'], ['/h-inter', 'H-Inter'],
              ['/horlolivre', 'Horlolivre'], ['/donation', 'Donner'], ['/contact', 'Contact']].map(([to, label]) => (
              <li key={to}>
                <Link to={to} className="hover:text-yellow-400 transition-colors">{label}</Link>
              </li>
            ))}
          </ul>
          <h4 className="text-white font-semibold mb-3">Réseaux sociaux</h4>
          <div className="flex gap-3">
            {[
              { href: '#', Icon: Share2, title: 'Facebook' },
              { href: '#', Icon: Camera, title: 'Instagram' },
              { href: '#', Icon: Play, title: 'YouTube' },
              { href: '#', Icon: Send, title: 'Telegram' },
            ].map(({ href, Icon, title }) => (
              <a
                key={title}
                href={href}
                title={title}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-yellow-500/20 hover:text-yellow-400 flex items-center justify-center text-white/60 transition-all"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        {/* Colonne 4 : newsletter */}
        <div>
          <h4 className="text-white font-semibold mb-2">Newsletter</h4>
          <p className="text-white/40 text-xs mb-4 leading-relaxed">
            Recevez les dévotions quotidiennes, les sujets de prière et les actualités du ministère.
          </p>
          {status === 'ok' ? (
            <p className="text-green-400 text-sm">Vous êtes inscrit(e) !</p>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
              <input
                type="text"
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
                placeholder="Votre prénom"
                required
                className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder-white/30 focus:outline-none focus:border-yellow-500/50"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Votre email"
                required
                className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder-white/30 focus:outline-none focus:border-yellow-500/50"
              />
              <button
                type="submit"
                className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-2 rounded-lg text-sm transition-colors"
              >
                S'abonner
              </button>
              {status === 'error' && (
                <p className="text-red-400 text-xs">Une erreur s'est produite. Réessayez.</p>
              )}
            </form>
          )}
        </div>

      </div>

      {/* Ligne copyright */}
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/10 text-center text-white/20 text-xs">
        © {new Date().getFullYear()} Horloge Prophétique. Tous droits réservés.
      </div>
    </footer>
  )
}
