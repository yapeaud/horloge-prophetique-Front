import { BookCard } from '../../components/BookCard.jsx'
import { Spinner } from '../../components/ui/Spinner.jsx'
import { useBooks } from '../../hooks/useBooks.js'

// Librairie : affiche tous les livres disponibles en téléchargement.
export default function Library() {
  const { books, loading, error } = useBooks()

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <div className="text-yellow-400 text-sm font-semibold uppercase tracking-widest mb-3">Librairie</div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Ressources</h1>
        <p className="text-white/50 max-w-xl mx-auto">Livres et ressources spirituels disponibles en téléchargement.</p>
      </div>

      {loading && <div className="flex justify-center py-20"><Spinner /></div>}
      {error && <p className="text-center text-red-400 py-12">Erreur de chargement.</p>}

      {!loading && !error && (
        books.length > 0
          ? <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {books.map((b) => <BookCard key={b.id} book={b} />)}
            </div>
          : <p className="text-center text-white/40 py-20">Aucune ressource disponible pour le moment.</p>
      )}
    </div>
  )
}
