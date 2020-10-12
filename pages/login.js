import { useState } from 'react';
import Link from "next/link";
import Router from 'next/router';

// Validations
import useValidation from '../hooks/useValidation';
import validationLogIn from '../validations/validationLogIn';

const INITIAL_STATE = {
	email: '',
	password: ''
}

import firebase from '../firebase';

export default function Login() {

    const [error, setError] = useState('');

	const {
		values, 
        errors,
        handleSubmit,
		handleChange,
		handleBlur
	} = useValidation(INITIAL_STATE, validationLogIn, logIn);

	const { email, password } = values;

	async function logIn () {
		try {
			await firebase.login(email, password);
			Router.push('/');
		} catch (error) {
            switch (error.code) {
                case "auth/user-not-found":
                    setError("User not found");
                    break;
                case "auth/wrong-password":
                    setError("Wrong password");
                    break;   
                default:
                    break;
            }
		}
	}

    return (
        <div className="flex h-screen justify-center items-center flex-col">
            <form
                className="bg-black border border-gray-700 rounded px-8 pt-6 pb-6 mb-4"
                onSubmit={handleSubmit}
            >
                <div className="mb-6">
                    <img
                        src="/static/logo-videoclub.png"
                        className="m-auto w-3/4"
                    />
                </div>
                <div className="mb-4">
                    <h1 className="text-white text-center">Welcome again</h1>
                </div>
                <div className="mb-4">
                    <input
                        className={`bg-black shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight text-sm focus:outline-none ${errors.email ? "border-red-500" : ""}`}
                        type="email"
                        id="email"
                        placeholder="Email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                    />
                    { errors.email && <p className="text-red-500 text-xs italic mt-1">{errors.email}</p> }
                </div>
                <div className="mb-6">
                    <input
                        className={`bg-black shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight text-sm focus:outline-none ${errors.password ? "border-red-500" : ""}`}
                        type="password"
                        id="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={handleChange}
                    />
                    { errors.password && <p className="text-red-500 text-xs italic mt-1">{errors.password}</p> }
                    
                    { error && <p className="text-red-500 text-xs italic mt-1">{error}</p> }
                </div>
                <div className="flex items-center justify-between flex-col">
                    <button
                        className="bg-red-700 text-white py-2 px-4 rounded focus:outline-none w-full mb-6 hover:bg-red-800"
                        type="submit"
                    >
                        Sign In
                    </button>                    
                    <Link href="/">
                        <a
                            className="inline-block align-baseline text-sm text-white hover:underline"
                            href="#!"
                        >
                            &#171; Back
                        </a>
                    </Link>
                </div>
            </form>
            <p className="text-center text-gray-700 text-xs">
                {new Date().getFullYear()} &#8212; Videoclub
            </p>
        </div>
    );
}
