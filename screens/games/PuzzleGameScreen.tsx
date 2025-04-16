import { useEffect, useState } from 'react';
import { View, ImageBackground, Text, Dimensions, TouchableOpacity } from 'react-native';
import PuzzlePiece from 'components/games/puzzle/PuzzlePiece';
import { PuzzlePiece as PuzzlePieceType, PuzzleState } from 'types/game';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import CongratsModal from 'components/games/matching/CongratsModal';

// Giả lập dữ liệu puzzle
const puzzleImage = require('assets/GameAssets/dog_puzzle.png');

const GRID_SIZE = 3;
const TOTAL_PIECES = GRID_SIZE * GRID_SIZE;

// Lấy kích thước màn hình
const screenWidth = Dimensions.get('window').width;
const BOARD_SIZE = screenWidth * 0.9; // Board chiếm 90% chiều rộng màn hình
const PIECE_SIZE = (BOARD_SIZE - (GRID_SIZE + 1) * 2) / GRID_SIZE; // Trừ đi khoảng cách giữa các mảnh

const PuzzleGameScreen = () => {
    const navigation = useNavigation();
    const [puzzleState, setPuzzleState] = useState<PuzzleState>({
        pieces: [],
        emptyPosition: TOTAL_PIECES - 1,
        isCompleted: false,
        moves: 0
    });

    const initializePuzzle = () => {
        const pieces: PuzzlePieceType[] = [];
        
        // Tạo các mảnh puzzle
        for (let i = 0; i < TOTAL_PIECES - 1; i++) {
            pieces.push({
                id: i,
                currentPosition: i,
                correctPosition: i,
                imageUrl: puzzleImage
            });
        }

        // Tạo một chuỗi di chuyển ngẫu nhiên hợp lệ
        let currentEmptyPos = TOTAL_PIECES - 1;
        const shuffledPieces = [...pieces];
        
        // Thực hiện 100 bước di chuyển ngẫu nhiên
        for (let i = 0; i < 100; i++) {
            const possibleMoves = [];
            const emptyRow = Math.floor(currentEmptyPos / GRID_SIZE);
            const emptyCol = currentEmptyPos % GRID_SIZE;

            // Kiểm tra các hướng có thể di chuyển
            if (emptyRow > 0) possibleMoves.push(currentEmptyPos - GRID_SIZE); // lên
            if (emptyRow < GRID_SIZE - 1) possibleMoves.push(currentEmptyPos + GRID_SIZE); // xuống
            if (emptyCol > 0) possibleMoves.push(currentEmptyPos - 1); // trái
            if (emptyCol < GRID_SIZE - 1) possibleMoves.push(currentEmptyPos + 1); // phải

            // Chọn một hướng ngẫu nhiên
            const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
            
            // Tìm và di chuyển mảnh
            const pieceToMove = shuffledPieces.find(p => p.currentPosition === randomMove);
            if (pieceToMove) {
                pieceToMove.currentPosition = currentEmptyPos;
                currentEmptyPos = randomMove;
            }
        }
        
        setPuzzleState({
            pieces: shuffledPieces,
            emptyPosition: currentEmptyPos,
            isCompleted: false,
            moves: 0
        });
    };

    const isAdjacent = (position1: number, position2: number) => {
        const row1 = Math.floor(position1 / GRID_SIZE);
        const col1 = position1 % GRID_SIZE;
        const row2 = Math.floor(position2 / GRID_SIZE);
        const col2 = position2 % GRID_SIZE;

        return (
            (Math.abs(row1 - row2) === 1 && col1 === col2) ||
            (Math.abs(col1 - col2) === 1 && row1 === row2)
        );
    };

    const checkCompletion = (pieces: PuzzlePieceType[], emptyPos: number) => {
        // Kiểm tra xem tất cả các mảnh có ở đúng vị trí không
        const allPiecesCorrect = pieces.every(p => p.currentPosition === p.correctPosition);
        // Kiểm tra xem ô trống có ở vị trí cuối cùng không
        const emptyAtEnd = emptyPos === TOTAL_PIECES - 1;
        return allPiecesCorrect && emptyAtEnd;
    };

    const handlePiecePress = (piece: PuzzlePieceType) => {
        if (isAdjacent(piece.currentPosition, puzzleState.emptyPosition)) {
            const newPieces = puzzleState.pieces.map(p => {
                if (p.id === piece.id) {
                    return { ...p, currentPosition: puzzleState.emptyPosition };
                }
                return p;
            });

            const newEmptyPosition = piece.currentPosition;
            const isCompleted = checkCompletion(newPieces, newEmptyPosition);

            setPuzzleState({
                pieces: newPieces,
                emptyPosition: newEmptyPosition,
                isCompleted,
                moves: puzzleState.moves + 1
            });
        }
    };

    useEffect(() => {
        initializePuzzle();
    }, []);

    // Sắp xếp các mảnh theo vị trí hiện tại
    const orderedPieces = Array(TOTAL_PIECES).fill(null);
    puzzleState.pieces.forEach(piece => {
        orderedPieces[piece.currentPosition] = piece;
    });

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
                            Số bước: {puzzleState.moves}
                        </Text>
                    </View>
                    <TouchableOpacity 
                        onPress={initializePuzzle}
                        className="bg-white p-2 rounded-full shadow-md"
                    >
                        <Icon name="refresh" size={32} color="#3B82F6" />
                    </TouchableOpacity>
                </View>

                {/* Game Board */}
                <View className="flex-1 justify-center items-center">
                    <View 
                        style={{ 
                            width: BOARD_SIZE,
                            height: BOARD_SIZE,
                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                            borderRadius: 16,
                            padding: 2,
                        }}
                    >
                        <View style={{ 
                            flex: 1,
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            gap: 2,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            {orderedPieces.map((piece, index) => (
                                <View key={index}>
                                    {piece ? (
                                        <PuzzlePiece
                                            piece={piece}
                                            onPress={() => handlePiecePress(piece)}
                                            isMovable={isAdjacent(piece.currentPosition, puzzleState.emptyPosition)}
                                            size={PIECE_SIZE}
                                            gridSize={GRID_SIZE}
                                        />
                                    ) : (
                                        <View style={{ 
                                            width: PIECE_SIZE,
                                            height: PIECE_SIZE,
                                            backgroundColor: 'rgba(255, 255, 255, 0.3)',
                                            borderRadius: 8
                                        }} />
                                    )}
                                </View>
                            ))}
                        </View>
                    </View>
                </View>

                {/* Congratulations Modal */}
                {puzzleState.isCompleted && (
                    <CongratsModal onPlayAgain={initializePuzzle} />
                )}
            </View>
        </ImageBackground>
    );
};

export default PuzzleGameScreen;