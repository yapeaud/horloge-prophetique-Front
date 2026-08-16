// Témoignages statiques — à remplacer par des données dynamiques (API) si nécessaire.
const testimonials = [
  { nom: 'Marie K.', texte: 'Grâce aux sujets de prière, ma vie d\'intercession a complètement changé. Je me sens vraiment porté(e) par cette communauté.', pays: 'France' },
  { nom: 'Jean-Paul M.', texte: 'Les podcasts de l\'Horloge Prophétique m\'accompagnent chaque matin. Une bénédiction pour ma vie spirituelle.', pays: 'Belgique' },
  { nom: 'Esther N.', texte: 'Cette plateforme m\'a aidée à comprendre l\'importance de la prière pour les nations. Je recommande vivement.', pays: 'Côte d\'Ivoire' },
]

export default function Testimonials() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <div className="text-yellow-400 text-sm font-semibold uppercase tracking-widest mb-3">Communauté</div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Témoignages</h1>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div key={t.nom} className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <p className="text-white/60 text-sm italic leading-relaxed mb-4">"{t.texte}"</p>
            <div className="flex items-center gap-3">
              {/* Avatar avec initiale du nom */}
              <div className="w-9 h-9 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-400 font-bold text-xs">
                {t.nom[0]}
              </div>
              <div>
                <div className="text-white text-sm font-semibold">{t.nom}</div>
                <div className="text-white/30 text-xs">{t.pays}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
