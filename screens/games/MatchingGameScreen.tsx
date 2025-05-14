import React, { useEffect, useState } from 'react';
import { View, ImageBackground, Text, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Layout from 'components/layouts/Layout';
import MatchingCard from 'components/games/matching/MatchingCard';
import CongratsModal from 'components/games/matching/CongratsModal';
import { GameCard, CardGroup } from 'types/game';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Giả lập dữ liệu thẻ
const cardGroups: CardGroup[] = [
    { id: '1', image: require('assets/GameAssets/GameCard/bat_card.jpg'), text: 'Con dơi' },
    { id: '2', image: require('assets/GameAssets/GameCard/bear.jpg'), text: 'Con gấu' },
    { id: '3', image: require('assets/GameAssets/GameCard/birdcard.png'), text: 'Con chim' },
    { id: '4', image: require('assets/GameAssets/GameCard/catcard.png'), text: 'Con mèo' },
    { id: '5', image: require('assets/GameAssets/GameCard/crabcard.png'), text: 'Con cua' },
    { id: '6', image: require('assets/GameAssets/GameCard/chickencard.png'), text: 'Con gà' },
    { id: '7', image: require('assets/GameAssets/GameCard/cowcard.png'), text: 'Con bò' },
    { id: '8', image: require('assets/GameAssets/GameCard/dogcard.jpg'), text: 'Con chó' },
    { id: '9', image: require('assets/GameAssets/GameCard/dolphincard.jpg'), text: 'Con cá heo' },
    { id: '10', image: require('assets/GameAssets/GameCard/duckcard.png'), text: 'Con vịt' },
    { id: '11', image: require('assets/GameAssets/GameCard/elephant_card.jpg'), text: 'Con voi' },
    { id: '12', image: require('assets/GameAssets/GameCard/fish_card.jpg'), text: 'Con cá' },
    { id: '13', image: require('assets/GameAssets/GameCard/fox_card.jpg'), text: 'Con cáo' },
    { id: '14', image: require('assets/GameAssets/GameCard/frog_card.jpg'), text: 'Con ếch' },
    { id: '15', image: require('assets/GameAssets/GameCard/giraffe_card.jpg'), text: 'Con hươu cao cổ' },
    { id: '16', image: require('assets/GameAssets/GameCard/goat_card.jpg'), text: 'Con dê' },
    { id: '17', image: require('assets/GameAssets/GameCard/hedgehog_card.jpg'), text: 'Con nhím' },
    { id: '18', image: require('assets/GameAssets/GameCard/horse_card.jpg'), text: 'Con ngựa' },
    { id: '19', image: require('assets/GameAssets/GameCard/jellyfish_card.jpg'), text: 'Con sứa' },
    { id: '20', image: require('assets/GameAssets/GameCard/lion_card.jpg'), text: 'Con sư tử' },
    { id: '21', image: require('assets/GameAssets/GameCard/leopard_card.jpg'), text: 'Con báo' },
    { id: '22', image: require('assets/GameAssets/GameCard/monkey_card.jpg'), text: 'Con khỉ' },
    { id: '23', image: require('assets/GameAssets/GameCard/mouse_card.jpg'), text: 'Con chuột' },
    { id: '24', image: require('assets/GameAssets/GameCard/owl_card.jpg'), text: 'Con cú' },
];

const MatchingGameScreen = () => {
    const navigation = useNavigation();
    const [cards, setCards] = useState<GameCard[]>([]);
    const [selectedCard, setSelectedCard] = useState<GameCard | null>(null);
    const [errorPair, setErrorPair] = useState<string[]>([]);
    const [isCompleted, setIsCompleted] = useState(false);
    const [time, setTime] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [backgroundMusic, setBackgroundMusic] = useState<Audio.Sound | null>(null);

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
        // Dừng nhạc nền cũ nếu có
        stopBackgroundMusic();
        
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
        return () => {
            stopBackgroundMusic();
        };
    }, []);

    // Sử dụng useFocusEffect để kiểm soát nhạc nền
    useFocusEffect(
        React.useCallback(() => {
            let isActive = true;
            
            if (isActive) {
                playBackgroundMusic();
            }
            
            return () => {
                isActive = false;
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
                            Thời gian: {formatTime(time)}
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