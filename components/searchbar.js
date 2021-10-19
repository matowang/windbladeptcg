import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({ handleChange, placeholder, value }) => {
    return (
        <div className="search-bar-container">
            <SearchIcon />
            <input type="text" value={value} onChange={handleChange} placeholder={placeholder} />
        </div>
    )
}

SearchBar.defaultProps = {
    placeholder: "Search..."
}

export default SearchBar;