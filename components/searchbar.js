const SearchBar = ({ handleChange, placeholder, value }) => {
    return (
        <label>
            <input type="text" value={value} onChange={handleChange} placeholder={placeholder} />
        </label>)
}

SearchBar.defaultProps = {
    placeholder: "Search..."
}

export default SearchBar;