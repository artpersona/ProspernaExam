import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ConsumerDrawer from './ConsumerDrawer';
import {Shop, ProductView, Cart} from '../screens';
const Stack = createStackNavigator();

function ShopStack() {
  return (
    <Stack.Navigator
      initialRouteName={'ShopLanding'}
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
      <Stack.Screen name="ShopLanding" component={Shop} />
      <Stack.Screen name="ProductView" component={ProductView} />
      <Stack.Screen name="Cart" component={Cart} />
    </Stack.Navigator>
  );
}

export default ShopStack;
