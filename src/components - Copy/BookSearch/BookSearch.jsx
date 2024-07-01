import React from 'react'
import searchIcon from '../../assets/search.svg'

const BookSearch = ({ query, onInputChange, onSearchClick, onSearchSubmit }) => {
  return (
    <form className="row justify-content-center mb-4" onSubmit={onSearchSubmit}>
      <div className="col-12 col-md-6 col-md-5 d-flex search-container">
        <input
          type="text"
          className="form-control mb-2 flex-grow-1"
          value={query}
          onChange={onInputChange}
          placeholder="Enter search terms"
        />
        <div className="search-icon-container">
          <img src={searchIcon} alt="Search" className="search-icon" onClick={onSearchClick} />
        </div>
      </div>
    </form>
  )
}

export default BookSearch
