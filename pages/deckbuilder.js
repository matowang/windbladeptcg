import { useState, useRef, useCallback } from 'react';

import useFetchCards from '../hooks/useFetchCards';
import useObserveRef from '../hooks/useObserveRef';

import Layout from '../layout';
import FilterCardsBar from '../components/filterCardsBar';
import CardSearch from '../components/cardSearch';

const deckbuilder = () => {
    const [deck, setDeck] = useState();
    const addCard = (card) => {
        setDeck(deck => [...deck, card]);
    }

    const [page, setPage] = useState(1);
    const [query, setQuery] = useState({
        search: '',
        expansion: ''
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
        e.persist()
        console.log(e.target.value);
        setCards([])
        setPage(1);
        setQuery(query => ({ ...query, expansion: e.target.value }));
    }
    return (
        <Layout>
            <main className="deckbuilder">
                <section className="deckbuilder__deck">
                </section>
                <section className="card-search-container">
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
                                        <div key={card._id} ref={lastCardRef}><Card {...card} addCard={() => { }} /></div> :
                                        <Card key={card._id} {...card} addCard={() => { }} />
                                )}
                            </div>
                            {loading && <h4>loading...</h4>}
                        </div>
                    </div>
                </section>
            </main>
        </Layout>
    )
}

const Card = ({ _id, name, imageUrl, addCard }) =>
    <article className="deckbuilder__card" onClick={() => addCard({ _id, name, imageUrl })}>
        <img className="deckbuilder__card__img" src={imageUrl} />
    </article>


export default deckbuilder;