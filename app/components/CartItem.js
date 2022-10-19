import React from 'react';
import {Image} from 'react-native';
import {View, Text, StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {Colors} from '../shared/layouts';
import {deviceHeight} from '../shared/utils/device.utility';
function CartItem({name, productTotal, quantity, image}) {
  return (
    <View style={styles.cartItem}>
      <View style={styles.mainDetails}>
        <View style={styles.imageContainer}>
          <Image
            source={{uri: image}}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <View style={styles.detailsTextContainer}>
          <Text style={styles.nameText}>{name}</Text>
          <Text>x{quantity}</Text>
        </View>
      </View>
      <Text style={styles.total}>₱{parseFloat(productTotal).toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  total: {
    fontSize: RFValue(15),
    fontFamily: 'Poppins-Bold',
    color: Colors.green,
  },
  mainDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageContainer: {
    width: deviceHeight * 0.1,
    height: deviceHeight * 0.1,
    borderRadius: RFValue(10),
    overflow: 'hidden',
    marginRight: RFValue(10),
  },
  cartItem: {
    width: '100%',
    height: deviceHeight * 0.17,
    backgroundColor: Colors.white,
    elevation: 2,
    marginVertical: '2%',
    borderRadius: RFValue(10),
    padding: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.primary,
    borderStyle: 'dashed',
  },
  nameText: {
    color: Colors.primary,
    fontFamily: 'Poppins-Bold',
  },
});

export default CartItem;
