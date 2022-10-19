import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, ToastAndroid} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {CustomHeader, QuantityPicker} from '../../components';
import {Colors, Themes} from '../../shared/layouts';
import {deviceHeight, deviceWidth} from '../../shared/utils/device.utility';
import {Button} from 'react-native-elements';
import {useShopContext} from '../../shared/contexts/ShopContext';
function ProductView({route, navigation}) {
  const {image, name, price, description, id} = route.params;
  const {addToCart} = useShopContext();

  const [quantity, setQuantity] = useState(1);
  const [productTotal, setProductTotal] = useState(price);

  const onAdd = () => {
    setProductTotal(parseFloat(productTotal) + parseFloat(price));
    setQuantity(quantity + 1);
  };
  const onDeduct = () => {
    if (quantity > 1) {
      setProductTotal(parseFloat(productTotal) - parseFloat(price));
      setQuantity(quantity - 1);
    }
  };

  const addItem = () => {
    addToCart({
      id,
      name,
      productTotal,
      quantity,
      image,
    });
    ToastAndroid.show('Added to cart', ToastAndroid.SHORT);
    navigation.goBack();
  };

  return (
    <>
      <CustomHeader headerName={'Product View'} showBackButton={true} />
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{uri: image}}
            resizeMode="cover"
          />
        </View>

        <View style={styles.productDetails}>
          <View style={styles.detailsWrapper}>
            <View style={styles.priceContainer}>
              <Text style={styles.priceText}>{name}</Text>
            </View>

            <Text style={styles.description}>{description}</Text>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.quantityContainer}>
            <QuantityPicker
              onAdd={onAdd}
              onDeduct={onDeduct}
              quantity={quantity}
            />
            <Text style={styles.totalText}>
              ₱{parseFloat(productTotal).toFixed(2)}
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
            title="Add to Cart"
            titleStyle={[Themes.buttonTextPrimary, {color: Colors.white}]}
            onPress={addItem}
            // loading={loading}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '7%',
  },
  totalText: {
    color: Colors.green,
    fontFamily: 'Poppins-Bold',
    fontSize: RFValue(20),
  },
  bottomContainer: {
    borderTopWidth: 2,
    borderColor: 'whitesmoke',
    borderStyle: 'solid',
    position: 'absolute',
    // backgroundColor: Colors.red,
    bottom: 0,
    width: '100%',
    height: deviceHeight * 0.28,
    paddingHorizontal: '5%',
  },
  description: {
    color: Colors.grey,
    fontFamily: 'Poppins-Regular',
    fontSize: RFValue(14),
    textAlign: 'center',
    marginTop: '5%',
  },
  nameText: {
    fontFamily: 'Poppins-Bold',
    fontSize: RFValue(40),
    textAlign: 'center',
    color: Colors.primary,
  },
  priceText: {
    color: Colors.white,
    fontFamily: 'Poppins-SemiBold',
    fontSize: RFValue(14),
  },
  priceContainer: {
    padding: '5%',
    backgroundColor: Colors.primary,
    width: '50%',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: RFValue(50),
  },
  detailsWrapper: {
    marginTop: '25%',
  },
  productDetails: {
    backgroundColor: Colors.white,
    height: deviceHeight * 0.75,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    borderTopRightRadius: RFValue(40),
    borderTopLeftRadius: RFValue(40),
  },
  image: {
    width: '100%',
    height: '100%',
  },
  wrapper: {
    marginTop: '10%',
    width: '90%',
    alignSelf: 'center',
  },
  imageContainer: {
    width: deviceWidth * 0.55,
    height: deviceWidth * 0.55,
    backgroundColor: 'whitesmoke',
    alignSelf: 'center',
    borderWidth: 3,
    borderColor: 'whitesmoke',
    borderRadius: RFValue(100),
    elevation: 1,
    borderStyle: 'solid',
    overflow: 'hidden',
    position: 'absolute',
    zIndex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
});

export default ProductView;
