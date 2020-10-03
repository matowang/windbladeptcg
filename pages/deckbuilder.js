import { useState, useRef, useCallback } from 'react';

import useFetchCards from '../hooks/useFetchCards';
import useObserveRef from '../hooks/useObserveRef';

import Layout from '../layout';
import FilterCardsBar from '../components/filterCardsBar';

const deckbuilder = () => {
    const [deck, setDeck] = useState([]);
    const addCard = (card) => {
        setDeck(deck => {
            const cardIdx = deck.findIndex(c => c._id === card._id);
            if (cardIdx === -1)
                return [...deck, { ...card, count: 1 }];
            if (deck[cardIdx].count >= 4)
                return deck;

            const newCard = { ...card, count: deck[cardIdx].count + 1 }
            return Object.assign([], deck, { [cardIdx]: newCard });
        });
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
                <section className="deckbuilder__deck-section">
                    <div className="deckbuilder__deck">{deck.map(card => (
                        <DeckCard {...card} />
                    ))}
                        {deck.length === 0 && <div className="deckbuilder__deck__empty">
                            <div className="deckbuilder__deck__empty__text">您點的卡片會在著裡出現</div>
                        </div>}
                    </div>
                </section>
                <section className="deckbuilder__search">
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
                                        <div key={card._id} ref={lastCardRef}><Card {...card} addCard={(card) => addCard(card)} /></div> :
                                        <Card key={card._id} {...card} addCard={(card) => addCard(card)} />
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

const DeckCard = ({ name, count, imageUrl }) => (
    <article className="deckbuilder__deck-card">
        <img className="deckbuilder__deck-card__img" src={imageUrl} alt={name} />
        <h2 className="deckbuilder__deck-card__name">{name}</h2>
        <div className="deckbuilder__deck-card__count">{count}</div>
    </article>
)

const Card = ({ _id, name, imageUrl, addCard }) =>
    <article className="deckbuilder__search-card" onClick={() => addCard({ _id, name, imageUrl })}>
        <img className="deckbuilder__search-card__img" src={imageUrl} />
    </article>


export default deckbuilder;