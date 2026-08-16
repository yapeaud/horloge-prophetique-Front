import { Link } from 'react-router-dom'
import { Users, BookOpen, ArrowRight, Star, Tv } from 'lucide-react'

const sections = [
  {
    to: '/h-realisations/projets',
    Icon: BookOpen,
    titre: 'Projets',
    desc: 'Les initiatives spirituelles et médiatiques du ministère.',
    cta: 'Voir les projets',
  },
  {
    to: '/h-realisations/equipe',
    Icon: Users,
    titre: 'Équipe',
    desc: "L'équipe passionnée qui sert derrière Horloge Prophétique.",
    cta: "Rencontrer l'équipe",
  },
  {
    to: '/h-realisations/temoignages',
    Icon: Star,
    titre: 'Témoignages',
    desc: 'Ce que la communauté dit de son expérience avec le ministère.',
    cta: 'Lire les témoignages',
  },
  {
    to: '/h-realisations/h-medias',
    Icon: Tv,
    titre: 'H-Médias',
    desc: 'Notre bras médiatique : YouTube, radio, podcasts et diffusions en direct.',
    cta: 'Découvrir H-Médias',
  },
]

// Page hub H-Réalisations — point d'entrée vers les 4 sous-sections.
export default function HRealisations() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <div className="text-yellow-400 text-sm font-semibold uppercase tracking-widest mb-3">Ministère</div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">H-Réalisations</h1>
        <p className="text-white/50 max-w-xl mx-auto">
          Découvrez notre équipe, nos projets, les témoignages de notre communauté et notre espace médias.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {sections.map(({ to, Icon, titre, desc, cta }) => (
          <Link
            key={to}
            to={to}
            className="group bg-white/5 border border-white/10 hover:border-yellow-500/30 rounded-2xl p-8 transition-all flex flex-col"
          >
            <Icon size={32} className="text-yellow-400 mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">{titre}</h2>
            <p className="text-white/50 text-sm mb-4 flex-1">{desc}</p>
            <div className="flex items-center gap-1 text-yellow-400 text-sm group-hover:gap-2 transition-all">
              {cta} <ArrowRight size={14} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
