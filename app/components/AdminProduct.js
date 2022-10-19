import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {Colors} from '../shared/layouts';
import {deviceHeight} from '../shared/utils/device.utility';
import {useNavigation} from '@react-navigation/native';
function AdminProduct({image, name, price, description, id}) {
  const navigation = useNavigation();

  const navigateToEditProduct = () => {
    navigation.navigate('EditProduct', {
      image,
      name,
      price,
      description,
      id,
    });
  };
  return (
    <TouchableOpacity style={styles.container} onPress={navigateToEditProduct}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{uri: image}}
          resizeMode="contain"
        />
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.productName} numberOfLines={2}>
          {name}
        </Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.price}>₱ {parseFloat(price).toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  price: {
    color: Colors.green,
    fontFamily: 'Poppins-Bold',
    fontSize: RFValue(16),
  },
  description: {
    color: Colors.grey,
    fontFamily: 'Poppins-Regular',
    fontSize: RFValue(12),
  },
  productName: {
    fontSize: RFValue(15),
    fontFamily: 'Poppins-SemiBold',
    color: Colors.primary,
    marginBottom: '2%',
  },
  detailsContainer: {
    // alignSelf: 'flex-start',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageContainer: {
    height: deviceHeight * 0.15,
    width: deviceHeight * 0.15,
    backgroundColor: Colors.white,
    elevation: 1,
    marginRight: '5%',
  },
  container: {
    flex: 1,
    width: '100%',
    height: deviceHeight * 0.2,
    backgroundColor: 'whitesmoke',
    elevation: 1,
    marginVertical: 1,
    padding: '5%',
    borderWidth: 1,
    borderColor: 'whitesmoke',
    borderRadius: RFValue(10),
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: Colors.lightGrey,
    marginVertical: '3%',
  },
});

export default AdminProduct;
