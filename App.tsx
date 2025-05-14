import React from 'react';
import './global.css';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native';

import HomeScreen from 'screens/HomeScreen';
import ScheduleScreen from 'screens/ScheduleScreen';
import TalkScreen from 'screens/talk/TalkScreen';
import WelcomeScreen from 'screens/WelcomeScreen';
import GameMenuScreen from 'screens/games/GameMenuScreen';
import MatchingGameScreen from 'screens/games/MatchingGameScreen';
import { RootStackParamList } from './types/RootStackParamList';
import MemoryGameScreen from './screens/games/MemoryGameScreen';
import PuzzleGameScreen from './screens/games/PuzzleGameScreen';
import ProfileScreen from './screens/ProfileScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="GameMenuScreen" component={GameMenuScreen} />
            <Stack.Screen name="MatchingGameScreen" component={MatchingGameScreen} />
            <Stack.Screen name="MemoryGameScreen" component={MemoryGameScreen} />
            <Stack.Screen name="PuzzleGameScreen" component={PuzzleGameScreen} />
            <Stack.Screen name="TalkScreen" component={TalkScreen} />
            <Stack.Screen name="ScheduleScreen" component={ScheduleScreen} />
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        </Stack.Navigator>
    );
};

const App = () => {
    return (
        <NavigationContainer>
            <Navigation />
        </NavigationContainer>
    );
};

export default App;