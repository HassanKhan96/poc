import {View, useWindowDimensions} from 'react-native';
import {useState} from 'react';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import Category from './Category';
import MenuItems from './MenuItems';
import globalColors from '../../styles/colors';

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

const renderScene = SceneMap({
  items: MenuItems,
  categories: Category,
});

const Menu = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'items', title: 'Items'},
    {key: 'categories', title: 'Categories'},
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

export default Menu;
