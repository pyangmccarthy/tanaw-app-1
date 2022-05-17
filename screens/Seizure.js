import React from 'react';
import {
    View,
    ScrollView,
    Text,
    Image,
    ImageBackground,
    FlatList,
    StyleSheet
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { 
  IconButton,
  TextButton
} from "../components"

import {
    COLORS,
    FONTS,
    SIZES,
    images,
    icons,
    dummyData
} from "../constants";

import ConnectScreen from './ConnectScreen';
import { MainLayout } from './MainLayout';

const Seizure = () => {
  const navigation = useNavigation();

  return (
    <ImageBackground
                source={images.bg}
                style={{
                    alignItems: 'flex-start',
                    marginTop: 30,
                    marginHorizontal: SIZES.padding,
                    padding: 15
                }}
                imageStyle={{
                    borderRadius: SIZES.radius
                }}
            >
                <ScrollView>
                <Text
                    style={{
                        color: COLORS.black,
                        ...FONTS.h2
                    }}
                >SEIZURE RECOMMENDATIONS</Text>
                <Text
                    style={{
                        marginTop: SIZES.radius,
                        color:  COLORS.black,
                        textAlign: 'justify',
                        ...FONTS.body4
                    }}
                >1. Gently try to get them into a position where they are safe. If they are standing or sitting, get them to the floor or a soft surface where you can lay them on their side. </Text>
                <Text
                    style={{
                        marginTop: SIZES.radius,
                        color:  COLORS.black,
                        textAlign: 'justify',
                        ...FONTS.body4
                    }}
                >2. Do not put anything in your child’s mouth. They cannot swallow their tongue and often they clench their teeth together. If you try to put something in their mouth you are likely to hurt them or yourself.  </Text>
                <Text
                    style={{
                        marginTop: SIZES.radius,
                        color:  COLORS.black,
                        textAlign: 'justify',
                        ...FONTS.body4
                    }}
                >3. Children often foam at the mouth or drool during a seizure. If they are turned on their side, this will run out of their mouth rather than pooling in the back of their throat. </Text>
                <Text
                    style={{
                        marginTop: SIZES.radius,
                        color:  COLORS.black,
                        textAlign: 'justify',
                        ...FONTS.body4
                    }}
                >4. Some children do not have convulsing types of seizures, but may just stare or act unusual. If your child has this type of seizure, you just need to stay with them and keep them safe. You may not need to have them lie down on their side.</Text>
                <Text
                    style={{
                        marginTop: SIZES.radius,
                        color:  COLORS.black,
                        textAlign: 'justify',
                        ...FONTS.body4
                    }}
                >5. Do not try to stop or restrain their movements. Stay with your child. Observe your child’s behavior and movements.  </Text>
                <TextButton 
                    label="Return to Connect"
                    contentContainerStyle={{
                        height: 40,
                        paddingHorizontal: SIZES.padding,
                        alignItems: 'center',
                        marginTop: "15%",
                        marginLeft: "5%",
                        borderRadius: 20,
                        backgroundColor: "#007B2A"
                    }}
                    labelStyle={{
                        color: COLORS.white
                    }}
                    onPress={() => navigation.navigate("ConnectScreen")}
                />
                <TextButton 
                    label="Return Home"
                    contentContainerStyle={{
                      height: 40,
                      paddingHorizontal: SIZES.padding,
                      alignItems: 'center',
                      marginTop: "5%",
                      marginLeft: "5%",
                      borderRadius: 20,
                      backgroundColor: "#007B2A"
                    }}
                    labelStyle={{
                        color: COLORS.white
                    }}
                    onPress={() => navigation.navigate("MainLayout")}
                />
            </ScrollView>
            </ImageBackground>
        )
    }

export default Seizure;



