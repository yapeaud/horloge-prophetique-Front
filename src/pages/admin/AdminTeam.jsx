import { useState, useEffect, useRef } from 'react'
import { Plus, Pencil, Trash2, Users, ImagePlus } from 'lucide-react'
import {
  getTeamMembers, createTeamMember, updateTeamMember, deleteTeamMember, photoUrl,
} from '../../services/team.service.js'
import { Button } from '../../components/ui/Button.jsx'
import { Modal } from '../../components/ui/Modal.jsx'
import { Input } from '../../components/ui/Input.jsx'
import { Spinner } from '../../components/ui/Spinner.jsx'

const EMPTY_FORM = { nom: '', poste: '', description: '', ordre: 0 }

export default function AdminTeam() {
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)
  const [editing, setEditing] = useState(null)       // memberId en cours d'édition
  const [currentPhoto, setCurrentPhoto] = useState(null) // URL photo existante (mode édition)
  const [photoFile, setPhotoFile] = useState(null)   // nouveau fichier sélectionné
  const [photoPreview, setPhotoPreview] = useState(null) // aperçu local (Object URL)
  const [saving, setSaving] = useState(false)
  const fileRef = useRef(null)

  const load = () =>
    getTeamMembers().then(setMembers).finally(() => setLoading(false))

  useEffect(() => { load() }, [])

  // Libère l'Object URL quand le preview change ou que la modale se ferme.
  useEffect(() => {
    return () => { if (photoPreview) URL.revokeObjectURL(photoPreview) }
  }, [photoPreview])

  const openCreate = () => {
    setEditing(null)
    setForm(EMPTY_FORM)
    setCurrentPhoto(null)
    setPhotoFile(null)
    setPhotoPreview(null)
    setModal(true)
  }

  const openEdit = (m) => {
    setEditing(m.memberId)
    setForm({ nom: m.nom, poste: m.poste, description: m.description || '', ordre: m.ordre })
    setCurrentPhoto(photoUrl(m.photo))
    setPhotoFile(null)
    setPhotoPreview(null)
    setModal(true)
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setPhotoFile(file)
    // Crée un aperçu local sans envoyer le fichier au serveur.
    setPhotoPreview(URL.createObjectURL(file))
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      // FormData est requis pour transmettre le fichier image en multipart.
      const fd = new FormData()
      fd.append('nom', form.nom)
      fd.append('poste', form.poste)
      fd.append('description', form.description)
      fd.append('ordre', form.ordre)
      if (photoFile) fd.append('photo', photoFile)

      if (editing) await updateTeamMember(editing, fd)
      else await createTeamMember(fd)

      setModal(false)
      load()
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Supprimer ce membre ?')) return
    await deleteTeamMember(id)
    load()
  }

  // Aperçu à afficher : nouveau fichier en priorité, sinon la photo existante en DB.
  const displayPhoto = photoPreview || currentPhoto

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-white">Équipe</h1>
        <Button onClick={openCreate}><Plus size={16} /> Ajouter un membre</Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Spinner /></div>
      ) : (
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          {members.length === 0
            ? <p className="text-center text-white/40 py-12">Aucun membre dans l'équipe.</p>
            : members.map((m) => (
              <div key={m.memberId} className="flex items-center gap-4 px-5 py-4 border-b border-white/5 last:border-0">
                {/* Photo ou avatar initiales */}
                {m.photo ? (
                  <img
                    src={photoUrl(m.photo)}
                    alt={m.nom}
                    className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-400 font-bold text-sm flex-shrink-0">
                    {m.nom.slice(0, 2).toUpperCase()}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="text-white font-medium truncate">{m.nom}</div>
                  <div className="text-yellow-400 text-xs">{m.poste}</div>
                </div>
                <div className="text-white/30 text-xs hidden sm:block">ordre {m.ordre}</div>
                <div className="flex gap-2">
                  <Button variant="ghost" onClick={() => openEdit(m)}><Pencil size={14} /></Button>
                  <Button variant="danger" onClick={() => handleDelete(m.memberId)}><Trash2 size={14} /></Button>
                </div>
              </div>
            ))
          }
        </div>
      )}

      <Modal
        isOpen={modal}
        onClose={() => setModal(false)}
        title={editing ? 'Modifier le membre' : 'Nouveau membre'}
      >
        <form onSubmit={handleSave} className="flex flex-col gap-4">
          {/* Zone de sélection de photo */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-white/70">Photo</label>
            <div className="flex items-center gap-4">
              {displayPhoto ? (
                <img
                  src={displayPhoto}
                  alt="aperçu"
                  className="w-16 h-16 rounded-full object-cover border border-white/10"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/20">
                  <Users size={24} />
                </div>
              )}
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="flex items-center gap-2 text-sm text-yellow-400 hover:text-yellow-300 transition-colors"
              >
                <ImagePlus size={16} />
                {displayPhoto ? 'Changer la photo' : 'Choisir une photo'}
              </button>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          </div>

          <Input
            label="Nom complet"
            value={form.nom}
            onChange={(e) => setForm((f) => ({ ...f, nom: e.target.value }))}
            required
          />
          <Input
            label="Poste / Rôle"
            value={form.poste}
            onChange={(e) => setForm((f) => ({ ...f, poste: e.target.value }))}
            required
          />

          <div className="flex flex-col gap-1">
            <label className="text-sm text-white/70">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              rows={3}
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm resize-none focus:outline-none focus:border-yellow-500/50"
            />
          </div>

          <Input
            label="Ordre d'affichage"
            type="number"
            value={form.ordre}
            onChange={(e) => setForm((f) => ({ ...f, ordre: e.target.value }))}
            min={0}
          />

          <div className="flex gap-3 justify-end mt-2">
            <Button variant="secondary" type="button" onClick={() => setModal(false)}>
              Annuler
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? '...' : 'Enregistrer'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
