import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../..//Firebase"
import { FaLock, FaEnvelope } from 'react-icons/fa'

const RegistrationForm = ({ toggleForm }) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [copyPassword, setcopyPassword] = useState('')
  const [error, setError] = useState('')
  function register(e) {
    e.preventDefault()
    if (copyPassword !== password) {
      setError('Passwords didnt match')
      return
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((user) => {
        console.log(user)
        setError('')
        setEmail('')
        setcopyPassword('')
        setPassword('')
        console.log('registr!')
      })
      .catch((error) => console.log(error))
  }
  return (
    <div className="wrapper">
      <div className="form-box register">
        <form onSubmit={register}> 
          <h1>Registration</h1>
          <div className="input-box">
            <input
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
            />
            <FaEnvelope className="icon" />
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <FaLock className="icon" />
            <input
                    placeholder="Enter your password again"
                    value={copyPassword}
                    onChange={(e) => setcopyPassword(e.target.value)}
                    type="password" 
                    required/>
                    <FaLock className="icon" />
          </div>
          <div className="remember-forgot">
            <label>
   
           
            </label>
          </div>
          <button type="submit">
            Register
          </button>
           {error ? <p style={{color: "red"}}>{error}</p> : ''}
          <div className="register-link">
            <p>
              Already have an account?{' '}
              <a href="/" onClick={toggleForm}>
                Login
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegistrationForm
