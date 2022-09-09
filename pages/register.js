import { useState } from 'react';
import Router from 'next/router';
import Link from "next/link";
import Head from 'next/head';

// Validations
import useValidation from '../hooks/useValidation';
import validationRegister from '../validations/validationRegister';

const INITIAL_STATE = {
	username: '',
	email: '',
	password: ''
}

import firebase from '../firebase';

export default function Register() {

    const [error, setError] = useState('');

	const {
		values, 
        errors,
        handleSubmit,
		handleChange,
		handleBlur
	} = useValidation(INITIAL_STATE, validationRegister, createAccount);

	const { username, email, password } = values;

	async function createAccount () {
		try {
			await firebase.register(username, email, password);
			Router.push('/');
		} catch (error) {
            switch (error.code) {
                case "auth/email-already-in-use":
                    setError("Email already registered");
                    break;  
                default:
                    break;
            }
		}
	}

    return (
        <>
        <Head>
            <title>Register</title>
            <link rel="icon" href="/favicon.png" type="image/png" />
            <meta name="description" content="Keep an updated list with information about the series you have been finishing"></meta>
        </Head>

        <div className="flex h-screen justify-center items-center flex-col">
            <form
                className="bg-black border border-gray-700 rounded px-8 pt-6 pb-6 mb-4"
                onSubmit={handleSubmit}
            >
                <div className="mb-6">
                    <img
                        src="/static/logo-videoclub.png"
                        className="m-auto w-3/4"
                        alt="Videoclub"
                    />
                </div>
                <div className="mb-4">
                    <input
                        className={`bg-black shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight text-sm focus:outline-none ${errors.username ? "border-red-500" : ""}`}
                        type="text"
                        id="username"
                        placeholder="Username"
                        name="username"
                        value={username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    { errors.username && <p className="text-nflix text-xs italic mt-1">{errors.username}</p> }
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
                        onBlur={handleBlur}
                    />
                    { errors.email && <p className="text-nflix text-xs italic mt-1">{errors.email}</p> }
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
                        onBlur={handleBlur}
                    />
                    { errors.password && <p className="text-nflix text-xs italic mt-1">{errors.password}</p> }
                </div>
                <div className="flex items-center justify-between flex-col">
                    <button
                        className="bg-nflix text-white py-2 px-4 rounded focus:outline-none mb-6 w-full hover:bg-red-800"
                        type="submit"
                    >
                        Create account
                    </button>
                    <Link href="/login">
                        <a
                            className="inline-block align-baseline text-sm text-white hover:underline mb-3"
                        >
                            Already have an account?
                        </a>
                    </Link>
                    <Link href="/">
                        <a
                            className="inline-block align-baseline text-sm text-white hover:underline"
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
        </>
    );
}
