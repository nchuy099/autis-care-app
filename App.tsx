import React from 'react';
import './global.css';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native';

import HomeScreen from 'screens/HomeScreen';
import ScheduleScreen from 'screens/ScheduleScreen';
import TalkScreen from 'screens/talk/TalkScreen';
import GameMenuScreen from 'screens/games/GameMenuScreen';
import MatchingGameScreen from 'screens/games/MatchingGameScreen';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { RootStackParamList } from './types/RootStackParamList';
import MemoryGameScreen from './screens/games/MemoryGameScreen';
import PuzzleGameScreen from './screens/games/PuzzleGameScreen';
import LoginScreen from './screens/auth/LoginScreen';
import RegisterScreen from './screens/auth/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';


const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return null; // or a loading screen
    }

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {user ? (
                // Authenticated stack
                <>
                    <Stack.Screen name="HomeScreen" component={HomeScreen} />
                    <Stack.Screen name="GameMenuScreen" component={GameMenuScreen} />
                    <Stack.Screen name="MatchingGameScreen" component={MatchingGameScreen} />
                    <Stack.Screen name="MemoryGameScreen" component={MemoryGameScreen} />
                    <Stack.Screen name="PuzzleGameScreen" component={PuzzleGameScreen} />
                    <Stack.Screen name="TalkScreen" component={TalkScreen} />
                    <Stack.Screen name="ScheduleScreen" component={ScheduleScreen} />
                    <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
                </>
            ) : (
                // Auth stack
                <>
                    <Stack.Screen name="LoginScreen" component={LoginScreen} />
                    <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
                </>
            )}
        </Stack.Navigator>
    );
};

const App = () => {
    return (
        <AuthProvider>
            <NavigationContainer>
                <Navigation />
            </NavigationContainer>
        </AuthProvider>
    );
};

export default App;