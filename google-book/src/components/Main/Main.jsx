import React, { useState, useEffect } from 'react'  
import 'bootstrap/dist/css/bootstrap.min.css'
import './Main.css'
import { MAX_RESULTS } from '../../constants'
import { searchBooks } from '../../api'
import BookSearch from '../BookSearch/BookSearch'
import BookCategories from '../BookCategories/BookCategories'
import BookSorting from '../BookSorting/BookSorting'
import Pagination from '../Pagination/Pagination'
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import BookCard from '../BookCard/BookCard'

function Main() {
  const [query, setQuery] = useState('')
  const [categories, setCategories] = useState('all')
  const [sort, setSort] = useState('relevance')
  const [books, setBooks] = useState([])
  const [totalBooks, setTotalBooks] = useState(0)
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const apiKey = process.env.REACT_APP_GOOGLE_API_KEY

  useEffect(() => {
    if (!query) {
      return;
    }

    const startIndex = page * MAX_RESULTS
    setLoading(true)
    setError(null)
    const filterDuplicates = (items) => {
      const uniqueItems = items.filter((item, index, self) =>
        index === self.findIndex((t) => (
          t.id === item.id
        ))
      )
      return uniqueItems
    }
    
    
    async function fetchData() {
      try {
        const { items, totalItems } = await searchBooks(query, categories, sort, apiKey, startIndex, MAX_RESULTS)
    
   
        const uniqueItems = filterDuplicates(items);
    
        if (page === 0) {
          setBooks(uniqueItems)
        } else {
          setBooks((prevBooks) => [...prevBooks, ...uniqueItems])
        }
        setTotalBooks(totalItems)
      } catch (error) {
        setError(error.message || 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchData();
  }, [query, categories, sort, page, apiKey])

  const handleInputChange = (event) => {
    setQuery(event.target.value)
  }

  const handleSelectChange = (event) => {
    setCategories(event.target.value)
  }
  const handleSortChange = (event) => {
    setSort(event.target.value)
  }

  const handleSearchClick = () => {
    setPage(0)
  }

  const handleLoadMoreClick = () => {
    setPage(page + 1)
  }

  const handleSearchSubmit = (event) => {
    event.preventDefault()
    setPage(0)
  }

  return (
    <div className="container-fluid p-0">
      <div className="bg-image-container">
        <div className="bg-image"></div>

        <div className="search-container">
          <h1 className="mb-2 mt-2 text-white">Book Search</h1>

          <BookSearch
            query={query}
            onInputChange={handleInputChange}
            onSearchClick={handleSearchClick}
            onSearchSubmit={handleSearchSubmit}
          />

          <div className="row justify-content-center mb-4">
            <BookCategories
              categories={categories}
              onSelectChange={handleSelectChange}
            />

            <BookSorting
              sort={sort}
              onSortChange={handleSortChange}
            />
          </div>
        </div>
      </div>

      <div className="container-fluid mt-4">
        {loading && <LoadingIndicator />}

        {error && <ErrorMessage error={error} />}

        {books.length > 0 && (
          <p className="text-center mb-4 books-found">
            Found {totalBooks} books in total, showing {books.length} books on this page
          </p>
        )}

        <div className="row row-cols-md-4 g-4">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>

        {books.length > 0 && (
          <Pagination
            loading={loading}
            onLoadMoreClick={handleLoadMoreClick}
          />
        )}
      </div>
    </div>
  )
}

export default Main 