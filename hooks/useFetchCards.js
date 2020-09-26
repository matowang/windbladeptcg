import { useEffect, useState } from 'react';

const useFetchCards = (page) => {
    const [cards, setCards] = useState([]);
    const [hasNext, setHasNext] = useState(true);
    const [loading, setLoading] = useState(false);

    async function fetchCards() {
        console.log("Fetch page", page);
        setLoading(true);

        const res = await fetch(`${process.env.NEXT_PUBLIC_PTCG_API_URL}cards/SC2a?page=${page}`, {
            method: 'GET',
        });
        const data = await res.json();

        setCards(prevCards => [...prevCards, ...data])
        setLoading(false);
        if (data.length < 20)
            setHasNext(false);
    }

    useEffect(() => { fetchCards() }, [page]);

    return { cards, hasNext, loading }
}

export default useFetchCards;