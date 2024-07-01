import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './BookCard.css'
import { ReactComponent as HeartIcon } from '../../assets/icons/heart.svg'
import { useFavorites } from '../../contexts/FavoritesContext'

const BookCard = ({ book }) => {
  const volumeInfo = book.volumeInfo
  const title = volumeInfo.title || 'No title available'
  const category = volumeInfo.categories ? volumeInfo.categories[0] : 'No category available'
  const authors = volumeInfo.authors ? volumeInfo.authors.join(', ') : 'No authors available'
  const thumbnail = volumeInfo.imageLinks ? volumeInfo.imageLinks.thumbnail : ''

  const { addFavorite, removeFavorite, isFavorite } = useFavorites()
  const [isHovered, setIsHovered] = useState(false)
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
      removeFavorite(book.id);
    } else {
      addFavorite(book)
    }
  }

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
          className="card-img-top book-thumbnail position-relative"
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
