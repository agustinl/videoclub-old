import { useEffect, useContext, useState } from 'react';
import { useRouter } from 'next/router';

import Layout from "../../components/layout/Layout";
import Serie from "../../components/ui/Serie";
import Spinner from "../../components/ui/Spinner";

import { FirebaseContext } from '../../firebase';

export default function Series() {

	const router = useRouter();
	const { query: { id }} = router;
	
	const [ series, setSeries ] = useState([]);
    const [ loading, setLoading ] = useState(true);

	const { firebase } = useContext(FirebaseContext);

	useEffect(() => {
		if (id === undefined) return;
		
        const getSeries = async () => {
            await firebase.db.collection(id).orderBy("created", "asc").onSnapshot(handleSnapshot);
        }
        getSeries();
	}, [id]);

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
	
	return(
		<Layout>
			<h1 className="text-white text-2xl"><strong className="text-red-700">@{id}</strong> series list</h1>
			<h2 className="text-white text-xl "><strong>{series.length}</strong> series watched</h2>
            
            <div className="flex flex-row flex-wrap justify-center py-5 px-2 mt-10 mx-auto">
				{
					loading ? (
						<Spinner />
					) : (
						series.map(serie => (
							<Serie
								serie={serie}
								key={serie.imdbID}
							/>
						))
					)
				}
			</div>
		</Layout>
	);
}