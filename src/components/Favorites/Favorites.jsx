import React, { useEffect } from 'react'
import { useFavorites } from '../../contexts/FavoritesContext'
import BookCard from '../BookCard/BookCard'
import './Favorites.css'
import headerImage from '../../assets/sea.webp'
import AuthDetails from '../Auth/AuthDetails'

function Favorites() {
  const { favorites } = useFavorites();

  useEffect(() => {
    console.log('Favorites component mounted')
    return () => {
      console.log('Favorites component unmounted')
    }
  }, [])

  
  console.log('Favorites component rendered')

  return (
    <div className="container favorites-container">
      <div className="favorites-header">
        <img src={headerImage} alt="Избранное" />
        <h1>Избранное</h1>
      </div>
      <AuthDetails />
      <div className="favorites-content row">
        {favorites.length > 0 ? (
          favorites.map(book => {
            console.log('Rendering BookCard for book:', book)
            return <BookCard key={book.id} book={book} />
          })
        ) : (
          <p className="favorites-empty">Здесь будут отображаться ваши избранные книги.</p>
        )}
      </div>
    </div>
  )
}

export default Favorites
