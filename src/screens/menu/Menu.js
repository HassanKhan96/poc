import {FlatList, View} from 'react-native';
import {
  Button,
  Card,
  IconButton,
  List,
  Text,
  TextInput,
} from 'react-native-paper';
import menuStyles from './styles';
import styles from '../../styles/defualt.styles';
import globalColors from '../../styles/colors';
import Category from './Category';
import MenuItems from './MenuItems';

const Menu = () => {
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
  return <MenuItems menuItems={menuItems} categories={categories} />;
};

export default Menu;
