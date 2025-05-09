import { useState, useRef, useEffect } from "react";
import Layout from "components/layouts/Layout";
import { Text, View, ScrollView, TouchableOpacity, Modal, TextInput, Platform, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

interface Activity {
    id: string;
    title: string;
    time: string;
    icon: keyof typeof Ionicons.glyphMap;
    completed: boolean;
}

const ICONS: (keyof typeof Ionicons.glyphMap)[] = [
    "sunny", "restaurant", "school", "water", "book", 
    "bed", "game-controller", "fitness", "musical-notes", "brush"
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
    
    const dateString = today.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingActivity, setEditingActivity] = useState<Activity | null>(null);
    const [newTitle, setNewTitle] = useState("");
    const [selectedIcon, setSelectedIcon] = useState<keyof typeof Ionicons.glyphMap>("sunny");
    const [selectedHour, setSelectedHour] = useState("08");
    const [selectedMinute, setSelectedMinute] = useState("00");
    const [showTimeSelector, setShowTimeSelector] = useState(false);
    const [activities, setActivities] = useState<Activity[]>([
        {
            id: "1",
            title: "Wake Up",
            time: "06:00",
            icon: "sunny",
            completed: false,
        },
        {
            id: "2",
            title: "Breakfast",
            time: "06:30",
            icon: "restaurant",
            completed: false,
        },
        {
            id: "3",
            title: "Lunch",
            time: "12:00",
            icon: "restaurant",
            completed: false,
        },
        {
            id: "4",
            title: "Dinner",
            time: "19:00",
            icon: "restaurant",
            completed: false,
        },
        {
            id: "5",
            title: "Go to Bed",
            time: "22:00",
            icon: "bed",
            completed: false,
        }
    ]);

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
        setIsModalVisible(true);
        setEditingActivity(null);
        setNewTitle("");
        setSelectedIcon("sunny");
        setSelectedHour("08");
        setSelectedMinute("00");
    };

    const handleEditActivity = (activity: Activity) => {
        setEditingActivity(activity);
        setNewTitle(activity.title);
        setSelectedIcon(activity.icon);
        // Parse time string
        const [hours, minutes] = activity.time.split(':');
        setSelectedHour(hours);
        setSelectedMinute(minutes);
        setIsModalVisible(true);
    };

    const handleDeleteActivity = (id: string) => {
        setActivities(activities.filter(activity => activity.id !== id));
    };

    const handleSaveActivity = () => {
        if (!newTitle.trim()) return;

        const timeString = `${selectedHour}:${selectedMinute}`;

        if (editingActivity) {
            setActivities(activities.map(activity =>
                activity.id === editingActivity.id
                    ? { ...activity, title: newTitle, icon: selectedIcon, time: timeString }
                    : activity
            ));
        } else {
            const newActivity: Activity = {
                id: Date.now().toString(),
                title: newTitle,
                icon: selectedIcon,
                time: timeString,
                completed: false
            };
            setActivities([...activities, newActivity].sort((a, b) => 
                new Date('1970/01/01 ' + a.time).getTime() - 
                new Date('1970/01/01 ' + b.time).getTime()
            ));
        }

        setIsModalVisible(false);
    };

    const scrollToCurrentTime = () => {
        // Get current hour
        const currentHour = today.getHours();
        
        // Find the current hour mark
        const hourMark = `${currentHour.toString().padStart(2, '0')}:00`;
        const slotIndex = timeSlots.findIndex(slot => slot === hourMark);
        
        // Get screen height
        const screenHeight = Dimensions.get('window').height;
        
        // Calculate the position to center the marker
        // Each slot is 64px high, and we want the marker to be in the middle of the screen
        const slotHeight = 64;
        const headerHeight = 120; // Approximate height of the header
        const centerOffset = (screenHeight - headerHeight) / 2;
        
        // Calculate scroll position to center the marker
        const scrollPosition = Math.max(0, (slotIndex * slotHeight) - centerOffset);
        
        // Scroll to position
        scrollViewRef.current?.scrollTo({
            y: scrollPosition,
            animated: true
        });
    };

    useEffect(() => {
        // Get current hour
        const currentHour = today.getHours();
        
        // Find the current hour mark
        const hourMark = `${currentHour.toString().padStart(2, '0')}:00`;
        const slotIndex = timeSlots.findIndex(slot => slot === hourMark);
        
        // Get screen height
        const screenHeight = Dimensions.get('window').height;
        
        // Calculate the position to center the marker
        // Each slot is 64px high, and we want the marker to be in the middle of the screen
        const slotHeight = 64;
        const headerHeight = 120; // Approximate height of the header
        const centerOffset = (screenHeight - headerHeight) / 2;
        
        // Calculate scroll position to center the marker
        const scrollPosition = Math.max(0, (slotIndex * slotHeight) - centerOffset);
        
        // Scroll to position after a short delay to ensure rendering
        setTimeout(() => {
            scrollViewRef.current?.scrollTo({
                y: scrollPosition,
                animated: true
            });
        }, 500);
    }, []);

    return (
        <Layout>
            <View className="flex-1">
                {/* Header */}
                <View className="items-center mb-6">
                    <View className="w-full flex-row items-center justify-between mb-2">
                        <TouchableOpacity 
                            onPress={() => navigation.goBack()}
                            className="w-12 h-12 bg-white rounded-full items-center justify-center shadow-md"
                        >
                            <Ionicons name="home" size={24} color="#1e1b4b" />
                        </TouchableOpacity>
                        <Text className="text-3xl font-bold">Schedule</Text>
                        <View className="flex-row">
                            <TouchableOpacity 
                                onPress={scrollToCurrentTime}
                                className="w-12 h-12 bg-white rounded-full items-center justify-center shadow-md mr-2"
                            >
                                <Ionicons name="time" size={24} color="#1e1b4b" />
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={handleAddActivity}
                                className="w-12 h-12 bg-indigo-500 rounded-full items-center justify-center"
                            >
                                <Ionicons name="add" size={24} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Text className="text-xl text-indigo-700">Today is {dateString}</Text>
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
                        
                        {timeSlots.map((timeSlot, index) => {
                            const activity = getActivityForTime(timeSlot);
                            const isHourMark = index % 4 === 0;
                            const isCurrentTime = timeSlot === currentTime;
                            
                            // Check if this is the current hour
                            const [slotHour] = timeSlot.split(':');
                            const currentHour = today.getHours().toString().padStart(2, '0');
                            const isCurrentHour = slotHour === currentHour && isHourMark;

                            return (
                                <View 
                                    key={timeSlot} 
                                    className="flex-row relative h-16"
                                >
                                    {/* Time marker */}
                                    <View className="w-16 items-end pr-4 justify-center">
                                        <Text 
                                            className={
                                                isCurrentHour 
                                                    ? "text-sm text-indigo-600 font-bold"
                                                    : isHourMark 
                                                        ? "text-sm text-gray-800 font-bold" 
                                                        : "text-sm text-gray-400"
                                            }
                                        >
                                            {isHourMark ? timeSlot : timeSlot.split(':')[1]}
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
                                                    : isHourMark 
                                                        ? "h-0.5 bg-gray-300 w-full" 
                                                        : "h-[1px] bg-gray-200 w-full"
                                            } 
                                        />
                                    </View>

                                    {/* Activity card (if exists) */}
                                    {activity && (
                                        <View className="absolute left-20 right-4 top-1 bottom-1">
                                            <TouchableOpacity 
                                                onPress={() => handleEditActivity(activity)}
                                                className={`bg-white rounded-lg shadow-lg flex-row items-center h-full px-3 ${
                                                    isCurrentHour ? 'border-2 border-indigo-500' : ''
                                                }`}
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
                                    {editingActivity ? 'Edit Activity' : 'New Activity'}
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
                                placeholder="Activity Title"
                                className="border border-gray-300 rounded-xl p-4 mb-4 text-lg"
                            />

                            <TouchableOpacity
                                onPress={() => setShowTimeSelector(!showTimeSelector)}
                                className="border border-gray-300 rounded-xl p-4 mb-4"
                            >
                                <Text className="text-lg">
                                    Time: {selectedHour}:{selectedMinute}
                                </Text>
                            </TouchableOpacity>

                            {showTimeSelector && (
                                <View className="mb-4 p-4 bg-gray-50 rounded-xl">
                                    <View className="flex-row justify-between mb-4">
                                        <View className="flex-1 mr-2">
                                            <Text className="text-sm text-gray-600 mb-2">Hour</Text>
                                            <ScrollView className="border border-gray-200 rounded-lg p-2 max-h-32">
                                                {Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0')).map(hour => (
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
                                            <Text className="text-sm text-gray-600 mb-2">Minute</Text>
                                            <ScrollView className="border border-gray-200 rounded-lg p-2 max-h-32">
                                                {Array.from({ length: 4 }, (_, i) => (i * 15).toString().padStart(2, '0')).map(minute => (
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

                            <Text className="text-lg mb-2">Select Icon:</Text>
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
                                        <Text className="text-white font-bold text-lg">Delete</Text>
                                    </TouchableOpacity>
                                )}
                                <TouchableOpacity
                                    onPress={handleSaveActivity}
                                    className={`bg-indigo-500 rounded-xl py-4 ${editingActivity ? 'px-6' : 'flex-1'}`}
                                >
                                    <Text className="text-white font-bold text-lg text-center">Save</Text>
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
