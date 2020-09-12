import client from '../lib/mongodb'

const cards = ({ data }) => {
    console.log(data)
    return (
        <h1>cards</h1>
    )
}

export default cards;

export async function getStaticProps() {
    try {
        await client.connect();

        const db = client.db('ptcg');
        const col = db.collection('cards');
        const data = await col.find({ set: "AC1a" }).toArray();
        console.log(data);
        return {
            props: {
                data: data
            }
        }
    } catch (e) {
        console.error(e);
        return {
            props: {}
        }
    } finally {
        await client.close();
    }
}