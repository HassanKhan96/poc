import {useState} from 'react';
import {Text} from 'react-native-paper';
import {useWindowDimensions} from 'react-native';
import AddItems from './Menu/AddItems';
import Details from './Details';
import Items from './Items/Items';
import {TabBar, TabView} from 'react-native-tab-view';
import globalColors from '../../styles/colors';

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
  const [routes] = useState([
    {key: 'items', title: 'Items'},
    {key: 'addItems', title: 'Add Items'},
    // {key: 'details', title: 'Details'},
  ]);
  const layout = useWindowDimensions();
  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
      renderTabBar={renderTabBar}
    />
  );
};

export default CoverTable;
