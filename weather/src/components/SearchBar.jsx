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
        <section className="my-5">
            <form onSubmit={submitSearch}>
                <input
                    type="text"
                    value={search}
                    onChange={toggleChange}
                    onSubmit={submitSearch}
                    placeholder="Search for a city..."
                    className="bg-light-transparent rounded-full px-3 py-1 2xs:w-64 xs:w-80 outline-none transition-all" />
                <button
                    onSubmit={submitSearch}
                    className="brightness-60 w-8 h-8 mx-1 bg-light-transparent 2xs:hidden xs:inline-block rounded-full"><i className="fa-solid fa-magnifying-glass  "></i></button>
            </form>
        </section>
    )
}