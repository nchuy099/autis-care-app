import Layout from "components/layouts/Layout";
import { Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import RootStackParamList from "types/RootStackParamList";

type PlayScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'PlayScreen'>;

const PlayScreen = () => {
    const navigation = useNavigation<PlayScreenNavigationProp>();

    return (
        <Layout>
            <View className="flex-1 justify-center items-center space-y-4">
                <Text className="text-2xl font-bold">Let's Play</Text>
                <TouchableOpacity 
                    className="bg-blue-500 px-6 py-3 rounded-lg"
                    onPress={() => navigation.navigate('GameMenuScreen')}
                >
                    <Text className="text-white text-lg font-semibold">
                        Play Games
                    </Text>
                </TouchableOpacity>
            </View>
        </Layout>
    )
}

export default PlayScreen;
