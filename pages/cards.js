import Header from '../layout/header';
import SearchBar from '../components/searchbar';

import { useState, useRef, useCallback, useEffect } from 'react';

import useFetchCards from '../hooks/useFetchCards';

const Cards = () => {
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState('');

    const { cards, hasNext, loading } = useFetchCards(page, query);

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
        console.log(e.target.value);
        setPage(1);
        setQuery(e.target.value);
    }

    return (
        <>
            <Header />
            <div id="cards-page">
                <main>
                    <div id="search-bar-container">
                        <SearchBar handleChange={handleSearch} value={query} placeholder="搜尋" />
                    </div>

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

const Card = ({ imageUrl, name }) => (
    <article className="cards-grid-item">
        <img className="cards-grid-item__card-img" src={imageUrl} alt={name} />
    </article>
)