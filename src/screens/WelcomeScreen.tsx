import { Button, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import RootStackParamList from "~/types/RootStackParamList";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Layout from "~/components/layouts/Layout";
import StartButton from "~/components/ui/StartButton";
import Title from "~/components/ui/Title";


type WelcomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'WelcomeScreen'>;

const WelcomeScreen = () => {
    const navigation = useNavigation<WelcomeScreenNavigationProp>();
    return (
        <Layout>
            {/* Title */}
            <View className="flex-1 justify-center items-center">
                <Title />
            </View>

            {/* Start Button */}
            <View className="flex-1 justify-start items-center">
                <StartButton title="Start" onPress={() => navigation.navigate('HomeScreen')} />
            </View>

        </Layout>

    );
};

export default WelcomeScreen;
