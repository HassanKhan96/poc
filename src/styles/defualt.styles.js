import {StyleSheet} from 'react-native';
import globalColors from './colors';

const defaultStyles = StyleSheet.create({
  container: {
    padding: 10,
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
