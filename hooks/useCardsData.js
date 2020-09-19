import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useCardData(page) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [cards, setCards] = useState([])
    const [hasMore, setHasMore] = useState(false)

    useEffect(() => {
        setLoading(true)
        setError(false)
        let cancel;
        axios({
            method: 'GET',
            url: 'http://ptcgexpressapi-env.eba-9ynt9yst.ap-northeast-2.elasticbeanstalk.com/',
            params: { page: page },
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(res => {
            console.log(res.data);
            setCards(prevCards => [...prevCards, ...res.data]);
            setHasMore(res.data.length > 0)
            setLoading(false)
        }).catch(e => {
            if (axios.isCancel(e)) return
            setError(true)
        })
        return () => cancel()
    }, [page])

    return { loading, error, books, hasMore }
}