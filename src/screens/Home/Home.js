import React from 'react';
import WebView from 'react-native-webview';
import {useRecoilValue} from 'recoil';
import {AuthenFormState} from '../../services/recoil/Authen';

const Home = ({}) => {
  const authen = useRecoilValue(AuthenFormState);
  let token = '';
  if (authen.tokenSignIn) {
    token = authen.tokenSignIn;
  } else {
    token = authen.tokenSignUp;
  }
  console.log('token Sign In', authen.tokenSignIn);
  console.log('token Sign Up', authen.tokenSignUp);

  const web_URL = 'https://www.7789bet.com/?token=';

  return <WebView source={{uri: web_URL + `${token}`}} />;
};

export default Home;
