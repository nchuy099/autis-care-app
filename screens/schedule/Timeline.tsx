import React, { forwardRef, useImperativeHandle } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Activity } from './types';
import { HOURS, MINUTES } from './constants';

interface TimelineProps {
    activities: Activity[];
    expandedHour: string | null;
    onToggleHour: (hour: string | null) => void;
    onEditActivity: (activity: Activity) => void;
    currentHour: string;
    currentTimeColor: string;
}

export interface TimelineRef {
    scrollToCurrentTime: () => void;
}

const Timeline: React.ForwardRefExoticComponent<TimelineProps & React.RefAttributes<TimelineRef>> = forwardRef<TimelineRef, TimelineProps>((props, ref) => {
    const {
        activities,
        expandedHour,
        onToggleHour,
        onEditActivity,
        currentHour,
        currentTimeColor
    } = props;

    const scrollViewRef = React.useRef<ScrollView>(null);

    useImperativeHandle(ref, () => ({
        scrollToCurrentTime: () => {
            if (!scrollViewRef.current) return;

            const screenHeight = Dimensions.get('window').height;
            const slotHeight = 64; // Height of each time slot
            const headerHeight = 120; // Height of the header
            const centerOffset = (screenHeight - headerHeight) / 2;
            
            // Calculate the scroll position
            const hourIndex = parseInt(currentHour);
            const scrollPosition = Math.max(0, (hourIndex * slotHeight) - centerOffset);
            
            // Scroll with animation
            scrollViewRef.current.scrollTo({
                y: scrollPosition,
                animated: true
            });

            // Expand the current hour
            onToggleHour(currentHour);
        }
    }));

    const getActivityForTime = (time: string) => {
        return activities.find(activity => activity.time === time);
    };

    return (
        <ScrollView 
            ref={scrollViewRef}
            className="flex-1"
            showsVerticalScrollIndicator={false}
        >
            <View className="flex-1 relative">
                <View className="absolute left-16 top-0 bottom-0 w-0.5 bg-gray-200" />
                
                {HOURS.map((hour) => {
                    const isCurrentHour = hour === currentHour;
                    const isExpanded = expandedHour === hour;

                    return (
                        <View key={hour}>
                            <TouchableOpacity
                                onPress={() => onToggleHour(isExpanded ? null : hour)}
                                className="flex-row relative h-16"
                            >
                                <View className="w-16 items-end pr-4 justify-center">
                                    <Text 
                                        className={
                                            isCurrentHour 
                                                ? "text-sm font-bold"
                                                : "text-sm text-gray-800 font-bold"
                                        }
                                        style={isCurrentHour ? { color: currentTimeColor } : undefined}
                                    >
                                        {hour}:00
                                    </Text>
                                </View>

                                <View className="flex-1 justify-center">
                                    <View 
                                        className="h-0.5 w-full"
                                        style={{ backgroundColor: isCurrentHour ? currentTimeColor : '#d1d5db' }}
                                    />
                                </View>

                                {activities.some(activity => activity.time.startsWith(`${hour}:`)) && (
                                    <View className="absolute left-20 right-4 top-1 bottom-1">
                                        {isExpanded ? (
                                            getActivityForTime(`${hour}:00`) && (
                                                <TouchableOpacity 
                                                    onPress={() => onEditActivity(getActivityForTime(`${hour}:00`)!)}
                                                    className="bg-white rounded-lg shadow-lg flex-row items-center h-full px-3"
                                                >
                                                    <View 
                                                        className="w-8 h-8 rounded-full items-center justify-center mr-3"
                                                        style={{ backgroundColor: currentTimeColor }}
                                                    >
                                                        <Ionicons 
                                                            name={getActivityForTime(`${hour}:00`)!.icon} 
                                                            size={20} 
                                                            color="white" 
                                                        />
                                                    </View>
                                                    <View className="flex-1">
                                                        <Text className="text-lg font-semibold">
                                                            {getActivityForTime(`${hour}:00`)!.title}
                                                        </Text>
                                                        <Text className="text-sm text-gray-500">
                                                            {getActivityForTime(`${hour}:00`)!.description}
                                                        </Text>
                                                    </View>
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
                                                        <View 
                                                            key={activity.id} 
                                                            className="w-8 h-8 rounded-full items-center justify-center"
                                                            style={{ backgroundColor: currentTimeColor }}
                                                        >
                                                            <Ionicons 
                                                                name={activity.icon} 
                                                                size={20} 
                                                                color="white" 
                                                            />
                                                        </View>
                                                    ))}
                                            </View>
                                        )}
                                    </View>
                                )}
                            </TouchableOpacity>

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

                                        <View className="flex-1 justify-center">
                                            <View className="h-[1px] bg-gray-200 w-full" />
                                        </View>

                                        {activity && (
                                            <View className="absolute left-20 right-4 top-1 bottom-1">
                                                <TouchableOpacity 
                                                    onPress={() => onEditActivity(activity)}
                                                    className="bg-white rounded-lg shadow-lg flex-row items-center h-full px-3"
                                                >
                                                    <View 
                                                        className="w-8 h-8 rounded-full items-center justify-center mr-3"
                                                        style={{ backgroundColor: currentTimeColor }}
                                                    >
                                                        <Ionicons 
                                                            name={activity.icon} 
                                                            size={20} 
                                                            color="white" 
                                                        />
                                                    </View>
                                                    <View className="flex-1">
                                                        <Text className="text-lg font-semibold">
                                                            {activity.title}
                                                        </Text>
                                                        <Text className="text-sm text-gray-500">
                                                            {activity.description}
                                                        </Text>
                                                    </View>
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
    );
});

Timeline.displayName = 'Timeline';

export default Timeline; 