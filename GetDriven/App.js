import React from 'react';
import {StackNavigator} from 'react-navigation'
import LoginScreen from './screens/LoginScreen.js'
import HomeMenu from './screens/HomeMenu.js'
import CustomerRegistration from './screens/CustomerRegistration.js'
import DriverRegistration from './screens/DriverRegistration.js'
import RideRegistration from './screens/RideRegistration.js'
import AvailableRides from './screens/AvailableRides.js'
import AvailableDrivers from './screens/AvailableDrivers.js'
import MyRides from './screens/MyRides.js'
import RideInfo from './screens/RideInfo.js'
import MyRide from './screens/MyRide.js'
import Meteor from 'react-native-meteor'
import config from './config/config.js'

Meteor.connect('ws://51.15.84.159:3000/websocket');
const Navigation = StackNavigator({
  Login:{screen: LoginScreen},
  CustomerRegistration : {screen : CustomerRegistration},
  HomeMenu:{screen : HomeMenu},
  DriverRegistration : {screen : DriverRegistration},
  RideRegistration : {screen : RideRegistration},
  AvailableRides : {screen : AvailableRides},
  AvailableDrivers : {screen : AvailableDrivers},
  MyRides : {screen : MyRides},
  RideInfo : {screen : RideInfo},
  MyRide : {screen : MyRide},
}
); 
export default Navigation
