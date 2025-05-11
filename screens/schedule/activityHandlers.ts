import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { Activity } from './types';
import { DEFAULT_ACTIVITIES } from './constants';

export const loadActivities = async (): Promise<Activity[]> => {
    try {
        const savedActivities = await AsyncStorage.getItem('activities');
        if (savedActivities) {
            const parsedActivities = JSON.parse(savedActivities);
            if (Array.isArray(parsedActivities)) {
                return parsedActivities;
            }
            throw new Error('Định dạng dữ liệu hoạt động không hợp lệ');
        }
        await AsyncStorage.setItem('activities', JSON.stringify(DEFAULT_ACTIVITIES));
        return DEFAULT_ACTIVITIES;
    } catch (error) {
        console.error('Lỗi khi tải hoạt động:', error);
        throw error;
    }
};

export const saveActivities = async (activities: Activity[]): Promise<void> => {
    try {
        if (!Array.isArray(activities)) {
            throw new Error('Dữ liệu hoạt động không hợp lệ');
        }
        await AsyncStorage.setItem('activities', JSON.stringify(activities));
    } catch (error) {
        console.error('Lỗi khi lưu hoạt động:', error);
        throw error;
    }
};

export const addActivity = async (
    activities: Activity[],
    newActivity: Activity
): Promise<Activity[]> => {
    try {
        const existingActivity = activities.find(a => a.time === newActivity.time);
        if (existingActivity) {
            throw new Error('Thời gian đã được sử dụng');
        }

        const updatedActivities = [...activities, newActivity].sort((a, b) => 
            new Date('1970/01/01 ' + a.time).getTime() - 
            new Date('1970/01/01 ' + b.time).getTime()
        );
        
        await saveActivities(updatedActivities);
        return updatedActivities;
    } catch (error) {
        console.error('Lỗi khi thêm hoạt động:', error);
        throw error;
    }
};

export const editActivity = async (
    activities: Activity[],
    editedActivity: Activity,
    originalActivity: Activity
): Promise<Activity[]> => {
    try {
        const existingActivity = activities.find(a => 
            a.time === editedActivity.time && a.id !== originalActivity.id
        );
        if (existingActivity) {
            throw new Error('Thời gian đã được sử dụng');
        }

        const updatedActivities = activities.map(a =>
            a.id === originalActivity.id ? editedActivity : a
        );
        
        await saveActivities(updatedActivities);
        return updatedActivities;
    } catch (error) {
        console.error('Lỗi khi chỉnh sửa hoạt động:', error);
        throw error;
    }
};

export const deleteActivity = async (
    activities: Activity[],
    activityId: string
): Promise<Activity[]> => {
    try {
        if (!activityId) {
            throw new Error('ID hoạt động không hợp lệ');
        }
        const updatedActivities = activities.filter(activity => activity.id !== activityId);
        await saveActivities(updatedActivities);
        return updatedActivities;
    } catch (error) {
        console.error('Lỗi khi xóa hoạt động:', error);
        throw error;
    }
};

export const resetActivities = async (): Promise<Activity[]> => {
    try {
        await AsyncStorage.setItem('activities', JSON.stringify(DEFAULT_ACTIVITIES));
        return DEFAULT_ACTIVITIES;
    } catch (error) {
        console.error('Lỗi khi đặt lại hoạt động:', error);
        throw error;
    }
};

export const handleLoadActivities = async (
    setActivities: (activities: Activity[]) => void
): Promise<void> => {
    try {
        const loadedActivities = await loadActivities();
        setActivities(loadedActivities);
    } catch (error) {
        Alert.alert(
            'Lỗi',
            'Không thể tải hoạt động. Bạn có muốn đặt lại về mặc định không?',
            [
                {
                    text: 'Đặt lại',
                    onPress: async () => {
                        try {
                            const defaultActivities = await resetActivities();
                            setActivities(defaultActivities);
                        } catch (resetError) {
                            Alert.alert('Lỗi', 'Không thể đặt lại hoạt động');
                        }
                    }
                },
                {
                    text: 'Hủy',
                    style: 'cancel'
                }
            ]
        );
    }
};

export const handleSaveActivity = async (
    activities: Activity[],
    activity: Activity,
    editingActivity: Activity | null,
    setActivities: (activities: Activity[]) => void,
    setIsModalVisible: (visible: boolean) => void
): Promise<void> => {
    try {
        let updatedActivities: Activity[];
        if (editingActivity) {
            updatedActivities = await editActivity(activities, activity, editingActivity);
        } else {
            updatedActivities = await addActivity(activities, activity);
        }
        setActivities(updatedActivities);
        setIsModalVisible(false);
    } catch (error) {
        if (error instanceof Error && error.message === 'Thời gian đã được sử dụng') {
            Alert.alert(
                "Thời gian đã được sử dụng",
                "Đã có hoạt động được lên lịch vào thời gian này. Vui lòng chọn thời gian khác.",
                [{ text: "OK" }]
            );
        } else {
            Alert.alert('Lỗi', 'Không thể lưu hoạt động');
        }
    }
};

export const handleDeleteActivity = async (
    activities: Activity[],
    activityId: string,
    setActivities: (activities: Activity[]) => void
): Promise<void> => {
    try {
        const updatedActivities = await deleteActivity(activities, activityId);
        setActivities(updatedActivities);
    } catch (error) {
        Alert.alert('Lỗi', 'Không thể xóa hoạt động');
    }
};

export const handleResetActivities = async (
    setActivities: (activities: Activity[]) => void
): Promise<void> => {
    try {
        Alert.alert(
            'Đặt lại hoạt động',
            'Bạn có chắc chắn muốn đặt lại tất cả hoạt động về mặc định không?',
            [
                {
                    text: 'Hủy',
                    style: 'cancel'
                },
                {
                    text: 'Đặt lại',
                    onPress: async () => {
                        const defaultActivities = await resetActivities();
                        setActivities(defaultActivities);
                    }
                }
            ]
        );
    } catch (error) {
        Alert.alert('Lỗi', 'Không thể đặt lại hoạt động');
    }
}; 