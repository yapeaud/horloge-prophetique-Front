import { Flame, HandHelping, Globe, Target } from 'lucide-react'

const valeurs = [
  {
    Icon: Flame,
    titre: 'Passion',
    texte:
      'Nous brûlons d\'une passion profonde pour l\'œuvre de Dieu et pour voir des âmes être sauvées. Cette passion est le moteur de tout ce que nous faisons.',
  },
  {
    Icon: HandHelping,
    titre: 'Intercession',
    texte:
      'L\'intercession est au cœur de notre ministère. Nous croyons que la prière intercessive change les nations, les familles et les destinées individuelles.',
  },
  {
    Icon: Globe,
    titre: 'Évangélisation',
    texte:
      'Nous sommes engagés à faire connaître l\'amour de Jésus-Christ à toutes les nations. L\'Évangile est notre message, et le monde entier est notre champ.',
  },
  {
    Icon: Target,
    titre: 'Discipline',
    texte:
      'Nous visons l\'excellence dans l\'œuvre que nous faisons pour Dieu. La discipline, la rigueur et l\'intégrité guident chaque aspect de notre service.',
  },
]

export default function About() {
  return (
    <div className="flex flex-col">

      {/* ── En-tête de page ───────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-900 to-gray-950 border-b border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-yellow-400 text-sm font-semibold uppercase tracking-widest mb-3">Notre histoire</div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">À propos</h1>
          <p className="text-white/50 leading-relaxed">
            Horloge Prophétique est un ministère chrétien fondé sur la conviction que la prière change les nations. Nous croyons que chaque heure passée en intercession a un impact éternel.
          </p>
        </div>
      </section>

      {/* ── Vision & description ─────────────────────────────────────── */}
      <section className="py-20 px-4 bg-gray-950">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-yellow-400 text-sm font-semibold uppercase tracking-widest mb-3">La vision</div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Une vision pour la fin des temps</h2>
            <p className="text-white/60 leading-relaxed mb-5">
              Horloge Prophétique est une vision mandatée pour la fin des temps afin de donner une orientation au monde par rapport aux événements à venir et la venue du{' '}
              <span className="text-white/80 font-semibold">SEIGNEUR JÉSUS CHRIST</span>.
            </p>
            <p className="text-white/60 leading-relaxed mb-5">
              Notre objectif est de soutenir l'église et les nations par l'intercession et de faire connaître l'amour de <span className="text-white/80 font-semibold">JÉSUS CHRIST</span> aux âmes et au monde. Nous visons ultimement à susciter à des milliards d'âmes à{' '}
              <span className="text-white/80 font-semibold">CHRIST</span> et de donner aux gens la passion de chercher leur{' '}
              <span className="text-white/80 font-semibold">DIEU</span>.
            </p>
            <p className="italic border-l-2 border-yellow-400/40 pl-4 text-white/50 text-sm leading-relaxed">
              "Si mon peuple qui est appelé de mon nom s'humilie, prie, et cherche ma face… je pardonnerai leurs péchés et guérirai leur pays." — 2 Chroniques 7:14
            </p>
          </div>
          {/* Placeholder visuel */}
          <div className="relative h-72 md:h-auto rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 border border-white/10 flex items-center justify-center">
            <div className="text-center px-8">
              <div className="text-5xl mb-4">🕊</div>
              <p className="text-white/30 text-sm italic">"L'heure de la prière a sonné"</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Notre objectif ────────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-yellow-400 text-sm font-semibold uppercase tracking-widest mb-3">Notre mandat</div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">Notre Objectif</h2>
          <div className="bg-white/5 border border-yellow-500/20 rounded-2xl p-8 md:p-12">
            <p className="text-white/70 leading-relaxed text-lg">
              Notre mandat consiste à soutenir l'église et les nations par l'intercession, de faire connaître l'amour de Jésus-Christ aux âmes et au monde et de donner aux hommes la passion de chercher leur Dieu.
            </p>
          </div>
        </div>
      </section>

      {/* ── Nos valeurs ───────────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-gray-950">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-yellow-400 text-sm font-semibold uppercase tracking-widest mb-3">Ce qui nous anime</div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Nos Valeurs</h2>
            <p className="text-white/50 max-w-xl mx-auto">
              Nous usons de plusieurs stratégies afin d'accomplir nos objectifs, parmi lesquelles :
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {valeurs.map(({ Icon, titre, texte }) => (
              <div key={titre} className="bg-white/5 border border-white/10 hover:border-yellow-500/30 rounded-2xl p-8 transition-all">
                <div className="w-12 h-12 bg-yellow-500/10 rounded-xl flex items-center justify-center mb-5">
                  <Icon size={24} className="text-yellow-400" />
                </div>
                <h3 className="text-white font-bold text-lg mb-3">{titre}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{texte}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
