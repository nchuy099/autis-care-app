import { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from "react-native"
import Layout from "~/components/layouts/Layout";
import * as Speech from 'expo-speech';

interface ImageItem {
    id: string;
    source: any;
    text: string;
}

interface RenderItemProps<T> {
    item: T;
    index: number;
}

const imageButtons: ImageItem[] = [
    { id: '1', source: require('../../assets/feeling/sad.png'), text: 'Buồn' },
    { id: '2', source: require('../../assets/feeling/sad.png'), text: 'Buồn' },
    { id: '3', source: require('../../assets/feeling/angry.png'), text: 'Tức giận' },
    { id: '4', source: require('../../assets/feeling/confuse.png'), text: 'Bối rối' },
];

const Talk = () => {
    const [selectedImages, setSelectedImages] = useState<ImageItem[]>([]);

    const handleButtonPress = (imageItem: ImageItem) => {
        setSelectedImages(prev => [...prev, imageItem]);
    };

    const handleRemoveLastImage = () => {
        setSelectedImages(prev => prev.slice(0, -1));
    };

    const handleRemoveAllImages = () => {
        setSelectedImages([]);
    };

    const handleSpeak = () => {
        if (selectedImages.length > 0) {
            const textToSpeak = selectedImages.map(item => item.text).join(', ');
            Speech.speak(textToSpeak, {
                language: 'vi',
                pitch: 1,
                rate: 0.8,
            });
        }
    };

    const renderButton = ({ item }: { item: ImageItem }) => (
        <TouchableOpacity
            style={styles.button}
            onPress={() => handleButtonPress(item)}
        >
            <Image
                source={item.source}
                style={styles.buttonImage}
            />
        </TouchableOpacity>
    );

    return (
        <Layout>
            <View style={styles.container}>
                {/* Selected Images Display with Delete Buttons */}
                <View style={styles.selectedImagesContainer}>
                    {selectedImages.length > 0 ? (
                        <View style={styles.selectedImagesRow}>
                            <TouchableOpacity
                                style={styles.imagesDisplay}
                                onPress={handleSpeak}
                            >
                                <FlatList
                                    data={selectedImages}
                                    renderItem={({ item }) => (
                                        <Image
                                            source={item.source}
                                            style={styles.selectedImage}
                                        />
                                    )}
                                    keyExtractor={(_, index) => index.toString()}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    contentContainerStyle={styles.selectedImagesList}
                                />
                            </TouchableOpacity>
                            <View style={styles.deleteButtonsContainer}>
                                <TouchableOpacity
                                    style={styles.deleteButton}
                                    onPress={handleRemoveLastImage}
                                >
                                    <Text style={styles.deleteButtonText}>Xóa</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.deleteButton, styles.deleteAllButton]}
                                    onPress={handleRemoveAllImages}
                                >
                                    <Text style={styles.deleteButtonText}>Xóa tất cả</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ) : (
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>Chọn biểu tượng cảm xúc</Text>
                        </View>
                    )}
                </View>

                {/* Image Buttons Keyboard */}
                <View style={styles.keyboardContainer}>
                    <FlatList
                        data={imageButtons}
                        renderItem={renderButton}
                        keyExtractor={(item) => item.id}
                        numColumns={2}
                        contentContainerStyle={styles.keyboardList}
                    />
                </View>
            </View>
        </Layout>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    selectedImagesContainer: {
        height: 150,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    selectedImagesRow: {
        flexDirection: 'row',
        alignItems: 'center',
        height: '100%',
    },
    imagesDisplay: {
        flex: 1,
    },
    selectedImagesList: {
        padding: 10,
    },
    selectedImage: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
        marginRight: 10,
    },
    deleteButtonsContainer: {
        marginRight: 10,
        gap: 8,
    },
    deleteButton: {
        backgroundColor: '#ff4444',
        padding: 10,
        borderRadius: 8,
        minWidth: 80,
        alignItems: 'center',
    },
    deleteAllButton: {
        backgroundColor: '#ff0000',
    },
    deleteButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    keyboardContainer: {
        flex: 1,
    },
    keyboardList: {
        padding: 10,
    },
    button: {
        flex: 1,
        margin: 5,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonImage: {
        width: 80,
        height: 80,
        resizeMode: 'contain',
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyText: {
        fontSize: 16,
        color: '#666',
    },
});

export default Talk;
