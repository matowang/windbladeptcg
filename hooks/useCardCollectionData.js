import { useEffect } from 'react';
import client from '../lib/mongodb';

export default function useCardCollectionData(query, cursorCallback) {
    const [data, setData] = useState(null);

    useEffect(() => {
        const getData = async () => {
            await client.connect();
            const db = client.db('ptcg');
            const col = db.collection('cards');

            // const cursor = col.find(query);

            // const cardsData = await cursorCallback(cursor);
            cardsData = await col.find({ set: "AC1a" }).toArray();
            setData(cardsData);
        }
        getData();

        return () => { client.close }
    }, [query])

    return data;
}