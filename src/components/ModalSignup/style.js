import {StyleSheet, Dimensions} from 'react-native';
import Size from '@dungdang/react-native-basic/src/Sizes';
import {colors} from '../../styles/Color';

const {height, width} = Dimensions.get('screen');

export const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: colors.black,
    height: height,
    width: width,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyModalContainer: {
    backgroundColor: 'white',
    width: width * 0.9,
    height: height * 0.6,
    borderRadius: 20,
    paddingVertical: Size.h16,
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
    height: height * 0.4,
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
    flex: 1,
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
  buttonSignInStyleNoFill: {
    backgroundColor: colors.gray,
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
