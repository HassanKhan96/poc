import {useEffect, useMemo, useState} from 'react';
import {Button, Dialog, Portal, Text} from 'react-native-paper';
import {useWindowDimensions, Alert} from 'react-native';
import AddItems from './Menu/AddItems';
import Details from './Details';
import Items from './Items/Items';
import {TabBar, TabView} from 'react-native-tab-view';
import globalColors from '../../styles/colors';
import OrderContext from '../../context/orderContext';
import {useNavigation} from '@react-navigation/native';
import {realmContext} from '../../context/RealmContext';
import {useUser} from '@realm/react';
import {Order} from '../../schema/orderSchema';
import {Table} from '../../schema/tableSchema';

const renderScene = ({route}) => {
  switch (route.key) {
    case 'items':
      return <Items />;

    case 'addItems':
      return <AddItems />;

    // case 'details':
    //   return <Details />;
    default:
      return null;
  }
};

const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={{backgroundColor: globalColors.primary}}
    style={{
      backgroundColor: globalColors.white,
    }}
    labelStyle={{fontFamily: 'PlusJakartaSans-Regular'}}
    activeColor={globalColors.primary}
    inactiveColor={globalColors.darkGray}
  />
);

const CoverTable = ({route}) => {
  const [index, setIndex] = useState(0);
  const [order, setOrder] = useState({
    orderId: route.params?.order?._id,
    tableId: route.params.table._id,
  });
  const [routes] = useState([
    {key: 'items', title: 'Items'},
    {key: 'addItems', title: 'Add Items'},
  ]);
  const [alert, setAlert] = useState({
    status: false,
    message: '',
    onCancel: () => null,
    onConfirm: () => null,
    onDiscard: () => null,
  });
  const layout = useWindowDimensions();
  const navigation = useNavigation();
  const {useRealm, useQuery} = realmContext;
  const realm = useRealm();
  const user = useUser();

  const value = useMemo(() => ({order, setOrder}), [order]);
  let existingOrder = null;
  if (route.params?.order)
    existingOrder = realm.objectForPrimaryKey(Order, route.params?.order?._id);
  const existingTable = realm.objectForPrimaryKey(
    Table,
    route.params?.table?._id,
  );

  useEffect(() => {
    let backListener = navigation.addListener('beforeRemove', e => {
      console.log('listener', existingOrder);
      if (existingOrder?.isConfirmed) return;
      e.preventDefault();

      setAlert({
        message: 'Order is not confirm, Do you want to confirm order?',
        status: true,
        onCancel: () => onCancel(e),
        onDiscard: () => onDiscard(e),
        onConfirm: () => onConfirm(e),
      });
    });
    return () => backListener();
  }, [navigation]);

  const onConfirm = () => {
    realm.write(() => {
      existingOrder.isConfirmed = true;
      existingTable.orders.push(existingOrder);
    });
    realm.syncSession.resume();
    navigation.goBack();
  };

  const onDiscard = e => {
    realm.write(() => {
      let order = realm.objectForPrimaryKey(Order, existingOrder._id);
      realm.delete(order);
    });
    realm.syncSession.resume();
    navigation.dispatch(e.data.action);
  };

  const onCancel = () => {
    setAlert({message: '', status: false});
  };

  return (
    <OrderContext.Provider value={value}>
      <Portal>
        <Dialog
          visible={alert.status}
          style={{backgroundColor: globalColors.white}}
          onDismiss={() => setAlert({message: '', status: false})}>
          <Dialog.Title>Alert</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">{alert.message}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => alert.onConfirm()}>Yes</Button>
            <Button onPress={() => alert.onDiscard()}>No</Button>
            <Button onPress={() => alert.onCancel()}>Cancel</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
        renderTabBar={renderTabBar}
      />
    </OrderContext.Provider>
  );
};

export default CoverTable;
