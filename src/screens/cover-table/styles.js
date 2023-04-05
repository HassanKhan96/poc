import {StyleSheet} from 'react-native';
import globalColors from '../../styles/colors';

const coverTableStyles = StyleSheet.create({
  container: {
    paddingTop: 20,
  },
  coverFieldContainer: {
    backgroundColor: globalColors.white,
    paddingBottom: 20,
  },
  coverInput: {
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
  },
  itemsContainer: {
    backgroundColor: globalColors.white,
    marginTop: 20,
  },
});

export default coverTableStyles;
