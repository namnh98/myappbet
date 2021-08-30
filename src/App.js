import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import AppNav from './routes/AppNav';
import {SafeAreaView} from 'react-native';
import {RecoilRoot} from 'recoil';

const App = () => {
  return (
    <RecoilRoot>
      <NavigationContainer>
        <SafeAreaView style={{flex: 1}}>
          <AppNav />
        </SafeAreaView>
      </NavigationContainer>
    </RecoilRoot>
  );
};

export default App;
