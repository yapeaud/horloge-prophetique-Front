import { useState, useEffect } from 'react'
import { getTeamMembers, photoUrl } from '../services/team.service.js'
import { Spinner } from '../components/ui/Spinner.jsx'

export default function Team() {
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getTeamMembers().then(setMembers).finally(() => setLoading(false))
  }, [])

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <div className="text-yellow-400 text-sm font-semibold uppercase tracking-widest mb-3">L'équipe</div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Notre équipe</h1>
        <p className="text-white/50 max-w-xl mx-auto">
          Derrière Horloge Prophétique, une équipe passionnée au service du Royaume.
        </p>
      </div>

      {loading && <div className="flex justify-center py-20"><Spinner /></div>}

      {!loading && members.length === 0 && (
        <p className="text-center text-white/40 py-12">L'équipe sera présentée bientôt.</p>
      )}

      {!loading && members.length > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((m) => (
            <div key={m.memberId} className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
              {m.photo ? (
                <img
                  src={photoUrl(m.photo)}
                  alt={m.nom}
                  className="w-20 h-20 rounded-full object-cover mx-auto mb-4 border-2 border-yellow-500/30"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-400 font-bold text-xl mx-auto mb-4">
                  {m.nom.slice(0, 2).toUpperCase()}
                </div>
              )}
              <h3 className="text-white font-semibold">{m.nom}</h3>
              <p className="text-yellow-400 text-sm mt-1">{m.poste}</p>
              {m.description && (
                <p className="text-white/50 text-sm mt-3 leading-relaxed">{m.description}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
