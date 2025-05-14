import React, { useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Audio } from 'expo-av';
import Layout from "components/layouts/Layout";
import { Activity } from './types';
import { DEFAULT_ACTIVITIES } from './constants';
import ActivityModal from './ActivityModal';
import ActivityInfoModal from './ActivityInfoModal';
import SettingsModal from './SettingsModal';
import Timeline, { TimelineRef } from './Timeline';
import * as ActivityHandlers from './activityHandlers';

const ScheduleScreen = () => {
    const navigation = useNavigation();
    const timelineRef = useRef<TimelineRef>(null);
    const buttonPressSound = useRef<Audio.Sound>();
    const buttonPress2Sound = useRef<Audio.Sound>();
    
    const today = new Date();
    const currentHour = today.getHours().toString().padStart(2, '0');
    
    const dateString = today.toLocaleDateString('vi-VN', {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isSettingsVisible, setIsSettingsVisible] = useState(false);
    const [isInfoModalVisible, setIsInfoModalVisible] = useState(false);
    const [editingActivity, setEditingActivity] = useState<Activity | null>(null);
    const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
    const [expandedHour, setExpandedHour] = useState<string | null>(null);
    const [activities, setActivities] = useState<Activity[]>(DEFAULT_ACTIVITIES);
    const [currentTimeColor, setCurrentTimeColor] = useState('#4f46e5');

    useEffect(() => {
        // Load sound effects
        const loadSounds = async () => {
            const { sound: pressSound } = await Audio.Sound.createAsync(
                require('../../assets/ScheduleAssets/sounds/button-press.mp3')
            );
            const { sound: press2Sound } = await Audio.Sound.createAsync(
                require('../../assets/ScheduleAssets/sounds/button-press-2.mp3')
            );
            buttonPressSound.current = pressSound;
            buttonPress2Sound.current = press2Sound;
        };

        loadSounds();

        return () => {
            buttonPressSound.current?.unloadAsync();
            buttonPress2Sound.current?.unloadAsync();
        };
    }, []);

    const playButtonPress = async () => {
        try {
            await buttonPressSound.current?.setPositionAsync(0);
            await buttonPressSound.current?.playAsync();
        } catch (error) {
            console.log('Error playing sound:', error);
        }
    };

    const playButtonPress2 = async () => {
        try {
            await buttonPress2Sound.current?.setPositionAsync(0);
            await buttonPress2Sound.current?.playAsync();
        } catch (error) {
            console.log('Error playing sound:', error);
        }
    };

    useEffect(() => {
        ActivityHandlers.handleLoadActivities(setActivities);
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            timelineRef.current?.scrollToCurrentTime();
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    const handleAddActivity = async () => {
        await playButtonPress();
        setIsModalVisible(true);
        setEditingActivity(null);
    };

    const handleEditActivity = async (activity: Activity) => {
        await playButtonPress();
        setEditingActivity(activity);
        setIsModalVisible(true);
    };

    const handleDeleteActivity = async (id: string) => {
        await playButtonPress();
        ActivityHandlers.handleDeleteActivity(activities, id, setActivities);
    };

    const handleSaveActivity = async (activity: Activity) => {
        await playButtonPress();
        ActivityHandlers.handleSaveActivity(
            activities,
            activity,
            editingActivity,
            setActivities,
            setIsModalVisible
        );
    };

    const handleSettings = async () => {
        await playButtonPress();
        setIsSettingsVisible(true);
    };

    const handleCloseSettings = async () => {
        await playButtonPress2();
        setIsSettingsVisible(false);
    };

    const handleGoBack = async () => {
        await playButtonPress();
        navigation.goBack();
    };

    const handleJumpToCurrentTime = async () => {
        await playButtonPress();
        timelineRef.current?.scrollToCurrentTime();
    };

    const handleActivityPress = async (activity: Activity) => {
        await playButtonPress();
        setSelectedActivity(activity);
        setIsInfoModalVisible(true);
    };

    const handleToggleComplete = async (activity: Activity) => {
        await playButtonPress();
        const updatedActivity = { ...activity, completed: !activity.completed };
        const updatedActivities = activities.map(a => 
            a.id === activity.id ? updatedActivity : a
        );
        setActivities(updatedActivities);
        ActivityHandlers.saveActivities(updatedActivities);
    };

    const handleResetToDefault = async () => {
        await playButtonPress();
        // First clear all activities
        await ActivityHandlers.clearAllActivities();
        // Then set and save default activities
        setActivities(DEFAULT_ACTIVITIES);
        await ActivityHandlers.saveActivities(DEFAULT_ACTIVITIES);
    };

    return (
        <Layout>
            <ImageBackground
                source={require('../../assets/ScheduleAssets/backgrounds/schedule-vertical-bg.jpg')}
                className="flex-1"
                resizeMode="cover"
            >
                <View className="flex-1 bg-white/90">
                    <View className="items-center mb-6 mt-4">
                        <View className="w-full flex-row items-center justify-between mb-4">
                            <View className="flex-row">
                                <TouchableOpacity 
                                    onPress={handleGoBack}
                                    className="w-12 h-12 bg-white rounded-full items-center justify-center shadow-md mr-2"
                                >
                                    <Ionicons name="home" size={24} color="#1e1b4b" />
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={handleJumpToCurrentTime}
                                    className="w-12 h-12 bg-white rounded-full items-center justify-center shadow-md"
                                >
                                    <Ionicons name="time" size={24} color="#1e1b4b" />
                                </TouchableOpacity>
                            </View>
                            <Text className="text-3xl font-bold">Lịch trình</Text>
                            <View className="flex-row">
                                <TouchableOpacity 
                                    onPress={handleSettings}
                                    className="w-12 h-12 bg-white rounded-full items-center justify-center shadow-md mr-2"
                                >
                                    <Ionicons name="settings-outline" size={24} color="#1e1b4b" />
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={handleAddActivity}
                                    className="w-12 h-12 rounded-full items-center justify-center"
                                    style={{ backgroundColor: currentTimeColor }}
                                >
                                    <Ionicons name="add" size={24} color="white" />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <Text 
                            className="text-xl"
                            style={{ color: currentTimeColor }}
                        >
                            Hôm nay là {dateString}
                        </Text>
                    </View>

                    <Timeline
                        ref={timelineRef}
                        activities={activities}
                        expandedHour={expandedHour}
                        onToggleHour={setExpandedHour}
                        onActivityPress={handleActivityPress}
                        currentHour={currentHour}
                        currentTimeColor={currentTimeColor}
                    />

                    <ActivityModal
                        visible={isModalVisible}
                        onClose={() => setIsModalVisible(false)}
                        onSave={handleSaveActivity}
                        onDelete={handleDeleteActivity}
                        editingActivity={editingActivity}
                    />

                    <ActivityInfoModal
                        visible={isInfoModalVisible}
                        onClose={() => setIsInfoModalVisible(false)}
                        activity={selectedActivity}
                        onToggleComplete={handleToggleComplete}
                    />

                    <SettingsModal
                        visible={isSettingsVisible}
                        onClose={handleCloseSettings}
                        onColorChange={setCurrentTimeColor}
                        currentColor={currentTimeColor}
                        onEditActivity={(activity) => {
                            setEditingActivity(activity);
                            setIsModalVisible(true);
                        }}
                        onDeleteActivity={(activity) => {
                            handleDeleteActivity(activity.id);
                        }}
                        activities={activities}
                        onResetToDefault={handleResetToDefault}
                    />
                </View>
            </ImageBackground>
        </Layout>
    );
};

export default ScheduleScreen; 