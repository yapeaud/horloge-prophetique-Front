import api from '../api/axios.js'

export const sendContactMessage = (data) =>
  api.post('/contact', data).then((r) => r.data)
