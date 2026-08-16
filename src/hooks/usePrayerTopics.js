import { useState, useEffect } from 'react'
import { getPrayerTopics } from '../services/prayerTopic.service.js'

/**
 * Hook de récupération des sujets de prière avec filtrage optionnel par type.
 * Se ré-exécute automatiquement si le type change (ex: passage MENSUEL → HEBDOMADAIRE).
 *
 * @param {string|undefined} type - HEBDOMADAIRE | MENSUEL | CONTINENTAL (optionnel)
 * @returns {{ topics: Array, loading: boolean, error: Error|null }}
 */
export const usePrayerTopics = (type) => {
  const [topics, setTopics] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getPrayerTopics(type)
      .then(setTopics)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [type]) // Se relance si le type change

  return { topics, loading, error }
}
