import React, {useEffect, useState, useRef} from 'react';
import {
  Text,
  View,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {colors} from '../../styles/Color';
import Size from '@dungdang/react-native-basic/src/Sizes';
import {images} from '../../assets/index';
import {styles} from './style';

import CaptchaAPI from '../../services/api/CaptchaAPI';
import SignUpAPI from '../../services/api/SignUpAPI';
import {useRecoilState} from 'recoil';
import {AuthenFormState} from '../../services/recoil/Authen';
import {useNavigation} from '@react-navigation/core';
import Sizes from '@dungdang/react-native-basic/src/Sizes';

// import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const {height, width} = Dimensions.get('screen');

const ModalSignup = props => {
  const [captcha, setCaptcha] = useState();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [confirmCaptcha, setConfirmCaptcha] = useState('');
  const [textAlert, setTextAlert] = useState('');
  const [isMoveKeyboard, setIsMoveKeyboard] = useState(false);
  const [isRegis, setIsRegis] = useState(false);
  const [authen, setAuthen] = useRecoilState(AuthenFormState);
  const navigation = useNavigation();
  const [isShowPass, setIsShowPass] = useState(false);

  const getCaptcha = async () => {
    const result = await CaptchaAPI();
    if (result) {
      setCaptcha(result);
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
    setTextAlert('');
  };

  const checkBeforeSignUp = () => {
    if (!username) {
      setTextAlert('Tên đăng nhập còn trống và cần có chữ - số');
    } else if (!password) {
      setTextAlert('Mật khẩu còn trống!');
    } else if (password.length < 6) {
      setTextAlert('Mật khẩu phải đủ 6 ký tự');
    } else if (!phonenumber) {
      setTextAlert('Số điện thoại còn trống!');
    } else if (phonenumber.length < 10) {
      setTextAlert('Số điện thoại phải đủ 10 số');
    } else if (!confirmCaptcha) {
      setTextAlert('Mã kiểm tra còn trống!');
    } else {
      handleSignUp(
        username,
        password,
        phonenumber,
        confirmCaptcha,
        captcha.uuid,
      );
      setTextAlert('');
    }
  };

  const handleSignUp = async (
    username,
    password,
    phonenumber,
    confirmCaptcha,
    captchauuid,
  ) => {
    const newphone = phonenumber.replace('0', '84 ');
    try {
      const resp = await SignUpAPI(
        username,
        password,
        newphone,
        confirmCaptcha,
        captchauuid,
      );
      console.log('resp', resp);
      if (resp.msg === 'The specified mobile has been registered') {
        setTextAlert('Số điện thoại này đã đăng ký. Hãy đổi số khác.');
        getCaptcha();
      } else if(resp==='Invalid param: playerid is invalid'){
        setTextAlert('Tên đăng nhập không hợp lệ.')
        getCaptcha();
      } else
      if (!resp.code) {
        setAuthen({...authen, tokenSignUp: resp.token});
        Alert.alert('Thông báo', 'Bạn đã đăng ký thành công!', [
          {
            text: 'Ok',
            onPress: navigation.navigate('HOME'),
            style: 'cancel',
          },
        ]);
        setIsRegis(true);
      } else if (resp.msg === 'Invalid param: playerid is invalid') {
        setTextAlert('Tên đăng nhập không hợp lệ')
        getCaptcha();
      }
    } catch (e) {
      console.log('lỗi đăng ký', e);
      setTextAlert('Bạn đăng ký thất bại.')
      throw e;
    }
  };

  const check = () => {
    if (
      !username ||
      !password ||
      !phonenumber ||
      (!confirmCaptcha && confirmCaptcha.length < 4)
    ) {
      return false;
    }
    return true;
  };

  const showPass = () => {
    setIsShowPass(!isShowPass);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isRegis ? !props.visible : props.visible}>
      <TouchableWithoutFeedback onPress={onDismiss}>
        <TouchableWithoutFeedback onPress={props.handleDismiss}>
          <KeyboardAvoidingView
            style={styles.modalContainer}
            behavior="padding"
            keyboardVerticalOffset={isMoveKeyboard ? -120 : 100}>
            <View style={styles.bodyModalContainer}>
              <ScrollView>
                <View style={styles.headerContainer}>
                  <Text style={styles.titleHeader}>Đăng ký</Text>
                </View>
                <View style={styles.bodyContainer}>
                  <View style={styles.itemBody}>
                    <Image
                      source={images.icon_person}
                      style={styles.iconStyle}
                    />
                    <TextInput
                      style={styles.textInputStyle}
                      placeholder="Tên đăng nhập"
                      placeholderTextColor={colors.gray}
                      value={username}
                      onChangeText={text => setUsername(text)}
                      onFocus={onFocus}
                    />
                  </View>
                  <View style={styles.itemBody}>
                    <View
                      style={{
                        flexDirection: 'row',
                        height: Sizes.s100,
                        alignItems: 'center',
                      }}>
                      <Image
                        source={images.icon_lock}
                        style={styles.iconStyle}
                      />
                      <View style={{width: Sizes.s10}} />
                      <TextInput
                        style={[styles.textInputStyle, {width: '80%'}]}
                        placeholder="Mật khẩu"
                        value={password}
                        onChangeText={text => setPassword(text)}
                        onFocus={onFocus}
                        secureTextEntry={!isShowPass ? true : false}
                        placeholderTextColor={colors.gray}
                      />
                    </View>
                    <TouchableOpacity onPress={showPass}>
                      <Image
                        source={
                          !isShowPass ? images.icon_no_eye : images.icon_eye
                        }
                        style={styles.iconStyle}
                      />
                    </TouchableOpacity>
                    <View style={{width: Sizes.h16 / 2}} />
                  </View>
                  <View style={styles.itemBody}>
                    <Image
                      source={images.icon_phone}
                      style={styles.iconStyle}
                    />
                    <TextInput
                      style={styles.textInputStyle}
                      placeholder="Số điện thoại"
                      value={phonenumber}
                      placeholderTextColor={colors.gray}
                      onChangeText={text => setPhonenumber(text)}
                      onFocus={onFocus}
                      maxLength={10}
                    />
                  </View>
                  <View style={styles.itemBody}>
                    <Image source={images.icon_key} style={styles.iconStyle} />
                    <TextInput
                      style={[styles.textInputStyle, {width: '60%'}]}
                      placeholder="Mã kiểm tra"
                      value={confirmCaptcha}
                      placeholderTextColor={colors.gray}
                      onChangeText={text => setConfirmCaptcha(text)}
                      onFocus={onFocus}
                    />
                    {captcha ? (
                      <Image
                        source={{uri: captcha.image}}
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
                </View>
                {textAlert ? (
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginVertical: Size.s10,
                    }}>
                    <Text style={{fontSize: Size.h30, color: 'red'}}>
                      {textAlert}
                    </Text>
                  </View>
                ) : (
                  <View style={{height: 10}} />
                )}
                <View style={styles.endContainer}>
                  <TouchableOpacity
                    style={
                      !check()
                        ? styles.buttonSignInStyleNoFill
                        : styles.buttonSignInStyle
                    }
                    onPress={checkBeforeSignUp}>
                    <Text style={styles.titleButton}>Đăng ký</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ModalSignup;
