import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../../screens/auth/login/Login';
import Register from '../../screens/auth/register/Register';
import Tables from '../../screens/table/Tables';

const Stack = createNativeStackNavigator();

const AuthNavigator = props => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{gestureDirection: 'horizontal'}}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{gestureDirection: 'horizontal'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthNavigator;
