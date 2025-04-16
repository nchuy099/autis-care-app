import { View, Text, TouchableOpacity, Image } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { CardItemProps } from "./types";

const CardItem = ({ item, onPress, width }: CardItemProps) => (
    <View style={{ width: `${width}%`, padding: 4 }}>
        <TouchableOpacity
            className={`p-3 rounded-lg items-center justify-center ${item.type === 'back' ? 'bg-gray-200' : 'bg-blue-100'
                }`}
            onPress={() => onPress(item)}
        >
            {item.type === 'back' ? (
                <MaterialIcons name="arrow-back" size={78} color="#4B5563" />
            ) : item.image ? (
                <Image source={item.image} style={{ width: 80, height: 80}} resizeMode="contain" />
            ) : null}
            <Text
                className={`font-medium mt-1 ${item.type === 'back' ? 'text-gray-600' : 'text-blue-800'
                    }`}
                style={{ fontSize: 12 }}
            >
                {item.label}
            </Text>
        </TouchableOpacity>
    </View>
);

export default CardItem;
