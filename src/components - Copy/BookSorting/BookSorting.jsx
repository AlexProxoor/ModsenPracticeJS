import React from 'react'
import { sortOptions } from '../../constants'
import './BookSorting.css'

const BookSorting = ({ sort, onSortChange }) => {
  return (
    <div className="col-12 col-sm-6 col-md-4 d-flex book-sorting-container">
      <span className="me-2 text-white fw-bold">Sorting_by:</span>
      <select
        className="form-select mb-2 custom-select sort-select "
        value={sort}
        onChange={onSortChange}
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default BookSorting
