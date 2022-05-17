import React from 'react';
import {
    TouchableOpacity,
    Text,
    ImageBackground
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { COLORS, FONTS, SIZES } from '../constants';
import Meltdown from '../screens/Meltdown';
import Seizure from '../screens/Seizure';
import Gallery from '../screens/Gallery';
import About from '../screens/About';

const CategoryCard = ({containerStyle, onPress}) => {
    const navigation = useNavigation();
    return (
        <>
        <TouchableOpacity
            onPress={() => navigation.navigate("Meltdown")}
        >
            <ImageBackground
                source={require('../assets/images/bg_1.png')}
                resizeMode="cover"
                style={{
                    height: 150,
                    width: 200,
                    paddingVertical: SIZES.padding,
                    paddingHorizontal: SIZES.radius,
                    justifyContent: 'flex-end',
                    ...containerStyle
                }}
                imageStyle={{
                    borderRadius: SIZES.radius
                }}
            >
                <Text
                    style={{
                        color: COLORS.white,
                        ...FONTS.h2
                    }}
                >
                    Meltdown
                </Text>
            </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity
            onPress={() => navigation.navigate("Seizure")}
        >
            <ImageBackground
                source={require('../assets/images/bg_2.png')}
                resizeMode="cover"
                style={{
                    height: 150,
                    width: 200,
                    paddingVertical: SIZES.padding,
                    paddingHorizontal: SIZES.radius,
                    justifyContent: 'flex-end',
                    ...containerStyle
                }}
                imageStyle={{
                    borderRadius: SIZES.radius
                }}
            >
                <Text
                    style={{
                        color: COLORS.white,
                        ...FONTS.h2
                    }}
                >
                    Seizure
                </Text>
            </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity
            onPress={() => navigation.navigate("About")}
        >
            <ImageBackground
                source={require('../assets/images/bg_4.png')}
                resizeMode="cover"
                style={{
                    height: 150,
                    width: 200,
                    paddingVertical: SIZES.padding,
                    paddingHorizontal: SIZES.radius,
                    justifyContent: 'flex-end',
                    ...containerStyle
                }}
                imageStyle={{
                    borderRadius: SIZES.radius
                }}
            >
                <Text
                    style={{
                        color: COLORS.white,
                        ...FONTS.h2
                    }}
                >
                    About
                </Text>
            </ImageBackground>
        </TouchableOpacity>
        </>
    )
    
}

export default CategoryCard;