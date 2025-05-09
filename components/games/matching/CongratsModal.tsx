import { Text, TouchableOpacity, View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import RootStackParamList from "types/RootStackParamList";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface CongratsModalProps {
    onPlayAgain: () => void;
    completionTime?: number;
    moves?: number;
}

type CongratsModalNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const CongratsModal = ({ onPlayAgain, completionTime, moves }: CongratsModalProps) => {
    const navigation = useNavigation<CongratsModalNavigationProp>();

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    return (
        <View className="absolute inset-0 bg-black/50 items-center justify-center">
            <View className="bg-white rounded-3xl py-8 px-12 w-[85%] items-center relative">
                {/* Light rays icon */}
                <Image 
                    source={require('assets/GameAssets/light_icon.png')}
                    className="w-40 h-40 absolute -top-16"
                    resizeMode="contain"
                />
                
                {/* Ribbon with text */}
                <View className="absolute -top-6">
                    <Image 
                        source={require('assets/GameAssets/finish_ribbon.png')}
                        className="w-72 h-20"
                        resizeMode="contain"
                    />
                    <Text className="text-2xl font-bold text-white absolute w-full text-center top-3 left-1">
                        Hoàn Thành
                    </Text>
                </View>

                <View className="mt-16 mb-6 items-center">
                    {/* Completion Time */}
                    {completionTime !== undefined && (
                        <View className="items-center mb-4">
                            <View className="flex-row items-center mb-2">
                                <Icon name="clock-outline" size={24} color="#3B82F6" />
                                <Text className="text-xl font-semibold ml-2 text-gray-800">
                                    Thời gian hoàn thành
                                </Text>
                            </View>
                            <Text className="text-3xl font-bold text-blue-500">
                                {formatTime(completionTime)}
                            </Text>
                        </View>
                    )}

                    {/* Moves Count */}
                    {moves !== undefined && (
                        <View className="items-center">
                            <View className="flex-row items-center mb-2">
                                <Icon name="foot-print" size={24} color="#3B82F6" />
                                <Text className="text-xl font-semibold ml-2 text-gray-800">
                                    Số bước di chuyển
                                </Text>
                            </View>
                            <Text className="text-3xl font-bold text-blue-500">
                                {moves}
                            </Text>
                        </View>
                    )}
                </View>

                {/* Buttons */}
                <View className="flex-row justify-center space-x-12 mt-4">
                    <TouchableOpacity 
                        onPress={onPlayAgain}
                        className="items-center justify-center mx-2"
                    >
                        <Image 
                            source={require('assets/GameAssets/replay_btn.png')}
                            className="item-center justify-center"
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={() => navigation.navigate('GameMenuScreen')}
                        className="items-center justify-center mx-2"
                    >
                        <Image 
                            source={require('assets/GameAssets/home_btn.png')}
                            className="item-center justify-center"
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default CongratsModal; 