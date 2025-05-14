import React, { useEffect, useState } from 'react';
import { View, ImageBackground, Text, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import MemoryCard from 'components/games/memory/MemoryCard';
import CongratsModal from 'components/games/matching/CongratsModal';
import { GameCard } from 'types/game';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Giả lập dữ liệu thẻ
const cardGroups = [
    { id: '1', image: require('assets/GameAssets/GameCard/bat_card.jpg') },
    { id: '2', image: require('assets/GameAssets/GameCard/bear.jpg') },
    { id: '3', image: require('assets/GameAssets/GameCard/birdcard.png') },
    { id: '4', image: require('assets/GameAssets/GameCard/catcard.png') },
    { id: '5', image: require('assets/GameAssets/GameCard/crabcard.png') },
    { id: '6', image: require('assets/GameAssets/GameCard/chickencard.png') },
    { id: '7', image: require('assets/GameAssets/GameCard/cowcard.png') },
    { id: '8', image: require('assets/GameAssets/GameCard/dogcard.jpg') },
    { id: '9', image: require('assets/GameAssets/GameCard/dolphincard.jpg') },
    { id: '10', image: require('assets/GameAssets/GameCard/duckcard.png') },
    { id: '11', image: require('assets/GameAssets/GameCard/elephant_card.jpg') },
    { id: '12', image: require('assets/GameAssets/GameCard/fish_card.jpg') },
];

const MemoryGameScreen = () => {
    const navigation = useNavigation();
    const [cards, setCards] = useState<GameCard[]>([]);
    const [selectedCards, setSelectedCards] = useState<GameCard[]>([]);
    const [errorPair, setErrorPair] = useState<string[]>([]);
    const [isCompleted, setIsCompleted] = useState(false);
    const [isFlipping, setIsFlipping] = useState(false);
    const [moves, setMoves] = useState(0);
    const [backgroundMusic, setBackgroundMusic] = useState<Audio.Sound | null>(null);

    // Hàm phát âm thanh
    const playSound = async (soundFile: any) => {
        try {
            const { sound } = await Audio.Sound.createAsync(soundFile);
            await sound.playAsync();
            sound.setOnPlaybackStatusUpdate(async (status) => {
                if (status.isLoaded && status.didJustFinish) {
                    await sound.unloadAsync();
                }
            });
        } catch (error) {
            console.error('Error playing sound:', error);
        }
    };

    // Hàm phát nhạc nền
    const playBackgroundMusic = async () => {
        try {
            // Kiểm tra và dừng âm thanh nền cũ nếu có
            if (backgroundMusic) {
                await backgroundMusic.stopAsync();
                await backgroundMusic.unloadAsync();
                setBackgroundMusic(null);
            }

            const { sound } = await Audio.Sound.createAsync(
                require('assets/GameAssets/sounds/background_music2.mp3'),
                { isLooping: true }
            );
            setBackgroundMusic(sound);
            await sound.playAsync();
        } catch (error) {
            console.error('Error playing background music:', error);
        }
    };

    // Hàm dừng nhạc nền
    const stopBackgroundMusic = async () => {
        if (backgroundMusic) {
            await backgroundMusic.stopAsync();
            await backgroundMusic.unloadAsync();
            setBackgroundMusic(null);
        }
    };

    const handleBack = async () => {
        await stopBackgroundMusic();
        navigation.goBack();
    };

    const initializeGame = () => {
        // Chọn ngẫu nhiên 6 cặp thẻ từ danh sách
        const selectedGroups = [...cardGroups]
            .sort(() => Math.random() - 0.5)
            .slice(0, 6);

        // Tạo mảng thẻ từ các nhóm đã chọn (mỗi thẻ xuất hiện 2 lần)
        const gameCards: GameCard[] = selectedGroups.flatMap(group => [
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
        setIsFlipping(false);
        setMoves(0);
    };

    const handleCardSelect = (card: GameCard) => {
        if (isFlipping || card.isMatched || selectedCards.includes(card)) return;

        playSound(require('assets/GameAssets/sounds/flip.mp3'));
        setMoves(prev => prev + 1);

        // Lật thẻ được chọn
        const updatedCards = cards.map(c =>
            c.id === card.id ? { ...c, isFlipped: true } : c
        );
        setCards(updatedCards);

        // Thêm thẻ được chọn vào mảng selectedCards
        const newSelectedCards = [...selectedCards, card];
        setSelectedCards(newSelectedCards);

        if (newSelectedCards.length === 2) {
            setIsFlipping(true);
            const [first, second] = newSelectedCards;

            if (first.groupId === second.groupId) {
                // Matched
                playSound(require('assets/GameAssets/sounds/match.mp3'));
                setTimeout(() => {
                    const matchedCards = cards.map(c =>
                        c.groupId === first.groupId ? { ...c, isMatched: true } : c
                    );
                    setCards(matchedCards);
                    setSelectedCards([]);
                    setErrorPair([]);
                    setIsFlipping(false);

                    // Check if game is completed
                    if (matchedCards.every(c => c.isMatched)) {
                        playSound(require('assets/GameAssets/sounds/success.mp3'));
                        setIsCompleted(true);
                        stopBackgroundMusic(); // Stop background music when game is completed
                    }
                }, 1000);
            } else {
                // Not matched
                playSound(require('assets/GameAssets/sounds/error.mp3'));
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

    // Sử dụng useFocusEffect để kiểm soát nhạc nền
    useFocusEffect(
        React.useCallback(() => {
            playBackgroundMusic();
            return () => {
                stopBackgroundMusic();
            };
        }, [])
    );

    // Stop music on navigation back/gesture
    useEffect(() => {
        const unsubscribe = navigation.addListener('beforeRemove', async () => {
            await stopBackgroundMusic();
        });
        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        initializeGame();
        return () => {
            stopBackgroundMusic();
        };
    }, []);

    return (
        <ImageBackground 
            source={require('assets/GameAssets/GameComponent/background_animal.jpg')} 
            className="flex-1"
            resizeMode="cover"
        >
            <View className="flex-1 p-4">
                {/* Header */}
                <View className="flex-row justify-between items-center mt-12 mb-8">
                    <TouchableOpacity 
                        onPress={handleBack}
                        className="bg-white p-2 rounded-full shadow-md"
                    >
                        <Icon name="arrow-left" size={32} color="#3B82F6" />
                    </TouchableOpacity>
                    <View className="flex-1 items-center">
                        <Text className="text-2xl font-bold text-white">
                            Số bước: {moves}
                        </Text>
                    </View>
                    <View className="flex-row">
                        <TouchableOpacity 
                            onPress={initializeGame}
                            className="bg-white p-2 rounded-full shadow-md"
                        >
                            <Icon name="refresh" size={32} color="#3B82F6" />
                        </TouchableOpacity>
                    </View>
                </View>

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

                {isCompleted && (
                    <CongratsModal 
                        onPlayAgain={initializeGame}
                        moves={moves}
                    />
                )}
            </View>
        </ImageBackground>
    );
};

export default MemoryGameScreen;
