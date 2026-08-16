import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, Tv } from 'lucide-react'
import { getMedias, createMedia, updateMedia, deleteMedia } from '../../services/media.service.js'
import { Button } from '../../components/ui/Button.jsx'
import { Modal } from '../../components/ui/Modal.jsx'
import { Input } from '../../components/ui/Input.jsx'
import { Spinner } from '../../components/ui/Spinner.jsx'

// Icônes disponibles pour une branche H-Médias (noms lucide-react).
const ICONES = [
  { value: 'Tv', label: 'TV / YouTube' },
  { value: 'Radio', label: 'Radio' },
  { value: 'Mic', label: 'Micro / Podcast' },
  { value: 'Play', label: 'Live / Lecture' },
  { value: 'Film', label: 'Production / Film' },
  { value: 'Globe', label: 'Web / Réseaux' },
  { value: 'Camera', label: 'Caméra / Photo' },
  { value: 'Music', label: 'Musique' },
  { value: 'Headphones', label: 'Casque / Audio' },
  { value: 'Video', label: 'Vidéo' },
]

const EMPTY = { titre: '', tag: '', description: '', objectif: '', icone: 'Tv', ordre: 0 }

export default function AdminMedias() {
  const [medias, setMedias] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)
  const [form, setForm] = useState(EMPTY)
  const [editing, setEditing] = useState(null)
  const [saving, setSaving] = useState(false)

  const load = () => getMedias().then(setMedias).finally(() => setLoading(false))
  useEffect(() => { load() }, [])

  const openCreate = () => { setEditing(null); setForm(EMPTY); setModal(true) }
  const openEdit = (m) => {
    setEditing(m.mediaId)
    setForm({ titre: m.titre, tag: m.tag, description: m.description, objectif: m.objectif, icone: m.icone, ordre: m.ordre })
    setModal(true)
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      const payload = { ...form, ordre: parseInt(form.ordre, 10) || 0 }
      if (editing) await updateMedia(editing, payload)
      else await createMedia(payload)
      setModal(false)
      load()
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Supprimer ce média ?')) return
    await deleteMedia(id)
    load()
  }

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-white">H-Médias</h1>
        <Button onClick={openCreate}><Plus size={16} /> Ajouter un média</Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Spinner /></div>
      ) : (
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          {medias.length === 0
            ? <p className="text-center text-white/40 py-12">Aucun média. Cliquez sur "Ajouter" pour commencer.</p>
            : medias.map((m) => (
              <div key={m.mediaId} className="flex items-center gap-4 px-5 py-4 border-b border-white/5 last:border-0">
                <Tv size={18} className="text-yellow-400 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-white font-medium truncate">{m.titre}</div>
                  <div className="text-yellow-400/70 text-xs">{m.tag}</div>
                </div>
                <div className="text-white/25 text-xs hidden sm:block">icône: {m.icone} · ordre {m.ordre}</div>
                <div className="flex gap-2">
                  <Button variant="ghost" onClick={() => openEdit(m)}><Pencil size={14} /></Button>
                  <Button variant="danger" onClick={() => handleDelete(m.mediaId)}><Trash2 size={14} /></Button>
                </div>
              </div>
            ))
          }
        </div>
      )}

      <Modal isOpen={modal} onClose={() => setModal(false)} title={editing ? 'Modifier le média' : 'Nouveau média'}>
        <form onSubmit={handleSave} className="flex flex-col gap-4">
          <Input label="Titre" value={form.titre} onChange={set('titre')} required placeholder="ex : H-TV" />
          <Input label="Tag / Catégorie" value={form.tag} onChange={set('tag')} required placeholder="ex : YouTube & Streaming" />

          <div className="flex flex-col gap-1">
            <label className="text-sm text-white/70">Description</label>
            <textarea
              value={form.description}
              onChange={set('description')}
              rows={3}
              required
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm resize-none focus:outline-none focus:border-yellow-500/50"
            />
          </div>

          <Input label="Objectif" value={form.objectif} onChange={set('objectif')} required placeholder="ex : Atteindre des millions d'âmes..." />

          <div className="flex flex-col gap-1">
            <label className="text-sm text-white/70">Icône</label>
            <select
              value={form.icone}
              onChange={set('icone')}
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-yellow-500/50"
            >
              {ICONES.map(({ value, label }) => (
                <option key={value} value={value} className="bg-gray-900">{label} ({value})</option>
              ))}
            </select>
          </div>

          <Input label="Ordre d'affichage" type="number" value={form.ordre} onChange={set('ordre')} min={0} />

          <div className="flex gap-3 justify-end mt-2">
            <Button variant="secondary" type="button" onClick={() => setModal(false)}>Annuler</Button>
            <Button type="submit" disabled={saving}>{saving ? '...' : 'Enregistrer'}</Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
