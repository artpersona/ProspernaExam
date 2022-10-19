import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Image} from 'react-native';
import Hamburger from 'react-native-animated-hamburger';
import {RFValue} from 'react-native-responsive-fontsize';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import {useConfigContext} from '../shared/contexts/ConfigContext';
import {useShopContext} from '../shared/contexts/ShopContext';
import {useAuthContext} from '../shared/contexts/AuthContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '../shared/layouts';
function CustomHeader({showBackButton, headerName, hideCart}) {
  // const [drawerOpen, setDrawerOpen] = useState(false);
  const navigation = useNavigation();
  const {drawerStatus} = useConfigContext();
  const {cart} = useShopContext();
  const {loggedUser} = useAuthContext();

  const handleDrawerToggle = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

  const navigateToCart = () => {
    navigation.navigate('Cart');
  };

  return (
    <View style={styles.container}>
      {showBackButton ? (
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons
            name="arrow-left"
            size={RFValue(25)}
            color={Colors.white}
          />
        </TouchableOpacity>
      ) : (
        <Hamburger
          type="spinCross"
          color="white"
          active={drawerStatus}
          onPress={handleDrawerToggle}
        />
      )}

      {headerName && (
        <View style={styles.headerContainer}>
          <Text style={styles.headerName}>{headerName}</Text>
        </View>
      )}

      {!hideCart && loggedUser?.role !== 'admin' && (
        <TouchableOpacity onPress={navigateToCart}>
          <MaterialCommunityIcons
            name="cart"
            size={RFValue(25)}
            color={Colors.white}
          />
          {cart?.length > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{cart?.length}</Text>
            </View>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  badgeText: {
    color: 'white',
    fontFamily: 'Poppins-SemiBold',
    fontSize: RFValue(9),
  },
  badge: {
    position: 'absolute',
    zIndex: 999,
    backgroundColor: 'red',
    width: RFValue(20),
    height: RFValue(20),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 1000,
    top: -RFValue(5),
    right: RFValue(-5),
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerName: {
    color: Colors.white,
    fontFamily: 'Poppins-SemiBold',
  },

  container: {
    height: RFValue(60),
    width: '100%',
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: '5%',
    justifyContent: 'space-between',
    zIndex: 9999,
    elevation: 1,
  },
});

export default CustomHeader;
