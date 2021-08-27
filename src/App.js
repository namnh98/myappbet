import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {images} from '../src/assets';
import Size from '@dungdang/react-native-basic/src/Sizes';
import {colors} from '../src/styles/Color';

import ModalSignin from './components/ModalSignin/index';
import ModalSignup from './components/ModalSignup';

const App = () => {
  const [visible, setVisible] = useState(false);
  const [isVisible, setIsVible] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [captchaCode, setCaptchaCode] = useState('');
  const [textAlert,setTextAlert] = useState('');

  const handleSignin = () => {
    setVisible(true);
  };

  const handleSignup = () => {
    setIsVible(true);
  };
  const handleSupport = () => {
    Alert.alert('Thông báo', 'Chức năng đang phát triển');
  };
  const SignUp = () => {
    setIsVible(false);
  };
  const SignIn = () => {
    setVisible(false);
  };
  const handleUsername = text => {
    setUsername(text);
  };
  const handlePassword = text => {
    setPassword(text);
  };
  const handlePhoneNumber = text => {
    setPhoneNumber(text);
  };
  const handleCaptchaCode = text => {
    setCaptchaCode(text);
  };
  return (
    <View style={styles.container}>
      <Image source={images.logo} style={styles.logoStyle} />
      <View style={styles.buttonList}>
        <TouchableOpacity style={styles.buttonStyle} onPress={handleSignup}>
          <Text style={styles.titleButton}>Đăng ký</Text>
        </TouchableOpacity>
        {isVisible && (
          <ModalSignup
            visible={isVisible}
            handleSignUp={SignUp}
            username={username}
            handleUsername={handleUsername}
            password={password}
            handlePassword={handlePassword}
            phoneNumber={phoneNumber}
            handlePhoneNumber={handlePhoneNumber}
            captchaCode={captchaCode}
            handleCaptchaCode={handleCaptchaCode}
            textAlert={textAlert}
          />
        )}
        <TouchableOpacity
          style={[styles.buttonStyle, {backgroundColor: colors.orange}]}
          onPress={handleSignin}>
          <Text style={styles.titleButton}>Đăng nhập</Text>
        </TouchableOpacity>
        {visible && <ModalSignin visible={visible} handleSignIn={SignIn} />}
        <TouchableOpacity style={styles.buttonStyle} onPress={handleSupport}>
          <Text style={styles.titleButton}>Hỗ trợ</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoStyle: {
    resizeMode: 'contain',
    width: '100%',
  },
  buttonList: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingVertical: Size.h16,
    flex: 1,
  },
  buttonStyle: {
    backgroundColor: colors.blue,
    width: Size.s200 * 3,
    height: Size.s100 + Size.s20,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: Size.h16 / 2,
  },
  titleButton: {
    color: 'white',
    fontSize: Size.h44,
  },
});

export default App;
