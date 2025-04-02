import { ScrollView, Text, View } from "react-native";
import Layout from "components/layouts/Layout";
import GameCard from "components/games/GameCard";
import Title from "components/ui/Title";

const games = [
    {
        id: 'matching',
        title: 'Picture Match',
        screenName: 'MatchingGameScreen' as const
    }
];

const GameMenuScreen = () => {
    return (
        <Layout>
            <View className="flex-1">
                {/* Header */}
                <View className="p-4">
                    <Title />
                    <Text className="text-lg text-gray-600 mt-2 text-center">
                        Chọn một trò chơi để bắt đầu
                    </Text>
                </View>

                {/* Game List */}
                <ScrollView className="flex-1 px-4">
                    {games.map((game) => (
                        <GameCard
                            key={game.id}
                            title={game.title}
                            screenName={game.screenName}
                        />
                    ))}
                </ScrollView>
            </View>
        </Layout>
    );
};

export default GameMenuScreen; 