import { useEffect, useState } from 'react';

const useFetchCards = (page, query) => {
    const [cards, setCards] = useState([]);
    const [hasNext, setHasNext] = useState(true);
    const [loading, setLoading] = useState(false);
    async function fetchCards() {
        console.log("Fetch page", page);
        setLoading(true);

        const res = await fetch(`${process.env.NEXT_PUBLIC_PTCG_API_URL}cards?search=${query}&page=${page}`, {
            method: 'GET',
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

    return { cards, hasNext, loading }
}

export default useFetchCards;