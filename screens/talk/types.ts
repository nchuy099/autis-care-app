export interface WordItem {
    id: string;
    label: string;
    type: 'core' | 'back';
    icon?: string;
    isCategory?: boolean;
    subWords?: WordItem[];
}

export interface OutputBarProps {
    selectedWords: string[];
    onSpeak: () => void;
    onRemoveLast: () => void;
    onRemoveAll: () => void;
}

export interface WordItemProps {
    item: WordItem;
    onPress: (word: WordItem) => void;
    width: number;
}

export interface WordGridProps {
    data: WordItem[];
    currentCategory: WordItem | null;
    onWordPress: (word: WordItem) => void;
} 