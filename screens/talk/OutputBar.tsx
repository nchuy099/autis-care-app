import { View, Text, FlatList, TouchableOpacity } from "react-native";
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
                            <Text className="text-lg mx-2">{item}</Text>
                        )}
                        keyExtractor={(_, index) => index.toString()}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        className="px-4"
                    />
                </TouchableOpacity>
                <View className="flex-col mr-4 gap-2">
                    <TouchableOpacity
                        className="bg-red-500 px-4 py-2 rounded-lg"
                        onPress={onRemoveLast}
                    >
                        <Text className="text-white font-bold">Xóa</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        className="bg-red-600 px-4 py-2 rounded-lg"
                        onPress={onRemoveAll}
                    >
                        <Text className="text-white font-bold">Xóa tất cả</Text>
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