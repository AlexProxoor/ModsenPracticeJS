import React, { useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../Firebase"

const SignIn = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const login = (e) => {
        e.preventDefault()
       
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
               
                const user = userCredential.user
                console.log(user)
                setError('')
                setEmail('')
                setPassword('')
            })
            .catch((error) => {
                console.error('Sign in error:', error)
                setError('Sorry, could not sign in. Please check your credentials.')
            })
    }

    return (
        <div>
            <form onSubmit={login}>
                <h2>Login</h2>
                <input
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email" />
                <input
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password" />
                
                <button type="submit">Login</button>
                {error && <p style={{ color: "red" }}>{error}</p>}
            </form>
        </div>
    )
}

export default SignIn
