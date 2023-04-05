import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useUser} from '@realm/react';
import {Button} from 'react-native-paper';
import CoverTable from '../../screens/cover-table/CoverTable';
import Tables from '../../screens/table/Tables';

const Stack = createNativeStackNavigator();
const TableNavigator = () => {
  const user = useUser();

  return (
    <Stack.Navigator
      screenOptions={{
        headerRight: () => (
          <Button style={{marginRight: -6}} onPress={() => user?.logOut()}>
            Logout
          </Button>
        ),
      }}>
      <Stack.Screen component={Tables} name="Tables" />
      <Stack.Screen
        component={CoverTable}
        name="Cover"
        options={({route}) => ({
          title: route.params.name,
          headerShadowVisible: false,
        })}
      />
    </Stack.Navigator>
  );
};

export default TableNavigator;
