import { useEffect, useState } from 'react';
import { View, ImageBackground, Text } from 'react-native';
import Layout from 'components/layouts/Layout';
import MatchingCard from 'components/games/matching/MatchingCard';
import CongratsModal from 'components/games/matching/CongratsModal';
import { GameCard, CardGroup } from 'types/game';

// Giả lập dữ liệu thẻ
const cardGroups: CardGroup[] = [
    { id: '1', image: 'Con chim', text: 'Con chim' },
    { id: '2', image: 'Con mèo', text: 'Con mèo' },
    { id: '3', image: 'Con cua', text: 'Con cua' },
    { id: '4', image: 'Con gà', text: 'Con gà' },
    { id: '5', image: 'Con bò', text: 'Con bò' },
    { id: '6', image: 'Con cừu', text: 'Con cừu' },
];

const MatchingGameScreen = () => {
    const [cards, setCards] = useState<GameCard[]>([]);
    const [selectedCard, setSelectedCard] = useState<GameCard | null>(null);
    const [errorPair, setErrorPair] = useState<string[]>([]);
    const [isCompleted, setIsCompleted] = useState(false);

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
        <Layout>
            <View className="flex-1 bg-blue-50">
                <View className="flex-1 p-4">
                    <View className="flex-1 justify-center">
                        <View className="flex-row flex-wrap justify-center gap-2">
                            {cards.map(card => (
                                <View key={card.id} className="w-[30%]">
                                    <MatchingCard
                                        card={card}
                                        onSelect={handleCardSelect}
                                        isSelected={selectedCard?.id === card.id}
                                        isError={errorPair.includes(card.id)}
                                    />
                                </View>
                            ))}
                        </View>
                    </View>
                </View>

                {isCompleted && (
                    <CongratsModal onPlayAgain={initializeGame} />
                )}
            </View>
        </Layout>
    );
};

export default MatchingGameScreen; 