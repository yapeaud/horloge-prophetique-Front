import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight, Globe, MessageCircle, BookOpen, Heart, Flame, Star,
} from 'lucide-react'
import { PrayerRequestForm } from '../components/PrayerRequestForm.jsx'
import { NewsletterForm } from '../components/NewsletterForm.jsx'
import { PrayerTopicCard } from '../components/PrayerTopicCard.jsx'
import { PodcastCard } from '../components/PodcastCard.jsx'
import { Spinner } from '../components/ui/Spinner.jsx'
import { usePodcasts } from '../hooks/usePodcasts.js'
import { usePrayerTopics } from '../hooks/usePrayerTopics.js'

const ppmGroups = [
  {
    continent: 'Afrique',
    description: 'Un groupe stratégique d\'intercesseurs sur le continent africain, portant les nations devant le trône de grâce.',
    whatsapp: 'https://chat.whatsapp.com/AfriqueHP',
    emoji: '🌍',
  },
  {
    continent: 'Europe',
    description: 'Des croyants dispersés en Europe, unis dans la prière pour leurs nations et les peuples qui y vivent.',
    whatsapp: 'https://chat.whatsapp.com/EuropeHP',
    emoji: '🌍',
  },
  {
    continent: 'Amérique',
    description: 'Un réseau de prière sur le continent américain, intercédant pour les nations et la moisson des âmes.',
    whatsapp: 'https://chat.whatsapp.com/AmeriqueHP',
    emoji: '🌎',
  },
]

const testimonials = [
  {
    nom: 'Marie L.',
    texte: 'La prière de la semaine a transformé ma vie spirituelle. Je me sens portée chaque jour par cette communauté.',
  },
  {
    nom: 'Jean-Pierre K.',
    texte: 'Grâce à Horloge Prophétique, j\'ai découvert la puissance de l\'intercession pour les nations. Dieu est fidèle.',
  },
  {
    nom: 'Esther M.',
    texte: 'Les sujets de prière m\'ont appris à prier avec précision et foi. Je recommande ce ministère à tous.',
  },
]

export default function Home() {
  const { podcasts, loading: podLoading } = usePodcasts()
  const { topics: weeklyTopics, loading: topicsLoading } = usePrayerTopics('HEBDOMADAIRE')
  const { topics: monthlyTopics, loading: monthlyLoading } = usePrayerTopics('MENSUEL')

  const [email, setEmail] = useState('')
  const [subSent, setSubSent] = useState(false)

  const handleQuickSub = async (e) => {
    e.preventDefault()
    if (!email) return
    setSubSent(true)
  }

  return (
    <div className="flex flex-col">

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Image de fond */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/img/uni.jpg')" }}
        />
        {/* Overlay sombre pour lisibilité du texte */}
        <div className="absolute inset-0 bg-gray-950/60" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="inline-block text-yellow-400 text-sm font-semibold tracking-widest uppercase mb-6 border border-yellow-400/30 px-4 py-1.5 rounded-full">
            Ministère Chrétien
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
            L'heure de la{' '}
            <span className="text-yellow-400">prière</span> a sonné
          </h1>
          <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Rejoignez une communauté de croyants dédiée à l'intercession, la prière et la diffusion spirituelle pour les nations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/h-inter"
              className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-6 py-3 rounded-xl transition-all"
            >
              Intercéder maintenant <ArrowRight size={18} />
            </Link>
            <Link
              to="/a-propos"
              className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-white px-6 py-3 rounded-xl transition-all"
            >
              En savoir plus
            </Link>
          </div>
        </div>
      </section>

      {/* ── Parole inspirée ───────────────────────────────────────────── */}
      <section className="py-16 px-4 bg-yellow-500/5 border-y border-yellow-500/10">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xl md:text-2xl text-white/80 font-light italic leading-relaxed">
            "Veillez et priez, afin que vous ne tombiez pas en tentation."
          </p>
          <span className="block text-yellow-400 text-sm font-semibold mt-4 tracking-widest uppercase">
            Matthieu 26:41
          </span>
        </div>
      </section>

      {/* ── Sujets du monde — Breaking News ──────────────────────────── */}
      <section className="py-20 px-4 bg-gray-950">
        <div className="max-w-5xl mx-auto">
          <div className="text-yellow-400 text-sm font-semibold uppercase tracking-widest mb-3">Breaking News</div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Sujets du monde</h2>
          <p className="text-white/50 mb-10 max-w-2xl">
            Ce qui se passe dans le monde nous appelle à intercéder. Découvrez les sujets d'actualité et les sujets de prière qui y sont attachés.
          </p>
          <div className="grid sm:grid-cols-2 gap-6 mb-10">
            {[
              { titre: 'Nations en conflit', desc: 'Des millions de personnes déplacées appellent à notre intercession.' },
              { titre: 'Réveil spirituel', desc: 'Des mouvements de prière émergent sur tous les continents.' },
            ].map((item) => (
              <div key={item.titre} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-yellow-500/30 transition-all">
                <div className="h-32 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                  <Globe size={40} className="text-yellow-400/40" />
                </div>
                <div className="p-5">
                  <h3 className="text-white font-semibold mb-1">{item.titre}</h3>
                  <p className="text-white/50 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mb-14">
            <Link
              to="/h-inter/sujets"
              className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-6 py-3 rounded-xl transition-all"
            >
              Voir tous les sujets <ArrowRight size={16} />
            </Link>
          </div>

          {/* Barre newsletter inline — "Restez informés" */}
          <div className="bg-white/5 border border-white/10 rounded-2xl px-6 py-5 flex flex-col sm:flex-row items-center gap-4">
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="w-8 h-8 bg-yellow-500/10 rounded-full flex items-center justify-center">
                <span className="text-yellow-400 text-xs font-bold">@</span>
              </div>
              <span className="text-yellow-400 font-semibold text-sm whitespace-nowrap">Restez informés</span>
            </div>
            {subSent ? (
              <p className="text-green-400 text-sm">Merci ! Vous êtes inscrit(e).</p>
            ) : (
              <form onSubmit={handleQuickSub} className="flex flex-1 gap-3 w-full">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Entrez votre email pour recevoir les sujets de la semaine"
                  required
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/30 text-sm focus:outline-none focus:border-yellow-500/50"
                />
                <button
                  type="submit"
                  className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-5 py-2.5 rounded-lg text-sm transition-colors flex-shrink-0"
                >
                  OK
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── Prière de la semaine ──────────────────────────────────────── */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-yellow-400 text-sm font-semibold uppercase tracking-widest mb-3">Cette semaine</div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">Prière de la semaine</h2>
          {topicsLoading ? (
            <div className="flex justify-center"><Spinner /></div>
          ) : weeklyTopics.length > 0 ? (
            <div className="bg-white/5 border border-yellow-500/20 rounded-2xl p-8 text-left">
              <h3 className="text-yellow-400 font-bold text-xl mb-4">{weeklyTopics[0].titre}</h3>
              <p className="text-white/70 leading-relaxed">{weeklyTopics[0].contenu}</p>
            </div>
          ) : (
            <p className="text-white/40">Revenez bientôt pour la prière de la semaine.</p>
          )}
        </div>
      </section>

      {/* ── Qui sommes-nous ──────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-gray-950">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-yellow-400 text-sm font-semibold uppercase tracking-widest mb-3">Notre ministère</div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Qui sommes-nous</h2>
            <p className="text-white/60 leading-relaxed mb-6">
              Horloge Prophétique est une vision mandatée pour la fin des temps afin de donner une orientation au monde par rapport aux événements à venir et la venue du <span className="text-white/80 font-semibold">SEIGNEUR JÉSUS CHRIST</span>.
            </p>
            <p className="text-white/60 leading-relaxed mb-6">
              Notre objectif est de soutenir l'église et les nations par l'intercession et de faire connaître l'amour de <span className="text-white/80 font-semibold">JÉSUS CHRIST</span> aux âmes et au monde.
            </p>
            <p className="text-white/60 leading-relaxed mb-8">
              Nous visons ultimement à susciter à des milliards d'âmes à <span className="text-white/80 font-semibold">CHRIST</span> et de donner aux gens la passion de chercher leur <span className="text-white/80 font-semibold">DIEU</span>.
            </p>
            <Link
              to="/a-propos"
              className="inline-flex items-center gap-2 border border-yellow-500/40 hover:border-yellow-500 text-yellow-400 px-5 py-2.5 rounded-xl text-sm transition-all"
            >
              En savoir plus <ArrowRight size={14} />
            </Link>
          </div>
          {/* Encadré visuel à côté du texte */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col gap-5">
            <p className="text-white/50 text-sm italic border-l-2 border-yellow-400/40 pl-4 leading-relaxed">
              "Regarde, je t'établis aujourd'hui sur les nations et sur les royaumes, pour que tu arraches et que tu abattes, pour que tu ruines et que tu détruises, pour que tu bâtisses et que tu plantes."
            </p>
            <span className="text-yellow-400 text-xs font-semibold tracking-widest">Jérémie 1:10</span>
            <div className="flex flex-col gap-3 mt-2">
              {[
                { Icon: Heart, label: 'Intercession' },
                { Icon: Globe, label: 'Nations' },
                { Icon: Flame, label: 'Évangélisation' },
              ].map(({ Icon, label }) => (
                <div key={label} className="flex items-center gap-3 text-white/50 text-sm">
                  <Icon size={16} className="text-yellow-400 flex-shrink-0" />
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Podcasts récents ──────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-black/40">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <div className="text-yellow-400 text-sm font-semibold uppercase tracking-widest mb-2">Audio</div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">Podcasts récents</h2>
            </div>
            <Link to="/podcasts" className="text-yellow-400 hover:text-yellow-300 text-sm flex items-center gap-1">
              Voir tous <ArrowRight size={14} />
            </Link>
          </div>
          {podLoading ? (
            <div className="flex justify-center py-12"><Spinner /></div>
          ) : podcasts.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {podcasts.slice(0, 3).map((p) => <PodcastCard key={p.id} podcast={p} />)}
            </div>
          ) : (
            <p className="text-center text-white/40 py-12">Aucun podcast disponible pour le moment.</p>
          )}
        </div>
      </section>

      {/* ── Prions Pour le Monde ─────────────────────────────────────── */}
      <section className="py-20 px-4 bg-gray-950">
        <div className="max-w-5xl mx-auto">
          <div className="text-yellow-400 text-sm font-semibold uppercase tracking-widest mb-3">Intercession mondiale</div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Prions Pour le Monde</h2>

          <div className="bg-white/5 border border-yellow-500/20 rounded-2xl p-6 mb-10">
            <p className="text-white/50 text-xs uppercase tracking-widest mb-2">Jérémie 1:10</p>
            <p className="text-white/80 italic leading-relaxed text-sm">
              "Regarde, je t'établis aujourd'hui sur les nations et sur les royaumes, pour que tu arraches et que tu abattes, pour que tu ruines et que tu détruises, pour que tu bâtisses et que tu plantes."
            </p>
          </div>

          <p className="text-white/60 leading-relaxed mb-4">
            Prions pour le monde est une vision qui contient des groupes stratégiques de personnes sur chaque continent qui prient pour ces terres. Présentement nous avons trois groupes sur les continents Africain, Européen, et Américain.
          </p>
          <p className="text-white/60 leading-relaxed mb-10">
            Nous espérons par la grâce de Dieu nous étendre sur d'autres territoires afin de porter la cause de Dieu.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {ppmGroups.map((g) => (
              <div key={g.continent} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-yellow-500/30 transition-all flex flex-col">
                <div className="h-36 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                  <span className="text-5xl">{g.emoji}</span>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-white font-bold mb-2">PPM {g.continent}</h3>
                  <p className="text-white/50 text-sm leading-relaxed flex-1">{g.description}</p>
                  <a
                    href={g.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex items-center gap-2 text-yellow-400 text-sm hover:text-yellow-300 transition-colors"
                  >
                    <MessageCircle size={14} /> Rejoindre le groupe
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <Link
              to="/h-realisations/projets"
              className="inline-flex items-center gap-2 border border-white/20 hover:border-yellow-500/40 text-white/70 hover:text-yellow-400 px-5 py-2.5 rounded-xl text-sm transition-all"
            >
              Voir nos projets <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Sujets mensuels ───────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-black/40">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <div className="text-yellow-400 text-sm font-semibold uppercase tracking-widest mb-2">Intercession</div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">Sujets du mois</h2>
            </div>
            <Link to="/h-inter/sujets" className="text-yellow-400 hover:text-yellow-300 text-sm flex items-center gap-1">
              Voir tous <ArrowRight size={14} />
            </Link>
          </div>
          {monthlyLoading ? (
            <div className="flex justify-center py-12"><Spinner /></div>
          ) : monthlyTopics.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {monthlyTopics.slice(0, 6).map((t) => <PrayerTopicCard key={t.id} topic={t} />)}
            </div>
          ) : (
            <p className="text-center text-white/40 py-12">Aucun sujet disponible pour le moment.</p>
          )}
        </div>
      </section>

      {/* ── Témoignages ───────────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-gray-950">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-yellow-400 text-sm font-semibold uppercase tracking-widest mb-3">Communauté</div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Témoignages</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.nom} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Star size={18} className="text-yellow-400 mb-4" />
                <p className="text-white/60 text-sm leading-relaxed italic mb-4">"{t.texte}"</p>
                <span className="text-white/40 text-xs font-semibold">— {t.nom}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Nos livres (promotion) ────────────────────────────────────── */}
      <section className="py-16 px-4 bg-gradient-to-r from-yellow-900/10 to-gray-900 border-y border-yellow-500/10">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8">
          <div className="flex-shrink-0 w-16 h-16 bg-yellow-500/10 rounded-2xl flex items-center justify-center">
            <BookOpen size={32} className="text-yellow-400" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <div className="text-yellow-400 text-xs font-semibold uppercase tracking-widest mb-1">Horlolivre</div>
            <h3 className="text-white font-bold text-lg mb-1">Ressources spirituelles</h3>
            <p className="text-white/50 text-sm">Abonnez-vous à notre newsletter pour accéder à nos livres et dévotions en téléchargement.</p>
          </div>
          <Link
            to="/horlolivre"
            className="flex-shrink-0 inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-5 py-2.5 rounded-xl text-sm transition-all"
          >
            Découvrir <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* ── Soumettre une demande de prière ──────────────────────────── */}
      <section className="py-20 px-4 bg-gray-950">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <div className="text-yellow-400 text-sm font-semibold uppercase tracking-widest mb-3">Confiance & Prière</div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Partagez votre sujet de prière</h2>
            <p className="text-white/50 text-sm max-w-md mx-auto">
              Vos sujets sont reçus en toute confidentialité. Notre équipe intercède pour chaque demande.
            </p>
          </div>
          <div className="bg-gradient-to-br from-white/5 to-yellow-900/5 border border-yellow-500/10 rounded-2xl p-8">
            <PrayerRequestForm />
          </div>
        </div>
      </section>

      {/* ── Newsletter ────────────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-black/40">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-r from-yellow-500/10 to-gray-900 border border-yellow-500/20 rounded-2xl p-10 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Restez connecté(e)</h2>
            <p className="text-white/50 mb-2">Recevez nos sujets de prière et enseignements directement par email.</p>
            <ul className="text-white/40 text-xs flex flex-col sm:flex-row gap-2 justify-center mb-8 list-none">
              <li>· Sujets de la semaine</li>
              <li>· Exhortations WhatsApp</li>
              <li>· Informations sur la vision</li>
            </ul>
            <NewsletterForm />
          </div>
        </div>
      </section>

    </div>
  )
}
