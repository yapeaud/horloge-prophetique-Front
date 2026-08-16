import { useState, useEffect } from 'react'
import { Tv, Radio, Mic, Play, Film, Globe, Camera, Music, Headphones, Video } from 'lucide-react'
import { getMedias } from '../services/media.service.js'
import { Spinner } from '../components/ui/Spinner.jsx'

// Correspondance nom stocké en base → composant lucide-react.
const ICON_MAP = { Tv, Radio, Mic, Play, Film, Globe, Camera, Music, Headphones, Video }

function MediaIcon({ name, size = 40 }) {
  const Icon = ICON_MAP[name] ?? Tv
  return <Icon size={size} className="text-yellow-400" />
}

export default function HMedias() {
  const [medias, setMedias] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getMedias().then(setMedias).finally(() => setLoading(false))
  }, [])

  return (
    <div className="flex flex-col">

      {/* ── En-tête ───────────────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-900 to-gray-950 border-b border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-yellow-400 text-sm font-semibold uppercase tracking-widest mb-3">Médias</div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">H-Médias</h1>
          <p className="text-white/50 leading-relaxed">
            Il s'agit ici du groupe qui rassemble toutes les personnes œuvrant dans la créativité numérique, 
            informatique et médiatique, selon la vision Horloge Prophétique. Elle agit comme un projecteur, 
            diffusant nos travaux, prophéties et enseignements au monde. 
            H-MEDIAS est également structurée en plusieurs branches hiérarchisées et organisées, 
            à travers lesquelles nous faisons progresser les œuvres du Seigneur.
          </p>
        </div>
      </section>

      {/* ── Branches H-Médias ─────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-gray-950">
        <div className="max-w-5xl mx-auto">
          {loading && <div className="flex justify-center py-20"><Spinner /></div>}

          {!loading && medias.length === 0 && (
            <p className="text-center text-white/40 py-12">Aucun média disponible pour le moment.</p>
          )}

          {!loading && medias.length > 0 && (
            <div className="flex flex-col gap-10">
              {medias.map(({ mediaId, icone, titre, tag, description, objectif }, i) => (
                <div
                  key={mediaId}
                  className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}
                >
                  {/* Zone visuelle */}
                  <div className="w-full md:w-56 flex-shrink-0 h-48 bg-gradient-to-br from-gray-800 to-gray-900 border border-white/10 rounded-2xl flex flex-col items-center justify-center gap-3">
                    <MediaIcon name={icone} />
                    <span className="text-white/30 text-xs uppercase tracking-widest">{tag}</span>
                  </div>
                  {/* Contenu texte */}
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-white mb-1">{titre}</h2>
                    <span className="inline-block text-yellow-400 text-xs font-semibold uppercase tracking-widest mb-4">{tag}</span>
                    <p className="text-white/55 text-sm leading-relaxed mb-4">{description}</p>
                    <div className="flex items-start gap-2 text-white/30 text-xs">
                      <span className="text-yellow-400 font-bold mt-0.5">→</span>
                      <span className="italic">{objectif}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

    </div>
  )
}
