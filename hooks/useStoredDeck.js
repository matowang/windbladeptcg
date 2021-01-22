import Router from 'next/router'
import { useEffect, useState } from 'react';

const useStoredDeck = (queriedCards) => {

    const [deck, setDeck] = useState([]);

    //get deck from local storage and query
    useEffect(() => {
        if (queriedCards.length > 0) {
            console.log("loading from queried")
            setDeck(queriedCards);
        } else if (localStorage.deck) {
            console.log("loading from local storage")
            setDeck(JSON.parse(localStorage.deck));
        }
    }, []);

    const updateQuery = () => {
        const query = deck.reduce((query, card) => query + card.cardId + '-' + card.count + ' ', '').slice(0, -1)
        console.log(query);
        Router.push({
            pathname: '/deckbuilder',
            query: { cards: query },
        });
    };

    //store in local storate and query
    useEffect(() => {
        localStorage.deck = JSON.stringify(deck);
        updateQuery();
    }, [deck]);

    return [deck, setDeck];
}

export default useStoredDeck;