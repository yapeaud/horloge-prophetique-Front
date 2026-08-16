import api from '../api/axios.js'

// URL d'origine du backend (ex : http://localhost:5001) pour construire les URLs de photos.
// On retire le segment "/api" ajouté dans VITE_API_URL.
const BACKEND_ORIGIN = import.meta.env.VITE_API_URL?.split('/api')[0] ?? ''

// Construit l'URL complète d'une photo à partir du chemin stocké en base (ex : /uploads/team/…).
export const photoUrl = (p) => (p ? `${BACKEND_ORIGIN}${p}` : null)

export const getTeamMembers = () => api.get('/team').then((r) => r.data)
export const getTeamMember = (id) => api.get(`/team/${id}`).then((r) => r.data)

// Les mutations avec photo utilisent FormData (multipart/form-data).
export const createTeamMember = (formData) =>
  api.post('/team', formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then((r) => r.data)

export const updateTeamMember = (id, formData) =>
  api.put(`/team/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then((r) => r.data)

export const deleteTeamMember = (id) => api.delete(`/team/${id}`)
