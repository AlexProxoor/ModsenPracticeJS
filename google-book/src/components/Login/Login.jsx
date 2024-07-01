import React, { useState } from 'react'
import LoginForm from './LoginForm/LoginForm'
import RegistrationForm from './RegistrationForm/RegistrationForm'
import './Login.css'

const Login = () => {
  const [isLoginForm, setIsLoginForm] = useState(true)

  const toggleForm = (event) => {
    event.preventDefault()
    setIsLoginForm(!isLoginForm)
  }

  return (
    <div className="form-container">
      {isLoginForm ? (
        <LoginForm toggleForm={toggleForm} />
      ) : (
        <RegistrationForm toggleForm={toggleForm} />
      )}
    </div>
  )
}

export default Login
