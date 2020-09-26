const SearchBar = ({ handleChange, placeholder, value }) => {
    return <input type="text" value={value} onChange={handleChange} placeholder={placeholder} />
}

SearchBar.defaultProps = {
    placeholder: "Search..."
}

export default SearchBar;