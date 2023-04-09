import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button} from 'react-native-paper';
import Menu from '../../screens/menu/Menu';
import {useUser} from '@realm/react';
import Orders from '../../screens/order/Orders';
import Profile from '../../screens/profile/Profile';
import TableNavigator from './TableNavigator';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const user = useUser();
  return (
    <Tab.Navigator
      screenOptions={{
        headerRight: () => (
          <Button onPress={() => user?.logOut()}>Logout</Button>
        ),
        headerRightContainerStyle: {
          paddingRight: 10,
        },
      }}>
      <Tab.Screen
        name="TableRoot"
        component={TableNavigator}
        options={{
          tabBarLabelStyle: {fontSize: 14},
          tabBarLabel: 'Tables',
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Icons name="table-furniture" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Orders"
        component={Orders}
        options={{
          tabBarLabelStyle: {fontSize: 14},
          tabBarIcon: ({color, size}) => (
            <Icons
              name="order-bool-ascending-variant"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Menu"
        component={Menu}
        options={{
          tabBarLabelStyle: {fontSize: 14},
          tabBarIcon: ({color, size}) => (
            <Icons name="food-fork-drink" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabelStyle: {fontSize: 14},
          tabBarIcon: ({color, size}) => (
            <Icons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
