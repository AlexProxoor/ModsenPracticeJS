import React from "react"
import { categoriesList } from '../../constants'
import './BookCategories.css'
const BookCategories = ({ categories, onSelectChange }) => {
    return (
        <div className="col-12 col-sm-6 col-md-4 d-flex book-categories-container">
            <span className="me-2 text-white fw-bold">Categories:</span>
            <select
                className="form-select mb-2 custom-select book-categories-select"
                value={categories}
                onChange={onSelectChange}
               
            >
                {categoriesList.map((category) => (
                    <option key={category.value} value={category.value}>
                        {category.label}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default BookCategories