import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {LogBox} from 'react-native';

import Home from '../screens/Home/index';
import Login from '../screens/Login/index';
import Booting from '../screens/Booting';
import screenName from './ScreenName';
const App = createStackNavigator();

LogBox.ignoreAllLogs();

const AppNav = () => {
  return (
    <App.Navigator headerMode="none">
      <App.Screen name="BOOTING" component={Booting} />
      <App.Screen name="LOGIN" component={Login} />
      <App.Screen name="HOME" component={Home} />
    </App.Navigator>
  );
};

export default AppNav;
