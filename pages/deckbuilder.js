import { useState, useEffect } from 'react';

import { useDrag, useDrop } from 'react-dnd';

import useFetchCards from '../hooks/useFetchCards';
import useObserveRef from '../hooks/useObserveRef';
import useStoredDeck from '../hooks/useStoredDeck';

import Layout from '../layout';
import FilterCardsBar from '../components/filterCardsBar';
import CardImg from '../components/cardImg';
import Tooltip from '../components/tooltip';

const deckbuilder = ({ queriedCards }) => {

    //Deck Section
    const [deck, setDeck] = useStoredDeck(queriedCards);
    const cardCount = deck.reduce((a, c) => a + c.count, 0);

    const containsNullPrice = deck.some(({ price }) => price !== 0 && !price);
    const totalPrice = deck.reduce((a, c) => c.price ? a + c.count * c.price : a, 0);

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
                        <div className="deckbuilder__deck-section__card-count">卡數:
                            <span className={`deckbuilder__deck-section__card-count__number${cardCount !== 40 ? ' dangerous-text' : ''}`}>{cardCount}</span>
                        </div>
                        <div className="deckbuilder__deck-section__total-price">總價:{totalPrice}元{containsNullPrice && '+'}</div>
                        <Tooltip title="清牌庫" type="DANGEROUS">
                            <button className="deckbuilder__deck-section__clear-btn" onClick={() => setDeck([])}>
                                <img src="images/icons/trash-can.svg" alt="trash can" />
                            </button>
                        </Tooltip>
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
                                        <div key={card._id} ref={lastCardRef}><Card card={card} {...card} addCard={() => addCard(card)} /></div> :
                                        <Card key={card._id} card={card} {...card} addCard={() => addCard(card)} />
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
                <DeckCard key={card._id} card={card} {...card} handleAdd={() => addCard(card)} handleDelete={() => removeCard(card)} />
            ))}
            {deck.length === 0 && <div className="deckbuilder__deck__empty">
                <div className="deckbuilder__deck__empty__text">您點的卡片會在框區出現</div>
            </div>}
        </div>
    )
}

const DeckCard = ({ card, name, count, price, imageUrl, handleDelete, handleAdd }) => (
    <article className="deckbuilder__deck-card">
        <div className="deckbuilder__deck-card__price">{price || price === 0 ? price : '??'}<br />元</div>
        <CardImg className="deckbuilder__deck-card__img" imageUrl={imageUrl} alt={name} />
        <h2 className="deckbuilder__deck-card__name">{name}</h2>
        <button className="deckbuilder__deck-card__delete-btn" onClick={handleDelete}>-</button>
        <div className="deckbuilder__deck-card__count">{count}</div>
        <button className="deckbuilder__deck-card__add-btn" onClick={handleAdd}>+</button>
    </article>
)

const Card = ({ card, name, series, price, number, imageUrl, addCard }) => {
    const [collectedProps, drag] = useDrag({
        item: { ...card, type: 'search-card' }
    })
    return (
        <article ref={drag} className="deckbuilder__search-card" onClick={addCard}>
            <h2 className="deckbuilder__search-card__title">{name}</h2>
            <CardImg className="deckbuilder__search-card__img" imageUrl={imageUrl} alt={name} />
            <div className="deckbuilder__search-card__details">
                <div className="deckbuilder__search-card__id">{series}/{number}</div>
                <div className="deckbuilder__search-card__price">{price || price === 0 ? price : '??'}元</div>
            </div>
        </article>
    )
};

export default deckbuilder;

export async function getServerSideProps({ query }) {

    const parseQueryToCards = (query) => {
        const cards = [];
        const cardsData = query.split(" ");
        for (let cardData of cardsData) {
            const idSplitIdx = cardData.lastIndexOf('-');
            cards.push({
                cardId: cardData.substring(0, idSplitIdx),
                count: parseInt(cardData.substring(idSplitIdx + 1))
            });
        }
        return cards;
    }

    const populateCardData = async (cards) => {
        try {
            const apiQuery = cards.reduce((query, card) => query + card.cardId + '+', '');
            const res = await fetch(`${process.env.NEXT_PUBLIC_PTCG_API_URL}cards/id/${apiQuery}`, {
                method: 'GET',
            });
            const cardsData = await res.json();
            for (let cardData of cardsData) {
                let idx = cards.findIndex(c => c.cardId === cardData.cardId);
                cards[idx] = { ...cards[idx], ...cardData };
            }
        } catch (err) {
            console.error(err);
        }
    }

    let cards = [];
    if (query.cards) {
        cards = parseQueryToCards(query.cards);
        await populateCardData(cards);
        console.log(cards);
    }
    return {
        props: {
            queriedCards: cards
        }, // will be passed to the page component as props
    }
}