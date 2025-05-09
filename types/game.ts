import { ImageSourcePropType } from 'react-native';

export type CardType = 'image' | 'text';

export interface GameCard {
    id: string;
    type: CardType;
    value: string | ImageSourcePropType;
    groupId: string;
    isFlipped: boolean;
    isMatched: boolean;
}

export interface CardGroup {
    id: string;
    image: ImageSourcePropType;
    text: string;
}

export interface GameState {
    cards: GameCard[];
    selectedCard: GameCard | null;
    isCompleted: boolean;
    showCongrats: boolean;
}

// Puzzle Game Types
export interface PuzzlePiece {
    id: number;
    currentPosition: number;
    correctPosition: number;
    imageUrl: ImageSourcePropType;
}

export interface PuzzleState {
    pieces: PuzzlePiece[];
    emptyPosition: number;
    isCompleted: boolean;
    moves: number;
} 