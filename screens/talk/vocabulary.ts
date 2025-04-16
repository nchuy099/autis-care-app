import { CardItem } from "./types";
import { MaterialIcons } from "@expo/vector-icons";

// Import images from assets
// Food category icons
import foodIcon from "../../assets/food/pizza.png";
import riceIcon from "../../assets/food/pasta.png";
import cakeIcon from "../../assets/food/candy.png";
import noodleIcon from "../../assets/food/pasta.png";
import fruitIcon from "../../assets/food/apple.png";
import waterIcon from "../../assets/food/water.png";

// Toys category icons
import toysIcon from "../../assets/activities/play.png";
import dollIcon from "../../assets/things/group.png";
import carIcon from "../../assets/things/car.png";
import bookIcon from "../../assets/activities/read.png";
import ballIcon from "../../assets/things/ball.png";

// Animals category icons
import petsIcon from "../../assets/things/home.png";
import dogIcon from "../../assets/things/home.png";
import catIcon from "../../assets/things/home.png";
import chickenIcon from "../../assets/food/chicken.png";
import duckIcon from "../../assets/food/chicken.png";

export const vocabularyData: CardItem[] = [
    // Core words
    { id: '1', label: 'Tôi', type: 'core' },
    { id: '2', label: 'Bạn', type: 'core' },
    { id: '3', label: 'Muốn', type: 'core' },
    { id: '4', label: 'Có', type: 'core' },
    { id: '5', label: 'Không', type: 'core' },
    { id: '6', label: 'Đi', type: 'core' },
    { id: '7', label: 'Ăn', type: 'core' },
    { id: '8', label: 'Chơi', type: 'core' },
    { id: '9', label: 'Đói', type: 'core' },
    // Categories
    {
        id: '10',
        label: 'Đồ ăn',
        image: foodIcon,
        type: 'category',
        isCategory: true,
        subWords: [
            { id: '10.1', label: 'Cơm', image: riceIcon, type: 'core' },
            { id: '10.2', label: 'Bánh', image: cakeIcon, type: 'core' },
            { id: '10.3', label: 'Mì', image: noodleIcon, type: 'core' },
            { id: '10.4', label: 'Trái cây', image: fruitIcon, type: 'core' },
            { id: '10.5', label: 'Nước', image: waterIcon, type: 'core' },
            { id: '10.6', label: 'Quay lại', type: 'back', image: MaterialIcons.name === 'arrow-back' ? MaterialIcons : undefined }
        ]
    },
    {
        id: '11',
        label: 'Đồ chơi',
        image: toysIcon,
        type: 'category',
        isCategory: true,
        subWords: [
            { id: '11.1', label: 'Búp bê', image: dollIcon, type: 'core' },
            { id: '11.2', label: 'Xe', image: carIcon, type: 'core' },
            { id: '11.3', label: 'Sách', image: bookIcon, type: 'core' },
            { id: '11.4', label: 'Bóng', image: ballIcon, type: 'core' },
            { id: '11.5', label: 'Quay lại', type: 'back', image: MaterialIcons.name === 'arrow-back' ? MaterialIcons : undefined }
        ]
    },
    {
        id: '12',
        label: 'Động vật',
        image: petsIcon,
        type: 'category',
        isCategory: true,
        subWords: [
            { id: '12.1', label: 'Chó', image: dogIcon, type: 'core' },
            { id: '12.2', label: 'Mèo', image: catIcon, type: 'core' },
            { id: '12.3', label: 'Gà', image: chickenIcon, type: 'core' },
            { id: '12.4', label: 'Vịt', image: duckIcon, type: 'core' },
            { id: '12.5', label: 'Quay lại', type: 'back', image: MaterialIcons.name === 'arrow-back' ? MaterialIcons : undefined }
        ]
    }
];