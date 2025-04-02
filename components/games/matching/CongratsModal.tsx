import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import RootStackParamList from "types/RootStackParamList";

interface CongratsModalProps {
    onPlayAgain: () => void;
}

type CongratsModalNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const CongratsModal = ({ onPlayAgain }: CongratsModalProps) => {
    const navigation = useNavigation<CongratsModalNavigationProp>();

    return (
        <View className="absolute inset-0 bg-black/50 items-center justify-center">
            <View className="bg-white rounded-2xl p-6 w-4/5 items-center">
                <Text className="text-2xl font-bold text-center mb-4">
                    Chúc mừng!
                </Text>
                <Text className="text-lg text-gray-600 text-center mb-6">
                    Bạn đã hoàn thành trò chơi!
                </Text>
                <View className="flex-row space-x-4">
                    <TouchableOpacity
                        className="bg-blue-500 px-6 py-3 rounded-lg"
                        onPress={onPlayAgain}
                    >
                        <Text className="text-white text-lg font-semibold">
                            Chơi lại
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        className="bg-gray-500 px-6 py-3 rounded-lg"
                        onPress={() => navigation.navigate('GameMenuScreen')}
                    >
                        <Text className="text-white text-lg font-semibold">
                            Menu
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default CongratsModal; 