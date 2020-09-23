import { useState, useRef, useCallback, useEffect } from 'react';

const Cards = () => {
    const [cards, setCards] = useState([]);
    const [page, setPage] = useState(0);
    const [hasNext, setHasNext] = useState(true);
    const [loading, setLoading] = useState(false);

    const observer = useRef()
    const lastCardRef = useCallback(node => {
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasNext && !loading) {
                setPage(page => page + 1);
            }
        })
        console.log(node);
        if (node)
            observer.current.observe(node);
    }, [loading, hasNext]);

    async function fetchCards() {
        console.log("fetchh");
        setLoading(true);
        console.log(process.env.NEXT_PUBLIC_PTCG_API_URL);
        const res = await fetch(`${process.env.NEXT_PUBLIC_PTCG_API_URL}cards?page=${page}`, {
            method: 'GET',
        });
        const data = await res.json();
        console.log(data);
        setCards(prevCards => [...prevCards, ...data])
        setLoading(false);
        if (data.length < 20)
            setHasNext(false);
    }

    useEffect(() => { fetchCards() }, [page]);
    return (
        <div>{cards.map((card, i) =>
            i === cards.length - 1 ?
                <div key={card._id} ref={lastCardRef}><Card {...card} /></div> :
                <Card key={card._id} {...card} />
        )}
            {loading && <h4>loading...</h4>}
        </div>
    )
}

export default Cards;

const Card = ({ imageUrl, name }) => (
    <article>
        <h2>{name}</h2>
        <img src={imageUrl} alt={name} />
    </article>
)

// export async function getServerSideProps() {
//     const client = createClient();
//     try {
//         await client.connect();
//         const db = client.db('ptcg');
//         const col = db.collection('cards');
//         const data = await col.find({ series: "AC1a" }).project({ _id: 0 }).toArray();
//         console.log(data);

//         return {
//             props: {
//                 data: data
//             }
//         }
//     } catch (e) {
//         console.error(e);
//         return {
//             props: {}
//         }
//     } finally {
//         client.close();
//     }
// }