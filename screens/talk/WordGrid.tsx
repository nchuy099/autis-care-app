import { View, FlatList, StyleSheet, useWindowDimensions } from "react-native";
import { WordGridProps } from "./types";
import WordItem from "./WordItem";

const styles = StyleSheet.create({
    gridContainer: {
        padding: 4,
    },
});

const WordGrid = ({ data, currentCategory, onWordPress }: WordGridProps) => {
    const { width } = useWindowDimensions();
    const numColumns = Math.max(2, Math.min(Math.floor(width / 100), 4));
    const itemWidth = 100 / numColumns;

    const getSortedData = () => {
        if (!currentCategory) return data;

        const backButton = currentCategory.subWords?.find(item => item.type === 'back');
        const otherWords = currentCategory.subWords?.filter(item => item.type !== 'back') || [];

        return backButton ? [backButton, ...otherWords] : otherWords;
    };

    return (
        <View className="flex-1">
            <FlatList
                key={`grid-${numColumns}`}
                data={getSortedData()}
                renderItem={({ item }) => (
                    <WordItem
                        item={item}
                        onPress={onWordPress}
                        width={itemWidth}
                    />
                )}
                keyExtractor={(item) => item.id}
                numColumns={numColumns}
                contentContainerStyle={styles.gridContainer}
            />
        </View>
    );
};

export default WordGrid; 