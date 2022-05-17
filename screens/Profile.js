// Import React and Component
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image
} from "react-native";

import auth from "@react-native-firebase/auth";

import { useNavigation } from "@react-navigation/core";

import LoginScreen from "./LoginScreen";


const Profile = () => {

  const navigation = useNavigation()

  const [user, setUser] = useState();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user) => {
      console.log("user", JSON.stringify(user));
      setUser(user);
    });

    return subscriber;
  }, []);

  const logout = () => {
    Alert.alert(
      "Logout",
      "You will be returned to the login screen",
      [
        {
          text: "Cancel",
          onPress: () => {
            return null;
          },
        },
        {
          text: "Confirm",
          onPress: () => {
            auth()
              .signOut()
              .then(() => navigation.replace("LoginScreen"))
              .catch((error) => {
                console.log(error);
                if (error.code === "auth/no-current-user")
                  navigation.replace("LoginScreen");
                else alert(error);
              });
            },
        },
      ],
    );
  };

  const removeacc = () => {
    Alert.alert(
      "Delete Account?",
      "You will be returned to the login screen",
      [
        {
          text: "Cancel",
          onPress: () => {
            return null;
          },
        },
        {
          text: "Confirm",
          onPress: () => {
            auth()
            /*.deleteUser(user.uid)
            .then(() => {
              console.log('Successfully deleted user');
            })
            .catch((error) => {
              console.log('Error deleting user:', error);
            });
              /*.signOut()
              .then(() => navigation.replace("LoginScreen"))
              .catch((error) => {
                console.log(error);
                if (error.code === "auth/no-current-user")
                  navigation.replace("LoginScreen");
                else alert(error);
              });*/
            },
        },
      ],
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
      <View style={styles.container}>
          <View style={styles.header}></View>
          <Image source={require('../assets/images/student_3.png')} style={styles.avatar}></Image>
          <Text
            style={{
              fontSize: 40,
              fontStyle: "Roboto-Medium",
              textAlign: "center",
              marginBottom: 80,
              marginTop: 65
            }}
          >
            Profile
          </Text>
          {user ? (
            <Text
            style={{
              fontSize: 20,
              fontStyle: "Roboto-Medium",
              textAlign: "center",
              marginBottom: 80,
              marginTop: -80
            }}
            >
              Welcome{" "}
              {user.displayName
                ? user.displayName
                : user.email}
            </Text>
          ) : null}
          <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={logout}
          >
            <Text style={styles.buttonTextStyle}>
              Logout
            </Text>
            
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={removeacc}
          >
            <Text style={styles.buttonTextStyle}>
              Delete Account
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  buttonStyle: {
    minWidth: 250,
    backgroundColor: "#007B2A",
    borderWidth: 0,
    color: "#FFFFFF",
    borderColor: "#007B2A",
    height: 40,
    alignItems: "center",
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 10,
    marginBottom: 10,
  },
  buttonTextStyle: {
    color: "#FFFFFF",
    paddingVertical: 10,
    fontSize: 12,
  },
  header:{
    backgroundColor: "#007B2A",
    height:200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf:'center',
    position: 'absolute',
    marginTop: 120,
    //resizeMode: 'contain'
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
  },
});