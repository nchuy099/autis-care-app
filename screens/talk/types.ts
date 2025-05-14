export interface CardItem {
    id: string;
    label: string;
    type: 'yes' | 'no' | 'core' | 'back' | 'activities' | 'emotion' | 'health' | 'others'
    isCategory?: boolean;
    subWords?: CardItem[];
    color?: string;
    image?: any;
}

export interface OutputBarProps {
    selectedWords: CardItem[];
    onSpeak: () => void;
    onRemoveLast: () => void;
    onRemoveAll: () => void;
}

export interface CardItemProps {
    item: CardItem;
    onPress: (word: CardItem) => void;
    width: number;
}

export interface CardGridProps {
    data: CardItem[];
    currentCategory: CardItem | null;
    onWordPress: (word: CardItem) => void;
}