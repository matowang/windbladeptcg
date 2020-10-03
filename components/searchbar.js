const SearchBar = ({ handleChange, placeholder, value }) => {
    return (
        <div className="search-bar-container">
            <label>
                <input type="text" value={value} onChange={handleChange} placeholder={placeholder} />
            </label>
        </div>
    )
}

SearchBar.defaultProps = {
    placeholder: "Search..."
}

export default SearchBar;