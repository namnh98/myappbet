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
} from 'react-native';
import {colors} from '../../styles/Color';
import {images} from '../../assets/index';
import CaptchaAPI from '../../services/api/CaptchaAPI';
import styles from './style';
import Size from '@dungdang/react-native-basic/src/Sizes';
import CheckAccountAPI from '../../services/api/CheckAccountAPI';

const ModalSignin = props => {
  const [captcha, setCaptcha] = useState();
  const [isMoveKeyboard, setIsMoveKeyboard] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmCaptcha, setConfirmCaptcha] = useState('');
  const [textAlert, setTextAlert] = useState('');

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
  };

  const checkAccount = async (username, password, confirmCaptcha, captchauuid) => {
    var passhash = CryptoJS.MD5(password).toString();
    try {
      const resp = await CheckAccountAPI(username,passhash,confirmCaptcha,captchauuid);
      if(resp){
        console.log('kết quả check',resp)
      }
    } catch (e) {
      throw e;
    }
  };

  const checkBeforeSignIn = () => {
    if (!username) {
      setTextAlert('Tên đăng nhập còn trống!');
    } else if (!password) {
      setTextAlert('Mật khẩu còn trống!');
    } else if (!confirmCaptcha) {
      setTextAlert('Mã kiểm tra còn trống!');
    } else {
      // handleSignIn(username, password, confirmCaptcha, captcha.uuid);
      checkAccount(username, password, confirmCaptcha, captcha.uuid)
    }
  };

  const handleSignIn = async (
    username,
    password,
    confirmCaptcha,
    captchauuid,
  ) => {
    try {
      const resp = await SignUpAPI(
        username,
        password,
        confirmCaptcha,
        captchauuid,
      );
      if (resp.token) {
        Alert.alert('Thông báo', 'Bạn đã đăng ký thành công!');
        setIsRegis(true);
      }
    } catch (e) {
      console.log('lỗi đăng ký', e);
    }
  };

  return (
    <Modal animationType="fade" transparent={true} visible={props.visible}>
      <TouchableWithoutFeedback onPress={onDismiss}>
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
                  onFocus={onFocus}
                  autoFocus
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
                style={styles.buttonSignInStyle}
                onPress={checkBeforeSignIn}>
                <Text style={styles.titleButton}>Đăng nhập</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ModalSignin;
