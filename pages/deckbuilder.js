import { useState } from 'react';

import { useDrag, useDrop } from 'react-dnd';

import useFetchCards from '../hooks/useFetchCards';
import useObserveRef from '../hooks/useObserveRef';
import useStoredDeck from '../hooks/useStoredDeck';

import Layout from '../layout';
import FilterCardsBar from '../components/filterCardsBar';
import CardImg from '../components/cardImg';

const deckbuilder = () => {
    //Deck Section
    const [deck, setDeck] = useStoredDeck();

    const cardCount = deck.reduce((a, c) => a + c.count, 0);
    const totalPrice = deck.reduce((a, c) => a + c.count * c.price, 0);

    const addCard = (card) => {
        setDeck(deck => {
            const cardCount = deck.reduce((a, c) => a + c.count, 0);
            if (cardCount === 40)
                return deck;

            const cardIdx = deck.findIndex(c => c._id === card._id);
            if (cardIdx === -1) {
                return [...deck, { ...card, count: 1 }];
            }

            if (deck[cardIdx].count >= 4)
                return deck;

            const newCard = { ...card, count: deck[cardIdx].count + 1 }
            return Object.assign([], deck, { [cardIdx]: newCard });
        });
    }

    const removeCard = (card) => {
        setDeck(deck => {
            const cardIdx = deck.findIndex(c => c._id === card._id);
            if (deck[cardIdx].count <= 1) {
                const newDeck = [...deck];
                newDeck.splice(cardIdx, 1);
                return newDeck;
            }
            const newCard = { ...card, count: deck[cardIdx].count - 1 }
            return Object.assign([], deck, { [cardIdx]: newCard });
        });
    }

    //Search Section
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
        e.persist();
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
                    <DeckSection deck={deck} addCard={addCard} removeCard={removeCard} />
                    <footer className="deckbuilder__deck-section__footer">
                        <div className="deckbuilder__deck-section__card-count">卡數: {cardCount}</div>
                        <div className="deckbuilder__deck-section__total-price">總價: {totalPrice}元</div>
                        <button className="deckbuilder__deck-section__clear-btn" onClick={() => setDeck([])}>清牌組</button>
                    </footer>
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
                                        <div key={card._id} ref={lastCardRef}><Card {...card} addCard={() => addCard(card)} /></div> :
                                        <Card key={card._id} {...card} addCard={() => addCard(card)} />
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

const DeckSection = ({ deck, addCard, removeCard }) => {
    const [{ isOver, canDrop }, drop] = useDrop({
        accept: 'search-card',
        drop: addCard,
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    })
    return (
        <div ref={drop}
            className={`deckbuilder__deck
            ${isOver ? ' deckbuilder__deck--drop-over' : ''}
            ${canDrop ? ' deckbuilder__deck--dropping' : ''}
            `}>{deck.map(card => (
                <DeckCard key={card._id} {...card} handleAdd={() => addCard(card)} handleDelete={() => removeCard(card)} />
            ))}
            {deck.length === 0 && <div className="deckbuilder__deck__empty">
                <div className="deckbuilder__deck__empty__text">您點的卡片會在框區出現</div>
            </div>}
        </div>
    )
}

const DeckCard = ({ name, count, imageUrl, handleDelete, handleAdd }) => (
    <article className="deckbuilder__deck-card">
        <CardImg className="deckbuilder__deck-card__img" imageUrl={imageUrl} alt={name} />
        <h2 className="deckbuilder__deck-card__name">{name}</h2>
        <div className="deckbuilder__deck-card__count">{count}</div>
        <button className="deckbuilder__deck-card__delete-btn" onClick={handleDelete}>-</button>
        <button className="deckbuilder__deck-card__add-btn" onClick={handleAdd}>+</button>
    </article>
)

const Card = ({ _id, name, series, price, number, imageUrl, addCard }) => {
    const [collectedProps, drag] = useDrag({
        item: { _id, name, imageUrl, type: 'search-card' }
    })
    return (
        <article ref={drag} className="deckbuilder__search-card" onClick={addCard}>
            <h2 className="deckbuilder__search-card__title">{name}</h2>
            <CardImg className="deckbuilder__search-card__img" imageUrl={imageUrl} alt={name} />
            <div className="deckbuilder__search-card__details">
                <div className="deckbuilder__search-card__id">{series}/{number}</div>
                <div className="deckbuilder__search-card__price">{price || '??'}元</div>
            </div>
        </article>
    )
};

export default deckbuilder;