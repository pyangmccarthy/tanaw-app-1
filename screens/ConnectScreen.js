import React, { Component, useCallback } from 'react';
import { Image, Platform, PermissionsAndroid, Linking, Alert, TouchableOpacity, View, StyleSheet, SafeAreaView, ScrollView, ActivityIndicator, StatusBar} from 'react-native';
import { Container, Header, Content, Footer, Text, Card, CardItem, Body, Icon, Button, Left, Right, Title } from 'native-base';
import { BleManager } from 'react-native-ble-plx';
import PushNotification from 'react-native-push-notification';
import Modal from 'react-native-modal';
import {Buffer} from 'buffer';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Tts from 'react-native-tts'
import MainLayout from './MainLayout'
import Meltdown from './Meltdown';
import Seizure from './Seizure';
import { 
  COLORS,
  SIZES,
  FONTS,
  icons,
  images,
  dummyData
} from "../constants";

// import CustomHeader from '../../CustomHeader';

const TanawServiceUuid = '13333333-3333-3333-3333-333333333337';
var TanawNotificationCharacteristicUuid = '13333333-3333-3333-3333-333333330003';

class ConnectScreen extends Component{

constructor(props) {
  super(props);

  this.manager = new BleManager()
  this.subscription = null;

  this.state = {
    bluetoothPermission: false,
    bluetoothStatus: '',
    isModalVisible: false,
    isModalVisibleLocation: false,
    isLoading: false,
    disabled: true,

  };
}

componentDidMount() {
  this.subscription = this.manager.onStateChange(state => {
    this.setState({
      bluetoothStatus: state,
    });
  }, true);
}


_toggle = () => {
  this.manager.enable()
  this.setState({isModalVisible: !this.state.isModalVisible})
  PushNotification.cancelAllLocalNotifications()
  this.scanAndConnect();
}

_toggleLocation = () => {
  this.setState({isModalVisibleLocation: !this.state.isModalVisibleLocation});
}


enableBluetooth = () => {
  console.log("button is pressed");
  if (this.state.bluetoothStatus === 'PoweredOff'){
    Alert.alert(
      "Connect to Bluetooth",
      'Tanaw would like to use Bluetooth',
      '',
      [
        {
          text: "Don't Allow",
          style: 'cancel',
        },
        {
          text: 'Ok',
          onPress: () =>
          this._enableBle()
        },
      ],
      { cancelable: false },
    );
  }
  else{
    console.log("going to scan");
    this.scanAndConnect();
  }
  console.log("button is pressed 2");
};

_disableble = () => {
  this.manager.disable()
  alert('Successfully Disconnected')
  this.setState({ disabled: true });
}

_enableBle = () => {
  this.manager.enable()
  alert('Bluetooth is on Now')
  console.log("bluetooth on")
  this.scanAndConnect();
}

disableBluetooth = () => {
  Alert.alert(
    "Diconnect from Bluetooth",
    'Do you wanna turn off the Bluetooth?',
    '',
    [
      {
        text: "Don't Allow",
        style: 'cancel',
      },
      {
        text: 'Ok',
        onPress: () =>
        this._disableble()
      },
    ],
    { cancelable: false },
  );
}

scanAndConnect() {
  console.log("start scanning");
  const permission = this.requestLocationPermission();
  console.log(permission);
  if (permission) {
    console.log("inside permission");
  this.manager.startDeviceScan(null, null, (error, device) => {
    if(error){
      console.log(error);
      if(error.errorCode == 601){
        this.setState({isModalVisibleLocation: !this.state.isModalVisibleLocation})
      }
      return
    }

    console.log(device.name)
    if (device.name === 'Tanaw'){
      this.manager.stopDeviceScan();
      device.connect()
      .then((device) => {
        return device.discoverAllServicesAndCharacteristics()
      })
      .then((device) => {
        alert('Connected Successfully');
        console.log("connected successfully")
        return this.setupNotifications(device);
        this.setState({
          disabled: false
        });
      })
      .catch((error) => {
        alert(error.message);
      });
    }
    else{
      console.log(device)
    }
  });
  }
  else {
    console.log("no permission")
  }  
}


async setupNotifications(device) {

    device.monitorCharacteristicForService(TanawServiceUuid, TanawNotificationCharacteristicUuid, (error, characteristic) => {
      if (error) {
        console.log('hello11')
        return
      }
      const buffer = new Buffer(characteristic.value, 'base64');
      const buffstr = buffer.toString();
      console.log(buffstr)
      this._pushnotif(buffstr)
    })
  }

  async requestLocationPermission() {
  try {
    console.log("requesting bluetooth access")
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
        title: 'Location permission for bluetooth scanning',
        message: 'Press ok to Allow',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    ); 
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("granted");
      return true;
    } else {
      console.log("not granted");
      return false;
    }
  } catch (err) {
    console.warn(err);
    return false;
  }
}

_pushnotif = (buffstr) => {
  if(buffstr !== 'OTHER'){
    Tts.getInitStatus().then(() => {
    Tts.speak("The child is experiencing " + buffstr);
    })
    PushNotification.localNotificationSchedule({
      id: '5',
      message: "The child is exp " + buffstr,
      date: new Date(Date.now() + 1 * 1000),
      vibrate: true,
      vibration: 1000000,
      priority: "max",
      importance: "max",
      repeatType: "minute",
    });
  
    this.manager.disable()
    this.setState({isModalVisible: true})
  }
}

    render() {
        return (
            <Container>
              <Header style={{ backgroundColor: 'white' }}>
                <Left>
                  <Button transparent onPress={() => this.props.navigation.navigate('MainLayout')}>
                    <Icon type={"AntDesign"} name={"home"} style={{ color: '#004a7c', fontSize: 25 }} />
                  </Button>
                </Left>
                <Body>
                  <Title style={{ color: '#000' }}>Connect Device</Title>
                </Body>
              </Header>
                <Content padder style={styles.containerBg}>
                    <SafeAreaView>
                        <ScrollView>
                            <View>
                              <StatusBar
                                backgroundColor="#004a7c"
                                barStyle="light-content" />
                              <Text style={styles.textStyle}> Connect your device</Text>
                              <Text style={styles.textStyle}> through Bluetooth</Text>
                              <Image source={require('../assets/icons/tanaw_icon.png')} style={styles.connectStyle}></Image>
                            </View>

                            <View>
                              {this.state.disabled ? (
                              <TouchableOpacity title="Connect" style={styles.buttonStyle} onPress={this.enableBluetooth}>
                                <Text style={styles.buttonText}>
                                  Connect
                                  </Text>
                              </TouchableOpacity>) : (
                                <TouchableOpacity title="Disconnect" style={styles.buttonStyle} onPress={this.disableBluetooth}>
                                  <Text style={styles.buttonText}> 
                                    Disconnect
                                  </Text>
                                </TouchableOpacity>
                              )}
                            </View>
                        </ScrollView>
                    </SafeAreaView>
                </Content>
            <View>
              <Modal isVisible={this.state.isModalVisible}>
                <View style={styles.modalView}>
                  <Icon type={"AntDesign"}
                    name={"exclamationcircleo"}
                    style={styles.modalIconFail} />
                  <Text
                    style={styles.textModalFail}> Your child needs help! </Text>
                  <Text
                    style={styles.textModalFail}> Note: Turn on the Bluetooth Again </Text>
                  <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <TouchableOpacity
                      style={[styles.submitBtnFail, styles.yesBtn]}
                      //onPress={this._toggle}
                      onPress={() => {this._toggle; this.props.navigation.navigate('Seizure')}}
                    >
                      <Text style={styles.understoodFail}
                      > Proceed to Recommendation </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </View>

            {/* <Modal isVisible={this.state.isModalVisibleLocation}>
              <View style={styles.modalView}>
                <Icon type={"AntDesign"} name={"exclamationcircleo"} style={styles.modalIconFail} />
                <Text style={styles.textModalFail}> Please Turn on The Location </Text>
                <View style={{ justifyContent: "center", alignItems: "center" }}>
                  <TouchableOpacity style={[styles.submitBtnFail, styles.yesBtn]} onPress={this._toggleLocation}>
                    <Text style={styles.understoodFail}> Understood</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal> */}
            <Modal isVisible={this.state.isLoading}>
              <ActivityIndicator size="small" color="#384259" />
            </Modal>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
  containerBg: {
    //backgroundColor: '#F7FBFC',
    backgroundColor: 'white',
    flex: 1,
  },
  connectStyle: {
    width: 300,
    height: 300,
    alignSelf: 'center',
    //marginTop: 10,
    // marginBottom: 15,
  },
  buttonStyle: {
    marginTop: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#007B2A',
    width: '45%',
    height: 45,
    //borderColor: '#112d4e',
    borderColor: '#007B2A',
    borderWidth: 2,
    borderRadius: 30,
  },
  textStyle: {
    color: '#000',
    fontWeight: 'bold',
    alignSelf: 'center',
    fontSize: 16,
  },
  buttonText: {
    color: '#fff',
    fontFamily: "Roboto-Light",
    //fontWeight: 'bold',
    alignSelf: 'center',
    fontSize: 18,
  },
  submitBtnFail: {
    backgroundColor: "#e99b9b",
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 50,
    width: '80%',
    height: 60,
    margin: 25,
    justifyContent: 'center'
  },
  yesBtn: {
    margin: 0,
    marginVertical: 10,
  },
  modalView: { 
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#fff",
    marginVertical: 100,
    borderWidth: 2,
    borderRadius: 25,
    borderColor: 'white',
  },
  modalIconFail: {
    fontSize: 80,
    fontWeight: "900",
    color: "#e84a5f",
    textAlign: "center",
    width: "100%",
    marginBottom: 25
  },
  textLocationStyle: {
    textAlign: "center",
    alignSelf: "center",
    fontSize: 20,
    marginBottom: 50,
    color: "#e84a5f"
  },
  understoodFail: {
    textAlign: "center",
    color: "#e84a5f",
    alignSelf: "center",
    fontSize: 12,
    fontWeight: 'bold',
  },
  textModalFail: {
    textAlign: "center",
    alignSelf: "center",
    fontSize: 24,
    marginLeft: 50,
    marginRight: 50,
    marginBottom: 30,
    color: "#e84a5f"
  },
})

export default ConnectScreen