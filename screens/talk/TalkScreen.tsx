import { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import * as Speech from 'expo-speech';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Layout from "../../components/layouts/Layout";
import OutputBar from "./OutputBar";
import WordGrid from "./CardGrid";
import { vocabularyData } from "./vocabulary";
import { CardItem } from "./types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import RootStackParamList from "types/RootStackParamList";

type NavProp = NativeStackNavigationProp<RootStackParamList>;

const TalkScreen = () => {
    const navigation = useNavigation<NavProp>();
    const [selectedWords, setSelectedWords] = useState<CardItem[]>([]);
    const [currentCategory, setCurrentCategory] = useState<CardItem | null>(null);

    const handleWordPress = (word: CardItem) => {
        if (word.type === 'back') {
            setCurrentCategory(null);
            return;
        }
        if (word.isCategory) {
            setCurrentCategory(word);
        } else {
            setSelectedWords(prev => [...prev, word]);
        }
    };

    const handleRemoveLastWord = () => {
        setSelectedWords(prev => prev.slice(0, -1));
    };

    const handleRemoveAllWords = () => {
        setSelectedWords([]);
    };

    const handleSpeak = () => {
        if (selectedWords.length > 0) {
            Speech.speak(selectedWords.map(word => word.label).join(' '));
        }
    };

    return (
        <Layout>
            <View className="flex-1 bg-white p-3">
                <TouchableOpacity
                    onPress={() => navigation.navigate('HomeScreen')}
                    className="absolute top-2 left-2 z-10 p-2 rounded-full bg-gray-100"
                >
                    <Ionicons name="home-outline" size={30} color="#333" />
                </TouchableOpacity>
                <View className="pt-12">
                    <OutputBar
                        selectedWords={selectedWords}
                        onSpeak={handleSpeak}
                        onRemoveLast={handleRemoveLastWord}
                        onRemoveAll={handleRemoveAllWords}
                    />
                </View>

                <WordGrid
                    data={vocabularyData}
                    currentCategory={currentCategory}
                    onWordPress={handleWordPress}
                />
            </View>
        </Layout>
    );
};

export default TalkScreen;