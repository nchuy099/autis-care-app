import { Image, TouchableOpacity, View, StyleSheet } from 'react-native';
import { PuzzlePiece as PuzzlePieceType } from 'types/game';

interface PuzzlePieceProps {
    piece: PuzzlePieceType;
    onPress: () => void;
    isMovable: boolean;
    size: number;
    gridSize: number;
}

const PuzzlePiece = ({ piece, onPress, isMovable, size, gridSize }: PuzzlePieceProps) => {
    // Tính toán vị trí của mảnh ghép trong hình gốc
    const row = Math.floor(piece.correctPosition / gridSize);
    const col = piece.correctPosition % gridSize;

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={!isMovable}
            style={[
                styles.piece,
                {
                    width: size,
                    height: size,
                    opacity: isMovable ? 1 : 0.8
                }
            ]}
        >
            <View style={[styles.pieceContent, { width: size, height: size }]}>
                <Image
                    source={piece.imageUrl}
                    style={{
                        width: size * gridSize,
                        height: size * gridSize,
                        transform: [
                            { translateX: -col * size },
                            { translateY: -row * size }
                        ]
                    }}
                />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    piece: {
        borderRadius: 8,
        overflow: 'hidden',
    },
    pieceContent: {
        backgroundColor: 'white',
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
    }
});

export default PuzzlePiece; 