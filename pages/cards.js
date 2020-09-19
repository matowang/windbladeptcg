import InfiniteScroll from 'react-infinite-scroll-component';
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
        const res = await fetch(`http://ptcgexpressapi-env.eba-9ynt9yst.ap-northeast-2.elasticbeanstalk.com/cards?page=${page}`, {
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
                <h2 ref={lastCardRef} key={card._id} >{card.name}</h2> :
                <h2 key={card._id} >{card.name}</h2>
        )}
            {loading && <h4>loading...</h4>}
        </div>
    )
}

export default Cards;

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