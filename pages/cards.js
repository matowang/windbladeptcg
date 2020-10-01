import Header from '../layout/header';

import CardSearch from '../components/cardSearch';

const Cards = () => {
    return (
        <>
            <Header />
            <div id="cards-page">
                <main>
                    <CardSearch CardComponent={Card} />
                </main>
            </div>
        </>
    )
}

export default Cards;

const Card = ({ imageUrl, name }) => (
    <article className="cards-grid-item">
        <img className="cards-grid-item__card-img" src={imageUrl} alt={name} />
    </article>
)