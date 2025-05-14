import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/RootStackParamList';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'HomeScreen'>;

const HomeScreen = () => {
    const navigation = useNavigation<HomeScreenNavigationProp>();

    return (
        <SafeAreaView className="flex-1 bg-[#F5F9FF]">
            {/* Header */}
            <View className="flex-row justify-between items-center p-5 bg-white border-b border-[#E0E0E0] mt-3">
                <Text className="text-2xl font-bold text-[#333]">AAC Speech Device</Text>
                <TouchableOpacity 
                    className="p-2.5"
                    onPress={() => navigation.navigate('ProfileScreen')}
                >
                    <Icon name="account-circle" size={40} color="#4A90E2" />
                </TouchableOpacity>
            </View>

            {/* Main Content */}
            <View className="flex-1 p-5">
                <View className="mb-8 p-5 bg-white rounded-2xl shadow-sm">
                    <Text className="text-3xl font-bold text-[#4A90E2] mb-2.5">Hello!</Text>
                    <Text className="text-lg text-[#666]">What would you like to do today?</Text>
                </View>

                <View className="gap-5">
                    <TouchableOpacity 
                        className="flex-row items-center p-5 rounded-2xl shadow-sm bg-[#FF6B6B]"
                        onPress={() => navigation.navigate('GameMenuScreen')}
                    >
                        <View className="w-[60px] h-[60px] rounded-[30px] bg-white/20 justify-center items-center mr-4">
                            <Icon name="gamepad-variant" size={40} color="#fff" />
                        </View>
                        <Text className="text-2xl font-bold text-white">Play Games</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        className="flex-row items-center p-5 rounded-2xl shadow-sm bg-[#4ECDC4]"
                        onPress={() => navigation.navigate('TalkScreen')}
                    >
                        <View className="w-[60px] h-[60px] rounded-[30px] bg-white/20 justify-center items-center mr-4">
                            <Icon name="chat" size={40} color="#fff" />
                        </View>
                        <Text className="text-2xl font-bold text-white">Talk</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        className="flex-row items-center p-5 rounded-2xl shadow-sm bg-[#45B7D1]"
                        onPress={() => navigation.navigate('ScheduleScreen')}
                    >
                        <View className="w-[60px] h-[60px] rounded-[30px] bg-white/20 justify-center items-center mr-4">
                            <Icon name="calendar" size={40} color="#fff" />
                        </View>
                        <Text className="text-2xl font-bold text-white">Schedule</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;
