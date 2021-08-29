import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  Linking,
} from 'react-native';
import {images} from '../src/assets';
import Size from '@dungdang/react-native-basic/src/Sizes';
import {colors} from '../src/styles/Color';

import ModalSignin from './components/ModalSignin/index';
import ModalSignup from './components/ModalSignup/index';
import CaptchaAPI from './services/api/CaptchaAPI';

const App = () => {
  const [visible, setVisible] = useState(false);
  const [isVisible, setIsVible] = useState(false);

  const handleSignin = () => {
    setVisible(true);
  };

  const handleSignup = () => {
    setIsVible(true);
  };
  const handleSupport = () => {
    Alert.alert('Thông báo', 'Chức năng đang phát triển');
  };
  const handleDismissSignUp = () => {
    setIsVible(false);
  };
  const handleDismiss = () => {
    setVisible(false);
  };

  const handleDismissSignUpDirectWeb = () => {
    setIsVible(false);
    Linking.openURL(
      'https://www.7789bet.com/?token=eyJhbGciOiJIUzI1NiJ9.ewogICJpYXQiIDogMTYzMDI0ODE2OSwKICAiZXhwIiA6IDE2MzAyNTg5NjksCiAgInVzZXJuYW1lIiA6ICJ0ZXN0bmF5MTIzIiwKICAiZW1haWwiIDogbnVsbCwKICAicm9sZSIgOiAiIiwKICAiZXh0cmEiIDogbnVsbCwKICAiaXNvcCIgOiBmYWxzZQp9.RMJNOrxEvxDj0xyP6i7RwKC937husvY7eNrOkyGxoUQ',
    );
  };
  const handleDismissDirectWeb = () => {
    setVisible(false);
    Linking.openURL(
      'https://www.7789bet.com/?token=eyJhbGciOiJIUzI1NiJ9.ewogICJpYXQiIDogMTYzMDI0ODE2OSwKICAiZXhwIiA6IDE2MzAyNTg5NjksCiAgInVzZXJuYW1lIiA6ICJ0ZXN0bmF5MTIzIiwKICAiZW1haWwiIDogbnVsbCwKICAicm9sZSIgOiAiIiwKICAiZXh0cmEiIDogbnVsbCwKICAiaXNvcCIgOiBmYWxzZQp9.RMJNOrxEvxDj0xyP6i7RwKC937husvY7eNrOkyGxoUQ',
    );
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
            handleDismiss={handleDismissSignUp}
            SignUpSucess={handleDismissSignUpDirectWeb}
          />
        )}
        <TouchableOpacity
          style={[styles.buttonStyle, {backgroundColor: colors.orange}]}
          onPress={handleSignin}>
          <Text style={styles.titleButton}>Đăng nhập</Text>
        </TouchableOpacity>
        {visible && (
          <ModalSignin
            visible={visible}
            handleDismiss={handleDismiss}
            LoginSucess={handleDismissDirectWeb}
          />
        )}
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
