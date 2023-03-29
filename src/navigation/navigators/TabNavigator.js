import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Tables from '../../screens/table/Tables';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import {fontSize} from '@mui/system';
import {Text, Button} from 'react-native-paper';
import Menu from '../../screens/menu/Menu';
import {useUser} from '@realm/react';
import Order from '../../screens/order/Order';
import Profile from '../../screens/profile/Profile';
import globalColors from '../../styles/colors';

const Tab = createBottomTabNavigator();
const TabNavigator = () => {
  const user = useUser();
  return (
    <Tab.Navigator
      // sceneContainerStyle={{
      //   backgroundColor: globalColors.secondary,
      // }}
      screenOptions={{
        headerRight: () => (
          <Button onPress={() => user?.logOut()}>Logout</Button>
        ),
        headerRightContainerStyle: {
          paddingRight: 10,
        },
      }}>
      <Tab.Screen
        name="Tables"
        component={Tables}
        options={{
          tabBarLabelStyle: {fontSize: 14},
          tabBarIcon: ({color, size}) => (
            <Icons name="table-furniture" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Orders"
        component={Order}
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
