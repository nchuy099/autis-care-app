import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Activity } from './types';

interface SettingsModalProps {
    visible: boolean;
    onClose: () => void;
    onColorChange: (color: string) => void;
    currentColor: string;
    onEditActivity: (activity: Activity) => void;
    onDeleteActivity: (activity: Activity) => void;
    activities: Activity[];
    onResetToDefault: () => void;
}

const COLOR_OPTIONS = [
    { name: 'Đỏ', value: '#ef4444' },
    { name: 'Cam', value: '#f97316' },
    { name: 'Vàng', value: '#eab308' },
    { name: 'Lục', value: '#22c55e' },
    { name: 'Lam', value: '#3b82f6' },
    { name: 'Tím', value: '#8b5cf6' },
    { name: 'Hồng', value: '#ec4899' },
    { name: 'Nâu', value: '#b45309' },
];

const SettingsModal: React.FC<SettingsModalProps> = ({ 
    visible, 
    onClose, 
    onColorChange, 
    currentColor,
    onEditActivity,
    onDeleteActivity,
    activities,
    onResetToDefault
}) => {
    const [showDeleteList, setShowDeleteList] = useState(false);
    const [showEditList, setShowEditList] = useState(false);
    const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

    const handleDeletePress = () => {
        setShowDeleteList(true);
        setShowEditList(false);
    };

    const handleEditPress = () => {
        setShowEditList(true);
        setShowDeleteList(false);
    };

    const handleActivitySelect = (activity: Activity) => {
        setSelectedActivity(activity);
    };

    const handleConfirmDelete = () => {
        if (selectedActivity) {
            onDeleteActivity(selectedActivity);
            setSelectedActivity(null);
            setShowDeleteList(false);
            onClose();
        }
    };

    const handleConfirmEdit = () => {
        if (selectedActivity) {
            onEditActivity(selectedActivity);
            setSelectedActivity(null);
            setShowEditList(false);
            onClose();
        }
    };

    const handleCancel = () => {
        setSelectedActivity(null);
    };

    const handleBack = () => {
        setShowDeleteList(false);
        setShowEditList(false);
        setSelectedActivity(null);
    };

    const handleResetToDefault = () => {
        Alert.alert(
            "Đặt lại lịch trình",
            "Bạn có chắc chắn muốn đặt lại tất cả hoạt động về mặc định?",
            [
                {
                    text: "Hủy",
                    style: "cancel"
                },
                {
                    text: "Đặt lại",
                    style: "destructive",
                    onPress: () => {
                        onResetToDefault();
                        onClose();
                    }
                }
            ]
        );
    };

    const renderActivityList = (isDelete: boolean) => (
        <>
            <View className="p-4 border-b border-gray-200 flex-row items-center">
                <TouchableOpacity onPress={handleBack} className="mr-4">
                    <Ionicons name="arrow-back" size={24} color="#1e1b4b" />
                </TouchableOpacity>
                <Text className="text-xl font-bold flex-1 text-center">
                    {isDelete ? 'Chọn hoạt động để xóa' : 'Chọn hoạt động để chỉnh sửa'}
                </Text>
            </View>

            <ScrollView className="max-h-96">
                {activities.map((activity) => (
                    <TouchableOpacity
                        key={activity.id}
                        onPress={() => handleActivitySelect(activity)}
                        className={`p-4 border-b border-gray-200 flex-row items-center ${
                            selectedActivity?.id === activity.id ? 'bg-blue-50' : ''
                        }`}
                    >
                        <View 
                            className="w-10 h-10 rounded-full items-center justify-center mr-3"
                            style={{ backgroundColor: currentColor }}
                        >
                            <Ionicons 
                                name={activity.icon} 
                                size={20} 
                                color="white" 
                            />
                        </View>
                        <View className="flex-1">
                            <Text className="text-lg font-semibold">{activity.title}</Text>
                            <Text className="text-gray-500">{activity.time}</Text>
                        </View>
                        <Ionicons 
                            name={isDelete ? "trash" : "create"} 
                            size={24} 
                            color={isDelete ? "#ef4444" : "#3b82f6"} 
                        />
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <View className="p-4 border-t border-gray-200">
                {selectedActivity ? (
                    <View className="flex-row justify-end space-x-4">
                        <TouchableOpacity
                            onPress={handleCancel}
                            className="bg-gray-100 py-3 px-6 rounded-lg"
                        >
                            <Text className="text-gray-800 font-semibold">Hủy</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={isDelete ? handleConfirmDelete : handleConfirmEdit}
                            className={`py-3 px-6 rounded-lg ${
                                isDelete ? 'bg-red-500' : 'bg-blue-500'
                            }`}
                        >
                            <Text className="text-white font-semibold">
                                {isDelete ? 'Xác nhận xóa' : 'Chỉnh sửa'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <TouchableOpacity
                        onPress={handleBack}
                        className="bg-gray-100 py-3 px-6 rounded-lg self-end"
                    >
                        <Text className="text-gray-800 font-semibold">Quay lại</Text>
                    </TouchableOpacity>
                )}
            </View>
        </>
    );

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <View className="flex-1 bg-black/50 justify-center items-center">
                <View className="bg-white rounded-2xl w-[90%] max-w-md">
                    {!showDeleteList && !showEditList ? (
                        <>
                            <View className="p-4 border-b border-gray-200">
                                <Text className="text-xl font-bold text-center">Cài đặt</Text>
                            </View>

                            <View className="p-4">
                                <Text className="text-lg font-semibold mb-4">Màu sắc</Text>
                                <View className="flex-row flex-wrap gap-3">
                                    {COLOR_OPTIONS.map((color) => (
                                        <TouchableOpacity
                                            key={color.value}
                                            onPress={() => onColorChange(color.value)}
                                            className="items-center"
                                        >
                                            <View 
                                                className="w-12 h-12 rounded-full mb-1"
                                                style={{ 
                                                    backgroundColor: color.value,
                                                    borderWidth: 2,
                                                    borderColor: color.value === currentColor ? '#000' : 'transparent'
                                                }}
                                            />
                                            <Text className="text-sm">{color.name}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>

                            <View className="p-4 border-t border-gray-200">
                                <Text className="text-lg font-semibold mb-4">Quản lý hoạt động</Text>
                                <View className="flex-row justify-between">
                                    <TouchableOpacity
                                        onPress={handleEditPress}
                                        className="bg-blue-500 py-2 px-4 rounded-lg items-center flex-1 mr-2"
                                    >
                                        <Ionicons name="create" size={20} color="white" />
                                        <Text className="text-white font-semibold text-sm mt-1">Chỉnh sửa</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={handleDeletePress}
                                        className="bg-blue-500 py-2 px-4 rounded-lg items-center flex-1 ml-2"
                                    >
                                        <Ionicons name="trash" size={20} color="white" />
                                        <Text className="text-white font-semibold text-sm mt-1">Xóa</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View className="p-4 border-t border-gray-200">
                                <TouchableOpacity
                                    onPress={handleResetToDefault}
                                    className="bg-blue-500 py-2 px-4 rounded-lg items-center mb-4 flex-row justify-center"
                                >
                                    <Ionicons name="refresh" size={20} color="white" />
                                    <Text className="text-white font-semibold text-sm ml-2">Đặt lại về mặc định</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={onClose}
                                    className="bg-blue-100 py-2 px-4 rounded-lg self-end"
                                >
                                    <Text className="text-blue-800 font-semibold text-sm">Đóng</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    ) : showDeleteList ? (
                        renderActivityList(true)
                    ) : (
                        renderActivityList(false)
                    )}
                </View>
            </View>
        </Modal>
    );
};

export default SettingsModal; 