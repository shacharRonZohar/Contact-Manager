import React, { useEffect, useState } from 'react'

export function ContactFilter({ onSetFilter }) {

    const [filter, setFilter] = useState({ status: '' })

    useEffect(() => {
        onSetFilter(filter)
    }, [filter])

    const handleChange = ({ target }) => {
        // ev.persist()
        setFilter({ status: target.value })
        // onSetFilter(filter)
    }

    return (
        <form className="contact-filter">
            <label htmlFor="all">
            <input type="radio" name="status" id="all" value="" onChange={handleChange} />
            all
            </label>
            <label htmlFor="first">
            <input type="radio" name="status" id="first" value="first-step" onChange={handleChange} />
            first step 
            </label>
            <label htmlFor="second">
            <input type="radio" name="status" id="second" value="second-step" onChange={handleChange} />
            second step
            </label>
            <label htmlFor="third">
            <input type="radio" name="status" id="third" value="third-step" onChange={handleChange} />
            third step
            </label>
        </form>
    )
}
