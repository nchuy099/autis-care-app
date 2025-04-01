import Layout from "~/components/layouts/Layout";
import { Text, View } from "react-native";

const PlayScreen = () => {
    return (
        <Layout>
            <View className="flex-1 justify-center items-center">
                <Text className="text-2xl font-bold">Let's Play</Text>
            </View>
        </Layout>
    )
}

export default PlayScreen;
