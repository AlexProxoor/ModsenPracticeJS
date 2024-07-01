import React from "react"

const LoadingIndicator =() => {
    return(
        <div className="text-center mb-4">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
}
export default LoadingIndicator