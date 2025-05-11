import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { Activity, IconName } from './types';
import { ICONS, HOURS, MINUTES } from './constants';

interface ActivityModalProps {
    visible: boolean;
    onClose: () => void;
    onSave: (activity: Activity) => void;
    onDelete?: (id: string) => void;
    editingActivity: Activity | null;
}

const ActivityModal: React.FC<ActivityModalProps> = ({
    visible,
    onClose,
    onSave,
    onDelete,
    editingActivity
}) => {
    const [title, setTitle] = useState('');
    const [time, setTime] = useState('07:00');
    const [icon, setIcon] = useState<IconName>('restaurant');
    const [description, setDescription] = useState('');
    const [showTimeSelector, setShowTimeSelector] = useState(false);

    useEffect(() => {
        if (editingActivity) {
            setTitle(editingActivity.title);
            setTime(editingActivity.time);
            setIcon(editingActivity.icon);
            setDescription(editingActivity.description);
        } else {
            setTitle('');
            setTime('07:00');
            setIcon('restaurant');
            setDescription('');
        }
    }, [editingActivity]);

    const handleSave = () => {
        if (!title.trim()) {
            Alert.alert('Lỗi', 'Vui lòng nhập tên hoạt động');
            return;
        }

        const activity: Activity = {
            id: editingActivity?.id || Date.now().toString(),
            title: title.trim(),
            time,
            icon,
            description: description.trim(),
            completed: editingActivity?.completed || false
        };

        onSave(activity);
        onClose();
    };

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="slide"
        >
            <View className="flex-1 justify-end">
                <View className="bg-white rounded-t-3xl p-6 shadow-xl">
                    <View className="flex-row justify-between items-center mb-6">
                        <Text className="text-2xl font-bold">
                            {editingActivity ? 'Chỉnh sửa hoạt động' : 'Hoạt động mới'}
                        </Text>
                        <TouchableOpacity 
                            onPress={onClose}
                            className="p-2"
                        >
                            <Ionicons name="close" size={24} color="#1e1b4b" />
                        </TouchableOpacity>
                    </View>

                    <TextInput
                        value={title}
                        onChangeText={setTitle}
                        placeholder="Tên hoạt động"
                        className="border border-gray-300 rounded-xl p-4 mb-4 text-lg"
                    />

                    <TouchableOpacity
                        onPress={() => setShowTimeSelector(!showTimeSelector)}
                        className="border border-gray-300 rounded-xl p-4 mb-4"
                    >
                        <Text className="text-lg">
                            Thời gian: {time}
                        </Text>
                    </TouchableOpacity>

                    {showTimeSelector && (
                        <View className="mb-4 p-4 bg-gray-50 rounded-xl">
                            <View className="flex-row justify-between mb-4">
                                <View className="flex-1 mr-2">
                                    <Text className="text-sm text-gray-600 mb-2">Giờ</Text>
                                    <ScrollView className="border border-gray-200 rounded-lg p-2 max-h-32">
                                        {HOURS.map(hour => (
                                            <TouchableOpacity
                                                key={hour}
                                                onPress={() => setTime(hour + ':00')}
                                                className={`p-2 rounded ${time.split(':')[0] === hour ? 'bg-indigo-100' : ''}`}
                                            >
                                                <Text className={`text-center ${time.split(':')[0] === hour ? 'text-indigo-600 font-bold' : ''}`}>
                                                    {hour}
                                                </Text>
                                            </TouchableOpacity>
                                        ))}
                                    </ScrollView>
                                </View>
                                <View className="flex-1 ml-2">
                                    <Text className="text-sm text-gray-600 mb-2">Phút</Text>
                                    <ScrollView className="border border-gray-200 rounded-lg p-2 max-h-32">
                                        {MINUTES.map(minute => (
                                            <TouchableOpacity
                                                key={minute}
                                                onPress={() => setTime(time.split(':')[0] + ':' + minute)}
                                                className={`p-2 rounded ${time.split(':')[1] === minute ? 'bg-indigo-100' : ''}`}
                                            >
                                                <Text className={`text-center ${time.split(':')[1] === minute ? 'text-indigo-600 font-bold' : ''}`}>
                                                    {minute}
                                                </Text>
                                            </TouchableOpacity>
                                        ))}
                                    </ScrollView>
                                </View>
                            </View>
                        </View>
                    )}

                    <TextInput
                        value={description}
                        onChangeText={setDescription}
                        placeholder="Mô tả"
                        className="border border-gray-300 rounded-xl p-4 mb-4 text-lg"
                        multiline
                        numberOfLines={3}
                    />

                    <Text className="text-lg mb-2">Chọn biểu tượng:</Text>
                    <ScrollView 
                        horizontal 
                        showsHorizontalScrollIndicator={false}
                        className="mb-6"
                    >
                        {ICONS.map((iconName) => (
                            <TouchableOpacity
                                key={iconName}
                                onPress={() => setIcon(iconName)}
                                className={`w-12 h-12 rounded-full items-center justify-center mr-4 ${
                                    icon === iconName ? 'bg-indigo-100' : 'bg-gray-100'
                                }`}
                            >
                                <Ionicons 
                                    name={iconName as any} 
                                    size={24} 
                                    color={icon === iconName ? '#4f46e5' : '#6b7280'} 
                                />
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    <View className="flex-row justify-between">
                        {editingActivity ? (
                            <TouchableOpacity
                                onPress={onClose}
                                className="bg-gray-500 rounded-xl py-4 px-6"
                            >
                                <Text className="text-white font-bold text-lg">Hủy</Text>
                            </TouchableOpacity>
                        ) : null}
                        <TouchableOpacity
                            onPress={handleSave}
                            className={`bg-indigo-500 rounded-xl py-4 ${editingActivity ? 'px-6' : 'flex-1'}`}
                        >
                            <Text className="text-white font-bold text-lg text-center">Lưu</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default ActivityModal; 