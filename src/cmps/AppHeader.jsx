import React from 'react'
import { Link } from 'react-router-dom'

export default function AppHeader() {
    return (
        <section className="app-header">
            <Link to='/'>home</Link>| 
            <Link to='/editMsg'>edit messeges</Link>
        </section>
    )
}
