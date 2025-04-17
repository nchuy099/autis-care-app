import { db } from '../config';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

export interface UserProfile {
    id: string;
    email: string;
    name: string;
    age: number;
    avatarUrl?: string;
    preferences?: {
        theme?: string;
        language?: string;
        notifications?: boolean;
        difficultyLevel?: string;
        soundEnabled?: boolean;
        vibrationEnabled?: boolean;
        role?: string;
    };
}

export const createUserProfile = async (userId: string, profile: Omit<UserProfile, 'id'>) => {
    try {
        await setDoc(doc(db, 'users', userId), profile);
        return { id: userId, ...profile };
    } catch (error) {
        throw error;
    }
};

export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
    try {
        const docRef = doc(db, 'users', userId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { id: userId, ...docSnap.data() } as UserProfile;
        }
        return null;
    } catch (error) {
        throw error;
    }
};

export const updateUserProfile = async (userId: string, updates: Partial<UserProfile>) => {
    try {
        const docRef = doc(db, 'users', userId);
        await updateDoc(docRef, updates);
    } catch (error) {
        throw error;
    }
};

export const updateUserPreferences = async (userId: string, preferences: UserProfile['preferences']) => {
    try {
        const docRef = doc(db, 'users', userId);
        await updateDoc(docRef, { preferences });
    } catch (error) {
        throw error;
    }
}; 