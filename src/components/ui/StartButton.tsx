import { Text, TouchableOpacity } from "react-native"

interface ButtonProps {
    title: string
    onPress: () => void
}

const StartButton = ({ title, onPress }: ButtonProps) => {
    return (
        <TouchableOpacity className="p-4 bg-blue-500 rounded-md" onPress={onPress}>
            <Text className="text-white font-bold">{title}</Text>
        </TouchableOpacity>
    )
}

export default StartButton;
