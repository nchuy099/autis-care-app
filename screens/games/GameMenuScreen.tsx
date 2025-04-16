import { ScrollView, Text, View, ImageBackground, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import RootStackParamList from "types/RootStackParamList";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type GameMenuScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const GameMenuScreen = () => {
    const navigation = useNavigation<GameMenuScreenNavigationProp>();

    return (
        <ImageBackground 
            source={require('assets/GameAssets/background1.jpg')}
            className="flex-1"
            resizeMode="cover"
        >
            <View className="flex-1">
                {/* Header with Home Button */}
                <View className="flex-row items-center justify-between px-6 mt-12">
                    <TouchableOpacity 
                        onPress={() => navigation.navigate('HomeScreen')}
                        className="bg-white p-2 rounded-full shadow-md"
                    >
                        <Icon name="home" size={32} color="#3B82F6" />
                    </TouchableOpacity>
                    <View className="items-center flex-1 mr-12">
                        <Text className="text-3xl font-bold text-blue-600 mb-2">
                            Trò Chơi
                        </Text>
                        <Text className="text-xl text-gray-700">
                            Chọn một trò chơi để bắt đầu
                        </Text>
                    </View>
                </View>

                {/* Game List */}
                <ScrollView className="flex-1 px-6 mt-8">
                    <TouchableOpacity 
                        className="bg-white rounded-2xl p-6 mb-4 flex-row items-center shadow-lg"
                        onPress={() => navigation.navigate('MatchingGameScreen')}
                    >
                        <Image 
                            source={require('assets/GameAssets/matching_card_logo.png')}
                            className="w-24 h-24"
                            resizeMode="contain"
                        />
                        <View className="ml-6 flex-1">
                            <Text className="text-2xl font-bold text-blue-600 mb-2">
                                Ghép Hình
                            </Text>
                            <Text className="text-gray-600 text-lg">
                                Tìm và ghép các thẻ giống nhau
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        className="bg-white rounded-2xl p-6 mb-4 flex-row items-center shadow-lg"
                        onPress={() => navigation.navigate('MemoryGameScreen')}
                    >
                        <Image 
                            source={require('assets/GameAssets/memory_card_logo.png')}
                            className="w-24 h-24"
                            resizeMode="contain"
                        />
                        <View className="ml-6 flex-1">
                            <Text className="text-2xl font-bold text-blue-600 mb-2">
                                Trí Nhớ
                            </Text>
                            <Text className="text-gray-600 text-lg">
                                Lật thẻ và tìm các cặp giống nhau
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        className="bg-white rounded-2xl p-6 mb-4 flex-row items-center shadow-lg"
                        onPress={() => navigation.navigate('PuzzleGameScreen')}
                    >
                        <Image 
                            source={require('assets/GameAssets/puzzle_game_logo.png')}
                            className="w-24 h-24"
                            resizeMode="contain"
                        />
                        <View className="ml-6 flex-1">
                            <Text className="text-2xl font-bold text-blue-600 mb-2">
                                Xếp Hình
                            </Text>
                            <Text className="text-gray-600 text-lg">
                                Di chuyển các mảnh ghép để hoàn thành bức tranh
                            </Text>
                        </View>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </ImageBackground>
    );
};

export default GameMenuScreen; 