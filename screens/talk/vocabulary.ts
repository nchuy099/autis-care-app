import { CardItem } from "./types";
import { MaterialIcons } from "@expo/vector-icons";

// Core icons
import iIcon from "../../assets/talk_assets/core/I.png";
import youIcon from "../../assets/talk_assets/core/you.png";
import helloIcon from "../../assets/talk_assets/core/hello.png";
import yesIcon from "../../assets/talk_assets/core/yes.png";
import noIcon from "../../assets/talk_assets/core/no.png";

// Activities icons
import eatIcon from "../../assets/talk_assets/activities/eat_to.png";
import drinkIcon from "../../assets/talk_assets/activities/drink_to.png";
import playIcon from "../../assets/talk_assets/activities/to_play.png";
import goIcon from "../../assets/talk_assets/activities/to_go.png";
import readIcon from "../../assets/talk_assets/activities/to_read.png";
import sleepIcon from "../../assets/talk_assets/activities/to_sleep.png";
import swimIcon from "../../assets/talk_assets/activities/to_swim.png";
import walkIcon from "../../assets/talk_assets/activities/to_walk.png";
import workIcon from "../../assets/talk_assets/activities/to_work.png";
import listenIcon from "../../assets/talk_assets/activities/to_listen.png";
import watchIcon from "../../assets/talk_assets/activities/to_watch.png";
import helpIcon from "../../assets/talk_assets/activities/to_help.png";
import cookIcon from "../../assets/talk_assets/activities/to_cook.png";
import campIcon from "../../assets/talk_assets/activities/to_camp.png";
import goOutsideIcon from "../../assets/talk_assets/activities/to_go_outside.png";
import artIcon from "../../assets/talk_assets/activities/art.png";

// Food icons
import appleIcon from "../../assets/talk_assets/food/apple.png";
import bananaIcon from "../../assets/talk_assets/food/banana.png";
import cakeIcon from "../../assets/talk_assets/food/cake.png";
import pizzaIcon from "../../assets/talk_assets/food/pizza.png";
import waterIcon from "../../assets/talk_assets/food/drink.png";
import sandwichIcon from "../../assets/talk_assets/food/sandwich.png";
import juiceIcon from "../../assets/talk_assets/food/juice.png";
import milkIcon from "../../assets/talk_assets/food/milk.png";
import iceCreamIcon from "../../assets/talk_assets/food/ice_cream.png";
import breakfastIcon from "../../assets/talk_assets/food/breakfast.png";
import lunchIcon from "../../assets/talk_assets/food/lunch.png";
import dinnerIcon from "../../assets/talk_assets/food/dinner.png";
import fruitIcon from "../../assets/talk_assets/food/fruit.png";
import vegetablesIcon from "../../assets/talk_assets/food/vegetables.png";
import chocolateIcon from "../../assets/talk_assets/food/chocolate.png";
import candyIcon from "../../assets/talk_assets/food/candy.png";

// Animals icons
import dogIcon from "../../assets/talk_assets/animals/dog.png";
import catIcon from "../../assets/talk_assets/animals/cat.png";
import birdIcon from "../../assets/talk_assets/animals/bird.png";
import bearIcon from "../../assets/talk_assets/animals/bear.png";
import lionIcon from "../../assets/talk_assets/animals/lion.png";
import horseIcon from "../../assets/talk_assets/animals/horse.png";
import cowIcon from "../../assets/talk_assets/animals/cow.png";
import giraffeIcon from "../../assets/talk_assets/animals/giraffe.png";
import deerIcon from "../../assets/talk_assets/animals/deer.png";
import foxIcon from "../../assets/talk_assets/animals/fox.png";
import dolphinIcon from "../../assets/talk_assets/animals/dolphin.png";
import gorillaIcon from "../../assets/talk_assets/animals/gorilla.png";

// Emotions icons
import happyIcon from "../../assets/talk_assets/emotions/happy_man.png";
import sadIcon from "../../assets/talk_assets/emotions/sad_man.png";
import angryIcon from "../../assets/talk_assets/emotions/angry.png";
import scaredIcon from "../../assets/talk_assets/emotions/scared.png";
import surprisedIcon from "../../assets/talk_assets/emotions/surprised_man.png";
import excitedIcon from "../../assets/talk_assets/emotions/excited_man.png";
import worriedIcon from "../../assets/talk_assets/emotions/worried_man.png";
import goodIcon from "../../assets/talk_assets/emotions/good.png";
import badIcon from "../../assets/talk_assets/emotions/bad.png";
import hotIcon from "../../assets/talk_assets/emotions/hot.png";

// Sports and Entertainment icons
import baseballIcon from "../../assets/talk_assets/activities/baseball_game.png";
import basketballIcon from "../../assets/talk_assets/activities/basketball_game.png";
import soccerIcon from "../../assets/talk_assets/activities/soccer.png";
import tennisIcon from "../../assets/talk_assets/activities/tennis.png";
import golfIcon from "../../assets/talk_assets/activities/golf.png";
import bowlingIcon from "../../assets/talk_assets/activities/bowling.png";
import bingoIcon from "../../assets/talk_assets/activities/bingo.png";
import picnicIcon from "../../assets/talk_assets/activities/picnic.png";
import videoGamesIcon from "../../assets/talk_assets/activities/video_games.png";

// Places icons
import schoolIcon from "../../assets/talk_assets/places/school.png";
import beachIcon from "../../assets/talk_assets/places/beach.png";
import bankIcon from "../../assets/talk_assets/places/bank.png";
import churchIcon from "../../assets/talk_assets/places/church.png";
import classRoomIcon from "../../assets/talk_assets/places/class_room.png";
import shopIcon from "../../assets/talk_assets/places/shop.png";
import themeParkIcon from "../../assets/talk_assets/places/theme_park.png";
import skateParkIcon from "../../assets/talk_assets/places/skate_park.png";
import artRoomIcon from "../../assets/talk_assets/places/art_room.png";

// People icons
import momIcon from "../../assets/talk_assets/people/mom.png";
import dadIcon from "../../assets/talk_assets/people/dad.png";
import doctorIcon from "../../assets/talk_assets/people/doctor.png";
import teacherIcon from "../../assets/talk_assets/people/teacher.png";
import peopleIcon from "../../assets/talk_assets/people/people.png";

// Transportation icons
import busIcon from "../../assets/talk_assets/transportation/bus.png";
import wheelchairIcon from "../../assets/talk_assets/transportation/wheelchair.png";
import toyCarIcon from "../../assets/talk_assets/transportation/toy_car.png";

// Colors icons
import redIcon from "../../assets/talk_assets/colors/red.png";
import blueIcon from "../../assets/talk_assets/colors/blue.png";
import greenIcon from "../../assets/talk_assets/colors/green.png";
import yellowIcon from "../../assets/talk_assets/colors/yellow.png";
import purpleIcon from "../../assets/talk_assets/colors/purple.png";
import pinkIcon from "../../assets/talk_assets/colors/pink.png";
import blackIcon from "../../assets/talk_assets/colors/black.png";
import brownIcon from "../../assets/talk_assets/colors/brown.png";
import rainbowIcon from "../../assets/talk_assets/colors/rainbow.png";

// Clothing icons
import clothesIcon from "../../assets/talk_assets/clothing/clothes.png";
import shirtIcon from "../../assets/talk_assets/clothing/shirt.png";
import pantsIcon from "../../assets/talk_assets/clothing/pants.png";
import shoesIcon from "../../assets/talk_assets/clothing/shoes.png";
import hatIcon from "../../assets/talk_assets/clothing/hat.png";
import dressIcon from "../../assets/talk_assets/clothing/dress.png";
import coatIcon from "../../assets/talk_assets/clothing/coat.png";
import socksIcon from "../../assets/talk_assets/clothing/socks.png";
import sunglassesIcon from "../../assets/talk_assets/clothing/sunglasses.png";
import glovesIcon from "../../assets/talk_assets/clothing/gloves.png";
import skirtIcon from "../../assets/talk_assets/clothing/skirt.png";

// Household icons
import houseIcon from "../../assets/talk_assets/household/house.png";
import bedIcon from "../../assets/talk_assets/household/bed.png";
import chairIcon from "../../assets/talk_assets/household/chair.png";
import tableIcon from "../../assets/talk_assets/household/table.png";
import doorIcon from "../../assets/talk_assets/household/door.png";
import lampIcon from "../../assets/talk_assets/household/lamp.png";
import toiletIcon from "../../assets/talk_assets/household/toilet.png";
import refrigeratorIcon from "../../assets/talk_assets/household/refridgerator.png";
import microwaveIcon from "../../assets/talk_assets/household/microwave.png";
import deskIcon from "../../assets/talk_assets/household/desk.png";

// Body & Health icons
import bodyIcon from "../../assets/talk_assets/body_health/body.png";
import headIcon from "../../assets/talk_assets/body_health/head.png";
import armIcon from "../../assets/talk_assets/body_health/arm.png";
import legIcon from "../../assets/talk_assets/body_health/leg.png";
import footIcon from "../../assets/talk_assets/body_health/foot.png";
import eyeIcon from "../../assets/talk_assets/body_health/eye.png";
import earIcon from "../../assets/talk_assets/body_health/ear.png";
import noseIcon from "../../assets/talk_assets/body_health/nose.png";
import mouthIcon from "../../assets/talk_assets/body_health/mouth.png";
import teethIcon from "../../assets/talk_assets/body_health/teeth.png";
import tongueIcon from "../../assets/talk_assets/body_health/tongue.png";
import hairIcon from "../../assets/talk_assets/body_health/hair.png";
import skinIcon from "../../assets/talk_assets/body_health/skin.png";
import stomachIcon from "../../assets/talk_assets/body_health/stomach.png";
import chestIcon from "../../assets/talk_assets/body_health/chest.png";
import throatIcon from "../../assets/talk_assets/body_health/throat.png";
import sickIcon from "../../assets/talk_assets/body_health/sick.png";
import feverIcon from "../../assets/talk_assets/body_health/fever.png";
import coldIcon from "../../assets/talk_assets/body_health/cold.png";
import headacheIcon from "../../assets/talk_assets/body_health/headache.png";
import stomachAcheIcon from "../../assets/talk_assets/body_health/stomach_ache.png";
import toothacheIcon from "../../assets/talk_assets/body_health/toothache.png";
import medicineIcon from "../../assets/talk_assets/body_health/medicine.png";

// Directions icons
import upIcon from "../../assets/talk_assets/directions/up.png";
import downIcon from "../../assets/talk_assets/directions/down.png";
import leftIcon from "../../assets/talk_assets/directions/left.png";
import rightIcon from "../../assets/talk_assets/directions/right.png";
import frontIcon from "../../assets/talk_assets/directions/front.png";
import backIcon from "../../assets/talk_assets/directions/back.png";
import forwardsIcon from "../../assets/talk_assets/directions/forwards.png";
import backwardsIcon from "../../assets/talk_assets/directions/backwards.png";
import acrossIcon from "../../assets/talk_assets/directions/across.png";

// School Supplies icons
import backpackIcon from "../../assets/talk_assets/school_supplies/backpack.png";
import bagIcon from "../../assets/talk_assets/school_supplies/bag.png";
import schoolBallIcon from "../../assets/talk_assets/school_supplies/ball.png";
import crayonIcon from "../../assets/talk_assets/school_supplies/crayon.png";
import floorIcon from "../../assets/talk_assets/school_supplies/floor.png";
import schoolWaterIcon from "../../assets/talk_assets/school_supplies/water.png";
// We'll also use some existing icons that can be related to school supplies
import pencilIcon from '../../assets/talk_assets/school_supplies/pencil.png'; // Reusing art icon for pencil
import bookIcon from '../../assets/talk_assets/school_supplies/book.png'; // Reusing read icon for book

// Define type colors
const COLORS = {
    core: "bg-yellow-100",        // Light green
    back: "bg-gray-200",         // Light gray
    activities: "bg-orange-100",   // Light orange
    emotion: "bg-pink-100",     // Light pink
    health: "bg-cyan-100",      // Light cyan
    others: "bg-green-100",     // Light green for other types
    yes: "bg-green-100",        // Light green for "Có"
    no: "bg-red-100 border-red-300", // Light red with red border for "Không"
    lightYellow: 'bg-yellow-100'
};

// Type to color mapping
const TYPE_COLOR_MAP: Record<string, string> = {
    'yes': COLORS.yes,
    'no': COLORS.no,
    'core': COLORS.core,
    'back': COLORS.back,
    'activities': COLORS.activities,
    'emotion': COLORS.emotion,
    'health': COLORS.health,
    'others': COLORS.others
};

// Utility function to get color by type
const getColorByType = (type: string): string => {
    return TYPE_COLOR_MAP[type] || COLORS.others;
};

export const vocabularyData: CardItem[] = [
    // Core words
    { id: '1', label: 'Có', type: 'yes', color: getColorByType('yes'), image: yesIcon },
    { id: '2', label: 'Không', type: 'no', color: getColorByType('no'), image: noIcon },
    { id: '3', label: 'Tôi', type: 'core', color: getColorByType('core'), image: iIcon },
    { id: '4', label: 'Bạn', type: 'core', color: getColorByType('core'), image: youIcon },
    { id: '5', label: 'Ba', type: 'core', color: getColorByType('core'), image: dadIcon },
    { id: '6', label: 'Mẹ', type: 'core', color: getColorByType('core'), image: momIcon },
    // { id: '7', label: 'Xin chào', type: 'core', color: getColorByType('core'), image: helloIcon },

    {
        id: '10',
        label: 'Hoạt động',
        image: playIcon,
        type: 'activities',
        color: getColorByType('activities'),
        isCategory: true,
        subWords: [
            { id: '10.1', label: 'Ăn', image: eatIcon, type: 'activities', color: getColorByType('activities') },
            { id: '10.2', label: 'Uống', image: drinkIcon, type: 'activities', color: getColorByType('activities') },
            { id: '10.3', label: 'Chơi', image: playIcon, type: 'activities', color: getColorByType('activities') },
            { id: '10.4', label: 'Đi', image: goIcon, type: 'activities', color: getColorByType('activities') },
            { id: '10.5', label: 'Đọc', image: readIcon, type: 'activities', color: getColorByType('activities') },
            { id: '10.6', label: 'Ngủ', image: sleepIcon, type: 'activities', color: getColorByType('activities') },
            { id: '10.7', label: 'Bơi', image: swimIcon, type: 'activities', color: getColorByType('activities') },
            { id: '10.8', label: 'Đi bộ', image: walkIcon, type: 'activities', color: getColorByType('activities') },
            { id: '10.9', label: 'Làm việc', image: workIcon, type: 'activities', color: getColorByType('activities') },
            { id: '10.10', label: 'Nghe', image: listenIcon, type: 'activities', color: getColorByType('activities') },
            { id: '10.11', label: 'Xem', image: watchIcon, type: 'activities', color: getColorByType('activities') },
            { id: '10.12', label: 'Giúp đỡ', image: helpIcon, type: 'activities', color: getColorByType('activities') },
            { id: '10.13', label: 'Nấu ăn', image: cookIcon, type: 'activities', color: getColorByType('activities') },
            { id: '10.14', label: 'Cắm trại', image: campIcon, type: 'activities', color: getColorByType('activities') },
            { id: '10.15', label: 'Ra ngoài', image: goOutsideIcon, type: 'activities', color: getColorByType('activities') },
            { id: '10.16', label: 'Vẽ', image: artIcon, type: 'activities', color: getColorByType('activities') },
            { id: '10.17', label: 'Quay lại', type: 'back', color: getColorByType('back'), image: MaterialIcons.name === 'arrow-back' ? MaterialIcons : undefined }
        ]
    },

    {
        id: '11',
        label: 'Cảm xúc',
        image: happyIcon,
        type: 'emotion',
        color: getColorByType('emotion'),
        isCategory: true,
        subWords: [
            { id: '11.1', label: 'Vui', image: happyIcon, type: 'emotion', color: getColorByType('emotion') },
            { id: '11.2', label: 'Buồn', image: sadIcon, type: 'emotion', color: getColorByType('emotion') },
            { id: '11.3', label: 'Giận', image: angryIcon, type: 'emotion', color: getColorByType('emotion') },
            { id: '11.4', label: 'Sợ', image: scaredIcon, type: 'emotion', color: getColorByType('emotion') },
            { id: '11.5', label: 'Ngạc nhiên', image: surprisedIcon, type: 'emotion', color: getColorByType('emotion') },
            { id: '11.6', label: 'Phấn khích', image: excitedIcon, type: 'emotion', color: getColorByType('emotion') },
            { id: '11.7', label: 'Lo lắng', image: worriedIcon, type: 'emotion', color: getColorByType('emotion') },
            { id: '11.8', label: 'Tốt', image: goodIcon, type: 'emotion', color: getColorByType('emotion') },
            { id: '11.9', label: 'Tệ', image: badIcon, type: 'emotion', color: getColorByType('emotion') },
            { id: '11.10', label: 'Nóng', image: hotIcon, type: 'emotion', color: getColorByType('emotion') },
            { id: '11.11', label: 'Quay lại', type: 'back', color: getColorByType('back'), image: MaterialIcons.name === 'arrow-back' ? MaterialIcons : undefined }
        ]
    },

    {
        id: '22',
        label: 'Sức khỏe',
        image: medicineIcon,
        type: 'health',
        color: getColorByType('health'),
        isCategory: true,
        subWords: [
            { id: '22.1', label: 'Ốm', image: sickIcon, type: 'health', color: getColorByType('health') },
            { id: '22.2', label: 'Sốt', image: feverIcon, type: 'health', color: getColorByType('health') },
            { id: '22.3', label: 'Cảm lạnh', image: coldIcon, type: 'health', color: getColorByType('health') },
            { id: '22.4', label: 'Đau đầu', image: headacheIcon, type: 'health', color: getColorByType('health') },
            { id: '22.5', label: 'Đau bụng', image: stomachAcheIcon, type: 'health', color: getColorByType('health') },
            { id: '22.6', label: 'Đau răng', image: toothacheIcon, type: 'health', color: getColorByType('health') },
            { id: '22.7', label: 'Thuốc', image: medicineIcon, type: 'health', color: getColorByType('health') },
            { id: '22.8', label: 'Bụng', image: stomachIcon, type: 'health', color: getColorByType('health') },
            { id: '22.9', label: 'Ngực', image: chestIcon, type: 'health', color: getColorByType('health') },
            { id: '22.10', label: 'Cổ họng', image: throatIcon, type: 'health', color: getColorByType('health') },
            { id: '22.11', label: 'Da', image: skinIcon, type: 'health', color: getColorByType('health') },
            { id: '22.12', label: 'Quay lại', type: 'back', color: getColorByType('back'), image: MaterialIcons.name === 'arrow-back' ? MaterialIcons : undefined }
        ]
    },

    {
        id: '12',
        label: 'Người',
        image: peopleIcon,
        type: 'others',
        color: getColorByType('others'),
        isCategory: true,
        subWords: [
            { id: '12.1', label: 'Mẹ', image: momIcon, type: 'others', color: getColorByType('others') },
            { id: '12.2', label: 'Ba', image: dadIcon, type: 'others', color: getColorByType('others') },
            { id: '12.3', label: 'Bác sĩ', image: doctorIcon, type: 'others', color: getColorByType('others') },
            { id: '12.4', label: 'Giáo viên', image: teacherIcon, type: 'others', color: getColorByType('others') },
            { id: '12.5', label: 'Mọi người', image: peopleIcon, type: 'others', color: getColorByType('others') },
            { id: '12.6', label: 'Quay lại', type: 'back', color: getColorByType('back'), image: MaterialIcons.name === 'arrow-back' ? MaterialIcons : undefined }
        ]
    },

    // Categories
    {
        id: '13',
        label: 'Đồ ăn',
        image: pizzaIcon,
        type: 'others',
        color: getColorByType('others'),
        isCategory: true,
        subWords: [
            { id: '13.1', label: 'Táo', image: appleIcon, type: 'others', color: getColorByType('others') },
            { id: '13.2', label: 'Chuối', image: bananaIcon, type: 'others', color: getColorByType('others') },
            { id: '13.3', label: 'Bánh kem', image: cakeIcon, type: 'others', color: getColorByType('others') },
            { id: '13.4', label: 'Pizza', image: pizzaIcon, type: 'others', color: getColorByType('others') },
            { id: '13.5', label: 'Nước', image: waterIcon, type: 'others', color: getColorByType('others') },
            { id: '13.6', label: 'Sandwich', image: sandwichIcon, type: 'others', color: getColorByType('others') },
            { id: '13.7', label: 'Nước ép', image: juiceIcon, type: 'others', color: getColorByType('others') },
            { id: '13.8', label: 'Sữa', image: milkIcon, type: 'others', color: getColorByType('others') },
            { id: '13.9', label: 'Kem', image: iceCreamIcon, type: 'others', color: getColorByType('others') },
            { id: '13.13', label: 'Bữa sáng', image: breakfastIcon, type: 'others', color: getColorByType('others') },
            { id: '13.11', label: 'Bữa trưa', image: lunchIcon, type: 'others', color: getColorByType('others') },
            { id: '13.12', label: 'Bữa tối', image: dinnerIcon, type: 'others', color: getColorByType('others') },
            { id: '13.13', label: 'Trái cây', image: fruitIcon, type: 'others', color: getColorByType('others') },
            { id: '13.14', label: 'Rau', image: vegetablesIcon, type: 'others', color: getColorByType('others') },
            { id: '13.15', label: 'Sô-cô-la', image: chocolateIcon, type: 'others', color: getColorByType('others') },
            { id: '13.16', label: 'Kẹo', image: candyIcon, type: 'others', color: getColorByType('others') },
            { id: '13.17', label: 'Quay lại', type: 'back', color: getColorByType('back'), image: MaterialIcons.name === 'arrow-back' ? MaterialIcons : undefined }
        ]
    },
    {
        id: '19',
        label: 'Quần áo',
        image: clothesIcon,
        type: 'others',
        color: getColorByType('others'),
        isCategory: true,
        subWords: [
            { id: '19.1', label: 'Áo', image: shirtIcon, type: 'others', color: getColorByType('others') },
            { id: '19.2', label: 'Quần', image: pantsIcon, type: 'others', color: getColorByType('others') },
            { id: '19.3', label: 'Giày', image: shoesIcon, type: 'others', color: getColorByType('others') },
            { id: '19.4', label: 'Mũ', image: hatIcon, type: 'others', color: getColorByType('others') },
            { id: '19.5', label: 'Váy', image: dressIcon, type: 'others', color: getColorByType('others') },
            { id: '19.6', label: 'Áo khoác', image: coatIcon, type: 'others', color: getColorByType('others') },
            { id: '19.7', label: 'Tất', image: socksIcon, type: 'others', color: getColorByType('others') },
            { id: '19.8', label: 'Kính mát', image: sunglassesIcon, type: 'others', color: getColorByType('others') },
            { id: '19.9', label: 'Găng tay', image: glovesIcon, type: 'others', color: getColorByType('others') },
            { id: '19.10', label: 'Váy ngắn', image: skirtIcon, type: 'others', color: getColorByType('others') },
            { id: '19.11', label: 'Quay lại', type: 'back', color: getColorByType('back'), image: MaterialIcons.name === 'arrow-back' ? MaterialIcons : undefined }
        ]
    },

    {
        id: '24',
        label: 'Đồ học tập',
        image: backpackIcon,
        type: 'others',
        color: getColorByType('others'),
        isCategory: true,
        subWords: [
            { id: '24.1', label: 'Balo', image: backpackIcon, type: 'others', color: getColorByType('others') },
            { id: '24.2', label: 'Túi', image: bagIcon, type: 'others', color: getColorByType('others') },
            { id: '24.3', label: 'Bóng', image: schoolBallIcon, type: 'others', color: getColorByType('others') },
            { id: '24.4', label: 'Bút màu', image: crayonIcon, type: 'others', color: getColorByType('others') },
            { id: '24.5', label: 'Sàn', image: floorIcon, type: 'others', color: getColorByType('others') },
            { id: '24.6', label: 'Nước uống', image: schoolWaterIcon, type: 'others', color: getColorByType('others') },
            { id: '24.7', label: 'Bút chì', image: pencilIcon, type: 'others', color: getColorByType('others') },
            { id: '24.8', label: 'Sách', image: bookIcon, type: 'others', color: getColorByType('others') },
            { id: '24.9', label: 'Quay lại', type: 'back', color: getColorByType('back'), image: MaterialIcons.name === 'arrow-back' ? MaterialIcons : undefined }
        ]
    },
    {
        id: '14',
        label: 'Giải trí',
        image: videoGamesIcon,
        type: 'others',
        color: getColorByType('others'),
        isCategory: true,
        subWords: [
            { id: '14.1', label: 'Bóng chày', image: baseballIcon, type: 'others', color: getColorByType('others') },
            { id: '14.2', label: 'Bóng rổ', image: basketballIcon, type: 'others', color: getColorByType('others') },
            { id: '14.3', label: 'Bóng đá', image: soccerIcon, type: 'others', color: getColorByType('others') },
            { id: '14.4', label: 'Tennis', image: tennisIcon, type: 'others', color: getColorByType('others') },
            { id: '14.5', label: 'Golf', image: golfIcon, type: 'others', color: getColorByType('others') },
            { id: '14.6', label: 'Bowling', image: bowlingIcon, type: 'others', color: getColorByType('others') },
            { id: '14.7', label: 'Bingo', image: bingoIcon, type: 'others', color: getColorByType('others') },
            { id: '14.8', label: 'Dã ngoại', image: picnicIcon, type: 'others', color: getColorByType('others') },
            { id: '14.9', label: 'Trò chơi điện tử', image: videoGamesIcon, type: 'others', color: getColorByType('others') },
            { id: '14.10', label: 'Quay lại', type: 'back', color: getColorByType('back'), image: MaterialIcons.name === 'arrow-back' ? MaterialIcons : undefined }
        ]
    },
    {
        id: '15',
        label: 'Địa điểm',
        image: schoolIcon,
        type: 'others',
        color: getColorByType('others'),
        isCategory: true,
        subWords: [
            { id: '15.1', label: 'Trường học', image: schoolIcon, type: 'others', color: getColorByType('others') },
            { id: '15.2', label: 'Bãi biển', image: beachIcon, type: 'others', color: getColorByType('others') },
            { id: '15.3', label: 'Ngân hàng', image: bankIcon, type: 'others', color: getColorByType('others') },
            { id: '15.4', label: 'Nhà thờ', image: churchIcon, type: 'others', color: getColorByType('others') },
            { id: '15.5', label: 'Lớp học', image: classRoomIcon, type: 'others', color: getColorByType('others') },
            { id: '15.6', label: 'Cửa hàng', image: shopIcon, type: 'others', color: getColorByType('others') },
            { id: '15.7', label: 'Công viên', image: themeParkIcon, type: 'others', color: getColorByType('others') },
            { id: '15.8', label: 'Sân trượt', image: skateParkIcon, type: 'others', color: getColorByType('others') },
            { id: '15.9', label: 'Phòng vẽ', image: artRoomIcon, type: 'others', color: getColorByType('others') },
            { id: '15.10', label: 'Quay lại', type: 'back', color: getColorByType('back'), image: MaterialIcons.name === 'arrow-back' ? MaterialIcons : undefined }
        ]
    },

    {
        id: '16',
        label: 'Phương tiện',
        image: busIcon,
        type: 'others',
        color: getColorByType('others'),
        isCategory: true,
        subWords: [
            { id: '16.1', label: 'Xe buýt', image: busIcon, type: 'others', color: getColorByType('others') },
            { id: '16.2', label: 'Xe lăn', image: wheelchairIcon, type: 'others', color: getColorByType('others') },
            { id: '16.3', label: 'Xe đồ chơi', image: toyCarIcon, type: 'others', color: getColorByType('others') },
            { id: '16.4', label: 'Quay lại', type: 'back', color: getColorByType('back'), image: MaterialIcons.name === 'arrow-back' ? MaterialIcons : undefined }
        ]
    },

    {
        id: '17',
        label: 'Động vật',
        image: dogIcon,
        type: 'others',
        color: getColorByType('others'),
        isCategory: true,
        subWords: [
            { id: '17.1', label: 'Chó', image: dogIcon, type: 'others', color: getColorByType('others') },
            { id: '17.2', label: 'Mèo', image: catIcon, type: 'others', color: getColorByType('others') },
            { id: '17.3', label: 'Chim', image: birdIcon, type: 'others', color: getColorByType('others') },
            { id: '17.4', label: 'Gấu', image: bearIcon, type: 'others', color: getColorByType('others') },
            { id: '17.5', label: 'Sư tử', image: lionIcon, type: 'others', color: getColorByType('others') },
            { id: '17.6', label: 'Ngựa', image: horseIcon, type: 'others', color: getColorByType('others') },
            { id: '17.7', label: 'Bò', image: cowIcon, type: 'others', color: getColorByType('others') },
            { id: '17.8', label: 'Hươu cao cổ', image: giraffeIcon, type: 'others', color: getColorByType('others') },
            { id: '17.9', label: 'Nai', image: deerIcon, type: 'others', color: getColorByType('others') },
            { id: '17.10', label: 'Cáo', image: foxIcon, type: 'others', color: getColorByType('others') },
            { id: '17.11', label: 'Cá heo', image: dolphinIcon, type: 'others', color: getColorByType('others') },
            { id: '17.17', label: 'Khỉ đột', image: gorillaIcon, type: 'others', color: getColorByType('others') },
            { id: '17.13', label: 'Quay lại', type: 'back', color: getColorByType('back'), image: MaterialIcons.name === 'arrow-back' ? MaterialIcons : undefined }
        ]
    },
    {
        id: '18',
        label: 'Màu sắc',
        image: rainbowIcon,
        type: 'others',
        color: getColorByType('others'),
        isCategory: true,
        subWords: [
            { id: '18.1', label: 'Đỏ', image: redIcon, type: 'others', color: getColorByType('others') },
            { id: '18.2', label: 'Xanh da trời', image: blueIcon, type: 'others', color: getColorByType('others') },
            { id: '18.3', label: 'Xanh lá', image: greenIcon, type: 'others', color: getColorByType('others') },
            { id: '18.4', label: 'Vàng', image: yellowIcon, type: 'others', color: getColorByType('others') },
            { id: '18.5', label: 'Tím', image: purpleIcon, type: 'others', color: getColorByType('others') },
            { id: '18.6', label: 'Hồng', image: pinkIcon, type: 'others', color: getColorByType('others') },
            { id: '18.7', label: 'Đen', image: blackIcon, type: 'others', color: getColorByType('others') },
            { id: '18.8', label: 'Nâu', image: brownIcon, type: 'others', color: getColorByType('others') },
            { id: '18.9', label: 'Cầu vồng', image: rainbowIcon, type: 'others', color: getColorByType('others') },
            { id: '18.10', label: 'Quay lại', type: 'back', color: getColorByType('back'), image: MaterialIcons.name === 'arrow-back' ? MaterialIcons : undefined }
        ]
    },

    {
        id: '20',
        label: 'Đồ gia dụng',
        image: houseIcon,
        type: 'others',
        color: getColorByType('others'),
        isCategory: true,
        subWords: [
            { id: '20.1', label: 'Nhà', image: houseIcon, type: 'others', color: getColorByType('others') },
            { id: '20.2', label: 'Giường', image: bedIcon, type: 'others', color: getColorByType('others') },
            { id: '20.3', label: 'Ghế', image: chairIcon, type: 'others', color: getColorByType('others') },
            { id: '20.4', label: 'Bàn', image: tableIcon, type: 'others', color: getColorByType('others') },
            { id: '20.5', label: 'Cửa', image: doorIcon, type: 'others', color: getColorByType('others') },
            { id: '20.6', label: 'Đèn', image: lampIcon, type: 'others', color: getColorByType('others') },
            { id: '20.7', label: 'Nhà vệ sinh', image: toiletIcon, type: 'others', color: getColorByType('others') },
            { id: '20.8', label: 'Tủ lạnh', image: refrigeratorIcon, type: 'others', color: getColorByType('others') },
            { id: '20.9', label: 'Lò vi sóng', image: microwaveIcon, type: 'others', color: getColorByType('others') },
            { id: '20.10', label: 'Bàn làm việc', image: deskIcon, type: 'others', color: getColorByType('others') },
            { id: '20.11', label: 'Quay lại', type: 'back', color: getColorByType('back'), image: MaterialIcons.name === 'arrow-back' ? MaterialIcons : undefined }
        ]
    },
    {
        id: '21',
        label: 'Cơ thể',
        image: bodyIcon,
        type: 'others',
        color: getColorByType('others'),
        isCategory: true,
        subWords: [
            { id: '21.1', label: 'Cơ thể', image: bodyIcon, type: 'others', color: getColorByType('others') },
            { id: '21.2', label: 'Đầu', image: headIcon, type: 'others', color: getColorByType('others') },
            { id: '21.3', label: 'Tay', image: armIcon, type: 'others', color: getColorByType('others') },
            { id: '21.4', label: 'Chân', image: legIcon, type: 'others', color: getColorByType('others') },
            { id: '21.5', label: 'Bàn chân', image: footIcon, type: 'others', color: getColorByType('others') },
            { id: '21.6', label: 'Mắt', image: eyeIcon, type: 'others', color: getColorByType('others') },
            { id: '21.7', label: 'Tai', image: earIcon, type: 'others', color: getColorByType('others') },
            { id: '21.8', label: 'Mũi', image: noseIcon, type: 'others', color: getColorByType('others') },
            { id: '21.9', label: 'Miệng', image: mouthIcon, type: 'others', color: getColorByType('others') },
            { id: '21.10', label: 'Răng', image: teethIcon, type: 'others', color: getColorByType('others') },
            { id: '21.11', label: 'Lưỡi', image: tongueIcon, type: 'others', color: getColorByType('others') },
            { id: '21.12', label: 'Tóc', image: hairIcon, type: 'others', color: getColorByType('others') },
            { id: '21.13', label: 'Quay lại', type: 'back', color: getColorByType('back'), image: MaterialIcons.name === 'arrow-back' ? MaterialIcons : undefined }
        ]
    },

    {
        id: '23',
        label: 'Hướng',
        image: upIcon,
        type: 'others',
        color: getColorByType('others'),
        isCategory: true,
        subWords: [
            { id: '23.1', label: 'Lên', image: upIcon, type: 'others', color: getColorByType('others') },
            { id: '23.2', label: 'Xuống', image: downIcon, type: 'others', color: getColorByType('others') },
            { id: '23.3', label: 'Trái', image: leftIcon, type: 'others', color: getColorByType('others') },
            { id: '23.4', label: 'Phải', image: rightIcon, type: 'others', color: getColorByType('others') },
            { id: '23.5', label: 'Phía trước', image: frontIcon, type: 'others', color: getColorByType('others') },
            { id: '23.6', label: 'Phía sau', image: backIcon, type: 'others', color: getColorByType('others') },
            { id: '23.7', label: 'Tiến tới', image: forwardsIcon, type: 'others', color: getColorByType('others') },
            { id: '23.8', label: 'Lùi lại', image: backwardsIcon, type: 'others', color: getColorByType('others') },
            { id: '23.9', label: 'Băng qua', image: acrossIcon, type: 'others', color: getColorByType('others') },
            { id: '23.10', label: 'Quay lại', type: 'back', color: getColorByType('back'), image: MaterialIcons.name === 'arrow-back' ? MaterialIcons : undefined }
        ]
    },

];