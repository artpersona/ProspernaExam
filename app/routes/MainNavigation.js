import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Home, Login} from '../screens';
import {useAuthContext} from '../shared/contexts/AuthContext';
import HomeStack from './HomeStack';
const Stack = createStackNavigator();

function MainNavigation() {
  const {loggedUser} = useAuthContext();
  return (
    <Stack.Navigator
      initialRouteName={loggedUser ? 'Home' : 'Login'}
      screenOptions={{headerShown: false}}>
      {loggedUser ? (
        <>
          <Stack.Screen name="Home" component={HomeStack} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={Login} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default MainNavigation;
