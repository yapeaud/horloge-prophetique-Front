import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, BookOpen } from 'lucide-react'
import { getBooks, createBook, updateBook, deleteBook } from '../../services/book.service.js'
import { Button } from '../../components/ui/Button.jsx'
import { Modal } from '../../components/ui/Modal.jsx'
import { Input, Textarea } from '../../components/ui/Input.jsx'
import { Spinner } from '../../components/ui/Spinner.jsx'

const EMPTY = { titre: '', description: '', fichier: '', image: '', categorie: '' }

/**
 * Page admin de gestion du catalogue de livres.
 * Le formulaire gère aussi bien la création que la modification
 * via le champ editing (UUID du livre en cours, null si création).
 */
export default function AdminBooks() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)
  const [form, setForm] = useState(EMPTY)
  const [editing, setEditing] = useState(null)
  const [saving, setSaving] = useState(false)

  const load = () => getBooks().then(setBooks).finally(() => setLoading(false))
  useEffect(() => { load() }, [])

  const openCreate = () => { setEditing(null); setForm(EMPTY); setModal(true) }
  const openEdit = (b) => {
    setEditing(b.bookId)
    setForm({ titre: b.titre, description: b.description || '', fichier: b.fichier || '', image: b.image || '', categorie: b.categorie || '' })
    setModal(true)
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      if (editing) await updateBook(editing, form)
      else await createBook(form)
      setModal(false)
      load()
    } finally { setSaving(false) }
  }

  const handleDelete = async (id) => {
    if (!confirm('Supprimer ce livre ?')) return
    await deleteBook(id)
    load()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-white">Livres</h1>
        <Button onClick={openCreate}><Plus size={16} /> Ajouter</Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Spinner /></div>
      ) : (
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          {books.length === 0
            ? <p className="text-center text-white/40 py-12">Aucun livre.</p>
            : books.map((b) => (
              <div key={b.bookId} className="flex items-center gap-4 px-5 py-4 border-b border-white/5 last:border-0">
                <BookOpen size={18} className="text-yellow-400 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-white font-medium truncate">{b.titre}</div>
                  {/* '—' si aucune catégorie renseignée */}
                  <div className="text-white/40 text-xs">{b.categorie || '—'}</div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" onClick={() => openEdit(b)}><Pencil size={14} /></Button>
                  <Button variant="danger" onClick={() => handleDelete(b.bookId)}><Trash2 size={14} /></Button>
                </div>
              </div>
            ))
          }
        </div>
      )}

      <Modal isOpen={modal} onClose={() => setModal(false)} title={editing ? 'Modifier le livre' : 'Nouveau livre'}>
        <form onSubmit={handleSave} className="flex flex-col gap-4">
          <Input label="Titre" value={form.titre} onChange={(e) => setForm((f) => ({ ...f, titre: e.target.value }))} required />
          <Textarea label="Description" value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} rows={3} />
          <Input label="Catégorie" value={form.categorie} onChange={(e) => setForm((f) => ({ ...f, categorie: e.target.value }))} />
          <Input label="URL PDF" value={form.fichier} onChange={(e) => setForm((f) => ({ ...f, fichier: e.target.value }))} />
          <Input label="URL Image" value={form.image} onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))} />
          <div className="flex gap-3 justify-end mt-2">
            <Button variant="secondary" type="button" onClick={() => setModal(false)}>Annuler</Button>
            <Button type="submit" disabled={saving}>{saving ? '...' : 'Enregistrer'}</Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
