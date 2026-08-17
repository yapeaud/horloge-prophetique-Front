import { useState, useEffect } from 'react'
import { Trash2, Download } from 'lucide-react'
import { getSubscribers, unsubscribe, exportSubscribersCSV } from '../../services/newsletter.service.js'
import { Button } from '../../components/ui/Button.jsx'
import { Spinner } from '../../components/ui/Spinner.jsx'

export default function AdminNewsletter() {
  const [subscribers, setSubscribers] = useState([])
  const [loading, setLoading] = useState(true)

  const load = () => getSubscribers().then(setSubscribers).finally(() => setLoading(false))
  useEffect(() => { load() }, [])

  const handleDelete = async (id) => {
    if (!confirm('Désabonner cet utilisateur ?')) return
    await unsubscribe(id)
    load()
  }

  const handleExport = async () => {
    const blob = await exportSubscribersCSV()
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement('a')
    a.href     = url
    a.download = `abonnes-newsletter-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Newsletter</h1>
          <p className="text-white/40 text-sm mt-1">{subscribers.length} abonné(s)</p>
        </div>
        <Button variant="secondary" onClick={handleExport}><Download size={16} /> Export CSV</Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Spinner /></div>
      ) : (
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          {subscribers.length === 0
            ? <p className="text-center text-white/40 py-12">Aucun abonné.</p>
            : subscribers.map((s) => (
              <div key={s.subscriberId} className="flex items-center gap-4 px-5 py-4 border-b border-white/5 last:border-0">
                <div className="flex-1">
                  <div className="text-white font-medium">{s.prenom}</div>
                  <div className="text-white/40 text-xs">{s.email}</div>
                </div>
                {/* Date d'abonnement formatée en français */}
                <div className="text-white/30 text-xs mr-3">
                  {new Date(s.createdAt).toLocaleDateString('fr-FR')}
                </div>
                <Button variant="danger" onClick={() => handleDelete(s.subscriberId)}><Trash2 size={14} /></Button>
              </div>
            ))
          }
        </div>
      )}
    </div>
  )
}
