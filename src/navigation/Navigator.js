import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './navigators/AuthNavigator';

const Navigator = () => {
  return (
    <NavigationContainer>
      <AuthNavigator />
    </NavigationContainer>
  );
};

export default Navigator;
