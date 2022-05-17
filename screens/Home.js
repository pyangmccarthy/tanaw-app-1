import React from 'react';
import {
    View,
    Text,
    ImageBackground,
    Image,
    ScrollView
} from 'react-native';

import { FlatList } from "react-native-gesture-handler";
import { useNavigation } from '@react-navigation/native';

import { 
    IconButton,
    TextButton,
    VerticalCourseCard,
    LineDivider,
    HorizontalCourseCard,
    CategoryCard
 } from "../components"

 import { 
    COLORS,
    SIZES,
    FONTS,
    icons,
    images,
    dummyData
 } from "../constants";

 import Meltdown from './Meltdown';
 import Notification from './Notification';
 import ConnectScreen from './ConnectScreen';

const Section = ({containerStyle, title, onPress, children}) => {
    return (
        <View
            style={{
                ...containerStyle
            }}
        >
            <View
                style={{
                    flexDirection: 'row',
                    paddingHorizontal: SIZES.padding
                }}
            >
                <Text
                    style={{
                        flex: 1,
                        ...FONTS.h2
                    }}
                >
                    {title}
                </Text>
                
            </View>
            {children}
        </View>
    )
}

const Home = () => {

    const navigation = useNavigation();

    function renderHeader() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    marginTop: 40,
                    marginBottom: 10,
                    paddingHorizontal: SIZES.padding,
                    alignItems: 'center'
                }}
            >
                <View
                    style={{
                        flex: 1
                    }}
                >
                    <Text style={{color: COLORS.gray50,
                            ...FONTS.h2}}>Hello! Welcome to Tanaw!</Text>
                    <Text
                        style={{
                            color: COLORS.gray50,
                            ...FONTS.body4
                        }}
                    >
                    Constantly there for your child in a glimpse of an eye.</Text>

                </View>
                <IconButton 
                icon={icons.notification}
                iconStyle={{
                    tintColor: COLORS.black
                }}
                onPress={() => navigation.navigate("Notification")}
                />
            </View>
        )
    }

    function renderStartLearning() {
        return (
            <ImageBackground
                source={images.featured_bg_image}
                style={{
                    alignItems: 'flex-start',
                    marginTop: 60,
                    marginHorizontal: SIZES.padding,
                    padding: 15
                }}
                imageStyle={{
                    borderRadius: SIZES.radius
                }}
            >
                <View>
                <Text 
                    style={{
                        color: COLORS.white,
                        ...FONTS.body2
                    }}
                > Child Monitoring </Text>
                <Text
                    style={{
                        color: COLORS.white,
                        ...FONTS.h2
                    }}
                > Please connect to bluetooth</Text>
                <Text
                    style={{
                        marginTop: SIZES.radius,
                        color:  COLORS.white,
                        ...FONTS.body4
                    }}
                > Make sure bluetooth is turned on</Text>
                </View>
                <Image 
                    source={images.work}
                    style={{
                        width: "100%",
                        height: 300,
                        marginTop: "10%",
                        marginLeft: "5%"
                    }}
                />
                <TextButton 
                    label="Connect"
                    contentContainerStyle={{
                        height: 40,
                        paddingHorizontal: SIZES.padding,
                        marginLeft: "55%",
                        borderRadius: 20,
                        backgroundColor: COLORS.white
                    }}
                    labelStyle={{
                        color: COLORS.black
                    }}
                    onPress={() => navigation.navigate("ConnectScreen")}
                />
            
            </ImageBackground>
        )
    }

    // function renderCourses() {
    //     return (
    //         <FlatList 
    //             horizontaldata={dummyData.courses_list_1}
    //             listKey="Courses"
    //             keyExtractor={item => 'Courses-${item.id}'}
    //             showsHorizontalScrollIndicator={false}
    //             contentContainerStyle={{
    //                 marginTop: SIZES.padding 
    //             }}
    //             renderItem={({item, index}) => (
    //                 <VerticalCourseCard 
    //                     containerStyle={{
    //                         marginLeft: index == 0 ? SIZES.padding: SIZES.radius,
    //                         marginRight: index == dummyData.courses_list_1.length - 1 ? SIZES.padding: 0
    //                     }}
    //                     course={item}
    //                 />
    //             )}
    //         />
    //     )
    // }

    // function renderCategories(){
    //     return(
    //         <Section
    //             title="Categories"
    //         >
    //             <FlatList
    //                 horizontal
    //                 data={dummyData.categories}
    //                 listKey="Categories"
    //                 keyExtractor={item => 'Categories-${item.id}'}
    //                 showsHorizontalScrollIndicator={false}
    //                 contentContainerStyle={{
    //                     marginTop: SIZES.radius
    //                 }}
    //                 renderItem={({item, index}) => (
    //                     <CategoryCard 
    //                         category={item}
    //                         containerStyle={{
    //                             marginLeft: index == 0 ? SIZES.padding : SIZES.base,
    //                             marginRight: index == dummyData.categories.length - 1 ? SIZES.padding : 0
    //                         }}
    //                     />
    //                 )}
    //             />
    //         </Section>
    //     )
    // }

    // function renderPopularCourses(){
    //     return(
    //         <Section
    //         title="Gallery"
    //         containerStyle={{
    //             marginTop: 30
    //         }}
    //         >
    //         <FlatList
    //             data={dummyData.courses_list_2}
    //             listKey="PopularCourses"
    //             scrollEnabled={false}
    //             keyExtractor={item => 'PopularCourses-${item.id}'}
    //             contentContainerStyle={{
    //                 marginTop: SIZES.radius,
    //                 paddingHorizontal: SIZES.padding
    //             }}
    //             renderItem={({item, index}) => (
    //                 <HorizontalCourseCard 
    //                     course={item}
    //                     containerStyle={{
    //                         marginVertical: SIZES.padding,
    //                         marginTop: index == 0 ? SIZES.radius : SIZES.padding
    //                     }}
    //                 />
    //             )}
    //             ItemSeparatorComponent={() => (
    //                 <LineDivider 
    //                     lineStyle={{
    //                         backgroundColor: COLORS.gray20
    //                     }}
    //                 />
    //             )}   
    //         /> 
    //         </Section>
    //     )
    // }
    
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: COLORS.white
            }}
        >
            {renderHeader()}

            <ScrollView
                contentContainerStyle={{
                    paddingBottom: 150
                }}
                showsVerticalScrollIndicator={false}
            >
                {renderStartLearning()}

                {/* {renderCourses()}
                <LineDivider 
                    lineStyle={{
                        marginVertical: SIZES.padding
                    }}
                />

                {renderCategories()} */}

                {/* {renderPopularCourses()} */}
            </ScrollView>
        </View>
    )
}

export default Home;