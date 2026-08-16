import { BookCard } from '../../components/BookCard.jsx'
import { Spinner } from '../../components/ui/Spinner.jsx'
import { useBooks } from '../../hooks/useBooks.js'

/**
 * Page des dévotions — réutilise le hook useBooks et filtre côté client
 * les livres dont la catégorie contient "dévotion".
 * Ce filtre client évite un endpoint dédié pour une distinction légère.
 */
export default function Devotions() {
  const { books, loading, error } = useBooks()
  const devotions = books.filter((b) => b.categorie?.toLowerCase().includes('dévotion'))

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <div className="text-yellow-400 text-sm font-semibold uppercase tracking-widest mb-3">Quotidien</div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Dévotions</h1>
        <p className="text-white/50 max-w-xl mx-auto">Méditez sur ces textes pour nourrir votre vie spirituelle.</p>
      </div>

      {loading && <div className="flex justify-center py-20"><Spinner /></div>}
      {error && <p className="text-center text-red-400 py-12">Erreur de chargement.</p>}

      {!loading && !error && (
        devotions.length > 0
          ? <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {devotions.map((b) => <BookCard key={b.id} book={b} />)}
            </div>
          : <p className="text-center text-white/40 py-20">Aucune dévotion disponible pour le moment.</p>
      )}
    </div>
  )
}
