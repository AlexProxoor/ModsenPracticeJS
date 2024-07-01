import { createUserWithEmailAndPassword } from "firebase/auth"
import React, { useState } from "react"
import { auth } from "../../Firebase"

const SingUp = () => {
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
            })
            .catch((error) => console.log(error))
    }

    return (
        <div>
            <form onSubmit={register}>
                <h2>Create an account</h2>
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
                <input
                    placeholder="Enter your password again"
                    value={copyPassword}
                    onChange={(e) => setcopyPassword(e.target.value)}
                    type="password" />
                <button>Create</button>
                {error ? <p style={{color: "red"}}>{error}</p> : ''}
            </form>

        </div>
    )
}

export default SingUp