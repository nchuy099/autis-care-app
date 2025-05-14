import { View, Text, TouchableOpacity, Image } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { CardItemProps } from "./types";

const CardItem = ({ item, onPress, width }: CardItemProps) => {
    // Get the border class based on background class
    const getBorderClass = (bgClass: string) => {
        if (!bgClass) return 'border-gray-300';
        // Check if there's already a border class included
        if (bgClass.includes('border-')) {
            return '';  // Return empty if border class is already included
        }
        return bgClass.replace('bg-', 'border-').replace('100', '300');
    };

    const borderClass = item.color ? getBorderClass(item.color) : 'border-gray-300';

    // Extract all classes
    const colorClasses = item.color || 'bg-gray-100';

    return (
        <View style={{ width: `${width}%` }} className="p-1">
            <TouchableOpacity
                className={`p-2 rounded-xl items-center justify-center border-2 ${colorClasses} ${borderClass}`}
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
};

export default CardItem;
