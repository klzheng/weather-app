export default function SearchBar() {
    return (
        <section className="my-8">
            <input 
                type="text" 
                placeholder="Search for a city..."
                className="bg-light-transparent rounded-full px-3 py-1" />
            <button className="brightness-50 w-8 h-8 bg-light-transparent rounded-full"><i className="fa-solid fa-magnifying-glass "></i></button>
        </section>
    )
}