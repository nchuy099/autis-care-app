import { useState, useRef, useEffect } from "react";
import Layout from "components/layouts/Layout";
import { Text, View, ScrollView, TouchableOpacity, Modal, TextInput, Platform, Dimensions, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

type IconName = "sunny" | "restaurant" | "school" | "water" | "book" | 
                "bed" | "game-controller" | "fitness" | "musical-notes" | "brush";

interface Activity {
    id: string;
    title: string;
    time: string;
    icon: IconName;
    completed: boolean;
}

const ICONS: IconName[] = [
    "sunny", "restaurant", "school", "water", "book", 
    "bed", "game-controller", "fitness", "musical-notes", "brush"
];

const DEFAULT_ACTIVITIES: Activity[] = [
    {
        id: "1",
        title: "Thức dậy",
        time: "06:00",
        icon: "sunny",
        completed: false,
    },
    {
        id: "2",
        title: "Ăn sáng",
        time: "06:30",
        icon: "restaurant",
        completed: false,
    },
    {
        id: "3",
        title: "Ăn trưa",
        time: "12:00",
        icon: "restaurant",
        completed: false,
    },
    {
        id: "4",
        title: "Ăn tối",
        time: "19:00",
        icon: "restaurant",
        completed: false,
    },
    {
        id: "5",
        title: "Đi ngủ",
        time: "22:00",
        icon: "bed",
        completed: false,
    }
];

const HOURS = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
const MINUTES = Array.from({ length: 4 }, (_, i) => (i * 15).toString().padStart(2, '0'));

const ScheduleScreen = () => {
    const navigation = useNavigation();
    const scrollViewRef = useRef<ScrollView>(null);
    
    const today = new Date();
    const currentTime = today.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });
    
    const dateString = today.toLocaleDateString('vi-VN', {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingActivity, setEditingActivity] = useState<Activity | null>(null);
    const [newTitle, setNewTitle] = useState("");
    const [selectedIcon, setSelectedIcon] = useState<IconName>("sunny");
    const [selectedHour, setSelectedHour] = useState("08");
    const [selectedMinute, setSelectedMinute] = useState("00");
    const [showTimeSelector, setShowTimeSelector] = useState(false);
    const [expandedHour, setExpandedHour] = useState<string | null>(null);
    const [activities, setActivities] = useState<Activity[]>(DEFAULT_ACTIVITIES);

    // Load activities from storage
    useEffect(() => {
        loadActivities();
    }, []);

    // Save activities 
    useEffect(() => {
        saveActivities();
    }, [activities]);

    const loadActivities = async () => {
        try {
            const savedActivities = await AsyncStorage.getItem('activities');
            if (savedActivities) {
                const parsedActivities = JSON.parse(savedActivities);
                if (Array.isArray(parsedActivities)) {
                    setActivities(parsedActivities);
                } else {
                    throw new Error('Định dạng dữ liệu hoạt động không hợp lệ');
                }
            } else {
                // Set default activities if none are saved
                setActivities(DEFAULT_ACTIVITIES);
                await AsyncStorage.setItem('activities', JSON.stringify(DEFAULT_ACTIVITIES));
            }
        } catch (error) {
            console.error('Lỗi khi tải hoạt động:', error);
            Alert.alert(
                'Lỗi',
                'Không thể tải hoạt động. Bạn có muốn đặt lại về mặc định không?',
                [
                    {
                        text: 'Đặt lại',
                        onPress: async () => {
                            try {
                                setActivities(DEFAULT_ACTIVITIES);
                                await AsyncStorage.setItem('activities', JSON.stringify(DEFAULT_ACTIVITIES));
                            } catch (resetError) {
                                console.error('Lỗi khi đặt lại hoạt động:', resetError);
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

    const saveActivities = async () => {
        try {
            if (!Array.isArray(activities)) {
                throw new Error('Dữ liệu hoạt động không hợp lệ');
            }
            await AsyncStorage.setItem('activities', JSON.stringify(activities));
        } catch (error) {
            console.error('Lỗi khi lưu hoạt động:', error);
            Alert.alert(
                'Lỗi',
                'Không thể lưu hoạt động. Bạn có muốn thử lại không?',
                [
                    {
                        text: 'Thử lại',
                        onPress: () => saveActivities()
                    },
                    {
                        text: 'Hủy',
                        style: 'cancel'
                    }
                ]
            );
        }
    };

    const timeSlots = Array.from({ length: 24 * 4 }, (_, i) => {
        const totalMinutes = i * 15;
        const hour = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    });

    const getActivityForTime = (time: string) => {
        return activities.find(activity => activity.time === time);
    };

    const handleAddActivity = () => {
        try {
            setIsModalVisible(true);
            setEditingActivity(null);
            setNewTitle("");
            setSelectedIcon("sunny");
            setSelectedHour("08");
            setSelectedMinute("00");
        } catch (error) {
            console.error('Lỗi trong handleAddActivity:', error);
            Alert.alert('Lỗi', 'Không thể mở modal thêm hoạt động');
        }
    };

    const handleEditActivity = (activity: Activity) => {
        try {
            if (!activity) {
                Alert.alert('Lỗi', 'Hoạt động được chọn không hợp lệ');
                return;
            }
            setEditingActivity(activity);
            setNewTitle(activity.title);
            setSelectedIcon(activity.icon);
            const [hours, minutes] = activity.time.split(':');
            setSelectedHour(hours);
            setSelectedMinute(minutes);
            setIsModalVisible(true);
        } catch (error) {
            console.error('Lỗi trong handleEditActivity:', error);
            Alert.alert('Lỗi', 'Không thể chỉnh sửa hoạt động');
        }
    };

    const handleDeleteActivity = async (id: string) => {
        try {
            if (!id) {
                Alert.alert('Lỗi', 'ID hoạt động không hợp lệ');
                return;
            }
            const updatedActivities = activities.filter(activity => activity.id !== id);
            setActivities(updatedActivities);
            await saveActivities();
        } catch (error) {
            console.error('Lỗi trong handleDeleteActivity:', error);
            Alert.alert('Lỗi', 'Không thể xóa hoạt động');
        }
    };

    const handleSaveActivity = async () => {
        try {
            if (!newTitle.trim()) {
                Alert.alert('Lỗi', 'Vui lòng nhập tên hoạt động');
                return;
            }

            const timeString = `${selectedHour}:${selectedMinute}`;

            // Check if there's already an activity at this time
            const existingActivity = activities.find(activity => activity.time === timeString);
            if (existingActivity && (!editingActivity || existingActivity.id !== editingActivity.id)) {
                Alert.alert(
                    "Thời gian đã được sử dụng",
                    "Đã có hoạt động được lên lịch vào thời gian này. Vui lòng chọn thời gian khác.",
                    [
                        { 
                            text: "OK",
                            onPress: () => {
                                // Keep the modal open and reset the time selection
                                setSelectedHour("08");
                                setSelectedMinute("00");
                            }
                        }
                    ]
                );
                return;
            }

            if (editingActivity) {
                const updatedActivities = activities.map(activity =>
                    activity.id === editingActivity.id
                        ? { ...activity, title: newTitle, icon: selectedIcon, time: timeString }
                        : activity
                );
                setActivities(updatedActivities);
            } else {
                const newActivity: Activity = {
                    id: Date.now().toString(),
                    title: newTitle,
                    icon: selectedIcon,
                    time: timeString,
                    completed: false
                };
                const updatedActivities = [...activities, newActivity].sort((a, b) => 
                    new Date('1970/01/01 ' + a.time).getTime() - 
                    new Date('1970/01/01 ' + b.time).getTime()
                );
                setActivities(updatedActivities);
            }

            await saveActivities();
            setIsModalVisible(false);
        } catch (error) {
            console.error('Lỗi trong handleSaveActivity:', error);
            Alert.alert('Lỗi', 'Không thể lưu hoạt động');
        }
    };

    const toggleHourExpansion = (hour: string) => {
        setExpandedHour(expandedHour === hour ? null : hour);
    };

    const scrollToCurrentTime = () => {
        const currentHour = today.getHours().toString().padStart(2, '0');
        const hourMark = `${currentHour}:00`;
        const slotIndex = timeSlots.findIndex(slot => slot === hourMark);
        
        const screenHeight = Dimensions.get('window').height;
        const slotHeight = 64;
        const headerHeight = 120;
        const centerOffset = (screenHeight - headerHeight) / 2;
        
        const scrollPosition = Math.max(0, (slotIndex * slotHeight) - centerOffset);
        
        scrollViewRef.current?.scrollTo({
            y: scrollPosition,
            animated: true
        });
    };

    useEffect(() => {
        const currentHour = today.getHours().toString().padStart(2, '0');
        const hourMark = `${currentHour}:00`;
        const slotIndex = timeSlots.findIndex(slot => slot === hourMark);
        
        const screenHeight = Dimensions.get('window').height;
        const slotHeight = 64;
        const headerHeight = 120;
        const centerOffset = (screenHeight - headerHeight) / 2;
        
        const scrollPosition = Math.max(0, (slotIndex * slotHeight) - centerOffset);
        
        setTimeout(() => {
            scrollViewRef.current?.scrollTo({
                y: scrollPosition,
                animated: true
            });
        }, 500);
    }, []);

    const handleResetActivities = async () => {
        try {
            Alert.alert(
                'Đặt lại hoạt động',
                'Bạn có chắc chắn muốn đặt lại tất cả hoạt động về mặc định?',
                [
                    {
                        text: 'Hủy',
                        style: 'cancel'
                    },
                    {
                        text: 'Đặt lại',
                        onPress: async () => {
                            setActivities(DEFAULT_ACTIVITIES);
                            await AsyncStorage.setItem('activities', JSON.stringify(DEFAULT_ACTIVITIES));
                        }
                    }
                ]
            );
        } catch (error) {
            console.error('Lỗi khi đặt lại hoạt động:', error);
            Alert.alert('Lỗi', 'Không thể đặt lại hoạt động');
        }
    };

    return (
        <Layout>
            <View className="flex-1">
                {/* Header */}
                <View className="items-center mb-6 mt-4">
                    <View className="w-full flex-row items-center justify-between mb-4">
                        <TouchableOpacity 
                            onPress={() => navigation.goBack()}
                            className="w-12 h-12 bg-white rounded-full items-center justify-center shadow-md"
                        >
                            <Ionicons name="home" size={24} color="#1e1b4b" />
                        </TouchableOpacity>
                        <Text className="text-3xl font-bold">Lịch trình</Text>
                        <View className="flex-row">
                            <TouchableOpacity 
                                onPress={scrollToCurrentTime}
                                className="w-12 h-12 bg-white rounded-full items-center justify-center shadow-md mr-2"
                            >
                                <Ionicons name="time" size={24} color="#1e1b4b" />
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={handleResetActivities}
                                className="w-12 h-12 bg-white rounded-full items-center justify-center shadow-md mr-2"
                            >
                                <Ionicons name="refresh" size={24} color="#1e1b4b" />
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={handleAddActivity}
                                className="w-12 h-12 bg-indigo-500 rounded-full items-center justify-center"
                            >
                                <Ionicons name="add" size={24} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Text className="text-xl text-indigo-700">Hôm nay là {dateString}</Text>
                </View>

                {/* Vertical Timeline */}
                <ScrollView 
                    ref={scrollViewRef}
                    className="flex-1" 
                    showsVerticalScrollIndicator={false}
                >
                    <View className="flex-1 relative">
                        {/* Vertical line */}
                        <View className="absolute left-16 top-0 bottom-0 w-0.5 bg-gray-200" />
                        
                        {HOURS.map((hour) => {
                            const isCurrentHour = hour === today.getHours().toString().padStart(2, '0');
                            const isExpanded = expandedHour === hour;
                            
                            return (
                                <View key={hour}>
                                    {/* Hour marker */}
                                    <TouchableOpacity 
                                        onPress={() => toggleHourExpansion(hour)}
                                        className="flex-row relative h-16"
                                    >
                                        <View className="w-16 items-end pr-4 justify-center">
                                            <Text 
                                                className={
                                                    isCurrentHour 
                                                        ? "text-sm text-indigo-600 font-bold"
                                                        : "text-sm text-gray-800 font-bold"
                                                }
                                            >
                                                {hour}:00
                                            </Text>
                                        </View>

                                        {/* Current hour arrow marker */}
                                        {isCurrentHour && (
                                            <View className="absolute left-16 top-0 bottom-0 items-center">
                                                <View className="w-4 h-4 bg-indigo-500 rotate-45" />
                                                <View className="w-0.5 h-full bg-indigo-500" />
                                            </View>
                                        )}

                                        {/* Horizontal line */}
                                        <View className="flex-1 justify-center">
                                            <View 
                                                className={
                                                    isCurrentHour
                                                        ? "h-0.5 bg-indigo-500 w-full"
                                                        : "h-0.5 bg-gray-300 w-full"
                                                } 
                                            />
                                        </View>

                                        {/* Activity icon for hour mark */}
                                        {activities.some(activity => activity.time.startsWith(`${hour}:`)) && (
                                            <View className="absolute left-20 right-4 top-1 bottom-1">
                                                {isExpanded ? (
                                                    getActivityForTime(`${hour}:00`) && (
                                                        <TouchableOpacity 
                                                            onPress={() => handleEditActivity(getActivityForTime(`${hour}:00`)!)}
                                                            className="bg-white rounded-lg shadow-lg flex-row items-center h-full px-3"
                                                        >
                                                            <View className="w-8 h-8 bg-yellow-100 rounded-full items-center justify-center mr-3">
                                                                <Ionicons 
                                                                    name={getActivityForTime(`${hour}:00`)!.icon} 
                                                                    size={20} 
                                                                    color="#1e1b4b" 
                                                                />
                                                            </View>
                                                            <Text className="text-lg font-semibold flex-1">
                                                                {getActivityForTime(`${hour}:00`)!.title}
                                                            </Text>
                                                        </TouchableOpacity>
                                                    )
                                                ) : (
                                                    <View className="flex-row space-x-2">
                                                        {activities
                                                            .filter(activity => {
                                                                const activityHour = activity.time.split(':')[0];
                                                                return activityHour === hour;
                                                            })
                                                            .map(activity => (
                                                                <View key={activity.id} className="w-8 h-8 bg-yellow-100 rounded-full items-center justify-center">
                                                                    <Ionicons 
                                                                        name={activity.icon} 
                                                                        size={20} 
                                                                        color="#1e1b4b" 
                                                                    />
                                                                </View>
                                                            ))}
                                                    </View>
                                                )}
                                            </View>
                                        )}
                                    </TouchableOpacity>

                                    {/* 15-minute intervals when expanded */}
                                    {isExpanded && MINUTES.slice(1).map((minute) => {
                                        const timeSlot = `${hour}:${minute}`;
                                        const activity = getActivityForTime(timeSlot);
                                        
                                        return (
                                            <View key={timeSlot} className="flex-row relative h-16">
                                                <View className="w-16 items-end pr-4 justify-center">
                                                    <Text className="text-sm text-gray-400">
                                                        {minute}
                                                    </Text>
                                                </View>

                                                {/* Horizontal line */}
                                                <View className="flex-1 justify-center">
                                                    <View className="h-[1px] bg-gray-200 w-full" />
                                                </View>

                                                {/* Activity card */}
                                                {activity && (
                                                    <View className="absolute left-20 right-4 top-1 bottom-1">
                                                        <TouchableOpacity 
                                                            onPress={() => handleEditActivity(activity)}
                                                            className="bg-white rounded-lg shadow-lg flex-row items-center h-full px-3"
                                                        >
                                                            <View className="w-8 h-8 bg-yellow-100 rounded-full items-center justify-center mr-3">
                                                                <Ionicons 
                                                                    name={activity.icon} 
                                                                    size={20} 
                                                                    color="#1e1b4b" 
                                                                />
                                                            </View>
                                                            <Text className="text-lg font-semibold flex-1">
                                                                {activity.title}
                                                            </Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                )}
                                            </View>
                                        );
                                    })}
                                </View>
                            );
                        })}
                    </View>
                </ScrollView>

                {/* Add/Edit Activity Modal */}
                <Modal
                    visible={isModalVisible}
                    transparent={true}
                    animationType="slide"
                >
                    <View className="flex-1 justify-end">
                        <View className="bg-white rounded-t-3xl p-6 shadow-xl">
                            <View className="flex-row justify-between items-center mb-6">
                                <Text className="text-2xl font-bold">
                                    {editingActivity ? 'Chỉnh sửa hoạt động' : 'Hoạt động mới'}
                                </Text>
                                <TouchableOpacity 
                                    onPress={() => setIsModalVisible(false)}
                                    className="p-2"
                                >
                                    <Ionicons name="close" size={24} color="#1e1b4b" />
                                </TouchableOpacity>
                            </View>

                            <TextInput
                                value={newTitle}
                                onChangeText={setNewTitle}
                                placeholder="Tên hoạt động"
                                className="border border-gray-300 rounded-xl p-4 mb-4 text-lg"
                            />

                            <TouchableOpacity
                                onPress={() => setShowTimeSelector(!showTimeSelector)}
                                className="border border-gray-300 rounded-xl p-4 mb-4"
                            >
                                <Text className="text-lg">
                                    Thời gian: {selectedHour}:{selectedMinute}
                                </Text>
                            </TouchableOpacity>

                            {showTimeSelector && (
                                <View className="mb-4 p-4 bg-gray-50 rounded-xl">
                                    <View className="flex-row justify-between mb-4">
                                        <View className="flex-1 mr-2">
                                            <Text className="text-sm text-gray-600 mb-2">Giờ</Text>
                                            <ScrollView className="border border-gray-200 rounded-lg p-2 max-h-32">
                                                {HOURS.map(hour => (
                                                    <TouchableOpacity
                                                        key={hour}
                                                        onPress={() => setSelectedHour(hour)}
                                                        className={`p-2 rounded ${selectedHour === hour ? 'bg-indigo-100' : ''}`}
                                                    >
                                                        <Text className={`text-center ${selectedHour === hour ? 'text-indigo-600 font-bold' : ''}`}>
                                                            {hour}
                                                        </Text>
                                                    </TouchableOpacity>
                                                ))}
                                            </ScrollView>
                                        </View>
                                        <View className="flex-1 ml-2">
                                            <Text className="text-sm text-gray-600 mb-2">Phút</Text>
                                            <ScrollView className="border border-gray-200 rounded-lg p-2 max-h-32">
                                                {MINUTES.map(minute => (
                                                    <TouchableOpacity
                                                        key={minute}
                                                        onPress={() => setSelectedMinute(minute)}
                                                        className={`p-2 rounded ${selectedMinute === minute ? 'bg-indigo-100' : ''}`}
                                                    >
                                                        <Text className={`text-center ${selectedMinute === minute ? 'text-indigo-600 font-bold' : ''}`}>
                                                            {minute}
                                                        </Text>
                                                    </TouchableOpacity>
                                                ))}
                                            </ScrollView>
                                        </View>
                                    </View>
                                </View>
                            )}

                            <Text className="text-lg mb-2">Chọn biểu tượng:</Text>
                            <ScrollView 
                                horizontal 
                                showsHorizontalScrollIndicator={false}
                                className="mb-6"
                            >
                                {ICONS.map((icon) => (
                                    <TouchableOpacity
                                        key={icon}
                                        onPress={() => setSelectedIcon(icon)}
                                        className={`w-12 h-12 rounded-full items-center justify-center mr-4 ${
                                            selectedIcon === icon ? 'bg-indigo-100' : 'bg-gray-100'
                                        }`}
                                    >
                                        <Ionicons 
                                            name={icon} 
                                            size={24} 
                                            color={selectedIcon === icon ? '#4f46e5' : '#6b7280'} 
                                        />
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>

                            <View className="flex-row justify-between">
                                {editingActivity && (
                                    <TouchableOpacity
                                        onPress={() => {
                                            handleDeleteActivity(editingActivity.id);
                                            setIsModalVisible(false);
                                        }}
                                        className="bg-red-500 rounded-xl py-4 px-6"
                                    >
                                        <Text className="text-white font-bold text-lg">Xóa</Text>
                                    </TouchableOpacity>
                                )}
                                <TouchableOpacity
                                    onPress={handleSaveActivity}
                                    className={`bg-indigo-500 rounded-xl py-4 ${editingActivity ? 'px-6' : 'flex-1'}`}
                                >
                                    <Text className="text-white font-bold text-lg text-center">Lưu</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        </Layout>
    );
};

export default ScheduleScreen;
