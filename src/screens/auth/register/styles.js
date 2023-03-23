import {StyleSheet} from 'react-native';
import globalColors from '../../../styles/colors';

const styles = StyleSheet.create({
  sectionHeader: {
    fontSize: 32,
    color: globalColors.black,
    fontFamily: 'PlusJakartaSans-Bold',
  },

  buttonSection: {
    marginTop: 10,
  },
  suggestionSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
});

export default styles;
