import { View, FlatList, Text, useWindowDimensions } from "react-native";
import { CardGridProps } from "./types";
import CardItem from "./CardItem";

const WordGrid = ({ data, currentCategory, onWordPress }: CardGridProps) => {
    const { width } = useWindowDimensions();
    // Use fixed columns based on screen width
    const numColumns = width > 768 ? 6 : width > 500 ? 4 : 3;
    const itemWidth = 100 / numColumns;

    const getSortedData = () => {
        if (!currentCategory) return data;

        const backButton = currentCategory.subWords?.find(item => item.type === 'back');
        const otherWords = currentCategory.subWords?.filter(item => item.type !== 'back') || [];

        return backButton ? [backButton, ...otherWords] : otherWords;
    };

    return (
        <View className="flex-1">
            {currentCategory && (
                <Text className="text-lg font-bold text-gray-600 ml-4 mt-2 mb-1">
                    {currentCategory.label}
                </Text>
            )}
            <FlatList
                key={`grid-${numColumns}`}
                data={getSortedData()}
                renderItem={({ item }) => (
                    <CardItem
                        item={item}
                        onPress={onWordPress}
                        width={itemWidth}
                    />
                )}
                keyExtractor={(item) => item.id}
                numColumns={numColumns}
                contentContainerStyle={{ padding: 2 }}
            />
        </View>
    );
};

export default WordGrid; 