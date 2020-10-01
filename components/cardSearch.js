import { useState, useRef, useCallback } from 'react';

import FilterCardsBar from './filterCardsBar';

import useFetchCards from '../hooks/useFetchCards';

const CardSearch = ({
    CardComponent
}) => {
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState({
        search: '',
        expansion: ''
    });

    const { cards, hasNext, loading, setCards } = useFetchCards(page, query);

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

        <div className="card-search">
            <FilterCardsBar
                handleSearch={handleSearch}
                searchQuery={query.search}
                handleExpansionDropdown={handleExpansionDropdown}
                expansionDropdownValue={query.expansion} />

            <div className="card-search__grid">
                {cards.map((card, i) =>
                    i === cards.length - 1 ?
                        <div key={card._id} ref={lastCardRef}><CardComponent {...card} /></div> :
                        <CardComponent key={card._id} {...card} />
                )}
            </div>
            {loading && <h4>loading...</h4>}
        </div>
    )
}
export default CardSearch;