import React, { useState } from 'react'
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa'

const RegistrationForm = ({ toggleForm }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const register = (e) => {
    e.preventDefault()
  }

  return (
    <div className="wrapper">
      <div className="form-box register">
        <form>
          <h1>Registration</h1>
          <div className="input-box">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <FaUser className="icon" />
          </div>
          <div className="input-box">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          </div>
          <div className="remember-forgot">
            <label>
              <input type="checkbox" />
              I agree to the terms & conditions
            </label>
          </div>
          <button type="submit" onClick={register}>
            Register
          </button>
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
