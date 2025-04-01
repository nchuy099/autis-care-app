import { Text, View } from "react-native"
import Layout from "~/components/layouts/Layout"
import FeatureCard from "~/components/ui/FeatureCard"
import { Link } from "expo-router"

const Home = () => {
    return (
        <Layout>
            <View className="flex-1 items-center justify-center bg-gray-100">
                <Text className="text-2xl font-bold mb-6">Home Screen</Text>

                <Link className="w-full" href="/talk">
                    <FeatureCard
                        title="Talk"
                        icon="microphone-variant"
                    />
                </Link>
                <Link className="w-full" href="/schedule">
                    <FeatureCard
                        title="Schedule"
                        icon="calendar-star"
                    />
                </Link>
                <Link className="w-full" href="/play">
                    <FeatureCard
                        title="Play"
                        icon="gamepad-variant"
                    />
                </Link>
            </View>
        </Layout>
    )
}

export default Home;
