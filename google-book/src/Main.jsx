import React, { useState } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import './Main.css'
import { Link } from 'react-router-dom'
import searchIcon from './assets/search.svg'

function Main() {
  const [query, setQuery] = useState('')
  const [categories, setCategories] = useState('all')
  const [sort, setSort] = useState('relevance')
  const [books, setBooks] = useState([])
  const [totalBooks, setTotalBooks] = useState(0)
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const apiKey = 'AIzaSyDMq8pkuHoPE7PO3hdiUi87YTA2nnn3sXs'

  const searchBooks = async (newPage = 0) => {
    if (!query) {
      setError('Enter a search query')
      return
    }

    setLoading(true)
    setError(null)

    const categ_url = categories === 'all' ? '' : `+subject:${categories}`
    const sort_url = `&orderBy=${sort}`
    const startIndex = newPage * 30
    const url = `https://www.googleapis.com/books/v1/volumes?q=${query}${categ_url}${sort_url}&key=${apiKey}&maxResults=30&startIndex=${startIndex}`

    try {
      const response = await axios.get(url)

      if (response.status !== 200) {
        throw new Error(`HTTP status ${response.status}`)
      }

      if (newPage === 0) {
        setBooks(response.data.items || [])
      } else {
        setBooks((prevBooks) => [...prevBooks, ...(response.data.items || [])])
      }
      setTotalBooks(response.data.totalItems || 0)
      setPage(newPage)
    } catch (error) {
      setError(error.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (event) => {
    setQuery(event.target.value)
  }

  const handleSelectChange = (event) => {
    setCategories(event.target.value)
  }

  const handleSelect2Change = (event) => {
    setSort(event.target.value)
  }

  const handleSearchClick = () => {
    searchBooks(0)
  }

  const handleLoadMoreClick = () => {
    searchBooks(page + 1)
  }

  const handleSearchSubmit = (event) => {
    event.preventDefault()
    searchBooks(0)
  }

  const getFirstCategory = (categories) => {
    if (!categories || categories.length === 0) {
      return 'No category available'
    }
    return categories[0]
  }

  const renderAuthors = (authors) => {
    if (!authors || authors.length === 0) {
      return 'No authors available'
    }
    return authors.join(', ')
  }

  return (
    <div className="container-fluid p-0">
      <div className="bg-image-container">
        <div className="bg-image"></div>

        <div className="search-container">
          <h1 className="mb-2 mt-2 text-white">Book Search</h1>
          <form className="row justify-content-center mb-4" onSubmit={handleSearchSubmit}>
            <div className="col-md-5 d-flex search-container">
              <input
                type="text"
                className="form-control mb-2 flex-grow-1"
                value={query}
                onChange={handleInputChange}
                placeholder="Enter search terms"
              />
              <div className="search-icon-container">
                <img src={searchIcon} alt="Search" className="search-icon" onClick={handleSearchClick} />
              </div>
            </div>
          </form>

          <div className="row justify-content-center mb-4">
            <div className="col-md-3 d-flex align-items-center">
              <span className="me-2 text-white fw-bold">Categories:</span>
              <select
                className="form-select mb-2 custom-select"
                value={categories}
                onChange={handleSelectChange}
                style={{ marginRight: '10px' }}
              >
                <option value="all">All Categories</option>
                <option value="art">Art</option>
                <option value="biography">Biography</option>
                <option value="computers">Computers</option>
                <option value="history">History</option>
                <option value="medical">Medical</option>
                <option value="poetry">Poetry</option>
              </select>
            </div>
            <div className="col-md-3 d-flex align-items-center">
              <span className="me-2 text-white fw-bold">Sorting_by:</span>
              <select
                className="form-select mb-2 custom-select"
                value={sort}
                onChange={handleSelect2Change}
                style={{ marginLeft: '30px' }}
              >
                <option value="relevance">Relevance</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid mt-4">
        {loading && (
          <div className="text-center mb-4">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {error && <p className="text-danger text-center">{error}</p>}

        {books.length > 0 && (
          <p className="text-center mb-4" style={{ fontFamily: 'Times New Roman, serif', fontSize: '20px', fontWeight: 'bold', fontStyle: 'italic', color: '#000000' }}>
            Found {totalBooks} books in total, showing {books.length} books on this page
          </p>
        )}
        

        <div className="row row-cols-md-4 g-4">
          {books.map((book, index) => {
            const volumeInfo = book.volumeInfo
            const title = volumeInfo.title || 'No title available'
            const category = getFirstCategory(volumeInfo.categories)
            const authors = renderAuthors(volumeInfo.authors)
            const thumbnail = volumeInfo.imageLinks ? volumeInfo.imageLinks.thumbnail : ''

            return (
              <div key={index} className="col mb-4">
                <Link to={`/details/${book.id}`} className="card h-100 text-decoration-none text-dark">
                  <div className="card-img-container" style={{ maxWidth: '150px', maxHeight: '200px', overflow: 'hidden', margin: '0 auto', marginTop: '20px', boxShadow: '0 20px 30px rgba(0, 0, 0, 0.9)' }}>
                    {thumbnail && (
                      <img
                        src={thumbnail}
                        className="card-img-top book-thumbnail"
                        alt={`${title} thumbnail`}
                        style={{ width: '100%', height: '100%', display: 'block' }}
                      />
                    )}
                  </div>
                  <div className="card-body">
                    <p className="card-text mt-4" style={{ fontFamily: 'Arial, sans-serif', color: '#636060', textDecoration: 'underline' }}>
                      <strong></strong> {category}
                    </p>
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text" style={{ fontFamily: 'Georgia, serif', color: 'rgba(102, 102, 102, 0.8)' }}>
                      <strong></strong> {authors}
                    </p>
                  </div>
                </Link>
              </div>
            )
          })}
        </div>

        {books.length > 0 && (
          <div className="text-center mb-4">
            <button className="btn btn-primary" onClick={handleLoadMoreClick} disabled={loading}>
              {loading ? 'Loading...' : 'Load more'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Main
