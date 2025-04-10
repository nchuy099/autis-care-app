import { useState } from "react";
import { View } from "react-native";
import * as Speech from 'expo-speech';
import Layout from "../../components/layouts/Layout";
import OutputBar from "./OutputBar";
import WordGrid from "./WordGrid";
import { vocabularyData } from "./vocabulary";
import { WordItem } from "./types";

const TalkScreen = () => {
    const [selectedWords, setSelectedWords] = useState<string[]>([]);
    const [currentCategory, setCurrentCategory] = useState<WordItem | null>(null);

    const handleWordPress = (word: WordItem) => {
        if (word.type === 'back') {
            setCurrentCategory(null);
            return;
        }
        if (word.isCategory) {
            setCurrentCategory(word);
        } else {
            setSelectedWords(prev => [...prev, word.label]);
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
            Speech.speak(selectedWords.join(' '));
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