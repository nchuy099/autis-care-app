import { Text, TouchableOpacity, View, Image } from "react-native";
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

                {/* Buttons */}
                <View className="flex-row justify-center space-x-12 mt-16">
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