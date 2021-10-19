import { useState, useRef, useCallback } from 'react';

import FilterCardsBar from './filterCardsBar';
import LoadingCard from './loadingCard';

import useFetchCards from '../hooks/useFetchCards';
import useObserveRef from '../hooks/useObserveRef';

const CardSearch = ({
    CardComponent
}) => {
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState({
        search: '',
        expansion: 'ALL'
    });

    const { cards, hasNext, loading, setCards } = useFetchCards(page, query);

    const lastCardRef = useObserveRef(() => {
        if (hasNext && !loading) {
            setPage(page => page + 1);
            console.log('see last');
        }
    });

    const handleSearch = (e) => {
        e.persist()
        console.log(e.target.value);
        setCards([]);
        setPage(1);
        setQuery(query => ({ ...query, search: e.target.value }));
    }

    const handleExpansionDropdown = (e) => {
        console.log(e.target.value);
        setCards([])
        setPage(1);
        setQuery(query => ({ ...query, expansion: e.target.value }));
    }

    return (

        <div className="card-search">
            <FilterCardsBar
                handleSearch={handleSearch}
                searchQuery={query.search}
                handleExpansionDropdown={handleExpansionDropdown}
                expansionDropdownValue={query.expansion} />

            <div className="card-search__cards-container">
                <div className="card-search__grid">
                    {cards.map((card, i) =>
                        i === cards.length - 1 ?
                            <div key={card._id} ref={lastCardRef}><CardComponent {...card} /></div> :
                            <CardComponent key={card._id} {...card} />
                    )}
                    {loading && [...Array(8).keys()].map(k => <LoadingCard key={"loading-card" + k} />)}
                </div>
                {cards.length === 0 && !loading && <div className="no-cards">無相關卡片</div>}

            </div>
        </div>
    )
}
export default CardSearch;