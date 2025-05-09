import { View, Text, TouchableOpacity, Image } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { CardItemProps } from "./types";

const CardItem = ({ item, onPress, width }: CardItemProps) => (
    <View style={{ width: `${width}%` }} className="p-1">
        <TouchableOpacity
            className={`p-2 rounded-xl items-center justify-center border-2 ${item.type === 'back' ? 'bg-gray-200 border-gray-300' :
                item.type === 'core' ? 'bg-green-100 border-green-300' :
                    item.type === 'food' ? 'bg-orange-100 border-orange-300' :
                        item.type === 'animals' ? 'bg-cyan-100 border-cyan-300' :
                            item.type === 'activities' ? 'bg-blue-100 border-blue-300' :
                                item.type === 'emotions' ? 'bg-pink-100 border-pink-300' :
                                    item.type === 'entertainment' ? 'bg-indigo-100 border-indigo-300' :
                                        item.type === 'clothing' ? 'bg-yellow-100 border-yellow-300' :
                                            item.type === 'places' ? 'bg-purple-100 border-purple-300' :
                                                item.type === 'objects' ? 'bg-emerald-100 border-emerald-300' :
                                                    item.type === 'household' ? 'bg-teal-100 border-teal-300' :
                                                        item.type === 'transportation' ? 'bg-rose-100 border-rose-300' :
                                                            item.type === 'body_health' ? 'bg-amber-100 border-amber-300' :
                                                                item.type === 'directions' ? 'bg-violet-100 border-violet-300' :
                                                                    item.type === 'colors' ? 'bg-orange-100 border-orange-300' :
                                                                        item.type === 'attributes' ? 'bg-lime-100 border-lime-300' :
                                                                            item.type === 'pronouns_words' ? 'bg-sky-100 border-sky-300' :
                                                                                item.type === 'miscellaneous' ? 'bg-blue-100 border-blue-300' :
                                                                                    item.type === 'school_supplies' ? 'bg-cyan-100 border-cyan-300' :
                                                                                        'bg-gray-100 border-gray-300'
                }`}
            style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
            }}
            onPress={() => onPress(item)}
        >
            {item.type === 'back' ? (
                <MaterialIcons name="arrow-back" size={64} color="#4B5563" />
            ) : item.image ? (
                <Image
                    source={item.image}
                    className="w-[80px] h-[80px] mb-1"
                    resizeMode="contain"
                />
            ) : null}
            <Text className={`text-sm font-bold ${item.type === 'back' ? 'text-gray-600' : 'text-gray-700'}`}>
                {item.label}
            </Text>
        </TouchableOpacity>
    </View>
);

export default CardItem;
