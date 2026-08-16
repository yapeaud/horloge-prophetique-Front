import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { getPrayerTopics, createPrayerTopic, updatePrayerTopic, deletePrayerTopic } from '../../services/prayerTopic.service.js'
import { Button } from '../../components/ui/Button.jsx'
import { Modal } from '../../components/ui/Modal.jsx'
import { Input, Textarea } from '../../components/ui/Input.jsx'
import { Badge } from '../../components/ui/Badge.jsx'
import { Spinner } from '../../components/ui/Spinner.jsx'

const EMPTY = { titre: '', contenu: '', image: '', type: 'MENSUEL' }
const TYPES = ['HEBDOMADAIRE', 'MENSUEL', 'CONTINENTAL']
const typeColors = { HEBDOMADAIRE: 'gold', MENSUEL: 'blue', CONTINENTAL: 'purple' }

/**
 * Page admin de gestion des sujets de prière (CRUD complet).
 * editing stocke l'UUID du sujet en cours d'édition (null = création).
 */
export default function AdminPrayerTopics() {
  const [topics, setTopics] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)
  const [form, setForm] = useState(EMPTY)
  const [editing, setEditing] = useState(null)
  const [saving, setSaving] = useState(false)

  // Charge tous les sujets sans filtre de type.
  const load = () => getPrayerTopics().then(setTopics).finally(() => setLoading(false))
  useEffect(() => { load() }, [])

  const openCreate = () => { setEditing(null); setForm(EMPTY); setModal(true) }
  const openEdit = (t) => {
    setEditing(t.prayerTopicId)
    setForm({ titre: t.titre, contenu: t.contenu, image: t.image || '', type: t.type })
    setModal(true)
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      if (editing) await updatePrayerTopic(editing, form)
      else await createPrayerTopic(form)
      setModal(false)
      load()
    } finally { setSaving(false) }
  }

  const handleDelete = async (id) => {
    if (!confirm('Supprimer ce sujet ?')) return
    await deletePrayerTopic(id)
    load()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-white">Sujets de prière</h1>
        <Button onClick={openCreate}><Plus size={16} /> Ajouter</Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Spinner /></div>
      ) : (
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          {topics.length === 0
            ? <p className="text-center text-white/40 py-12">Aucun sujet.</p>
            : topics.map((t) => (
              <div key={t.prayerTopicId} className="flex items-center gap-4 px-5 py-4 border-b border-white/5 last:border-0">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge color={typeColors[t.type]}>{t.type}</Badge>
                    <span className="text-white font-medium truncate">{t.titre}</span>
                  </div>
                  <p className="text-white/40 text-xs truncate">{t.contenu}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" onClick={() => openEdit(t)}><Pencil size={14} /></Button>
                  <Button variant="danger" onClick={() => handleDelete(t.prayerTopicId)}><Trash2 size={14} /></Button>
                </div>
              </div>
            ))
          }
        </div>
      )}

      <Modal isOpen={modal} onClose={() => setModal(false)} title={editing ? 'Modifier le sujet' : 'Nouveau sujet'}>
        <form onSubmit={handleSave} className="flex flex-col gap-4">
          <Input label="Titre" value={form.titre} onChange={(e) => setForm((f) => ({ ...f, titre: e.target.value }))} required />
          <Textarea label="Contenu" value={form.contenu} onChange={(e) => setForm((f) => ({ ...f, contenu: e.target.value }))} rows={4} required />
          <Input label="URL Image" value={form.image} onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))} />
          <div className="flex flex-col gap-1">
            <label className="text-sm text-white/70">Type</label>
            <select value={form.type} onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))} className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white">
              {TYPES.map((t) => <option key={t} value={t} className="bg-gray-900">{t}</option>)}
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
