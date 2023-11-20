import React from "react"
import NavBar from "./NavBar"

export default function Header () {

    return (
        <header className="d-inline-flex align-items-center m-4">
            <h1 className="m-auto">Agrarian</h1>
            <NavBar />
        </header>
    )

}