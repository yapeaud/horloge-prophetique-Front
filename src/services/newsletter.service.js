import api from '../api/axios.js'

// Abonne un visiteur (pas de token requis).
export const subscribeNewsletter = (data) =>
  api.post('/newsletter/subscribe', data).then((r) => r.data)

// Liste les abonnés (admin — token injecté automatiquement).
export const getSubscribers = () => api.get('/newsletter/subscribers').then((r) => r.data)

// Désabonne un abonné par son UUID public.
export const unsubscribe = (id) => api.delete(`/newsletter/unsubscribe/${id}`)
