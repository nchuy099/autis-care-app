import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, getCurrentUser } from '../services/authService';
import { getUserProfile, UserProfile } from '../services/userService';

interface AuthContextType {
    user: any;
    profile: UserProfile | null;
    loading: boolean;
    error: string | null;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    profile: null,
    loading: true,
    error: null
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<any>(null);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(async (user) => {
            setUser(user);
            if (user) {
                try {
                    const userProfile = await getUserProfile(user.uid);
                    setProfile(userProfile);
                } catch (err) {
                    setError('Failed to load user profile');
                }
            } else {
                setProfile(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, profile, loading, error }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext); 