import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useAuthContext} from '../shared/contexts/AuthContext';
import ConsumerDrawer from './ConsumerDrawer';
import AdminDrawer from './AdminDrawer';

const Stack = createStackNavigator();

function HomeStack() {
  const {loggedUser} = useAuthContext();
  console.log('Logged User: ', loggedUser);
  return (
    <Stack.Navigator
      initialRouteName={
        loggedUser?.role === 'admin' ? 'AdminDrawer' : 'ConsumerDrawer'
      }
      screenOptions={{headerShown: false}}>
      {loggedUser?.role === 'admin' ? (
        <Stack.Screen name="AdminDrawer" component={AdminDrawer} />
      ) : (
        <Stack.Screen name="ConsumerDrawer" component={ConsumerDrawer} />
      )}
    </Stack.Navigator>
  );
}

export default HomeStack;
