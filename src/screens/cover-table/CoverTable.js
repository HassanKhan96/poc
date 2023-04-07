import {useMemo, useState} from 'react';
import {Text} from 'react-native-paper';
import {useWindowDimensions} from 'react-native';
import AddItems from './Menu/AddItems';
import Details from './Details';
import Items from './Items/Items';
import {TabBar, TabView} from 'react-native-tab-view';
import globalColors from '../../styles/colors';
import OrderContext from '../../context/orderContext';

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
    // {key: 'details', title: 'Details'},
  ]);
  const layout = useWindowDimensions();
  const value = useMemo(() => ({order, setOrder}), [order]);
  return (
    <OrderContext.Provider value={value}>
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
