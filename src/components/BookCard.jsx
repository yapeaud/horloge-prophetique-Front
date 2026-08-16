import { BookOpen, Download } from 'lucide-react'
import { Card } from './ui/Card.jsx'

// Carte d'un livre : couverture (ou icône par défaut), catégorie, titre,
// description tronquée et lien de téléchargement du PDF si disponible.
export const BookCard = ({ book }) => (
  <Card className="p-5 flex flex-col gap-3 hover:border-yellow-500/30 transition-all">
    <div className="w-full h-48 rounded-xl bg-white/5 flex items-center justify-center overflow-hidden">
      {/* Affiche la couverture ou une icône de substitution */}
      {book.image
        ? <img src={book.image} alt={book.titre} className="w-full h-full object-cover" />
        : <BookOpen size={40} className="text-yellow-400/40" />}
    </div>
    {book.categorie && (
      <span className="text-yellow-400 text-xs font-medium">{book.categorie}</span>
    )}
    <h3 className="text-white font-semibold">{book.titre}</h3>
    {book.description && (
      <p className="text-white/50 text-sm line-clamp-2">{book.description}</p>
    )}
    {/* Lien de téléchargement affiché uniquement si un fichier PDF est renseigné */}
    {book.fichier && (
      <a
        href={book.fichier}
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-1.5 text-yellow-400 text-sm hover:text-yellow-300 transition-colors mt-auto"
      >
        <Download size={14} /> Télécharger
      </a>
    )}
  </Card>
)
