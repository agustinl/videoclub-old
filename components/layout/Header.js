import { useContext } from 'react';
import Link from 'next/link';
import { FirebaseContext } from '../../firebase';

export default function Header() {

    const { user, firebase } = useContext(FirebaseContext);

    return (
        <nav className="flex items-center justify-between flex-wrap bg-black p-6">
            <div className="flex items-center flex-shrink-0 text-white mr-6 cursor-pointer">
                <Link href="/">
                    <img src="/static/logo-videoclub.png" alt="Videoclub" />
                </Link>
            </div>
            <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                <div className="text-sm lg:flex-grow">
                    { user ? (
                        <Link href={`/series/${user.displayName}`}>
                        <a
                            className="inline-block text-red-700 text-sm py-2 px-4 mt-4 lg:mt-0 hover:underline"
                        >
                            My List
                        </a>
                        </Link>
                        ) : null 
                    }
                </div>
                <div>
                    { user ? (
                        <>
                        <Link href="/"
                        >
                            <a 
                            onClick={() => firebase.logOut()}
                            className="inline-block text-red-700 text-sm py-2 px-4 mt-4 lg:mt-0 hover:underline">Log Out</a>
                        </Link>
                        <Link href="/add">
                            <a className="inline-block bg-red-700 text-white text-sm py-2 px-4 rounded focus:outline-none mt-4 ml-2 lg:mt-0 hover:bg-red-800">
                                Add Series
                            </a>
                        </Link>
                        </>
                    ) : (
                        <>
                        <Link href="/login">
                            <a className="inline-block bg-red-700 text-white text-sm py-2 px-4 rounded focus:outline-none mt-4 ml-2 lg:mt-0 hover:bg-red-800">
                                Log In
                            </a>
                        </Link>
                        <Link href="/register">
                            <a className="inline-block bg-red-700 text-white text-sm py-2 px-4 rounded focus:outline-none mt-4 ml-2 lg:mt-0 hover:bg-red-800">
                                Create account
                            </a>
                        </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
