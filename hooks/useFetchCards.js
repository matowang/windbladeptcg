import { useEffect, useState, useRef } from 'react';

const useFetchCards = (page, query) => {
    const [cards, setCards] = useState([]);
    const [hasNext, setHasNext] = useState(true);
    const [loading, setLoading] = useState(false);

    const fetchController = useRef();

    async function fetchCards() {
        console.log("Fetch page", page);
        setLoading(true);

        if (fetchController.current) fetchController.current.abort();
        fetchController.current = new AbortController();

        const res = await fetch(`${process.env.NEXT_PUBLIC_PTCG_API_URL}cards/${query.expansion}?search=${query.search}&page=${page}`, {
            method: 'GET',
            signal: fetchController.current.signal
        });
        const data = await res.json();

        if (page === 1) {
            setCards(data)
        } else {
            setCards(prevCards => [...prevCards, ...data]);
        }

        setLoading(false);
        console.log("datalength", data.length)
        if (data.length < 20)
            setHasNext(false);
        else
            setHasNext(true);
    }

    useEffect(() => { fetchCards() }, [page, query]);

    return { cards, hasNext, loading, setCards, setLoading, fetchController }
}

export default useFetchCards;