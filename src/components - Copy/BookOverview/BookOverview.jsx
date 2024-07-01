import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import './BookOverview.css'

const BookOverview = () => {
  const { bookId } = useParams()
  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const goBack = () => navigate(-1)

  useEffect(() => {
    const fetchBookOverview = async () => {
      try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${bookId}`)
        setBook(response.data);
      } catch (error) {
        setError(error.message || 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchBookOverview();
  }, [bookId])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  const volumeInfo = book?.volumeInfo;
  const title = volumeInfo?.title || 'No title available'
  const categories = volumeInfo?.categories ? volumeInfo.categories.join(', ') : 'No categories available'
  const authors = volumeInfo?.authors ? volumeInfo.authors.join(', ') : 'No authors available'
  const description = volumeInfo?.description ? volumeInfo.description.replace(/<[^>]*>/g, '') : 'No description available'
  const thumbnail = volumeInfo?.imageLinks?.thumbnail || ''

  return (
    <div className="container-fluid mt-5 bg-light text-dark book-details-container">
      <div className="row">
        <div className="col-md-6">
          {thumbnail && <img src={thumbnail} alt={`${title} thumbnail`} className="book-thumbnail img-fluid" />}
       
        </div>
        
        <div className="col-md-6">
          <div className="p-4">
           
            <p className="category-text"><strong>Categories:</strong> {categories}</p>
            <h1 className="text-center mb-4">{title}</h1>
            <p className="authors-text"><strong>Authors:</strong> {authors}</p>
            <p><strong>Description:</strong> {description}</p>
             <button onClick={goBack}>Back</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookOverview
