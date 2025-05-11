import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';

interface SettingsModalProps {
    visible: boolean;
    onClose: () => void;
    onColorChange: (color: string) => void;
    currentColor: string;
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

const SettingsModal: React.FC<SettingsModalProps> = ({ visible, onClose, onColorChange, currentColor }) => {
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

export default SettingsModal; 