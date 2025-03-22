import { Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface FeatureCardProps {
    title: string
    onPress: () => void
    icon: keyof typeof MaterialCommunityIcons.glyphMap
}

const FeatureCard = ({ title, onPress, icon }: FeatureCardProps) => {
    return (
        <TouchableOpacity
            className="w-full h-52 bg-white rounded-2xl shadow-lg p-5 mb-4"
            onPress={onPress}
        >
            <View className="flex-1 items-center justify-center">
                <MaterialCommunityIcons name={icon} size={48} color="#374151" />
                <Text className="text-lg font-bold text-gray-800 mt-4">{title}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default FeatureCard;

