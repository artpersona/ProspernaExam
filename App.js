import 'react-native-gesture-handler';
import React from 'react';
import {LogBox} from 'react-native';
import {NavigationContainer, DarkTheme} from '@react-navigation/native';
import AuthProvider from './app/shared/contexts/AuthContext';
import ConfigProvider from './app/shared/contexts/ConfigContext';
import MainNavigation from './app/routes/MainNavigation';
function App() {
  LogBox.ignoreLogs([
    'Animated: `useNativeDriver`',
    'componentWillReceiveProps',
  ]);
  return (
    <ConfigProvider>
      <AuthProvider>
        <NavigationContainer>
          <MainNavigation />
        </NavigationContainer>
      </AuthProvider>
    </ConfigProvider>
  );
}

export default App;
