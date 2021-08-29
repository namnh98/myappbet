import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  SafeAreaView,
} from 'react-native';
import {colors} from '../../styles/Color';
import Size from '@dungdang/react-native-basic/src/Sizes';
import {images} from '../../assets/index';
import {styles} from './style';

import CaptchaAPI from '../../services/api/CaptchaAPI';

const {height} = Dimensions.get('screen');

const ModalSignup = props => {
  const [captcha, setCaptcha] = useState();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [confirmCaptcha, setConfirmCaptcha] = useState('');
  const [textAlert, setTextAlert] = useState('');
  const [isMoveKeyboard, setIsMoveKeyboard] = useState(false);

  const getCaptcha = async () => {
    const result = await CaptchaAPI();
    if (result) {
      setCaptcha(result.image);
    }
  };
  useEffect(() => {
    getCaptcha();
  }, []);

  const onDismiss = () => {
    Keyboard.dismiss();
    setIsMoveKeyboard(false);
  };

  const onFocus = () => {
    setIsMoveKeyboard(true);
  };

  const visible = props.visible;

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <KeyboardAvoidingView
        enabled
        behavior={isMoveKeyboard ? 'position' : 'padding'}>
        <TouchableWithoutFeedback onPress={onDismiss}>
          <View style={styles.modalContainer}>
            <View style={styles.bodyModalContainer}>
              <View style={styles.headerContainer}>
                <Text style={styles.titleHeader}>Đăng ký</Text>
              </View>
              <View style={styles.bodyContainer}>
                <View style={styles.itemBody}>
                  <Image source={images.icon_person} style={styles.iconStyle} />
                  <TextInput
                    style={styles.textInputStyle}
                    placeholder="Tên đăng nhập"
                    value={username}
                    onChangeText={text => setUsername(text)}
                    onFocus={onFocus}
                  />
                </View>
                <View style={styles.itemBody}>
                  <Image source={images.icon_lock} style={styles.iconStyle} />
                  <TextInput
                    style={styles.textInputStyle}
                    placeholder="Mật khẩu"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    onFocus={onFocus}
                  />
                </View>
                <View style={styles.itemBody}>
                  <Image source={images.icon_phone} style={styles.iconStyle} />
                  <TextInput
                    style={styles.textInputStyle}
                    placeholder="Số điện thoại"
                    value={phonenumber}
                    onChangeText={text => setPhonenumber(text)}
                    onFocus={onFocus}
                  />
                </View>
                <View style={styles.itemBody}>
                  <Image source={images.icon_key} style={styles.iconStyle} />
                  <TextInput
                    style={[styles.textInputStyle, {width: '60%'}]}
                    placeholder="Mã kiểm tra"
                    value={confirmCaptcha}
                    onChangeText={text => setConfirmCaptcha(text)}
                    onFocus={onFocus}
                  />
                  {captcha ? (
                    <Image
                      source={{uri: captcha}}
                      style={{width: Size.s100 + Size.s20, height: Size.s100}}
                      resizeMode="contain"
                    />
                  ) : (
                    <ActivityIndicator color={colors.blue} />
                  )}
                  <TouchableOpacity onPress={getCaptcha}>
                    <Image
                      source={images.icon_refresh}
                      style={[styles.iconStyle, {tintColor: colors.black}]}
                    />
                  </TouchableOpacity>
                </View>
                {textAlert ? (
                  <View
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: Size.h30, color: 'red'}}>
                      {textAlert}
                    </Text>
                  </View>
                ) : null}
              </View>
              <View
                style={[
                  styles.endContainer,
                  {height: props.textAlert ? height * 0.07 : height * 0.045},
                ]}>
                <TouchableOpacity
                  style={styles.buttonSignInStyle}
                  onPress={props.handleSignUp}>
                  <Text style={styles.titleButton}>Đăng ký</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default ModalSignup;
