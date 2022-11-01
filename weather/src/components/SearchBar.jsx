import { useState } from "react"

export default function SearchBar(props) {

    const { getLatLong } = props
    const [search, setSearch] = useState("")

    const toggleChange = (e) => {
        setSearch(e.target.value)
    }

    const submitSearch = (e) => {
        e.preventDefault()
        getLatLong(search)
        setSearch("")
    }

    return (
        <section className="my-6">
            <form onSubmit={submitSearch}>
                <input
                    type="text"
                    value={search}
                    onChange={toggleChange}
                    onSubmit={submitSearch}
                    placeholder="Search for a city..."
                    className="bg-light-transparent rounded-full px-3 py-1 w-80 outline-none" />
                <button
                    onSubmit={submitSearch}
                    className="brightness-50 w-8 h-8 mx-1 bg-light-transparent rounded-full"><i className="fa-solid fa-magnifying-glass "></i></button>
            </form>
        </section>
    )
}