import { onAuthStateChanged, signOut } from "firebase/auth"
import React, { useEffect, useState } from "react"
import { auth } from "../../Firebase"

const AuthDetails = () => {
    const [authUser, setAuthUser] = useState(null)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user)
            } else {
                setAuthUser(null)
            }
        })
        return () => unsubscribe()
    }, [])

    const userSignOut = () => {
        signOut(auth)
        .then(() => console.log('Successfully signed out'))
        .catch((error) => console.error('Sign out error:', error))
    }

    return (
        <div>
            {authUser ? (
                <div>
                    <p>{`Signed in as ${authUser.email}`}</p>
                    <button onClick={userSignOut}>Sign Out</button>
                </div>
            ) : (
                <p>Not signed in</p>
            )}
        </div>
    )
}

export default AuthDetails
