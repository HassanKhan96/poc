import {StyleSheet} from 'react-native';
import globalColors from '../../styles/colors';

const menuStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalColors.secondary,
  },
  categorySection: {
    width: '100%',
  },
  categoryCard: {
    backgroundColor: globalColors.white,
    maxHeight: 260,
  },
  categoryList: {
    width: '100%',
  },
});

export default menuStyles;
