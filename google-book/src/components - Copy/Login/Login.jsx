import React, { useState } from 'react'
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa"
import './Login.css'

function Login() {
    const [isLoginForm, setIsLoginForm] = useState(true)

    const toggleForm = (event) => {
        preventDefault(event)
        setIsLoginForm(!isLoginForm)
    }

    const preventDefault = (event) => {
        event.preventDefault()
    }

    return (
        <div className="form-container">
            {isLoginForm ? (
                <div className="wrapper">
                    <div className="form-box login">
                        <form action="">
                            <h1>Login</h1>
                            <div className="input-box">
                                <input type="text" placeholder="Username" required />
                                <FaUser className="icon" />
                            </div>
                            <div className="input-box">
                                <input type="password" placeholder="Password" required />
                                <FaLock className="icon" />
                            </div>
                            <div className="remember-forgot">
                                <label>
                                    <input type="checkbox" />
                                    Remember me
                                </label>
                                <a href="/" onClick={preventDefault}>Forgot password?</a>
                            </div>
                            <button type="submit">Login</button>
                            <div className="register-link">
                                <p>Don't have an account? <a href="/" onClick={toggleForm}>Register</a></p>
                            </div>
                        </form>
                    </div>
                </div>
            ) : (
                <div className="wrapper">
                    <div className="form-box register">
                        <form action="">
                            <h1>Registration</h1>
                            <div className="input-box">
                                <input type="text" placeholder="Username" required />
                                <FaUser className="icon" />
                            </div>
                            <div className="input-box">
                                <input type="email" placeholder="Email" required />
                                <FaEnvelope className="icon" />
                            </div>
                            <div className="input-box">
                                <input type="password" placeholder="Password" required />
                                <FaLock className="icon" />
                            </div>
                            <div className="remember-forgot">
                                <label>
                                    <input type="checkbox" />
                                    I agree to the terms & conditions
                                </label>
                            </div>
                            <button type="submit">Register</button>
                            <div className="register-link">
                                <p>Already have an account? <a href="/" onClick={toggleForm}>Login</a></p>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Login
