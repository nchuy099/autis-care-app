import React, { useState } from "react";
import { ScrollView, Text, View, ImageBackground, Image, TouchableOpacity, Modal, Switch } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import RootStackParamList from "types/RootStackParamList";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type GameMenuScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const backgrounds = [
    { name: 'background.png', src: require('assets/GameAssets/GameComponent/background.png') },
    { name: 'background1.jpg', src: require('assets/GameAssets/GameComponent/background1.jpg') },
    { name: 'background_animal.jpg', src: require('assets/GameAssets/GameComponent/background_animal.jpg') },
    { name: 'backgroud2.jpg', src: require('assets/GameAssets/GameComponent/backgroud2.jpg') },
    { name: 'backgroud_animal.jpg', src: require('assets/GameAssets/GameComponent/backgroud_animal.jpg') },
];

const GameMenuScreen = () => {
    const navigation = useNavigation<GameMenuScreenNavigationProp>();
    const [settingsVisible, setSettingsVisible] = useState(false);
    const [musicEnabled, setMusicEnabled] = useState(true);
    const [selectedBg, setSelectedBg] = useState(backgrounds[0].src);

    return (
        <ImageBackground 
            source={selectedBg}
            className="flex-1"
            resizeMode="cover"
        >
            <View className="flex-1">
                {/* Header with Home Button and Settings */}
                <View className="flex-row items-center justify-between px-6 mt-12 mb-4">
                    {/* Home Button */}
                    <View className="flex-1 items-start">
                        <TouchableOpacity 
                            onPress={() => navigation.navigate('HomeScreen')}
                            style={{ backgroundColor: 'white', padding: 10, borderRadius: 999, shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 6, elevation: 4 }}
                        >
                            <Icon name="home" size={30} color="#3B82F6" />
                        </TouchableOpacity>
                    </View>
                    {/* Title */}
                    <View className="flex-1 items-center justify-center">
                        <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#2563EB', letterSpacing: 1 }}>Trò Chơi</Text>
        
                    </View>
                    {/* Settings Button */}
                    <View className="flex-1 items-end">
                        <TouchableOpacity
                            onPress={() => setSettingsVisible(true)}
                            style={{ backgroundColor: 'white', padding: 10, borderRadius: 999, shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 6, elevation: 4 }}
                        >
                            <Icon name="cog" size={30} color="#3B82F6" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Settings Modal */}
                <Modal
                    visible={settingsVisible}
                    transparent
                    animationType="slide"
                    onRequestClose={() => setSettingsVisible(false)}
                >
                    <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ backgroundColor: 'white', borderRadius: 16, padding: 24, width: 320 }}>
                            <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 16 }}>Cài đặt</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
                                <Text style={{ fontSize: 18, flex: 1 }}>Âm nhạc nền</Text>
                                <Switch
                                    value={musicEnabled}
                                    onValueChange={setMusicEnabled}
                                />
                            </View>
                            <Text style={{ fontSize: 18, marginBottom: 8 }}>Chọn hình nền:</Text>
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                                {backgrounds.map(bg => (
                                    <TouchableOpacity
                                        key={bg.name}
                                        onPress={() => setSelectedBg(bg.src)}
                                        style={{ borderWidth: selectedBg === bg.src ? 2 : 0, borderColor: '#3B82F6', borderRadius: 8, margin: 4 }}
                                    >
                                        <Image source={bg.src} style={{ width: 56, height: 56, borderRadius: 8 }} />
                                    </TouchableOpacity>
                                ))}
                            </View>
                            <TouchableOpacity
                                onPress={() => setSettingsVisible(false)}
                                style={{ marginTop: 24, backgroundColor: '#3B82F6', borderRadius: 8, paddingVertical: 10 }}
                            >
                                <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center', fontSize: 18 }}>Đóng</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                {/* Game List */}
                <ScrollView className="flex-1 px-6 mt-8">
                    <TouchableOpacity 
                        className="bg-white rounded-2xl p-6 mb-4 flex-row items-center shadow-lg"
                        onPress={() => navigation.navigate('MatchingGameScreen')}
                    >
                        <Image 
                            source={require('assets/GameAssets/GameComponent/matching_card_logo.png')}
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
                            source={require('assets/GameAssets/GameComponent/memory_card_logo.png')}
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
                            source={require('assets/GameAssets/GameComponent/puzzle_game_logo.png')}
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