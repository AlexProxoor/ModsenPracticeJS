import React from "react"


const ErrorMessage = ({error}) => {
    return (
        <p className="text-danger text-center">{error}</p>
    )
}

export default ErrorMessage 