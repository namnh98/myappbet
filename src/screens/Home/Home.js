import React, {useEffect, useState} from 'react';
import WebView from 'react-native-webview';
import {useRecoilValue} from 'recoil';
import {AuthenFormState} from '../../services/recoil/Authen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({}) => {
  const authen = useRecoilValue(AuthenFormState);
  const [token, setToken] = useState('');
  useEffect(() => {
    if (!token) {
      saveToken();
    }
  }, []);
  const saveToken = async () => {
    try {
      if (authen.tokenSignIn) {
        setToken(authen.tokenSignIn);
        await AsyncStorage.setItem('token-access-sign-in', authen.tokenSignIn);
      } else {
        setToken(authen.tokenSignUp);
        await AsyncStorage.setItem('token-access-sign-up', authen.tokenSignUp);
      }
    } catch (e) {
      console.log('lỗi lưu token', e);
    }
  };

  console.log('token Sign In', authen.tokenSignIn);
  console.log('token Sign Up', authen.tokenSignUp);

  const web_URL = 'https://www.7789bet.com/?token=';

  return <WebView source={{uri: web_URL + `${token}`}} />;
};

export default Home;
