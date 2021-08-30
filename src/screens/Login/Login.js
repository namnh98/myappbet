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
import {images} from '../../assets/index';
import {colors} from '../../styles/Color';

import ModalSignin from '../../components/ModalSignin';
import ModalSignup from '../../components/ModalSignup';
import styles from './style';

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
          />
        )}
        <TouchableOpacity
          style={[styles.buttonStyle, {backgroundColor: colors.orange}]}
          onPress={handleSignin}>
          <Text style={styles.titleButton}>Đăng nhập</Text>
        </TouchableOpacity>
        {visible && (
          <ModalSignin visible={visible} handleDismiss={handleDismiss} />
        )}
        <TouchableOpacity style={styles.buttonStyle} onPress={handleSupport}>
          <Text style={styles.titleButton}>Hỗ trợ</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default App;
