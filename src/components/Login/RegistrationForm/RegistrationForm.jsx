import React, { useState } from 'react'


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
          
          </div>
          <div className="input-box">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
        
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
