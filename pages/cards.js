import Layout from '../layout';

import CardSearch from '../components/cardSearch';
import CardImg from '../components/cardImg';

import Tilt from 'react-tilt'

const Cards = () => {
    return (
        <Layout>
            <div id="cards-page">
                <main>
                    <CardSearch CardComponent={Card} />
                </main>
            </div>
        </ Layout>
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