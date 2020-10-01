import Header from '../layout/header';
import SearchBar from '../components/searchbar';

import { useState, useRef, useCallback, useEffect } from 'react';

import useFetchCards from '../hooks/useFetchCards';

import cardExpansionData from '../data/card-expansion.json';

const Cards = () => {
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState({
        search: '',
        expansion: ''
    });

    const { cards, hasNext, loading, setCards, fetchController } = useFetchCards(page, query);

    const observer = useRef();

    const lastCardRef = useCallback(node => {
        if (observer.current) observer.current.disconnect();
        console.log("hasNext?", hasNext);
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasNext && !loading) {
                setPage(page => page + 1);
                console.log('see last');
            }
        });

        if (node) {
            observer.current.observe(node);
            console.log("create last node");
        }
    }, [loading, hasNext]);

    const handleSearch = (e) => {
        e.persist()
        console.log(e.target.value);
        setCards([]);
        setPage(1);
        setQuery(query => ({ ...query, search: e.target.value }));
    }

    const handleExpansionDropdown = (e) => {
        e.persist()
        console.log(e.target.value);
        setCards([])
        setPage(1);
        setQuery(query => ({ ...query, expansion: e.target.value }));
    }

    return (
        <>
            <Header />
            <div id="cards-page">
                <main>
                    <FilterCardsBar
                        handleSearch={handleSearch}
                        searchQuery={query.search}
                        handleExpansionDropdown={handleExpansionDropdown}
                        expansionDropdownValue={query.expansion} />

                    <div className="cards-grid">
                        {cards.map((card, i) =>
                            i === cards.length - 1 ?
                                <div key={card._id} ref={lastCardRef}><Card {...card} /></div> :
                                <Card key={card._id} {...card} />
                        )}
                    </div>
                    {loading && <h4>loading...</h4>}
                </main>
            </div>
        </>
    )
}

export default Cards;

const FilterCardsBar = ({
    handleSearch,
    searchQuery,
    handleExpansionDropdown,
    expansionDropdownValue
}) => (
        <header className="filter-cards-bar">
            <form className="filter-cards-bar__form">
                <div className="search-bar-container">
                    <SearchBar handleChange={handleSearch} value={searchQuery} placeholder="搜尋" />
                </div>
                <ExpansionDropdown handleChange={handleExpansionDropdown} value={expansionDropdownValue} />
            </form>
        </header>
    )

const ExpansionDropdown = ({ handleChange, value }) => (
    <label>擴充:
        <select value={value} onChange={handleChange}>
            {cardExpansionData.map(el =>
                <option key={el.code} value={el.code}>{el.name}</option>
            )}
            <option value="">{"全部"}</option>
        </select>
    </label>
)

const Card = ({ imageUrl, name }) => (
    <article className="cards-grid-item">
        <img className="cards-grid-item__card-img" src={imageUrl} alt={name} />
    </article>
)