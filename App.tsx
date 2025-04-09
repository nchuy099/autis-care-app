import './global.css';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native';
import HomeScreen from 'screens/HomeScreen';
import ScheduleScreen from 'screens/ScheduleScreen';
import TalkScreen from 'screens/TalkScreen';
import WelcomeScreen from 'screens/WelcomeScreen';
import GameMenuScreen from 'screens/games/GameMenuScreen';
import MatchingGameScreen from 'screens/games/MatchingGameScreen';
import MemoryGameScreen from 'screens/games/MemoryGameScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="TalkScreen" component={TalkScreen} />
        <Stack.Screen name="ScheduleScreen" component={ScheduleScreen} />
        <Stack.Screen name="GameMenuScreen" component={GameMenuScreen} />
        <Stack.Screen name="MatchingGameScreen" component={MatchingGameScreen} />
        <Stack.Screen name="MemoryGameScreen" component={MemoryGameScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;