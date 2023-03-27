import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './navigators/AuthNavigator';
import TabNavigator from './navigators/TabNavigator';

const Navigator = () => {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
};

export default Navigator;
