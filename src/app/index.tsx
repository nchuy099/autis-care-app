import '../../global.css';
import { Text, TouchableOpacity, View } from "react-native";
import { Link } from "expo-router";
import Layout from '~/components/layouts/Layout';
import Title from '~/components/ui/Title';

const Index = () => {
    return (
        <Layout>
            {/* Title */}
            <View className="flex-1 justify-center items-center">
                <Text className="text-5xl font-bold">AAC App</Text>
            </View>

            {/* Start Button */}
            <View className="flex-1 justify-start items-center">
                <Link href="/home">
                    <TouchableOpacity className="p-4 bg-blue-500 rounded-md">
                        <Text className="text-white font-bold"> Start </Text>
                    </TouchableOpacity>
                </Link>
            </View>

        </Layout>

    );
}

export default Index;
