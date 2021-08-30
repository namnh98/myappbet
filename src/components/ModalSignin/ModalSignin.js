import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import {colors} from '../../styles/Color';
import {images} from '../../assets/index';
import CaptchaAPI from '../../services/api/CaptchaAPI';
import styles from './style';
import Size from '@dungdang/react-native-basic/src/Sizes';
// import CheckAccountAPI from '../../services/api/CheckAccountAPI';
import SignInAPI from '../../services/api/SignInAPI';
import {useNavigation} from '@react-navigation/core';
import {useRecoilState} from 'recoil';
import {AuthenFormState} from '../../services/recoil/Authen';
import Sizes from '@dungdang/react-native-basic/src/Sizes';

const ModalSignin = props => {
  const [captcha, setCaptcha] = useState();
  const [isMoveKeyboard, setIsMoveKeyboard] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmCaptcha, setConfirmCaptcha] = useState('');
  const [textAlert, setTextAlert] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  const navigation = useNavigation();
  const [authen, setAuthen] = useRecoilState(AuthenFormState);
  const [isShowPass, setIsShowPass] = useState(false);

  const getCaptcha = async () => {
    const result = await CaptchaAPI();
    if (result) {
      console.log('cáp', result);
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

  const check = () => {
    if (!username || !password || !confirmCaptcha) {
      return false;
    }
    return true;
  };

  // const checkAccount = async (
  //   username,
  //   timestamp
  // ) => {
  //   try {
  //     const resp = await CheckAccountAPI(
  //       username,
  //       password,
  //       confirmCaptcha,
  //       captchauuid,
  //     );
  //     if (resp.error === 'Not Found') {
  //       handleSignIn(username, password, confirmCaptcha, captcha.uuid);
  //     }
  //   } catch (e) {
  //     throw e;
  //   }
  // };

  const checkBeforeSignIn = () => {
    if (!username) {
      setTextAlert('Tên đăng nhập còn trống!');
    } else if (!password) {
      setTextAlert('Mật khẩu còn trống!');
    } else if (!confirmCaptcha) {
      setTextAlert('Mã kiểm tra còn trống!');
    } else {
      handleSignIn(username, password, confirmCaptcha, captcha.uuid);
      setTextAlert('');
    }
  };

  const handleSignIn = async (
    username,
    password,
    confirmCaptcha,
    captchauuid,
  ) => {
    try {
      const resp = await SignInAPI(
        username,
        password,
        confirmCaptcha,
        captchauuid,
      );
      console.log('resp', resp);
      if (resp.msg === 'userid or password is incorrect') {
        setTextAlert('Tên đăng nhập hoặc mật khẩu không đúng!');
        getCaptcha();
      } else if (resp.msg === 'Captcha is invalid') {
        setTextAlert('Mã kiểm tra không đúng');
        getCaptcha();
      } else if (resp.msg === "Player's status is SUSPENDED") {
        setTextAlert('Tài khoản này đã khoá. Vui lòng dùng tài khoản khác!');
        getCaptcha();
      } else if (!resp.code) {
        setAuthen({...authen, tokenSignIn: resp.token});
        Alert.alert('Thông báo', 'Bạn đã đăng nhập thành công!', [
          {
            text: 'Ok',
            onPress: navigation.navigate('HOME'),
            style: 'cancel',
          },
        ]);
        setIsLogin(true);
      }
    } catch (e) {
      console.log('lỗi đăng nhập', e);
      setTextAlert('Bạn đã đăng nhập thất bại');
      throw e;
    }
  };

  const showPass = () => {
    setIsShowPass(!isShowPass);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isLogin ? !props.visible : props.visible}>
      <TouchableWithoutFeedback onPress={onDismiss}>
        <TouchableWithoutFeedback onPress={props.handleDismiss}>
          <KeyboardAvoidingView
            style={styles.modalContainer}
            behavior="padding"
            keyboardVerticalOffset={isMoveKeyboard ? -50 : 0}>
            <View style={styles.bodyModalContainer}>
              <View style={styles.headerContainer}>
                <Text style={styles.titleHeader}>Đăng nhập</Text>
              </View>
              <View style={styles.bodyContainer}>
                <View style={styles.itemBody}>
                  <Image source={images.icon_person} style={styles.iconStyle} />
                  <TextInput
                    style={styles.textInputStyle}
                    placeholder="Tên đăng nhập"
                    value={username}
                    onChangeText={text => setUsername(text)}
                    placeholderTextColor={colors.gray}
                    onFocus={onFocus}
                    autoFocus
                  />
                </View>
                <View style={styles.itemBody}>
                  <View
                    style={{
                      flexDirection: 'row',
                      height: Sizes.s100,
                      alignItems: 'center',
                    }}>
                    <Image source={images.icon_lock} style={styles.iconStyle} />
                    <View style={{width: Sizes.s10}} />
                    <TextInput
                      style={[styles.textInputStyle, {width: '80%'}]}
                      placeholder="Mật khẩu"
                      value={password}
                      onChangeText={text => setPassword(text)}
                      placeholderTextColor={colors.gray}
                      onFocus={onFocus}
                      secureTextEntry={!isShowPass ? true : false}
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
                  <Image source={images.icon_key} style={styles.iconStyle} />
                  <TextInput
                    style={[styles.textInputStyle, {width: '60%'}]}
                    placeholder="Mã kiểm tra"
                    placeholderTextColor={colors.gray}
                    value={confirmCaptcha}
                    onChangeText={text => setConfirmCaptcha(text)}
                    onFocus={onFocus}
                    maxLength={4}
                  />
                  {captcha ? (
                    <Image
                      source={{uri: captcha.image}}
                      style={{width: Size.s100 + Size.s40, height: Size.s100}}
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
              <View style={{height: 10}} />
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
                  onPress={checkBeforeSignIn}>
                  <Text style={styles.titleButton}>Đăng nhập</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ModalSignin;
