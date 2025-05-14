import { View, Text, FlatList, TouchableOpacity, Image, SafeAreaView } from "react-native";
import { Feather, FontAwesome6, MaterialIcons } from '@expo/vector-icons';
import { OutputBarProps } from "./types";

const OutputBar = ({ selectedWords, onSpeak, onRemoveLast, onRemoveAll }: OutputBarProps) => (
    <SafeAreaView className="rounded-xl bg-blue-50">
        <View className="h-32">
            {selectedWords.length > 0 ? (
                <View className="flex-row items-center h-full">
                    <TouchableOpacity
                        className="flex-1 justify-between bg-white mx-2 my-2 rounded-xl border-2 border-blue-300"
                        style={{
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            elevation: 5,
                        }}
                        onPress={onSpeak}
                    >
                        <FlatList
                            data={selectedWords}
                            renderItem={({ item }) => (
                                <View className="items-center justify-center">
                                    {item.image && (
                                        <Image
                                            source={item.image}
                                            style={{ width: 60, height: 60 }}
                                            resizeMode="contain"
                                        />
                                    )}
                                    <Text className="text-base font-bold mt-1">{item.label}</Text>
                                </View>
                            )}
                            keyExtractor={(_, index) => index.toString()}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            className="px-4"
                            contentContainerStyle={{ alignItems: 'center', height: '100%' }}
                        />
                    </TouchableOpacity>
                    <View className="flex-col gap-3">
                        <TouchableOpacity
                            className="bg-orange-400 px-3 py-2 rounded-xl flex-row items-center justify-end gap-1 border-2 border-orange-500"
                            style={{
                                shadowColor: "#000",
                                shadowOffset: { width: 0, height: 1 },
                                shadowOpacity: 0.2,
                                shadowRadius: 2,
                                elevation: 3,
                            }}
                            onPress={onRemoveLast}
                        >
                            <FontAwesome6 name="delete-left" size={24} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            className="bg-red-400 px-3 py-2 rounded-xl flex-row items-center justify-end gap-1 border-2 border-red-500"
                            style={{
                                shadowColor: "#000",
                                shadowOffset: { width: 0, height: 1 },
                                shadowOpacity: 0.2,
                                shadowRadius: 2,
                                elevation: 3,
                            }}
                            onPress={onRemoveAll}
                        >
                            <MaterialIcons name="delete-sweep" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
            ) : (
                <View className="flex-1 items-center justify-center bg-white mx-2 my-2 rounded-xl border-2 border-blue-300"
                    style={{
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: 5,
                    }}>
                    <Text className="text-blue-500 text-lg font-bold">Chọn từ để tạo câu</Text>
                </View>
            )}
        </View>
    </SafeAreaView>
);

export default OutputBar;