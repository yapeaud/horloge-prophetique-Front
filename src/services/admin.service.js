import api from '../api/axios.js'

// Récupère les compteurs globaux (podcasts, demandes, abonnés…) pour le Dashboard.
// Nécessite un token admin (injecté par l'intercepteur Axios).
export const getStats = () => api.get('/admin/stats').then((r) => r.data)
