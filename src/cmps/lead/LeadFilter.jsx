
export function LeadFilter({ onSetFilter }) {

    const handleChange = ({ target }) => {
        onSetFilter({ status: target.value })
    }

    return (
        <form className="lead-filter">
            <label htmlFor="all">
            <input type="radio" name="status" id="all" value="" onChange={handleChange} />
            all
            </label>
            <label htmlFor="first">
            <input type="radio" name="status" id="first" value="first-step" onChange={handleChange} />
            checked
            </label>
            <label htmlFor="second">
            <input type="radio" name="status" id="second" value="second-step" onChange={handleChange} />
            invited
            </label>
            <label htmlFor="third">
            <input type="radio" name="status" id="third" value="third-step" onChange={handleChange} />
            finished process
            </label>
        </form>
    )
}
