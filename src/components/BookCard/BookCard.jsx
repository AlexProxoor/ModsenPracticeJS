import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './BookCard.css'
import { ReactComponent as HeartIcon } from '../../assets/icons/heart.svg'
import { useFavorites } from '../../contexts/FavoritesContext'

const BookCard = ({ book }) => {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites()


  let title, category, authors, thumbnail

  if (book.volumeInfo) {
    const volumeInfo = book.volumeInfo
    title = volumeInfo.title || 'No title available'
    category = volumeInfo.categories ? volumeInfo.categories[0] : 'No category available'

    if (volumeInfo.authors && Array.isArray(volumeInfo.authors)) {
      authors = volumeInfo.authors.join(', ');
    } else if (volumeInfo.authors && typeof volumeInfo.authors === 'string') {
      authors = volumeInfo.authors;
    } else {
      authors = 'No authors available'
    }

    thumbnail = volumeInfo.imageLinks ? volumeInfo.imageLinks.thumbnail : 'path/to/default/image.png'
  } else {
    title = book.title || 'No title available'
    category = book.category || 'No category available'
    authors = book.authors || 'No authors available'
    thumbnail = book.thumbnail || 'path/to/default/image.png'
   
  }

  const [isHovered, setIsHovered] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const isLiked = isFavorite(book.id)

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  const handleHeartClick = (e) => {
    e.preventDefault()
    if (isLiked) {
      removeFavorite(book.id)
    } else {
      addFavorite(book)
    }
  }

  useEffect(() => {
    const img = new Image()
    img.src = thumbnail
    img.onload = () => {
      console.log('Изображение успешно загружено:', thumbnail)
      setImageLoaded(true)
    };
    img.onerror = (error) => {
      console.error('Ошибка загрузки изображения:', thumbnail, error)
    
    }
  }, [thumbnail])

  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 position-relative">
      <Link
        to={`/details/${book.id}`}
        className="card h-100 text-decoration-none text-dark position-relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img
          src={thumbnail}
          className={`card-img-top book-thumbnail position-relative ${imageLoaded ? 'image-loaded' : 'image-loading-error'}`}
          alt={`${title} thumbnail`}
        />
        <div
          className={`heart-icon ${isHovered ? 'hovered' : ''} ${isLiked ? 'liked' : ''}`}
          onClick={handleHeartClick}
        >
          <HeartIcon />
        </div>
        <div className="card-body">
          <p className="card-text mt-4 card-text-category">
            <strong>Category:</strong> {category}
          </p>
          <h5 className="card-title">{title}</h5>
          <p className="card-text card-text-authors">
            <strong>Authors:</strong> {authors}
          </p>
        </div>
      </Link>
    </div>
  )
}

export default BookCard
