import React, { createContext, useState, useContext, useEffect } from 'react'
import { auth, db } from '../Firebase'
import { collection, doc, setDoc, deleteDoc, getDocs } from "firebase/firestore"
import { onAuthStateChanged } from "firebase/auth"

const FavoritesContext = createContext()

export const useFavorites = () => {
  return useContext(FavoritesContext)
}

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([])
  const [user, setUser] = useState(null)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
        console.log('user')
      } else {
        setUser(null)
      }
    })

    return () => unsubscribe()
  }, [])

  useEffect(() => {
    if (user) {
      const fetchFavorites = async () => {
        const favoritesCollection = collection(db, "favorites", user.uid, "books")
        const favoritesSnapshot = await getDocs(favoritesCollection)
        const favoritesList = favoritesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        setFavorites(favoritesList)
      }

      fetchFavorites()
    } else {
      setFavorites([])
    }
  }, [user])

  
  const addFavorite = async (book) => {
    
    try {
      if (user) {
        const bookRef = doc(db, "favorites", user.uid, "books", book.id)
        await setDoc(bookRef, {
          title: book.volumeInfo.title || 'No title available',
          category: book.volumeInfo.categories ? book.volumeInfo.categories[0] : 'No category available',
          authors: book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'No authors available',
          thumbnail: book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : 'купукпуук'
        })
        setFavorites((prevFavorites) => [...prevFavorites, { id: book.id, ...book.volumeInfo }])
        console.log('AAAAAAAdding book to favorites:', book)
        window.location.reload()
      }
    } catch (error) {
      console.error('Error adding book to favorites:', error)
    }
  }
  

  const removeFavorite = async (bookId) => {
    if (user) {
      const bookRef = doc(db, "favorites", user.uid, "books", bookId)
      await deleteDoc(bookRef)
      setFavorites((prevFavorites) => prevFavorites.filter(book => book.id !== bookId))
    }
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
