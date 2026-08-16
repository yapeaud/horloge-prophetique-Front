import api from '../api/axios.js'

// Appels API pour les podcasts.
// Chaque fonction extrait directement r.data pour simplifier la consommation dans les hooks.
export const getPodcasts = () => api.get('/podcasts').then((r) => r.data)
export const getPodcast = (id) => api.get(`/podcasts/${id}`).then((r) => r.data)
export const createPodcast = (data) => api.post('/podcasts', data).then((r) => r.data)
export const updatePodcast = (id, data) => api.put(`/podcasts/${id}`, data).then((r) => r.data)
// delete ne retourne pas de corps (204), on renvoie la réponse brute.
export const deletePodcast = (id) => api.delete(`/podcasts/${id}`)
