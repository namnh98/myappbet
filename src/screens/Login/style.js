import Sizes from '@dungdang/react-native-basic/src/Sizes';
import {StyleSheet} from 'react-native';
import { colors } from '../../styles/Color';

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
      paddingVertical: Sizes.h16,
      flex: 1,
    },
    buttonStyle: {
      backgroundColor: colors.blue,
      width: Sizes.s200 * 3,
      height: Sizes.s100 + Sizes.s20,
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: Sizes.h16 / 2,
    },
    titleButton: {
      color: 'white',
      fontSize: Sizes.h44,
    },
  });

export default styles;
