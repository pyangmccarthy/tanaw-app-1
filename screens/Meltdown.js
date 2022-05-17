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

const Meltdown = () => {
  const navigation = useNavigation();

  return (
    <ImageBackground
                source={images.bg}
                style={{
                    alignItems: 'flex-start',
                    marginTop: 20,
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
                >MELTDOWN RECOMMENDATIONS</Text>
                <Text
                    style={{
                        marginTop: SIZES.radius,
                        color:  COLORS.black,
                        textAlign: 'justify',
                        ...FONTS.body4
                    }}
                >1. Give your child some time, it can take a while to recover from information or sensory overload. </Text>
                <Text
                    style={{
                        marginTop: SIZES.radius,
                        color:  COLORS.black,
                        textAlign: 'justify',
                        ...FONTS.body4
                    }}
                >2. Calmly ask your child (or their guardian or friend) if they are OK, but bear in mind they will need more time to respond than you might expect.  </Text>
                <Text
                    style={{
                        marginTop: SIZES.radius,
                        color:  COLORS.black,
                        textAlign: 'justify',
                        ...FONTS.body4
                    }}
                >3. Make space - try to create a quiet, safe space as best you can. Ask people to move along and not to stare, turn off loud music and turn down bright lights – whatever you can think of to reduce the information overload, try it. </Text>
                <Text
                    style={{
                        color:  COLORS.black,
                        textAlign: 'justify',
                        ...FONTS.body4
                    }}
                >4. Complete a diary over a period of time. Record what happened before, during and after each meltdown. Patterns may emerge. You may find that meltdowns occur at particular times, in particular places, or when something particular has happened.</Text>
                <Text
                    style={{
                        marginTop: SIZES.radius,
                        color:  COLORS.black,
                        textAlign: 'justify',
                        ...FONTS.body4
                    }}
                >5. Consistent, predictable routines and structure are very important for autistic people and a change to routine can be very distressing.  </Text>
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

export default Meltdown;



