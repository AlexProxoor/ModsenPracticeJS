import React from "react"
import SingIn from "./Auth/SingIn"
import SingUp from "./Auth/SingUp"
import AuthDetails from "./Auth/AuthDetails"

function Auto() {
    return (
        <div>
            <SingUp></SingUp>
            <SingIn></SingIn>
            <AuthDetails></AuthDetails>

        </div>
    )
}

export default Auto