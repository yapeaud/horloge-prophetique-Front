import { useState, useEffect } from 'react'
import { getPodcasts } from '../services/podcast.service.js'

/**
 * Hook de récupération des podcasts.
 * Déclenche la requête API au montage du composant et expose les états
 * loading, error et data pour que le composant puisse réagir à chaque phase.
 *
 * @returns {{ podcasts: Array, loading: boolean, error: Error|null }}
 */
export const usePodcasts = () => {
  const [podcasts, setPodcasts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getPodcasts()
      .then(setPodcasts)
      .catch(setError)
      .finally(() => setLoading(false)) // loading passe à false dans tous les cas
  }, []) // Tableau vide = exécution unique au montage

  return { podcasts, loading, error }
}
