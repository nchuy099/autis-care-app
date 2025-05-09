import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyA5sXMir37tVWXypK-XYtD0n1KWKk4dEnk",
    authDomain: "autis-care-app.firebaseapp.com",
    projectId: "autis-care-app",
    storageBucket: "autis-care-app.firebasestorage.app",
    messagingSenderId: "443210847855",
    appId: "1:443210847855:web:4dafc0e48868dbdfe45f9a",
    measurementId: "G-WBSXJV6H1K"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app; 