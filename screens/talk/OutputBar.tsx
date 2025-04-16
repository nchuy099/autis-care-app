import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { Feather, FontAwesome6, MaterialIcons } from '@expo/vector-icons';
import { OutputBarProps } from "./types";

const OutputBar = ({ selectedWords, onSpeak, onRemoveLast, onRemoveAll }: OutputBarProps) => (
    <View className="h-24 border-b border-gray-200">
        {selectedWords.length > 0 ? (
            <View className="flex-row items-center h-full">
                <TouchableOpacity
                    className="flex-1"
                    onPress={onSpeak}
                >
                    <FlatList
                        data={selectedWords}
                        renderItem={({ item }) => (
                            <View className="items-center mx-2">
                                {item.image && (
                                    <Image 
                                        source={item.image} 
                                        style={{ width: 40, height: 40 }} 
                                        resizeMode="contain" 
                                    />
                                )}
                                <Text className="text-sm mt-1">{item.label}</Text>
                            </View>
                        )}
                        keyExtractor={(_, index) => index.toString()}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        className="px-4 pt-4"
                    />
                </TouchableOpacity>
                <View className="flex-col mr-4 gap-1">
                    <TouchableOpacity
                        className="bg-orange-400 px-3 py-2 rounded-lg flex-row items-center justify-end gap-1"
                        onPress={onRemoveLast}
                    >
                        <FontAwesome6 name="delete-left" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        className="bg-orange-500 px-3 py-2 rounded-lg flex-row items-center justify-end gap-1"
                        onPress={onRemoveAll}
                    >
                        <MaterialIcons name="delete-sweep" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
        ) : (
            <View className="flex-1 items-center justify-center">
                <Text className="text-gray-500 text-lg">Chọn từ để tạo câu</Text>
            </View>
        )}
    </View>
);

export default OutputBar;