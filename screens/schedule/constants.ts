import { IconName, Activity } from './types';

export const ICONS: IconName[] = [
    "sunny", "restaurant", "school", "water", "book", 
    "bed", "game-controller", "fitness", "musical-notes", "brush"
];

export const DEFAULT_ACTIVITIES: Activity[] = [
    {
        id: '1',
        title: 'Thức dậy',
        time: '06:00',
        icon: 'sunny',
        description: 'Thức dậy và vệ sinh cá nhân',
        completed: false
    },
    {
        id: '2',
        title: 'Ăn sáng',
        time: '06:30',
        icon: 'restaurant',
        description: 'Ăn sáng và uống thuốc',
        completed: false
    },
    {
        id: '3',
        title: 'Ăn trưa',
        time: '12:00',
        icon: 'restaurant',
        description: 'Ăn trưa và uống thuốc',
        completed: false
    },
    {
        id: '4',
        title: 'Nghỉ ngơi',
        time: '13:00',
        icon: 'bed',
        description: 'Nghỉ ngơi và thư giãn',
        completed: false
    },
    {
        id: '5',
        title: 'Ăn tối',
        time: '18:00',
        icon: 'restaurant',
        description: 'Ăn tối và uống thuốc',
        completed: false
    },
    {
        id: '6',
        title: 'Đi ngủ',
        time: '21:00',
        icon: 'bed',
        description: 'Chuẩn bị đi ngủ',
        completed: false
    }
];

export const HOURS = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
export const MINUTES = Array.from({ length: 4 }, (_, i) => (i * 15).toString().padStart(2, '0')); 