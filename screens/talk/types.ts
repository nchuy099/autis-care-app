export interface CardItem {
    id: string;
    label: string;
    type: 'core' | 'back' | 'pronouns_words' | 'attributes' | 'transportation' | 'places' |
    'people' | 'objects' | 'miscellaneous' | 'household' | 'food' | 'entertainment' |
    'emotions' | 'directions' | 'colors' | 'clothing' | 'animals' | 'body_health' | 'activities' | 'school_supplies';
    image?: any;
    isCategory?: boolean;
    subWords?: CardItem[];
    color?: string;
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