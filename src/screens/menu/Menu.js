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
    style={{backgroundColor: globalColors.white}}
    activeColor={globalColors.primary}
    inactiveColor={globalColors.darkGray}
  />
);

const Menu = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'items', title: 'Items'},
    {key: 'categories', title: 'Categories'},
  ]);
  const layout = useWindowDimensions();

  const categories = [
    {
      key: '1',
      name: 'Sea Food',
    },
    {
      key: '2',
      name: 'Fast Food',
    },
    {
      key: '3',
      name: 'Chinese',
    },
    {
      key: '4',
      name: 'Italian',
    },
    {
      key: '5',
      name: 'Rice',
    },
    {
      key: '6',
      name: 'Maxican',
    },
    {
      key: '7',
      name: 'Indian',
    },
  ];
  const menuItems = [
    {
      key: '1',
      name: 'Biryani',
      category: 'Indian Food',
      price: 10,
      takeAwayPrice: 15,
    },
    {
      key: '2',
      name: 'Palak Paneer',
      category: 'Indian Food',
      price: 7,
      takeAwayPrice: 12,
    },
    {
      key: '3',
      name: 'Daal Makhani',
      category: 'Indian Food',
      price: 5,
      takeAwayPrice: 10,
    },
    {
      key: '4',
      name: 'Pao Bhaji',
      category: 'Indian Food',
      price: 5,
      takeAwayPrice: 10,
    },
    {
      key: '5',
      name: 'Daal Makhani',
      category: 'Indian Food',
      price: 5,
      takeAwayPrice: 10,
    },
    {
      key: '6',
      name: 'Pao Bhaji',
      category: 'Indian Food',
      price: 5,
      takeAwayPrice: 10,
    },
    {
      key: '7',
      name: 'Daal Makhani',
      category: 'Indian Food',
      price: 5,
      takeAwayPrice: 10,
    },
    {
      key: '8',
      name: 'Pao Bhaji',
      category: 'Indian Food',
      price: 5,
      takeAwayPrice: 10,
    },
  ];

  const renderScene = ({route, jumpTo}) => {
    switch (route.key) {
      case 'categories':
        return <Category jumpTo={jumpTo} categories={categories} />;
      case 'items':
        return (
          <MenuItems
            jumpTo={jumpTo}
            categories={categories}
            menuItems={menuItems}
          />
        );
      default:
        return null;
    }
  };
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
