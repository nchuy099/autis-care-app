import { useState } from "react";
import { View } from "react-native";
import * as Speech from 'expo-speech';
import Layout from "../../components/layouts/Layout";
import OutputBar from "./OutputBar";
import WordGrid from "./CardGrid";
import { vocabularyData } from "./vocabulary";
import { CardItem } from "./types";

const TalkScreen = () => {
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
            <View className="flex-1 bg-white">
                <OutputBar
                    selectedWords={selectedWords}
                    onSpeak={handleSpeak}
                    onRemoveLast={handleRemoveLastWord}
                    onRemoveAll={handleRemoveAllWords}
                />
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