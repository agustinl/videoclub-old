import { useEffect, useState } from 'react';
import firebase from '../firebase';

function useAuth() {
    const [ loggedUser, setLoggedUser] = useState(null);

    useEffect(() => {
        const unsuscribe = firebase.auth.onAuthStateChanged(user => {
            if( user ) {
                setLoggedUser(user);
            } else {
                setLoggedUser(null);
            }
        });
        return () => unsuscribe();
    }, []);

    return loggedUser;
}
export default useAuth;