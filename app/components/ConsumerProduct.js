import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {deviceHeight} from '../shared/utils/device.utility';
import {Colors, Themes} from '../shared/layouts';
import {RFValue} from 'react-native-responsive-fontsize';
import {Button} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
function ConsumerProduct({image, name, price, description, id}) {
  const navigation = useNavigation();

  const navigateToIndividual = () => {
    navigation.navigate('ProductView', {
      image,
      name,
      price,
      description,
      id,
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{uri: image}} style={styles.image} resizeMode="cover" />
      </View>

      <View style={styles.productDetails}>
        <Text style={styles.productName}>{name}</Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.price} numberOfLines={2}>
          ₱ {parseFloat(price).toFixed(2)}
        </Text>
      </View>
      <Button
        buttonStyle={[
          Themes.buttonPrimary,
          {
            backgroundColor: Colors.primary,
            borderWidth: 1,
            borderColor: 'whitesmoke',
            width: '100%',
            alignSelf: 'center',
            marginTop: '15%',
          },
        ]}
        title="Buy Now"
        titleStyle={[Themes.buttonTextPrimary, {color: Colors.white}]}
        onPress={navigateToIndividual}
        // loading={loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  price: {
    color: Colors.green,
    fontFamily: 'Poppins-Bold',
    marginTop: '3%',
  },
  description: {
    color: Colors.input,
    fontFamily: 'Poppins-Regular',
    fontSize: RFValue(11),
  },
  productName: {
    fontSize: RFValue(14),
    color: Colors.primary,
    fontFamily: 'Poppins-SemiBold',
  },
  productDetails: {
    alignItems: 'center',
    marginTop: '5%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageContainer: {
    height: deviceHeight * 0.13,
    width: deviceHeight * 0.15,
    backgroundColor: Colors.white,
    elevation: 1,
    alignSelf: 'center',
    overflow: 'hidden',
    borderRadius: RFValue(10),
    borderWidth: 1,
    borderColor: Colors.lightGrey,
  },
  container: {
    backgroundColor: 'red',
    marginHorizontal: '2.5%',
    marginVertical: '3%',
    width: '45%',
    // height: deviceHeight * 0.3,
    elevation: 1,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: Colors.lightGrey,
    padding: '5%',
    borderRadius: RFValue(10),
  },
});

export default ConsumerProduct;
