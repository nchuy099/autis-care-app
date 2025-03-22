import './global.css';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native';
import HomeScreen from 'screens/HomeScreen';
import PlayScreen from 'screens/PlayScreen';
import ScheduleScreen from 'screens/ScheduleScreen';
import TalkScreen from 'screens/TalkScreen';
import WelcomeScreen from 'screens/WelcomeScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="TalkScreen" component={TalkScreen} />
        <Stack.Screen name="ScheduleScreen" component={ScheduleScreen} />
        <Stack.Screen name="PlayScreen" component={PlayScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;