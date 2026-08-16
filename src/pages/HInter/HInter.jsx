import { Link } from 'react-router-dom'
import { ArrowRight, Calendar, BookOpen } from 'lucide-react'

// Page d'entrée de la section H-Inter (intercession).
// Sert de hub vers les deux sous-sections : sujets mensuels et hebdomadaires.
export default function HInter() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <div className="text-yellow-400 text-sm font-semibold uppercase tracking-widest mb-3">Intercession</div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">H-Inter</h1>
        <p className="text-white/50 max-w-xl mx-auto">
          Rejoignez le mouvement d'intercession mondiale. Priez avec nous pour les nations.
        </p>
      </div>

      {/* Deux cartes cliquables — chacune mène à une sous-section */}
      <div className="grid md:grid-cols-2 gap-6">
        <Link
          to="/h-inter/sujets"
          className="group bg-white/5 border border-white/10 hover:border-yellow-500/30 rounded-2xl p-8 transition-all"
        >
          <BookOpen size={32} className="text-yellow-400 mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">Sujets de prière</h2>
          <p className="text-white/50 text-sm mb-4">
            Découvrez les sujets mensuels pour intercéder pour les nations et les communautés.
          </p>
          <div className="flex items-center gap-1 text-yellow-400 text-sm group-hover:gap-2 transition-all">
            Voir les sujets <ArrowRight size={14} />
          </div>
        </Link>

        <Link
          to="/h-inter/hebdomadaire"
          className="group bg-white/5 border border-white/10 hover:border-yellow-500/30 rounded-2xl p-8 transition-all"
        >
          <Calendar size={32} className="text-yellow-400 mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">Sujets hebdomadaires</h2>
          <p className="text-white/50 text-sm mb-4">
            Chaque semaine, un nouveau sujet de prière pour guider votre intercession.
          </p>
          <div className="flex items-center gap-1 text-yellow-400 text-sm group-hover:gap-2 transition-all">
            Voir la semaine <ArrowRight size={14} />
          </div>
        </Link>
      </div>
    </div>
  )
}
