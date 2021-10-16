import Header from '../layout/header';

import CardSearch from '../components/cardSearch';
import CardImg from '../components/cardImg';

import Tilt from 'react-tilt'

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
        <Tilt className="Tilt" options={{ max: 40 }}  >
            <CardImg className="Tilt-inner cards-grid-item__card-img" imageUrl={imageUrl} alt={name} />
        </Tilt>
    </article>
)