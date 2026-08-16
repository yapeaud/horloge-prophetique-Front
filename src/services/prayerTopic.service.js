import api from '../api/axios.js'

// Si type est fourni (HEBDOMADAIRE/MENSUEL/CONTINENTAL), il est passé en query param.
// Sinon params est vide et tous les sujets sont retournés.
export const getPrayerTopics = (type) =>
  api.get('/prayer-topics', { params: type ? { type } : {} }).then((r) => r.data)

export const getPrayerTopic = (id) => api.get(`/prayer-topics/${id}`).then((r) => r.data)
export const createPrayerTopic = (data) => api.post('/prayer-topics', data).then((r) => r.data)
export const updatePrayerTopic = (id, data) =>
  api.put(`/prayer-topics/${id}`, data).then((r) => r.data)
export const deletePrayerTopic = (id) => api.delete(`/prayer-topics/${id}`)
