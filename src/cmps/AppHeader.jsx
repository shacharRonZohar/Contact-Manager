import React from 'react'
import { Link } from 'react-router-dom'

export default function AppHeader() {
    return (
        <section className="app-header flex align-center">
            <div className="logo"><h1>Leads Manager</h1></div>
            <nav className="flex space-around">
                <Link to='/'>home</Link>
                <Link to='/editMsg'>edit messeges</Link>
            </nav>
        </section>
    )
}
