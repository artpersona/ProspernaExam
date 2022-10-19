import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {CustomDrawer, CustomHeader} from '../components';
import ManageProductStack from './ManageProductStack';
import ProductManagementProvider from '../shared/contexts/ProductManagementContext';
const Drawer = createDrawerNavigator();

function AdminDrawer() {
  return (
    <ProductManagementProvider>
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
          name="Product Management"
          component={ManageProductStack}
          options={{
            drawerLabel: 'Product Management',
          }}
        />
      </Drawer.Navigator>
    </ProductManagementProvider>
  );
}

export default AdminDrawer;
