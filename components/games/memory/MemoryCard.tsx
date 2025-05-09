import { Image, Text, TouchableOpacity, View, Animated, ImageSourcePropType } from "react-native";
import { GameCard } from "types/game";
import { useEffect, useRef } from "react";

interface MemoryCardProps {
    card: GameCard;
    onSelect: (card: GameCard) => void;
    isSelected: boolean;
    isError: boolean;
}

const MemoryCard = ({ card, onSelect, isSelected, isError }: MemoryCardProps) => {
    const flipAnimation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.spring(flipAnimation, {
            toValue: card.isFlipped ? 1 : 0,
            friction: 8,
            tension: 10,
            useNativeDriver: true,
        }).start();
    }, [card.isFlipped]);

    const frontInterpolate = flipAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg'],
    });

    const backInterpolate = flipAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: ['180deg', '360deg'],
    });

    const frontAnimatedStyle = {
        transform: [{ rotateY: frontInterpolate }],
    };

    const backAnimatedStyle = {
        transform: [{ rotateY: backInterpolate }],
    };

    const getBorderColor = () => {
        if (isError) return 'border-red-500';
        if (isSelected) return 'border-blue-500';
        return 'border-gray-300';
    };

    const renderCardContent = () => {
        if (card.type === 'image') {
            return (
                <Image 
                    source={card.value as ImageSourcePropType}
                    className="w-16 h-16"
                    resizeMode="contain"
                />
            );
        }
        return (
            <Text className="text-lg font-semibold text-center">
                {card.value as string}
            </Text>
        );
    };

    return (
        <TouchableOpacity
            className={`aspect-square rounded-2xl border-4 ${getBorderColor()}`}
            onPress={() => !card.isMatched && onSelect(card)}
            disabled={card.isMatched}
        >
            <View className="flex-1">
                {/* Front of card (Question mark) */}
                <Animated.View 
                    className="absolute w-full h-full bg-blue-100 rounded-2xl items-center justify-center"
                    style={[
                        frontAnimatedStyle,
                        { backfaceVisibility: 'hidden' }
                    ]}
                >
                    <Text className="text-4xl">?</Text>
                </Animated.View>

                {/* Back of card (Image) */}
                <Animated.View 
                    className="absolute w-full h-full bg-white rounded-2xl items-center justify-center"
                    style={[
                        backAnimatedStyle,
                        { backfaceVisibility: 'hidden' }
                    ]}
                >
                    {card.isFlipped && renderCardContent()}
                </Animated.View>
            </View>
        </TouchableOpacity>
    );
};

export default MemoryCard; 