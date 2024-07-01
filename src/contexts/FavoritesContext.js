import React, { createContext, useState, useContext } from 'react'

const FavoritesContext = createContext()

export const useFavorites = () => {
  return useContext(FavoritesContext)
}

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([])

  const addFavorite = (book) => {
    setFavorites((prevFavorites) => [...prevFavorites, book])
  }

  const removeFavorite = (bookId) => {
    setFavorites((prevFavorites) => prevFavorites.filter(book => book.id !== bookId))
  }

  const isFavorite = (bookId) => {
    return favorites.some(book => book.id === bookId)
  }

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}
