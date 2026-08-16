import axios from 'axios'

// Instance Axios partagée dans toute l'application.
// La baseURL est définie dans .env (VITE_API_URL) pour faciliter les changements d'environnement.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'Content-Type': 'application/json' },
})

// Intercepteur de requête : injecte automatiquement le token JWT dans chaque requête.
// Cela évite de l'ajouter manuellement dans chaque appel de service.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Intercepteur de réponse : nettoie le localStorage si le serveur répond 401 (token expiré
// ou invalide). L'erreur est ensuite propagée pour que le composant puisse la gérer.
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
    return Promise.reject(err)
  }
)

export default api
