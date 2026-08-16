import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, Music2 } from 'lucide-react'
import { getPodcasts, createPodcast, updatePodcast, deletePodcast } from '../../services/podcast.service.js'
import { Button } from '../../components/ui/Button.jsx'
import { Modal } from '../../components/ui/Modal.jsx'
import { Input } from '../../components/ui/Input.jsx'
import { Spinner } from '../../components/ui/Spinner.jsx'

// Valeurs par défaut du formulaire (création).
const EMPTY = { titre: '', description: '', urlAudio: '', image: '', plateforme: 'INTERNE' }
const PLATFORMS = ['SPOTIFY', 'APPLE', 'AMAZON', 'INTERNE']

/**
 * Page admin de gestion des podcasts.
 * Pattern CRUD : liste + modale de formulaire (création et modification).
 * editing stocke l'UUID du podcast en cours d'édition (null = création).
 */
export default function AdminPodcasts() {
  const [podcasts, setPodcasts] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)
  const [form, setForm] = useState(EMPTY)
  const [editing, setEditing] = useState(null) // UUID du podcast édité, null si création
  const [saving, setSaving] = useState(false)

  // Recharge la liste depuis l'API.
  const load = () => getPodcasts().then(setPodcasts).finally(() => setLoading(false))
  useEffect(() => { load() }, [])

  const openCreate = () => { setEditing(null); setForm(EMPTY); setModal(true) }
  const openEdit = (p) => {
    setEditing(p.podcastId)
    setForm({ titre: p.titre, description: p.description, urlAudio: p.urlAudio, image: p.image || '', plateforme: p.plateforme })
    setModal(true)
  }

  // Crée ou met à jour selon la présence de editing.
  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      if (editing) await updatePodcast(editing, form)
      else await createPodcast(form)
      setModal(false)
      load()
    } finally { setSaving(false) }
  }

  const handleDelete = async (id) => {
    if (!confirm('Supprimer ce podcast ?')) return
    await deletePodcast(id)
    load()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-white">Podcasts</h1>
        <Button onClick={openCreate}><Plus size={16} /> Ajouter</Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Spinner /></div>
      ) : (
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          {podcasts.length === 0
            ? <p className="text-center text-white/40 py-12">Aucun podcast.</p>
            : podcasts.map((p) => (
              <div key={p.podcastId} className="flex items-center gap-4 px-5 py-4 border-b border-white/5 last:border-0">
                <Music2 size={18} className="text-yellow-400 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-white font-medium truncate">{p.titre}</div>
                  <div className="text-white/40 text-xs">{p.plateforme}</div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" onClick={() => openEdit(p)}><Pencil size={14} /></Button>
                  <Button variant="danger" onClick={() => handleDelete(p.podcastId)}><Trash2 size={14} /></Button>
                </div>
              </div>
            ))
          }
        </div>
      )}

      <Modal isOpen={modal} onClose={() => setModal(false)} title={editing ? 'Modifier le podcast' : 'Nouveau podcast'}>
        <form onSubmit={handleSave} className="flex flex-col gap-4">
          <Input label="Titre" value={form.titre} onChange={(e) => setForm((f) => ({ ...f, titre: e.target.value }))} required />
          <Input label="Description" value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} />
          <Input label="URL Audio" value={form.urlAudio} onChange={(e) => setForm((f) => ({ ...f, urlAudio: e.target.value }))} required />
          <Input label="URL Image" value={form.image} onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))} />
          <div className="flex flex-col gap-1">
            <label className="text-sm text-white/70">Plateforme</label>
            <select
              value={form.plateforme}
              onChange={(e) => setForm((f) => ({ ...f, plateforme: e.target.value }))}
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white"
            >
              {PLATFORMS.map((p) => <option key={p} value={p} className="bg-gray-900">{p}</option>)}
            </select>
          </div>
          <div className="flex gap-3 justify-end mt-2">
            <Button variant="secondary" type="button" onClick={() => setModal(false)}>Annuler</Button>
            <Button type="submit" disabled={saving}>{saving ? '...' : 'Enregistrer'}</Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
