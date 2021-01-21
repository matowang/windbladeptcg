import SearchBar from '../searchbar';
import ExpansionDropdown from './expansionDropdown'

const FilterCardsBar = ({
    handleSearch,
    searchQuery,
    handleExpansionDropdown,
    expansionDropdownValue
}) => {
    return (
        <header className="filter-cards-bar">
            <form className="filter-cards-bar__form" onSubmit={e => { e.preventDefault(); }}>
                <SearchBar handleChange={handleSearch} value={searchQuery} placeholder="搜尋" />
                <ExpansionDropdown handleChange={handleExpansionDropdown} value={expansionDropdownValue} />
            </form>
        </header>
    )
}

export default FilterCardsBar;