import { useEffect, useState } from 'react';
import { View, ImageBackground } from 'react-native';
import MemoryCard from 'components/games/memory/MemoryCard';
import CongratsModal from 'components/games/matching/CongratsModal';
import { GameCard } from 'types/game';

// Giả lập dữ liệu thẻ
const cardGroups = [
    { id: '1', image: require('assets/GameAssets/birdcard.png') },
    { id: '2', image: require('assets/GameAssets/catcard.png') },
    { id: '3', image: require('assets/GameAssets/crabcard.png') },
    { id: '4', image: require('assets/GameAssets/chickencard.png') },
    { id: '5', image: require('assets/GameAssets/cowcard.png') },
    { id: '6', image: require('assets/GameAssets/duckcard.png') },
];

const MemoryGameScreen = () => {
    const [cards, setCards] = useState<GameCard[]>([]);
    const [selectedCards, setSelectedCards] = useState<GameCard[]>([]);
    const [errorPair, setErrorPair] = useState<string[]>([]);
    const [isCompleted, setIsCompleted] = useState(false);
    const [isFlipping, setIsFlipping] = useState(false);

    const initializeGame = () => {
        // Tạo mảng thẻ từ các nhóm đã chọn
        const gameCards: GameCard[] = cardGroups.flatMap(group => [
            {
                id: `${group.id}-1`,
                type: 'image',
                value: group.image,
                groupId: group.id,
                isFlipped: false,
                isMatched: false
            },
            {
                id: `${group.id}-2`,
                type: 'image',
                value: group.image,
                groupId: group.id,
                isFlipped: false,
                isMatched: false
            }
        ]);

        // Xáo trộn vị trí các thẻ
        setCards(gameCards.sort(() => Math.random() - 0.5));
        setSelectedCards([]);
        setErrorPair([]);
        setIsCompleted(false);
    };

    const handleCardSelect = (card: GameCard) => {
        if (isFlipping || card.isMatched || selectedCards.includes(card)) return;

        const newSelectedCards = [...selectedCards, card];
        setSelectedCards(newSelectedCards);

        // Lật thẻ được chọn
        const updatedCards = cards.map(c =>
            c.id === card.id ? { ...c, isFlipped: true } : c
        );
        setCards(updatedCards);

        if (newSelectedCards.length === 2) {
            setIsFlipping(true);
            const [first, second] = newSelectedCards;

            if (first.groupId === second.groupId) {
                // Matched
                setTimeout(() => {
                    const matchedCards = cards.map(c =>
                        c.groupId === first.groupId ? { ...c, isMatched: true } : c
                    );
                    setCards(matchedCards);
                    setSelectedCards([]);
                    setIsFlipping(false);

                    // Check if game is completed
                    if (matchedCards.every(c => c.isMatched)) {
                        setIsCompleted(true);
                    }
                }, 1000);
            } else {
                // Not matched
                setErrorPair([first.id, second.id]);
                setTimeout(() => {
                    const resetCards = cards.map(c =>
                        c.id === first.id || c.id === second.id ? { ...c, isFlipped: false } : c
                    );
                    setCards(resetCards);
                    setSelectedCards([]);
                    setErrorPair([]);
                    setIsFlipping(false);
                }, 1000);
            }
        }
    };

    useEffect(() => {
        initializeGame();
    }, []);

    return (
        <ImageBackground 
            source={require('assets/GameAssets/backgroud2.jpg')} 
            className="flex-1"
            resizeMode="cover"
        >
            <View className="flex-1 p-4 mt-20">
                <View className="flex-1 justify-center">
                    <View className="flex-row flex-wrap justify-center gap-4">
                        {cards.map(card => (
                            <View key={card.id} className="w-[30%]">
                                {!card.isMatched && (
                                    <MemoryCard
                                        card={card}
                                        onSelect={handleCardSelect}
                                        isSelected={selectedCards.includes(card)}
                                        isError={errorPair.includes(card.id)}
                                    />
                                )}
                            </View>
                        ))}
                    </View>
                </View>
            </View>

            {isCompleted && (
                <CongratsModal onPlayAgain={initializeGame} />
            )}
        </ImageBackground>
    );
};

export default MemoryGameScreen;
