import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {CustomDrawer, CustomHeader} from '../components';
import ShopStack from './ShopStack';
import ShopProvider from '../shared/contexts/ShopContext';
const Drawer = createDrawerNavigator();

function ConsumerDrawer() {
  return (
    <>
      <ShopProvider>
        <Drawer.Navigator
          options={{
            unmountInactiveRoutes: true,
          }}
          useLegacyImplementation={true}
          drawerPosition={'left'}
          drawerContent={props => <CustomDrawer {...props} />}
          screenOptions={{
            animationEnabled: true,
            headerShown: false,
            // header: props => <CustomHeader />,
            swipeEnabled: false,
          }}
          detachInactiveScreens={true}>
          <Drawer.Screen
            name="Shop"
            component={ShopStack}
            options={{
              drawerLabel: 'Shop',
            }}
          />
        </Drawer.Navigator>
      </ShopProvider>
    </>
  );
}

export default ConsumerDrawer;
