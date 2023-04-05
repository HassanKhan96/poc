import {StyleSheet} from 'react-native';
import globalColors from '../../styles/colors';

const coverTableStyles = StyleSheet.create({
  container: {
    paddingTop: 20,
  },
  coverFieldContainer: {
    backgroundColor: globalColors.white,
  },
  coverInput: {
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
  },
});

export default coverTableStyles;
