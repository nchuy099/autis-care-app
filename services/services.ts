import { auth } from '../config/config';
import { 
  signInWithEmailAndPassword as firebaseSignIn,
  createUserWithEmailAndPassword as firebaseSignUp,
  signOut as firebaseSignOut,
  onAuthStateChanged as firebaseOnAuthStateChanged
} from 'firebase/auth';

export const signIn = async (email: string, password: string) => {
    try {
        const userCredential = await firebaseSignIn(auth, email, password);
        return userCredential.user;
    } catch (error) {
        throw error;
    }
};

export const signUp = async (email: string, password: string) => {
    try {
        const userCredential = await firebaseSignUp(auth, email, password);
        return userCredential.user;
    } catch (error) {
        throw error;
    }
};

export const signOut = async () => {
    try {
        await firebaseSignOut(auth);
    } catch (error) {
        throw error;
    }
};

export const getCurrentUser = () => {
    return auth.currentUser;
};

export const onAuthStateChanged = (callback: (user: any) => void) => {
    return firebaseOnAuthStateChanged(auth, callback);
}; 