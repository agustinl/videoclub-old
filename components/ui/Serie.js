import { useContext } from 'react';
import { FirebaseContext } from '../../firebase';
import { useRouter } from 'next/router';
import Image from 'next/image';

export default function Serie({ serie, id }) {

    if ( Object.keys(serie).length === 0) return null;

    const { Title, Year, Genre, Plot, Poster, imdbRating, imdbID, totalSeasons } = serie;
    const genres = Genre.split(",");
    const { user, firebase } = useContext(FirebaseContext);
    const router = useRouter();

    const canDelete = () => {
        if(!user) return false;

        if(id === user.displayName) {
            return true
        }
    }

    const deleteSerie = async () => {

        if(!user) {
            return router.push('/login');
        }

        if(id !== user.displayName) {
            return router.push('/');
        }

        try {
            await firebase.db.collection(user.displayName).doc(imdbID).delete();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <article
            id={imdbID}
            //style={{backgroundImage: `url('${Poster}')`}}
            className="flex m-1 bg-cover bg-center relative transition duration-300"
        >
            <Image
                src={Poster}
                alt={Title}
                width="275"
                height="405"
                blurDataURL={Poster}
                placeholder="blur"
            />

        <div className="absolute clear-both bottom-0 text-white px-2 pb-2 z-10 opacity-0 hidden">
            <div className="flex items-center justify-between">
                <h2 className="font-bold text-lg">{Title}</h2>
                <small className="flex flex-row items-center"> <svg className="w-4 h-4 mr-1 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg> {imdbRating}</small>
            </div>
            <h3 className="flex justify-between text-sm border border-white py-1 px-2 my-2">{Year}
                {
                    totalSeasons ? (
                        <strong>{totalSeasons} {totalSeasons === 1 ? "Season" : "Seasons"}</strong>
                    ) : null
                }
            </h3>
            <p className="text-sm mb-1 leading-snug">{Plot}</p>
            <ul className="text-sm mb-1 flex flex-row flex-wrap items-center justify-start p-0">
                {
                    genres.map((genre, index) => 
                        <li className="mr-1 font-bold list-none" key={index}>{genre}</li>
                    )
                }
            </ul>
            { canDelete() && 
                <p
                    className="float-left text-sm cursor-pointer text-red-700 font-semibold hover:underline"
                    onClick={deleteSerie}
                >&#215; Delete</p>
            }
            <a href={`https://www.imdb.com/title/${imdbID}`} target="_blank" rel="noopener noreferrer" className="float-right text-sm text-red-700 font-semibold hover:underline">+ More Info</a>
        </div>

    </article>
    );
}
