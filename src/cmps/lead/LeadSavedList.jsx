import React, { useState } from 'react'

export default function LeadSavedLists({ savedLists, setCurrList }) {
    const [isListOpen, setIsListOpen] = useState(false)

    return (
        <section className="saved-lists-container">
            <ul className={`lead-saved-list clean-list flex column ${isListOpen ? 'list-open' : ''}`}>
                {savedLists.map((list) => <li key={list.id} onClick={() => setCurrList(list.leads)}>
                    {list.title}
                </li>)}
            </ul>
            <button className="saved-list-btn" onClick={() => setIsListOpen(!isListOpen)}>my lists</button>
        </section>
    )
}
