import { useState, useEffect, useContext } from 'react';
import { FirebaseContext } from '../firebase';

const useSeries = (collection, order) => {

    const [ series, setSeries ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    const { firebase } = useContext(FirebaseContext);

    useEffect(() => {
        const getSeries = async () => {
            await firebase.db.collection(collection).orderBy(order, 'desc').limit(10).onSnapshot(handleSnapshot);
        }
        getSeries();
	}, []);

	function handleSnapshot(snapshot) {
        const series = snapshot.docs.map(doc => {
            return {
            	id: doc.id,
            	...doc.data()
            }
        });

        setSeries(series);
        setLoading(false);
    }

    return {
        series,
        loading
    }
}

export default useSeries;