import {StyleSheet} from 'react-native';
import globalColors from '../../styles/colors';

const styles = StyleSheet.create({
  cardContainer: {
    width: 70,
    height: 70,
    margin: 5,
  },
  card: {
    width: '100%',
    height: '100%',
    backgroundColor: globalColors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
