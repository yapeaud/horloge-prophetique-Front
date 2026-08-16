// Page statique des projets du ministère.
// Les projets sont listés en dur ; à connecter à une API si la liste devient dynamique.
export default function Projects() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <div className="text-yellow-400 text-sm font-semibold uppercase tracking-widest mb-3">Initiatives</div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Nos Projets</h1>
        <p className="text-white/50 max-w-xl mx-auto">
          Découvrez les projets spirituels et médiatiques du ministère.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {['H-Radio', 'École de prière', 'Mission Nations', 'H-Médias'].map((p) => (
          <div key={p} className="bg-white/5 border border-white/10 hover:border-yellow-500/30 rounded-2xl p-6 transition-all">
            {/* Initiale du projet comme avatar temporaire */}
            <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center mb-4">
              <span className="text-yellow-400 font-bold text-sm">{p[0]}</span>
            </div>
            <h3 className="text-white font-semibold mb-2">{p}</h3>
            <p className="text-white/40 text-sm">Projet en cours de développement.</p>
          </div>
        ))}
      </div>
    </div>
  )
}
