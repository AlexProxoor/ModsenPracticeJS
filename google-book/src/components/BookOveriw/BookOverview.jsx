import React from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import './BookOverview.css'

function BookOverview() {
  const { bookId } = useParams()
  const [book, setBook] = React.useState(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    const fetchBookOverview = async () => {
      try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${bookId}`)
        setBook(response.data)
      } catch (error) {
        setError(error.message || 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchBookOverview()
  }, [bookId])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  const volumeInfo = book.volumeInfo
  const title = volumeInfo.title || 'No title available'
  const categories = volumeInfo.categories ? volumeInfo.categories.join(', ') : 'No categories available'
  const authors = volumeInfo.authors ? volumeInfo.authors.join(', ') : 'No authors available'
  const description = volumeInfo.description || 'No description available'
  const thumbnail = volumeInfo.imageLinks ? volumeInfo.imageLinks.thumbnail : ''

  return (
    <div className="container-fluid mt-5 bg-light text-dark book-details-container">
      <div className="row">
        <div className="col-md-6">
          {thumbnail && <img src={thumbnail} alt={`${title} thumbnail`} className="book-thumbnail img-fluid" style={{ maxWidth: '900px', maxHeight: '600px', overflow: 'hidden', margin: '0 auto', marginTop: '20px', boxShadow: '0 20px 30px rgba(0, 0, 0, 0.9)' }} />}
        </div>
        <div className="col-md-6">
          <div className="p-4">
            <p style={{ fontFamily: 'Arial, sans-serif', color: '#636060' }}><strong></strong> {categories}</p>
            <h1 className="text-center mb-4">{title}</h1>

            <p style={{ fontFamily: 'Georgia, serif', color: 'rgba(102, 102, 102, 0.8)', textDecoration: 'underline' }}><strong ></strong> {authors}</p>
            <p><strong>Description:</strong> {description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookOverview
