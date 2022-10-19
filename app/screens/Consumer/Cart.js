import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {useShopContext} from '../../shared/contexts/ShopContext';
import {Colors, Themes} from '../../shared/layouts';
import {CustomHeader, CartItem} from '../../components';
import {RFValue} from 'react-native-responsive-fontsize';
import {deviceHeight} from '../../shared/utils/device.utility';
import {Button} from 'react-native-elements';
function Cart({route, navigation}) {
  const {cart} = useShopContext();
  const [total, setTotal] = useState(0);

  console.log('cart', cart);

  const renderItem = ({item}) => {
    return <CartItem {...item} />;
  };

  useEffect(() => {
    let total = cart?.reduce((acc, item) => {
      return acc + parseFloat(item.productTotal);
    }, 0);
    setTotal(total);
  }, [cart]);

  return (
    <>
      <CustomHeader headerName="Cart" showBackButton={true} hideCart={true} />
      <View style={styles.container}>
        <FlatList
          data={cart}
          renderItem={renderItem}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No items on cart</Text>
          }
          contentContainerStyle={{
            marginTop: RFValue(10),
            paddingHorizontal: RFValue(10),
          }}
        />

        <View style={styles.bottomContainer}>
          <Button
            buttonStyle={[
              Themes.buttonPrimary,
              {
                backgroundColor: Colors.primary,
                borderWidth: 1,
                borderColor: 'whitesmoke',
                width: '100%',
                alignSelf: 'center',
              },
            ]}
            title={`Pay: ₱${total.toFixed(2)}`}
            titleStyle={[Themes.buttonTextPrimary, {color: Colors.white}]}
            // loading={loading}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  bottomContainer: {
    backgroundColor: Colors.white,
    height: deviceHeight * 0.15,
    padding: '5%',
    elevation: 2,
  },
  emptyText: {
    color: Colors.primary,
    fontSize: RFValue(13),
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
  container: {
    flex: 1,

    // backgroundColor: Colors.white,
  },
});

export default Cart;
