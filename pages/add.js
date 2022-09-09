import { useState, useContext } from 'react';
import Layout from "../components/layout/Layout";
import Serie from "../components/ui/Serie";
import Spinner from "../components/ui/Spinner";
import Router from 'next/router';

import { FirebaseContext } from '../firebase';

export default function Add() {

    const [serie, setSerie] = useState({});
    const [search, setSearch] = useState('');
    const [error, setError] = useState("");
    const [sucess, setSucess] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const { user, firebase } = useContext(FirebaseContext);

    const handleSearch = e => {
        setSearch(e.target.value);
    }

    const handleSerie = async e => {
        e.preventDefault();

        setSucess("");
        setIsLoading(true);

        if(search.trim() === '') {
            setError("Series name is required");
            return;
        }

        setError("");

        const api = await fetch(`/api/serie/${search}`);
        const res = await api.json();

        res.Response === "False" ? setError("Serie not found") : setSerie(res);

        setIsLoading(false);
    }

    const addSerie = async () => {

        if(!user) {
			return Router.push('/login');
        }

        const { Title, Year, Genre, Plot, Poster, imdbRating, imdbID, totalSeasons } = serie;

        /* const querySnapshot = await firebase.db.collection('series').doc(user.uid).get(); */        
        
        const newSerie = {
            Title : Title,
            Year : Year,
            Genre : Genre,
            Plot : Plot,
            Poster : Poster,
            imdbRating : imdbRating,
            totalSeasons : totalSeasons ? totalSeasons : null,
            imdbID : imdbID,
            created: Date.now()
        }

        await firebase.db.collection(user.displayName).doc(imdbID).set(newSerie);

        await firebase.db.collection('lastRecords').add({
            Title : Title,
            User : user.displayName,
            date: Date.now()
        });
        
        setSucess("Series added successfully");

    }

    return (
        <Layout>
            <form className="w-full max-w-sm mb-10"
                onSubmit={handleSerie}
            >
                <div className="flex items-center border-b border-red-500 py-2">
                    <input
                        className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
                        type="text"
                        id="search"
                        placeholder="Series name"
                        name="search"
                        value={search}
                        onChange={handleSearch}
                        aria-label="Name"
                    />
                    <button
                        className="flex-shrink-0 bg-red-700 text-white text-sm py-1 px-2 rounded focus:outline-none hover:bg-red-800"
                        type="submit"
                    >
                        Search
                    </button>
                </div>

                {
                    error != "" ? (                        
                        <div className="px-4 py-3 mt-3 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:red-red-800" role="alert">{error}</div>
                    ) : null
                }

                {
                    sucess != "" ? (
                        <div className="px-4 py-3 mt-3 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:green-red-800" role="alert">{sucess}</div>
                    ) : null
                }
            </form>

            {
                isLoading ? ( <Spinner /> ) : null
            }

            {
                Object.keys(serie).length > 0 && !isLoading ? (
                    <>
                        <Serie
                            serie={serie}
                        />
            
                        <div className="w-full max-w-xs mt-10">
                            <button
                                className="inline-block bg-red-700 text-white text-sm py-2 px-4 rounded focus:outline-none hover:bg-red-800 w-full"
                                type="button"
                                onClick={addSerie}
                            >Add</button>
                        </div>
                    </>
                 ) : null
            }
            
            
        </Layout>
    );
}
