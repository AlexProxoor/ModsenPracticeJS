import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from '../../../Firebase'

const LoginForm = ({ toggleForm }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const login = (e) => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        console.log(user)
        setError('')
        setEmail('')
        setPassword('')
        navigate('/favorites')
      })
      .catch((error) => {
        console.log(error);
        setError('Sorry, couldn\'t find your account')
      })
  }

  return (
    <div className="wrapper">
      <div className="form-box login">
        <form>
          <h1>Login</h1>
          {error && <div className="error-message">{error}</div>}
          <div className="input-box">
            <input
              type="text"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
           
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
           
          </div>
          <div className="remember-forgot">
            <label>
              <input type="checkbox" />
              Remember me
            </label>
            <a href="/" onClick={(e) => e.preventDefault()}>
              Forgot password?
            </a>
          </div>
          <button type="submit" onClick={login}>
            Login
          </button>
          <div className="register-link">
            <p>
              Don't have an account?{' '}
              <a href="/" onClick={toggleForm}>
                Register
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginForm
