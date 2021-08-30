import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/core';
import { useRecoilState } from 'recoil';
import { AuthenFormState } from '../services/recoil/Authen';

const Booting = () => {
  const navigation = useNavigation();
  const [authen, setAuthen] = useRecoilState(AuthenFormState);

  useEffect(() => {
    const getToken = async () => {
      const token = await AsyncStorage.getItem('token-access-sign-in');
      console.log('token', token);
      if (!token) {
        console.log('vô 1');
        navigation.navigate('LOGIN');
      }
      if (token) {
        setAuthen({...authen,tokenSignIn:token})
        console.log('vô 2');
        navigation.navigate('HOME');
      } else {
        const token = await AsyncStorage.getItem('token-access-sign-up');
        if (!token) {
          console.log('vô 3');
          navigation.navigate('LOGIN');
        }
        if (token) {
          setAuthen({...authen,tokenSignUp:token})
          console.log('vô 4');
          navigation.navigate('HOME');
        }
      }
    };

    getToken();
  }, []);
  return (
    <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
      <Text>Đang tải dữ liệu ...</Text>
    </View>
  );
};

export default Booting;
