import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { WordItemProps } from "./types";

const WordItem = ({ item, onPress, width }: WordItemProps) => (
    <View style={{ width: `${width}%`, padding: 4 }}>
        <TouchableOpacity
            className={`p-3 rounded-lg items-center justify-center ${item.type === 'back' ? 'bg-gray-200' : 'bg-blue-100'
                }`}
            onPress={() => onPress(item)}
        >
            {item.icon ? (
                <MaterialIcons name={item.icon as any} size={20} color="#1E40AF" />
            ) : null}
            <Text
                className={`font-medium mt-1 ${item.type === 'back' ? 'text-gray-600' : 'text-blue-800'
                    }`}
                style={{ fontSize: 14 }}
            >
                {item.label}
            </Text>
        </TouchableOpacity>
    </View>
);

export default WordItem; 