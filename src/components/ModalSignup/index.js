import React from 'react';
import {
  Text,
  View,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {colors} from '../../styles/Color';
import Size from '@dungdang/react-native-basic/src/Sizes';
import {images} from '../../assets/index';

const {width, height} = Dimensions.get('screen');

const ModalSignup = props => {
  const handlePress = () => {
    Keyboard.dismiss();
  };
  const handleCaptcha = () => {};
  return (
    <>
      <Modal animationType="fade" transparent={true} visible={props.visible}>
        <TouchableWithoutFeedback onPress={handlePress}>
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
                  />
                </View>
                <View style={styles.itemBody}>
                  <Image source={images.icon_lock} style={styles.iconStyle} />
                  <TextInput
                    style={styles.textInputStyle}
                    placeholder="Mật khẩu"
                  />
                </View>
                <View style={styles.itemBody}>
                  <Image source={images.icon_phone} style={styles.iconStyle} />
                  <TextInput
                    style={styles.textInputStyle}
                    placeholder="Số điện thoại"
                  />
                </View>
                <View style={styles.itemBody}>
                  <Image source={images.icon_key} style={styles.iconStyle} />
                  <TextInput
                    style={[styles.textInputStyle, {width: '65%'}]}
                    placeholder="Mã kiểm tra"
                  />
                  <Text style={styles.textCaptcha}>123</Text>
                  <TouchableOpacity onPress={handleCaptcha}>
                    <Image
                      source={images.icon_refresh}
                      style={[styles.iconStyle, {tintColor: colors.black}]}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.endContainer}>
                <TouchableOpacity style={styles.buttonSignInStyle} onPress={props.handleSignUp}>
                  <Text style={styles.titleButton}>Đăng ký</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: colors.black,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyModalContainer: {
    backgroundColor: 'white',
    width: width * 0.9,
    height: height * 0.5,
    borderRadius: 20,
    alignItems: 'center',
    paddingVertical:Size.h16
  },
  headerContainer: {
    height: Size.s100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleHeader: {
    color: colors.blue,
    fontSize: Size.h52,
    fontWeight: 'bold',
  },
  bodyContainer: {
    paddingHorizontal: Size.h16,
    height: height * 0.35,
  },
  itemBody: {
    height: Size.s100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: Size.h16,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.gray2,
    paddingHorizontal: Size.h16 / 2,
  },
  iconStyle: {
    resizeMode: 'contain',
    width: Size.s60,
    tintColor: colors.blue,
  },
  textInputStyle: {
    width: '90%',
    paddingVertical: Size.h16,
    paddingHorizontal: Size.h8,
  },
  textCaptcha: {
    width: Size.s100,
  },
  endContainer: {
    height: height *0.035,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonSignInStyle: {
    backgroundColor: colors.blue,
    height: Size.s100,
    width: Size.s260 * 2.5,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleButton: {
    color: 'white',
    fontSize: Size.h44,
  },
});

export default ModalSignup;
