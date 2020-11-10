import { useEffect, useState } from 'react';

const useStoredDeck = () => {

    const [deck, setDeck] = useState([]);

    //get deck from local storage
    useEffect(() => {
        if (localStorage.deck)
            setDeck(JSON.parse(localStorage.deck));
    }, []);

    //store in local storate
    useEffect(() => {
        localStorage.deck = JSON.stringify(deck);
    }, [deck]);

    return [deck, setDeck];
}

export default useStoredDeck;