import api from '../api/axios.js'

// Soumet une nouvelle demande de prière (accès public, pas de token nécessaire).
export const submitPrayerRequest = (data) => api.post('/prayer-requests', data).then((r) => r.data)

// Récupère toutes les demandes (admin uniquement, token injecté par l'intercepteur Axios).
export const getPrayerRequests = () => api.get('/prayer-requests').then((r) => r.data)

// Met à jour le statut d'une demande : statut = 'EN_ATTENTE' | 'TRAITE' | 'ARCHIVE'.
export const updatePrayerRequestStatus = (id, statut) =>
  api.patch(`/prayer-requests/${id}`, { statut }).then((r) => r.data)

export const deletePrayerRequest = (id) => api.delete(`/prayer-requests/${id}`)
