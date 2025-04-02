import Layout from "components/layouts/Layout";
import { Button, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import RootStackParamList from "types/RootStackParamList";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import FeatureCard from "components/ui/FeatureCard";

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'HomeScreen'>;

const HomeScreen = () => {
    const navigation = useNavigation<HomeScreenNavigationProp>();
    return (
        <Layout>
            <View className="flex-1 items-center justify-center bg-gray-100">
                <Text className="text-2xl font-bold mb-6">Home Screen</Text>

                <FeatureCard
                    title="Talk"
                    onPress={() => navigation.navigate("TalkScreen")}
                    icon="microphone-variant"
                />
                <FeatureCard
                    title="Schedule"
                    onPress={() => navigation.navigate("ScheduleScreen")}
                    icon="calendar-star"
                />
                <FeatureCard
                    title="Play"
                    onPress={() => navigation.navigate("GameMenuScreen")}
                    icon="gamepad-variant"
                />
            </View>
        </Layout>
    );
};

export default HomeScreen;
