import React from 'react';
import {
    View,
    Text,
    Image,
    TextInput,
} from 'react-native';
import { Shadow } from "react-native-shadow-2";
import { FlatList } from 'react-native-gesture-handler';
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue
 } from "react-native-reanimated";

import { TextButton, CategoryCard } from "../components";
import { COLORS, FONTS, SIZES, icons, dummyData } from '../constants';


const Search = () => {
    const scrollViewRef = React.useRef()

    const scrollY = useSharedValue(false)
    const onScroll = useAnimatedScrollHandler((event) => {
        scrollY.value = event.contentOffset.y
    })
    function renderBrowseCategories() {
        return (
            <View
                style={{
                    marginTop: -1
                }}
            >
                <Image
                source={require("../Image/aboutreact.png")}
                style={{
                  width: "40%",
                  height: 80,
                  marginLeft: 110,
                }}
              />
                <FlatList 
                    data={dummyData.categories}
                    numColumns={1}
                    scrollEnabled={false}
                    listKey="BrowseCategories"
                    keyExtractor={item => 'BrowseCategories-${item.id}'}
                    contentContainerStyle={{
                        marginTop: SIZES.radius
                    }}
                    renderItem={({item, index}) => (
                        <CategoryCard 
                            containerStyle={{
                                height: 130,
                                width: 330,
                                marginTop: 20,
                                marginLeft: 15
                            }}
                        />
                    )}
                />
            </View>
        )
    }
    
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: COLORS.white
            }}
        >
            <Animated.ScrollView
                ref={scrollViewRef}
                contentContainerStyle={{
                    marginTop: 50,
                    paddingBottom: 200
                }}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
                keyboardDismissMode="on-drag"
                onScroll={onScroll}
                onScrollEndDrag={(event) => {
                    if (event.nativeEvent.contentOffset.y > 10 && event.nativeEvent.contentOffset.y < 30) {
                        scrollViewRef.current?.scrollTo({
                            x: 0,
                            y: 30,
                            animated: true
                        })
                    }
                }}
            >
                {renderBrowseCategories()}
            </Animated.ScrollView>
        </View>
    )
}

export default Search;