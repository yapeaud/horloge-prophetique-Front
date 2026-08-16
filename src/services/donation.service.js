import api from '../api/axios.js'

// Enregistre un don côté serveur (statut EN_ATTENTE par défaut).
export const createDonation = (data) => api.post('/donations', data).then((r) => r.data)

// Récupère l'historique des dons (admin uniquement).
export const getDonations = () => api.get('/donations').then((r) => r.data)

// Permet à l'admin de confirmer ou rejeter un don : statut = COMPLETE | ECHOUE.
export const updateDonationStatus = (id, statut) =>
  api.patch(`/donations/${id}`, { statut }).then((r) => r.data)
