import {StyleSheet} from 'react-native';

import {RFValue} from 'react-native-responsive-fontsize';
import Colors from './Colors';

const buttonHeight = RFValue(60);

export default StyleSheet.create({
  buttonPrimary: {
    height: buttonHeight,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonTextPrimary: {
    fontSize: RFValue(12.5),
    textAlign: 'center',
    textTransform: 'uppercase',
    fontFamily: 'Poppins-SemiBold',
    color: Colors.primary,
  },

  emptyText: {
    textAlign: 'center',
    fontSize: RFValue(12.5),
    fontFamily: 'Poppins-SemiBold',
    color: Colors.primary,
  },
});
