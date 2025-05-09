import { Image, Text, TouchableOpacity, View } from "react-native";
import { GameCard } from "types/game";

interface MatchingCardProps {
    card: GameCard;
    onSelect: (card: GameCard) => void;
    isSelected: boolean;
    isError: boolean;
}

const MatchingCard = ({ card, onSelect, isSelected, isError }: MatchingCardProps) => {
    const getBorderColor = () => {
        if (isError) return 'border-red-500';
        if (isSelected) return 'border-blue-500';
        return 'border-gray-300';
    };

    return (
        <TouchableOpacity
            className={`aspect-square bg-white rounded-2xl p-2 border-4 ${getBorderColor()}`}
            onPress={() => !card.isMatched && onSelect(card)}
            disabled={card.isMatched}
        >
            {card.isMatched ? (
                <View className="flex-1 opacity-0" />
            ) : (
                <View className="flex-1 items-center justify-center">
                    {card.type === 'image' ? (
                        <View className="w-16 h-16 items-center justify-center">
                            <Image 
                                source={card.value}
                                className="w-full h-full"
                                resizeMode="contain"
                            />
                        </View>
                    ) : (
                        <Text className="text-lg font-semibold text-center">
                            {card.value}
                        </Text>
                    )}
                </View>
            )}
        </TouchableOpacity>
    );
};

export default MatchingCard; 