import api from '../api/axios.js'

export const getMedias = () => api.get('/medias').then((r) => r.data)
export const getMedia = (id) => api.get(`/medias/${id}`).then((r) => r.data)
export const createMedia = (data) => api.post('/medias', data).then((r) => r.data)
export const updateMedia = (id, data) => api.put(`/medias/${id}`, data).then((r) => r.data)
export const deleteMedia = (id) => api.delete(`/medias/${id}`)
