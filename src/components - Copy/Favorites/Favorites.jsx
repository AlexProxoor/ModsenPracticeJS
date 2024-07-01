import React from 'react'
import { useFavorites } from '../../contexts/FavoritesContext'
import BookCard from '../BookCard/BookCard'
import './Favorites.css'
import headerImage from '../../assets/sea.webp'

function Favorites() {
  const { favorites } = useFavorites()

  return (
    <div className="container favorites-container">
      <div className="favorites-header">
        <img src={headerImage} alt="Избранное" />
        <h1>Избранное</h1>
      </div>
      <div className="favorites-content row">
        {favorites.length > 0 ? (
          favorites.map(book => (
            <BookCard key={book.id} book={book} />
          ))
        ) : (
          <p className="favorites-empty">Здесь будут отображаться ваши избранные книги.</p>
        )}
      </div>
    </div>
  )
}

export default Favorites
