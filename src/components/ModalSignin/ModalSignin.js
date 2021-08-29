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

const ModalSignin = props => {
  const [captcha, setCaptcha] = useState();
  const [isMoveKeyboard, setIsMoveKeyboard] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmCaptcha, setConfirmCaptcha] = useState('');

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
  return (
    <Modal animationType="fade" transparent={true} visible={props.visible}>
      <KeyboardAvoidingView
        behavior={'padding'}
        keyboardVerticalOffset={isMoveKeyboard === true ? 145 : 0}>
        <TouchableWithoutFeedback onPress={onDismiss}>
          <View style={styles.modalContainer}>
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
                      source={{uri: captcha}}
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
              <View style={styles.endContainer}>
                <TouchableOpacity
                  style={styles.buttonSignInStyle}
                  onPress={props.handleSignIn}>
                  <Text style={styles.titleButton}>Đăng nhập</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default ModalSignin;
