import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { signOut } from '../services/authService';
import { getUserProfile, updateUserPreferences } from '../services/userService';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/RootStackParamList';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type ProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ProfileScreen'>;

const ProfileScreen = () => {
    const { user, profile } = useAuth();
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation<ProfileScreenNavigationProp>();

    const handleLogout = async () => {
        try {
            await signOut();
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const handleBack = () => {
        navigation.goBack();
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            {/* Header */}
            <View className="flex-row items-center justify-between p-4 border-b border-[#eee] mt-5">
                <TouchableOpacity onPress={handleBack} className="w-10 h-10 items-center justify-center">
                    <Icon name="arrow-left" size={24} color="#000" />
                </TouchableOpacity>
                <Text className="text-xl font-bold">Profile</Text>
                <View className="w-10 h-10" />
            </View>

            {/* Profile Content */}
            <View className="flex-1 p-4">
                <View className="items-center mb-6">
                    <View className="w-[100px] h-[100px] rounded-[50px] bg-[#f0f0f0] items-center justify-center mb-4">
                        <Icon name="account-circle" size={80} color="#3B82F6" />
                    </View>
                    <Text className="text-2xl font-bold mb-2">{profile?.name || 'User'}</Text>
                    <Text className="text-base text-[#666]">{user?.email}</Text>
                </View>

                <View className="mb-6">
                    <View className="flex-row items-center py-3 border-b border-[#eee]">
                        <Icon name="account-circle" size={24} color="#666" />
                        <Text className="text-base ml-4">Age: {profile?.age || 'N/A'}</Text>
                    </View>
                    <View className="flex-row items-center py-3 border-b border-[#eee]">
                        <Icon name="account" size={24} color="#666" />
                        <Text className="text-base ml-4">Role: {profile?.preferences?.role || 'Admin'}</Text>
                    </View>
                </View>

                <TouchableOpacity 
                    className="flex-row items-center justify-center bg-[#3B82F6] p-4 rounded-lg mt-6"
                    onPress={handleLogout}
                >
                    <Icon name="logout" size={24} color="#fff" />
                    <Text className="text-white text-base font-bold ml-2">Logout</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default ProfileScreen; 