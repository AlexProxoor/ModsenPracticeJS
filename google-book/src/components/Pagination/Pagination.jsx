import React from "react"

const Pagination = ({loading,onLoadMoreClick }) => {
    return(
        <div className="text-center mb-4">
        <button className="btn btn-primary" onClick={onLoadMoreClick} disabled={loading}>
          {loading ? 'Loading...' : 'Load more'}
        </button>
      </div>
    )
}

export default Pagination