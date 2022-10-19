import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import Entypo from 'react-native-vector-icons/Entypo';
import {Colors} from '../shared/layouts';
import {deviceHeight} from '../shared/utils/device.utility';
function QuantityPicker({onAdd, onDeduct, quantity}) {
  return (
    <View style={styles.quantityPicker}>
      <TouchableOpacity style={styles.quantityAction} onPress={onDeduct}>
        <Entypo name="minus" size={RFValue(25)} color={Colors.white} />
      </TouchableOpacity>
      <Text>{quantity}</Text>
      <TouchableOpacity style={styles.quantityAction} onPress={onAdd}>
        <Entypo name="plus" size={RFValue(25)} color={Colors.white} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  quantityAction: {
    backgroundColor: Colors.primary,
    padding: '5%',
  },
  quantityPicker: {
    flexDirection: 'row',
    width: '50%',
    backgroundColor: Colors.lightGrey,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default QuantityPicker;
