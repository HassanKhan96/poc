import {StyleSheet, Dimensions} from 'react-native';
import globalColors from './colors';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').width;

const defaultStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  inputText: {
    marginVertical: 10,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  linkColor: {
    color: globalColors.primary,
    fontSize: 16,
  },
});

export default defaultStyles;
