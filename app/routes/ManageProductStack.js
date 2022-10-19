import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ConsumerDrawer from './ConsumerDrawer';
import {ProductLanding, AdminProductScreen} from '../screens';
const Stack = createStackNavigator();

function ManageProductStack() {
  return (
    <Stack.Navigator
      initialRouteName={'ProductLanding'}
      screenOptions={{
        headerShown: false,
        animationEnabled: true,
        cardStyleInterpolator: ({current, layouts}) => {
          return {
            cardStyle: {
              transform: [
                {
                  translateX: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-layouts.screen.width, 0],
                  }),
                },
              ],
            },
          };
        },
      }}>
      <Stack.Screen name="ProductLanding" component={ProductLanding} />
      <Stack.Screen name="CreateProduct" component={AdminProductScreen} />
      <Stack.Screen name="EditProduct" component={AdminProductScreen} />
    </Stack.Navigator>
  );
}

export default ManageProductStack;
