import React from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Activity } from './types';

interface ActivityInfoModalProps {
    visible: boolean;
    onClose: () => void;
    activity: Activity | null;
    onToggleComplete: (activity: Activity) => void;
}

const ActivityInfoModal: React.FC<ActivityInfoModalProps> = ({
    visible,
    onClose,
    activity,
    onToggleComplete
}) => {
    if (!activity) return null;

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <View className="flex-1 bg-black/50 justify-center items-center">
                <View className="bg-white rounded-2xl w-[90%] max-w-md">
                    <View className="p-4 border-b border-gray-200">
                        <Text className="text-xl font-bold text-center">Thông tin hoạt động</Text>
                    </View>

                    <View className="p-4">
                        <View className="flex-row items-center mb-4">
                            <View 
                                className="w-12 h-12 rounded-full items-center justify-center mr-3"
                                style={{ backgroundColor: '#4f46e5' }}
                            >
                                <Ionicons 
                                    name={activity.icon} 
                                    size={24} 
                                    color="white" 
                                />
                            </View>
                            <View className="flex-1">
                                <Text className="text-xl font-bold">{activity.title}</Text>
                                <Text className="text-gray-500">{activity.time}</Text>
                            </View>
                        </View>

                        <View className="mb-4">
                            <Text className="text-lg font-semibold mb-2">Mô tả:</Text>
                            <Text className="text-gray-700">{activity.description}</Text>
                        </View>

                        <View className="mb-4">
                            <Text className="text-lg font-semibold mb-2">Trạng thái:</Text>
                            <Text className={`text-lg ${activity.completed ? 'text-green-600' : 'text-red-600'}`}>
                                {activity.completed ? 'Đã hoàn thành' : 'Chưa hoàn thành'}
                            </Text>
                        </View>

                        <TouchableOpacity
                            onPress={() => {
                                onToggleComplete(activity);
                                onClose();
                            }}
                            className={`py-3 px-6 rounded-lg items-center ${
                                activity.completed ? 'bg-red-500' : 'bg-green-500'
                            }`}
                        >
                            <Text className="text-white font-semibold text-lg">
                                {activity.completed ? 'Đánh dấu chưa hoàn thành' : 'Đánh dấu đã hoàn thành'}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View className="p-4 border-t border-gray-200">
                        <TouchableOpacity
                            onPress={onClose}
                            className="bg-gray-100 py-3 px-6 rounded-lg self-end"
                        >
                            <Text className="text-gray-800 font-semibold">Đóng</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default ActivityInfoModal; 