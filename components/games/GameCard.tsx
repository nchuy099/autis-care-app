import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import RootStackParamList from "types/RootStackParamList";

type GameCardProps = {
    title: string;
    screenName: keyof RootStackParamList;
};

type GameCardNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const GameCard = ({ title, screenName }: GameCardProps) => {
    const navigation = useNavigation<GameCardNavigationProp>();

    return (
        <TouchableOpacity 
            className="w-full bg-white rounded-xl shadow-lg mb-4 p-4"
            onPress={() => navigation.navigate(screenName)}
        >
            <View className="flex-row items-center space-x-4">
                <View className="w-12 h-12 bg-blue-500 rounded-full items-center justify-center">
                    <Text className="text-white text-xl font-bold">
                        {title.charAt(0)}
                    </Text>
                </View>
                <Text className="text-xl font-semibold text-gray-800">
                    {title}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

export default GameCard; 