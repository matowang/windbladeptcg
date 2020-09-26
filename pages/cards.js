import Header from '../layout/header';

import { useState, useRef, useCallback, useEffect } from 'react';

import useFetchCards from '../hooks/useFetchCards';

const Cards = () => {
    const [page, setPage] = useState(1);

    const { cards, hasNext, loading } = useFetchCards(page);

    const observer = useRef()

    const lastCardRef = useCallback(node => {
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasNext && !loading) {
                setPage(page => page + 1);
            }
        })

        if (node)
            observer.current.observe(node);
    }, [loading, hasNext]);

    return (
        <>
            <Header />
            <main>
                <div className="cards-grid">
                    {cards.map((card, i) =>
                        i === cards.length - 1 ?
                            <div key={card._id} ref={lastCardRef}><Card {...card} /></div> :
                            <Card key={card._id} {...card} />
                    )}
                </div>
                {loading && <h4>loading...</h4>}
            </main>
        </>
    )
}

export default Cards;

const Card = ({ imageUrl, name }) => (
    <article class="cards-grid-item">
        <img className="cards-grid-item__card-img" src={imageUrl} alt={name} />
    </article>
)