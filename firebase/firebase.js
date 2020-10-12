import app from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import firebaseConfig from './config';

class Firebase {
    constructor() {
        if(!app.apps.length) {
            app.initializeApp(firebaseConfig)
        }
        this.auth = app.auth();
        this.db = app.firestore();
    }

    // Register
    async register(username, email, password) {
        const newUser = await this.auth.createUserWithEmailAndPassword(email, password.trim());

        return await newUser.user.updateProfile({
            displayName : username.trim()
        })
    }

    // Sign Up
    async login(email, password) {
        return this.auth.signInWithEmailAndPassword(email, password);
    }

    // Log Out
    async logOut() {
        await this.auth.signOut();
    }
}

const firebase = new Firebase();
export default firebase;