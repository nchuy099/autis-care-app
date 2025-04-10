import { WordItem } from "./types";

export const vocabularyData: WordItem[] = [
    // Core words
    { id: '1', label: 'Tôi', type: 'core' },
    { id: '2', label: 'Bạn', type: 'core' },
    { id: '3', label: 'Muốn', type: 'core' },
    { id: '4', label: 'Có', type: 'core' },
    { id: '5', label: 'Không', type: 'core' },
    { id: '6', label: 'Đi', type: 'core' },
    { id: '7', label: 'Ăn', type: 'core' },
    { id: '8', label: 'Chơi', type: 'core' },
    { id: '9', label: 'Đói', type: 'core' },
    // Categories
    {
        id: '10',
        label: 'Đồ ăn',
        icon: 'restaurant',
        type: 'core',
        isCategory: true,
        subWords: [
            { id: '10.1', label: 'Cơm', type: 'core' },
            { id: '10.2', label: 'Bánh', type: 'core' },
            { id: '10.3', label: 'Mì', type: 'core' },
            { id: '10.4', label: 'Trái cây', type: 'core' },
            { id: '10.5', label: 'Nước', type: 'core' },
            { id: '10.6', label: 'Quay lại', type: 'back' }
        ]
    },
    {
        id: '11',
        label: 'Đồ chơi',
        icon: 'toys',
        type: 'core',
        isCategory: true,
        subWords: [
            { id: '11.1', label: 'Búp bê', type: 'core' },
            { id: '11.2', label: 'Xe', type: 'core' },
            { id: '11.3', label: 'Sách', type: 'core' },
            { id: '11.4', label: 'Bóng', type: 'core' },
            { id: '11.5', label: 'Quay lại', type: 'back' }
        ]
    },
    {
        id: '12',
        label: 'Động vật',
        icon: 'pets',
        type: 'core',
        isCategory: true,
        subWords: [
            { id: '12.1', label: 'Chó', type: 'core' },
            { id: '12.2', label: 'Mèo', type: 'core' },
            { id: '12.3', label: 'Gà', type: 'core' },
            { id: '12.4', label: 'Vịt', type: 'core' },
            { id: '12.5', label: 'Quay lại', type: 'back' }
        ]
    }
]; 