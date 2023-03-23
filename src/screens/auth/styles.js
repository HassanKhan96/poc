import {StyleSheet} from 'react-native';
import globalColors from '../../styles/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalColors.primary,
  },
  topSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topSectionText: {
    fontSize: 22,
    fontWeight: '100',
    marginTop: 5,
    fontFamily: 'PlusJakartaSan-ExtraLight',
    color: globalColors.white,
  },
  inputSection: {
    flex: 2,
    borderTopLeftRadius: 50,
    backgroundColor: globalColors.secondary,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
});

export default styles;
