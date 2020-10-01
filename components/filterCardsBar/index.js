import SearchBar from '../searchbar';
import ExpansionDropdown from './expansionDropdown'

const FilterCardsBar = ({
    handleSearch,
    searchQuery,
    handleExpansionDropdown,
    expansionDropdownValue
}) =>
    <header className="filter-cards-bar">
        <form className="filter-cards-bar__form">
            <div className="search-bar-container">
                <SearchBar handleChange={handleSearch} value={searchQuery} placeholder="搜尋" />
            </div>
            <ExpansionDropdown handleChange={handleExpansionDropdown} value={expansionDropdownValue} />
        </form>
    </header>

export default FilterCardsBar;