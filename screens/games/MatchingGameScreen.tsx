import { useEffect, useState } from 'react';
import { View, ImageBackground, Text, TouchableOpacity } from 'react-native';
import Layout from 'components/layouts/Layout';
import MatchingCard from 'components/games/matching/MatchingCard';
import CongratsModal from 'components/games/matching/CongratsModal';
import { GameCard, CardGroup } from 'types/game';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

// Giả lập dữ liệu thẻ
const cardGroups: CardGroup[] = [
    { id: '1', image: require('assets/GameAssets/birdcard.png'), text: 'Con chim' },
    { id: '2', image: require('assets/GameAssets/catcard.png'), text: 'Con mèo' },
    { id: '3', image: require('assets/GameAssets/crabcard.png'), text: 'Con cua' },
    { id: '4', image: require('assets/GameAssets/chickencard.png'), text: 'Con gà' },
    { id: '5', image: require('assets/GameAssets/cowcard.png'), text: 'Con bò' },
    { id: '6', image: require('assets/GameAssets/duckcard.png'), text: 'Con vịt' },
];

const MatchingGameScreen = () => {
    const navigation = useNavigation();
    const [cards, setCards] = useState<GameCard[]>([]);
    const [selectedCard, setSelectedCard] = useState<GameCard | null>(null);
    const [errorPair, setErrorPair] = useState<string[]>([]);
    const [isCompleted, setIsCompleted] = useState(false);
    const [time, setTime] = useState(0);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        if (isActive && !isCompleted) {
            interval = setInterval(() => {
                setTime(time => time + 1);
            }, 1000);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isActive, isCompleted]);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const initializeGame = () => {
        // Chọn ngẫu nhiên 6 nhóm thẻ
        const shuffledGroups = [...cardGroups].sort(() => Math.random() - 0.5).slice(0, 6);
        
        // Tạo mảng thẻ từ các nhóm đã chọn
        const gameCards: GameCard[] = shuffledGroups.flatMap(group => [
            {
                id: `${group.id}-image`,
                type: 'image',
                value: group.image,
                groupId: group.id,
                isFlipped: false,
                isMatched: false
            },
            {
                id: `${group.id}-text`,
                type: 'text',
                value: group.text,
                groupId: group.id,
                isFlipped: false,
                isMatched: false
            }
        ]);

        // Xáo trộn vị trí các thẻ
        setCards(gameCards.sort(() => Math.random() - 0.5));
        setSelectedCard(null);
        setErrorPair([]);
        setIsCompleted(false);
        setTime(0);
        setIsActive(true);
    };

    const handleCardSelect = (card: GameCard) => {
        if (errorPair.length > 0 || card.isMatched) return;

        if (!selectedCard) {
            setSelectedCard(card);
            return;
        }

        if (selectedCard.id === card.id) return;

        if (selectedCard.groupId === card.groupId) {
            // Matched
            const updatedCards = cards.map(c =>
                c.groupId === card.groupId ? { ...c, isMatched: true } : c
            );
            setCards(updatedCards);
            setSelectedCard(null);

            // Check if game is completed
            if (updatedCards.every(c => c.isMatched)) {
                setIsCompleted(true);
                setIsActive(false);
            }
        } else {
            // Not matched
            setErrorPair([selectedCard.id, card.id]);
            setTimeout(() => {
                setErrorPair([]);
                setSelectedCard(null);
            }, 1000);
        }
    };

    useEffect(() => {
        initializeGame();
    }, []);

    return (
        <ImageBackground 
            source={require('assets/GameAssets/background_animal.jpg')} 
            className="flex-1"
            resizeMode="cover"
        >
            <View className="flex-1 p-4">
                {/* Header */}
                <View className="flex-row justify-between items-center mt-12 mb-8">
                    <TouchableOpacity 
                        onPress={() => navigation.goBack()}
                        className="bg-white p-2 rounded-full shadow-md"
                    >
                        <Icon name="arrow-left" size={32} color="#3B82F6" />
                    </TouchableOpacity>
                    <View className="flex-1 items-center">
                        <Text className="text-2xl font-bold text-white">
                            Thời gian: {formatTime(time)}
                        </Text>
                    </View>
                    <TouchableOpacity 
                        onPress={initializeGame}
                        className="bg-white p-2 rounded-full shadow-md"
                    >
                        <Icon name="refresh" size={32} color="#3B82F6" />
                    </TouchableOpacity>
                </View>

                <View className="flex-1 justify-center">
                    <View className="flex-row flex-wrap justify-center gap-4">
                        {cards.map(card => (
                            <View key={card.id} className="w-[30%]">
                                {!card.isMatched && (
                                    <MatchingCard
                                        card={card}
                                        onSelect={handleCardSelect}
                                        isSelected={selectedCard?.id === card.id}
                                        isError={errorPair.includes(card.id)}
                                    />
                                )}
                            </View>
                        ))}
                    </View>
                </View>

                {isCompleted && (
                    <CongratsModal 
                        onPlayAgain={initializeGame} 
                        completionTime={time}
                    />
                )}
            </View>
        </ImageBackground>
    );
};

export default MatchingGameScreen; 