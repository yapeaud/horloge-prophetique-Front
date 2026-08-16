import { useState, useEffect } from 'react'
import { getBooks } from '../services/book.service.js'

/**
 * Hook de récupération des livres de la librairie.
 *
 * @returns {{ books: Array, loading: boolean, error: Error|null }}
 */
export const useBooks = () => {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getBooks()
      .then(setBooks)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [])

  return { books, loading, error }
}
