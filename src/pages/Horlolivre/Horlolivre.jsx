import { Link } from 'react-router-dom'
import { BookOpen, Heart, ArrowRight } from 'lucide-react'

// Page d'entrée de la section Horlolivre — hub vers Dévotions et Librairie.
export default function Horlolivre() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <div className="text-yellow-400 text-sm font-semibold uppercase tracking-widest mb-3">Ressources</div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Horlolivre</h1>
        <p className="text-white/50 max-w-xl mx-auto">
          Accédez à notre bibliothèque de dévotions et de livres chrétiens.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Link
          to="/horlolivre/devotions"
          className="group bg-white/5 border border-white/10 hover:border-yellow-500/30 rounded-2xl p-8 transition-all"
        >
          <Heart size={32} className="text-yellow-400 mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">Dévotions</h2>
          <p className="text-white/50 text-sm mb-4">
            Des méditations spirituelles pour nourrir votre foi au quotidien.
          </p>
          <div className="flex items-center gap-1 text-yellow-400 text-sm group-hover:gap-2 transition-all">
            Lire les dévotions <ArrowRight size={14} />
          </div>
        </Link>

        <Link
          to="/horlolivre/librairie"
          className="group bg-white/5 border border-white/10 hover:border-yellow-500/30 rounded-2xl p-8 transition-all"
        >
          <BookOpen size={32} className="text-yellow-400 mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">Librairie</h2>
          <p className="text-white/50 text-sm mb-4">
            Téléchargez et lisez nos livres et ressources spirituels gratuitement.
          </p>
          <div className="flex items-center gap-1 text-yellow-400 text-sm group-hover:gap-2 transition-all">
            Parcourir la librairie <ArrowRight size={14} />
          </div>
        </Link>
      </div>
    </div>
  )
}
