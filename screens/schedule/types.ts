export type IconName = 'restaurant' | 'fitness' | 'bed' | 'sunny' | 'moon' | 'school' | 'water' | 'book' | 'game-controller' | 'musical-notes' | 'brush';

export interface Activity {
    id: string;
    title: string;
    time: string;
    icon: IconName;
    description: string;
    completed: boolean;
} 